-- Setup ultra simplificado para sistema de reacciones con emojis
-- Compatible 100% con phpMyAdmin - Sin declaraciones preparadas
-- Ejecutar línea por línea o por bloques en phpMyAdmin

-- BLOQUE 1: Crear tabla de tipos de reacciones
CREATE TABLE IF NOT EXISTS forum_reaction_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emoji VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- BLOQUE 2: Insertar emojis por defecto
INSERT IGNORE INTO forum_reaction_types (emoji, name, description) VALUES
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

-- BLOQUE 3: Crear tabla de reacciones (SIN claves foráneas)
CREATE TABLE IF NOT EXISTS forum_post_reactions (
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

-- BLOQUE 4: Agregar columna contador (ejecutar solo si no existe)
-- Si da error "Duplicate column name", ignorar - significa que ya existe
ALTER TABLE forum_posts ADD COLUMN reactions_count INT DEFAULT 0;

-- BLOQUE 5: Crear vista para resumen
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

-- VERIFICACIÓN: Ejecutar para confirmar instalación
SELECT 'Instalación completada' as estado, COUNT(*) as tipos_reacciones FROM forum_reaction_types;
SELECT 'Tabla creada correctamente' as estado FROM forum_post_reactions LIMIT 1;

-- OPCIONAL: Agregar claves foráneas manualmente (una por una)
-- Solo ejecutar DESPUÉS de verificar que todo funciona:

-- Para post_id:
-- ALTER TABLE forum_post_reactions ADD CONSTRAINT fk_reaction_post_id FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE;

-- Para user_id:
-- ALTER TABLE forum_post_reactions ADD CONSTRAINT fk_reaction_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Para reaction_type_id:
-- ALTER TABLE forum_post_reactions ADD CONSTRAINT fk_reaction_type_id FOREIGN KEY (reaction_type_id) REFERENCES forum_reaction_types(id) ON DELETE CASCADE;