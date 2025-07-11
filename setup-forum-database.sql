-- Crear tablas para el sistema de foros
-- Ejecutar después de setup-database.sql

-- Tabla de categorías del foro
CREATE TABLE IF NOT EXISTS forum_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(20) DEFAULT 'blue',
    icon VARCHAR(10) DEFAULT '💬',
    topics_count INT DEFAULT 0,
    posts_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de temas del foro
CREATE TABLE IF NOT EXISTS forum_topics (
    id VARCHAR(50) PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    views INT DEFAULT 0,
    replies INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES forum_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_category_id (category_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_is_pinned (is_pinned)
);

-- Tabla de posts/respuestas del foro
CREATE TABLE IF NOT EXISTS forum_posts (
    id VARCHAR(50) PRIMARY KEY,
    topic_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    edited_at TIMESTAMP NULL,
    likes INT DEFAULT 0,
    reports INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_topic_id (topic_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- Tabla de tags para los temas
CREATE TABLE IF NOT EXISTS forum_topic_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic_id VARCHAR(50) NOT NULL,
    tag VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    UNIQUE KEY unique_topic_tag (topic_id, tag),
    INDEX idx_tag (tag)
);

-- Tabla de likes en posts
CREATE TABLE IF NOT EXISTS forum_post_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_post_like (post_id, user_id)
);

-- Insertar categorías por defecto
INSERT INTO forum_categories (id, name, description, color, icon, topics_count, posts_count) VALUES
('announcements', 'Anuncios', 'Noticias y anuncios importantes del servidor', 'blue', '📢', 0, 0),
('general', 'Discusión General', 'Habla de lo que quieras con la comunidad', 'green', '💬', 0, 0),
('support', 'Soporte', '¿Necesitas ayuda? Este es tu lugar', 'yellow', '❓', 0, 0),
('suggestions', 'Sugerencias', 'Aporta tus ideas para mejorar el servidor', 'purple', '💡', 0, 0),
('community', 'Comunidad', 'Eventos, concursos y actividades de la comunidad', 'pink', '🎉', 0, 0);

-- Triggers para actualizar contadores automáticamente
DELIMITER //

-- Trigger para incrementar replies cuando se crea un post
CREATE TRIGGER increment_topic_replies
AFTER INSERT ON forum_posts
FOR EACH ROW
BEGIN
    UPDATE forum_topics 
    SET replies = replies + 1, updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.topic_id;
    
    UPDATE forum_categories 
    SET posts_count = posts_count + 1, updated_at = CURRENT_TIMESTAMP 
    WHERE id = (SELECT category_id FROM forum_topics WHERE id = NEW.topic_id);
END//

-- Trigger para decrementar replies cuando se elimina un post
CREATE TRIGGER decrement_topic_replies
AFTER DELETE ON forum_posts
FOR EACH ROW
BEGIN
    UPDATE forum_topics 
    SET replies = GREATEST(replies - 1, 0), updated_at = CURRENT_TIMESTAMP 
    WHERE id = OLD.topic_id;
    
    UPDATE forum_categories 
    SET posts_count = GREATEST(posts_count - 1, 0), updated_at = CURRENT_TIMESTAMP 
    WHERE id = (SELECT category_id FROM forum_topics WHERE id = OLD.topic_id);
END//

-- Trigger para incrementar topics_count cuando se crea un tema
CREATE TRIGGER increment_category_topics
AFTER INSERT ON forum_topics
FOR EACH ROW
BEGIN
    UPDATE forum_categories 
    SET topics_count = topics_count + 1, updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.category_id;
END//

-- Trigger para decrementar topics_count cuando se elimina un tema
CREATE TRIGGER decrement_category_topics
AFTER DELETE ON forum_topics
FOR EACH ROW
BEGIN
    UPDATE forum_categories 
    SET topics_count = GREATEST(topics_count - 1, 0), updated_at = CURRENT_TIMESTAMP 
    WHERE id = OLD.category_id;
END//

-- Trigger para actualizar likes count
CREATE TRIGGER update_post_likes_count
AFTER INSERT ON forum_post_likes
FOR EACH ROW
BEGIN
    UPDATE forum_posts 
    SET likes = (SELECT COUNT(*) FROM forum_post_likes WHERE post_id = NEW.post_id)
    WHERE id = NEW.post_id;
END//

CREATE TRIGGER update_post_likes_count_delete
AFTER DELETE ON forum_post_likes
FOR EACH ROW
BEGIN
    UPDATE forum_posts 
    SET likes = (SELECT COUNT(*) FROM forum_post_likes WHERE post_id = OLD.post_id)
    WHERE id = OLD.post_id;
END//

DELIMITER ;

-- Crear índices adicionales para optimizar consultas
CREATE INDEX idx_forum_topics_category_created ON forum_topics(category_id, created_at DESC);
CREATE INDEX idx_forum_posts_topic_created ON forum_posts(topic_id, created_at ASC);
CREATE INDEX idx_forum_topics_pinned_created ON forum_topics(is_pinned DESC, created_at DESC);

SELECT 'Tablas del foro creadas exitosamente' as status;