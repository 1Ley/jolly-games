-- Setup para sistema de reacciones con emojis en el foro
-- Versión compatible con phpMyAdmin
-- Ejecutar después de setup-forum-dislikes.sql

-- Tabla para definir los tipos de reacciones disponibles
CREATE TABLE IF NOT EXISTS forum_reaction_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emoji VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para las reacciones de los usuarios a los posts
CREATE TABLE IF NOT EXISTS forum_post_reactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    reaction_type_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reaction_type_id) REFERENCES forum_reaction_types(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_post_reaction (user_id, post_id, reaction_type_id)
);

-- Insertar reacciones por defecto
INSERT INTO forum_reaction_types (emoji, name, description) VALUES
('😀', 'happy', 'Feliz'),
('😂', 'laugh', 'Risa'),
('😍', 'love', 'Amor'),
('😮', 'wow', 'Sorpresa'),
('😢', 'sad', 'Triste'),
('😡', 'angry', 'Enojado'),
('🔥', 'fire', 'Genial'),
('💯', 'hundred', 'Perfecto'),
('🎉', 'party', 'Celebración'),
('🤔', 'thinking', 'Pensativo');

-- Agregar columnas para contar reacciones en la tabla de posts
ALTER TABLE forum_posts 
ADD COLUMN reactions_count INT DEFAULT 0;

-- Vista para obtener el resumen de reacciones por post
CREATE VIEW forum_post_reactions_summary AS
SELECT 
    fpr.post_id,
    frt.id as reaction_type_id,
    frt.emoji,
    frt.name as reaction_name,
    COUNT(fpr.id) as count
FROM forum_reaction_types frt
LEFT JOIN forum_post_reactions fpr ON frt.id = fpr.reaction_type_id
WHERE frt.is_active = TRUE
GROUP BY fpr.post_id, frt.id, frt.emoji, frt.name
ORDER BY fpr.post_id, count DESC;

COMMIT;