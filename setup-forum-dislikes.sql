-- Agregar tabla para dislikes en posts del foro
-- Ejecutar después de setup-forum-database.sql

-- Tabla de dislikes en posts
CREATE TABLE IF NOT EXISTS forum_post_dislikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_post_dislike (post_id, user_id)
);

-- Agregar columna de dislikes a la tabla de posts
ALTER TABLE forum_posts ADD COLUMN IF NOT EXISTS dislikes INT DEFAULT 0;

-- Triggers para actualizar contadores de dislikes
DELIMITER //

-- Trigger para actualizar dislike count al insertar
CREATE TRIGGER update_post_dislikes_count
AFTER INSERT ON forum_post_dislikes
FOR EACH ROW
BEGIN
    UPDATE forum_posts 
    SET dislikes = (SELECT COUNT(*) FROM forum_post_dislikes WHERE post_id = NEW.post_id)
    WHERE id = NEW.post_id;
END//

-- Trigger para actualizar dislike count al eliminar
CREATE TRIGGER update_post_dislikes_count_delete
AFTER DELETE ON forum_post_dislikes
FOR EACH ROW
BEGIN
    UPDATE forum_posts 
    SET dislikes = (SELECT COUNT(*) FROM forum_post_dislikes WHERE post_id = OLD.post_id)
    WHERE id = OLD.post_id;
END//

-- Trigger para evitar que un usuario tenga like y dislike al mismo tiempo
-- Eliminar like si se agrega dislike
CREATE TRIGGER prevent_like_dislike_conflict_on_dislike
BEFORE INSERT ON forum_post_dislikes
FOR EACH ROW
BEGIN
    DELETE FROM forum_post_likes 
    WHERE post_id = NEW.post_id AND user_id = NEW.user_id;
END//

-- Eliminar dislike si se agrega like
CREATE TRIGGER prevent_like_dislike_conflict_on_like
BEFORE INSERT ON forum_post_likes
FOR EACH ROW
BEGIN
    DELETE FROM forum_post_dislikes 
    WHERE post_id = NEW.post_id AND user_id = NEW.user_id;
END//

DELIMITER ;

-- Crear índices para optimizar consultas
CREATE INDEX idx_forum_post_dislikes_post_id ON forum_post_dislikes(post_id);
CREATE INDEX idx_forum_post_dislikes_user_id ON forum_post_dislikes(user_id);

SELECT 'Tabla de dislikes creada exitosamente' as status;