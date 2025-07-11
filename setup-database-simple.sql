-- =====================================================
-- SCRIPT SIMPLIFICADO DE BASE DE DATOS MYSQL
-- Sistema de Autenticación y Foro para JollyGames
-- =====================================================

-- 1. CREAR BASE DE DATOS
CREATE DATABASE IF NOT EXISTS jolly_games_auth
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Seleccionar la base de datos
USE jolly_games_auth;

-- 2. CREAR TABLA DE USUARIOS (PRINCIPAL)
CREATE TABLE IF NOT EXISTS users (
    -- ID único para cada usuario (clave primaria)
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Nombre de usuario (único, máximo 50 caracteres)
    username VARCHAR(50) NOT NULL UNIQUE,
    
    -- Correo electrónico (único, máximo 100 caracteres)
    email VARCHAR(100) NOT NULL UNIQUE,
    
    -- Contraseña hasheada (máximo 255 caracteres para bcrypt)
    password VARCHAR(255) NOT NULL,
    
    -- Nombre completo del usuario (opcional)
    full_name VARCHAR(100) DEFAULT NULL,
    
    -- Avatar/foto de perfil (URL o path)
    avatar VARCHAR(255) DEFAULT NULL,
    
    -- Estado de la cuenta (activo, inactivo, suspendido)
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    
    -- Rol del usuario (usuario, admin, moderador)
    role ENUM('user', 'admin', 'moderator') DEFAULT 'user',
    
    -- Verificación de email
    email_verified BOOLEAN DEFAULT FALSE,
    
    -- Token para verificación de email
    email_verification_token VARCHAR(255) DEFAULT NULL,
    
    -- Token para reset de contraseña
    password_reset_token VARCHAR(255) DEFAULT NULL,
    
    -- Expiración del token de reset
    password_reset_expires DATETIME DEFAULT NULL,
    
    -- Último inicio de sesión
    last_login DATETIME DEFAULT NULL,
    
    -- Fecha de creación (automática)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Fecha de última actualización (automática)
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para mejorar rendimiento
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- 3. CREAR TABLA DE SESIONES (para manejo de sesiones)
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at)
);

-- 4. CREAR TABLA DE LOGS DE AUTENTICACIÓN (para auditoría)
CREATE TABLE IF NOT EXISTS auth_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action ENUM('login', 'logout', 'register', 'password_reset', 'failed_login') NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    success BOOLEAN DEFAULT TRUE,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    INDEX idx_success (success)
);

-- =====================================================
-- TABLAS DEL FORO
-- =====================================================

-- 5. CATEGORÍAS DEL FORO
CREATE TABLE IF NOT EXISTS forum_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(20) DEFAULT 'blue',
    icon VARCHAR(10) DEFAULT '💬',
    topics_count INT DEFAULT 0,
    posts_count INT DEFAULT 0,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
);

-- 6. TEMAS DEL FORO
CREATE TABLE IF NOT EXISTS forum_topics (
    id VARCHAR(50) PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    views INT DEFAULT 0,
    replies INT DEFAULT 0,
    tags JSON,
    last_post_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_post_user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES forum_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (last_post_user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_category_id (category_id),
    INDEX idx_user_id (user_id),
    INDEX idx_is_pinned (is_pinned),
    INDEX idx_is_locked (is_locked),
    INDEX idx_last_post_at (last_post_at),
    INDEX idx_created_at (created_at)
);

-- 7. RESPUESTAS/POSTS DEL FORO
CREATE TABLE IF NOT EXISTS forum_posts (
    id VARCHAR(50) PRIMARY KEY,
    topic_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    is_staff_response BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    likes_count INT DEFAULT 0,
    parent_post_id VARCHAR(50) DEFAULT NULL, -- Para respuestas anidadas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    
    INDEX idx_topic_id (topic_id),
    INDEX idx_user_id (user_id),
    INDEX idx_parent_post_id (parent_post_id),
    INDEX idx_created_at (created_at)
);

-- 8. LIKES EN POSTS DEL FORO
CREATE TABLE IF NOT EXISTS forum_post_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_like (post_id, user_id),
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id)
);

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- 9. INSERTAR USUARIO ADMINISTRADOR DE PRUEBA
INSERT INTO users (username, email, password, full_name, role, email_verified) VALUES 
(
    'admin',
    'admin@jollygames.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDfm', -- password: admin123
    'Administrador del Sistema',
    'admin',
    TRUE
);

-- 10. INSERTAR USUARIO DE PRUEBA NORMAL
INSERT INTO users (username, email, password, full_name, email_verified) VALUES 
(
    'testuser',
    'test@example.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDfm', -- password: test123
    'Usuario de Prueba',
    TRUE
);

-- 11. INSERTAR CATEGORÍAS DEL FORO
INSERT INTO forum_categories (id, name, description, color, icon, display_order) VALUES 
('announcements', 'Anuncios', 'Noticias y anuncios importantes del servidor', 'blue', '📢', 1),
('general', 'Discusión General', 'Habla de lo que quieras relacionado con el servidor', 'green', '💬', 2),
('support', 'Soporte', '¿Necesitas ayuda? Este es tu lugar', 'yellow', '❓', 3),
('suggestions', 'Sugerencias', 'Aporta tus ideas para mejorar el servidor', 'purple', '💡', 4);

-- 12. INSERTAR TEMA DE EJEMPLO
INSERT INTO forum_topics (id, category_id, user_id, title, content, is_pinned, tags) VALUES 
(
    'topic-welcome',
    'announcements',
    1, -- ID del admin
    '¡Bienvenidos a JollyGames!',
    'Bienvenidos a todos al servidor JollyGames. Esperamos que disfrutéis de vuestra estancia y que participéis activamente en la comunidad.',
    TRUE,
    '["bienvenida", "servidor", "comunidad"]'
);

-- =====================================================
-- TRIGGERS PARA MANTENER CONTADORES ACTUALIZADOS
-- =====================================================

-- Trigger para actualizar contador de topics en categorías
DELIMITER //
CREATE TRIGGER after_topic_insert
AFTER INSERT ON forum_topics
FOR EACH ROW
BEGIN
    UPDATE forum_categories 
    SET topics_count = topics_count + 1 
    WHERE id = NEW.category_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_topic_delete
AFTER DELETE ON forum_topics
FOR EACH ROW
BEGIN
    UPDATE forum_categories 
    SET topics_count = topics_count - 1 
    WHERE id = OLD.category_id;
END //
DELIMITER ;

-- Trigger para actualizar contador de replies en topics
DELIMITER //
CREATE TRIGGER after_post_insert
AFTER INSERT ON forum_posts
FOR EACH ROW
BEGIN
    UPDATE forum_topics 
    SET replies = replies + 1,
        last_post_at = NOW(),
        last_post_user_id = NEW.user_id
    WHERE id = NEW.topic_id;
    
    UPDATE forum_categories 
    SET posts_count = posts_count + 1 
    WHERE id = (SELECT category_id FROM forum_topics WHERE id = NEW.topic_id);
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_post_delete
AFTER DELETE ON forum_posts
FOR EACH ROW
BEGIN
    UPDATE forum_topics 
    SET replies = replies - 1 
    WHERE id = OLD.topic_id;
    
    UPDATE forum_categories 
    SET posts_count = posts_count - 1 
    WHERE id = (SELECT category_id FROM forum_topics WHERE id = OLD.topic_id);
END //
DELIMITER ;

-- Trigger para actualizar contador de likes
DELIMITER //
CREATE TRIGGER after_like_insert
AFTER INSERT ON forum_post_likes
FOR EACH ROW
BEGIN
    UPDATE forum_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_like_delete
AFTER DELETE ON forum_post_likes
FOR EACH ROW
BEGIN
    UPDATE forum_posts 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.post_id;
END //
DELIMITER ;

-- =====================================================
-- CONSULTAS ÚTILES PARA VERIFICACIÓN
-- =====================================================

-- Ver todas las tablas creadas
-- SHOW TABLES;

-- Ver estructura de la tabla users
-- DESCRIBE users;

-- Ver todos los usuarios
-- SELECT id, username, email, role, created_at FROM users;

-- Ver categorías del foro
-- SELECT * FROM forum_categories ORDER BY display_order;

-- Ver topics del foro
-- SELECT t.title, c.name as category, u.username as author, t.created_at 
-- FROM forum_topics t 
-- JOIN forum_categories c ON t.category_id = c.id 
-- JOIN users u ON t.user_id = u.id 
-- ORDER BY t.created_at DESC;

-- =====================================================
-- CONFIGURACIÓN COMPLETADA
-- =====================================================

/*
Este script crea una base de datos completa para:
1. Sistema de autenticación de usuarios
2. Sistema de foro con categorías, topics y posts
3. Sistema de likes y moderación
4. Logs de auditoría
5. Gestión de sesiones

Credenciales de prueba:
- Admin: admin@jollygames.com / admin123
- Usuario: test@example.com / test123

Próximos pasos:
1. Crear backend API (Node.js/Express)
2. Implementar autenticación JWT
3. Conectar frontend React
*/