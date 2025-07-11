-- Setup para sistema de reacciones con emojis en el foro
-- Versión corregida para phpMyAdmin - Soluciona problemas de tipos de datos
-- Ejecutar después de setup-forum-dislikes.sql

-- PASO 1: Verificar y ajustar tipos de datos de las tablas existentes
-- Esto asegura compatibilidad con las claves foráneas

-- Verificar estructura de forum_posts
ALTER TABLE forum_posts MODIFY COLUMN id INT AUTO_INCREMENT;

-- Verificar estructura de users
ALTER TABLE users MODIFY COLUMN id INT AUTO_INCREMENT;

-- PASO 2: Crear tabla de tipos de reacciones
CREATE TABLE IF NOT EXISTS forum_reaction_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emoji VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- PASO 3: Crear tabla de reacciones (sin claves foráneas primero)
CREATE TABLE IF NOT EXISTS forum_post_reactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    reaction_type_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_post_reaction (user_id, post_id, reaction_type_id),
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id),
    INDEX idx_reaction_type_id (reaction_type_id)
) ENGINE=InnoDB;

-- PASO 4: Insertar reacciones por defecto
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

-- PASO 5: Agregar columna de contador (si no existe)
SET @sql = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE forum_posts ADD COLUMN reactions_count INT DEFAULT 0',
        'SELECT "Column reactions_count already exists" as message'
    )
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'forum_posts' 
    AND COLUMN_NAME = 'reactions_count'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- PASO 6: Agregar claves foráneas de forma segura
-- Solo si las tablas referenciadas existen y tienen los tipos correctos

-- Verificar y agregar clave foránea para post_id
SET @sql = (
    SELECT IF(
        (SELECT COUNT(*) FROM information_schema.TABLES 
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'forum_posts') > 0,
        'ALTER TABLE forum_post_reactions ADD CONSTRAINT fk_reaction_post_id FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE',
        'SELECT "Table forum_posts not found, skipping foreign key" as message'
    )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Verificar y agregar clave foránea para user_id
SET @sql = (
    SELECT IF(
        (SELECT COUNT(*) FROM information_schema.TABLES 
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users') > 0,
        'ALTER TABLE forum_post_reactions ADD CONSTRAINT fk_reaction_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE',
        'SELECT "Table users not found, skipping foreign key" as message'
    )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Agregar clave foránea para reaction_type_id
ALTER TABLE forum_post_reactions 
ADD CONSTRAINT fk_reaction_type_id 
FOREIGN KEY (reaction_type_id) REFERENCES forum_reaction_types(id) ON DELETE CASCADE;

-- PASO 7: Crear vista para resumen de reacciones
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

-- PASO 8: Actualizar contador existente (si hay datos)
UPDATE forum_posts 
SET reactions_count = (
    SELECT COUNT(*) 
    FROM forum_post_reactions 
    WHERE forum_post_reactions.post_id = forum_posts.id
)
WHERE id IN (
    SELECT DISTINCT post_id 
    FROM forum_post_reactions
);

COMMIT;

-- Mensaje de confirmación
SELECT 
    'Sistema de reacciones instalado correctamente' as mensaje,
    (SELECT COUNT(*) FROM forum_reaction_types) as emojis_disponibles,
    (SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'forum_post_reactions') as tabla_reacciones_creada;