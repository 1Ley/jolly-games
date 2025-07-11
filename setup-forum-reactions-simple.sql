-- Setup simplificado para sistema de reacciones con emojis
-- Versión sin claves foráneas para evitar errores de compatibilidad
-- Ejecutar en phpMyAdmin paso a paso

-- PASO 1: Crear tabla de tipos de reacciones (sin dependencias)
DROP TABLE IF EXISTS forum_reaction_types;
CREATE TABLE forum_reaction_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emoji VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- PASO 2: Insertar reacciones por defecto
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

-- PASO 3: Crear tabla de reacciones SIN claves foráneas
DROP TABLE IF EXISTS forum_post_reactions;
CREATE TABLE forum_post_reactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    reaction_type_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id),
    INDEX idx_reaction_type_id (reaction_type_id),
    UNIQUE KEY unique_user_post_reaction (user_id, post_id, reaction_type_id)
) ENGINE=InnoDB;

-- PASO 4: Agregar columna reactions_count a forum_posts (si no existe)
ALTER TABLE forum_posts ADD COLUMN reactions_count INT DEFAULT 0;

-- PASO 5: Crear vista para resumen de reacciones
CREATE OR REPLACE VIEW forum_post_reactions_summary AS
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
HAVING count > 0
ORDER BY fpr.post_id, count DESC;

-- PASO 6: Verificar instalación
SELECT 
    'INSTALACION COMPLETADA' as estado,
    (SELECT COUNT(*) FROM forum_reaction_types) as tipos_reacciones,
    (SELECT COUNT(*) FROM forum_post_reactions) as reacciones_totales,
    'Las claves foráneas se pueden agregar manualmente después' as nota;

-- OPCIONAL: Comandos para agregar claves foráneas manualmente (ejecutar uno por uno)
-- Solo ejecutar estos comandos DESPUÉS de verificar que todo funciona:

-- ALTER TABLE forum_post_reactions ADD CONSTRAINT fk_reaction_post_id 
-- FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE;

-- ALTER TABLE forum_post_reactions ADD CONSTRAINT fk_reaction_user_id 
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- ALTER TABLE forum_post_reactions ADD CONSTRAINT fk_reaction_type_id 
-- FOREIGN KEY (reaction_type_id) REFERENCES forum_reaction_types(id) ON DELETE CASCADE;