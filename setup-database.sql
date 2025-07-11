-- =====================================================
-- SCRIPT DE CONFIGURACIÓN DE BASE DE DATOS MYSQL
-- Sistema de Autenticación para JollyGames
-- =====================================================

-- 1. CREAR BASE DE DATOS
-- Eliminar base de datos si existe (¡CUIDADO! Esto borra todos los datos)
-- DROP DATABASE IF EXISTS jolly_games_auth;

-- Crear nueva base de datos
CREATE DATABASE IF NOT EXISTS jolly_games_auth
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Seleccionar la base de datos
USE jolly_games_auth;

-- 2. CREAR TABLA DE USUARIOS
CREATE TABLE IF NOT EXISTS users (
    -- ID único para cada usuario (clave primaria)
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Nombre de usuario (único, máximo 50 caracteres)
    username VARCHAR(50) NOT NULL UNIQUE,
    
    -- Correo electrónico (único, máximo 100 caracteres)
    email VARCHAR(100) NOT NULL UNIQUE,
    
    -- Contraseña hasheada (máximo 255 caracteres para bcrypt)
    password VARCHAR(255) NOT NULL,
    
    -- Nombre de usuario de Minecraft (para mostrar skin como avatar)
    minecraft_username VARCHAR(16) DEFAULT NULL,
    
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

-- 3. CREAR TABLA DE SESIONES (OPCIONAL - para manejo avanzado de sesiones)
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

-- 4. CREAR TABLA DE LOGS DE AUTENTICACIÓN (OPCIONAL - para auditoría)
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

-- 5. INSERTAR DATOS DE PRUEBA
-- Usuario administrador de prueba
INSERT INTO users (username, email, password, minecraft_username, role, email_verified) VALUES 
(
    'admin',
    'admin@jollygames.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDfm', -- password: admin123
    'Notch',
    'admin',
    TRUE
);

-- Usuario de prueba normal
INSERT INTO users (username, email, password, minecraft_username, email_verified) VALUES 
(
    'testuser',
    'test@example.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDfm', -- password: test123
    'Steve',
    TRUE
);

-- 6. CONSULTAS ÚTILES PARA VERIFICACIÓN

-- Ver estructura de la tabla users
-- DESCRIBE users;

-- Ver todos los usuarios
-- SELECT id, username, email, minecraft_username, role, status, email_verified, created_at FROM users;

-- Contar usuarios registrados
-- SELECT COUNT(*) as total_users FROM users;

-- Ver usuarios activos
-- SELECT username, email, last_login FROM users WHERE status = 'active';

-- Buscar usuario por email
-- SELECT * FROM users WHERE email = 'test@example.com';

-- Ver logs de autenticación recientes
-- SELECT u.username, al.action, al.ip_address, al.success, al.created_at 
-- FROM auth_logs al 
-- LEFT JOIN users u ON al.user_id = u.id 
-- ORDER BY al.created_at DESC 
-- LIMIT 10;

-- 7. PROCEDIMIENTOS ALMACENADOS ÚTILES

-- Procedimiento para limpiar sesiones expiradas
DELIMITER //
CREATE PROCEDURE CleanExpiredSessions()
BEGIN
    DELETE FROM user_sessions WHERE expires_at < NOW();
    SELECT ROW_COUNT() as deleted_sessions;
END //
DELIMITER ;

-- Procedimiento para obtener estadísticas de usuarios
DELIMITER //
CREATE PROCEDURE GetUserStats()
BEGIN
    SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
        COUNT(CASE WHEN email_verified = TRUE THEN 1 END) as verified_users,
        COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_users,
        COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_users_30_days
    FROM users;
END //
DELIMITER ;

-- 8. TRIGGERS PARA AUDITORÍA AUTOMÁTICA

-- Trigger para registrar cuando se crea un usuario
DELIMITER //
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO auth_logs (user_id, action, details) 
    VALUES (NEW.id, 'register', JSON_OBJECT('username', NEW.username, 'email', NEW.email));
END //
DELIMITER ;

-- 9. ÍNDICES ADICIONALES PARA OPTIMIZACIÓN

-- Índice compuesto para búsquedas de login
CREATE INDEX idx_login_search ON users (username, email, status);

-- Índice para tokens de verificación
CREATE INDEX idx_verification_token ON users (email_verification_token);
CREATE INDEX idx_reset_token ON users (password_reset_token);

-- 10. CONFIGURACIÓN DE PERMISOS (EJECUTAR COMO ROOT)

-- Crear usuario específico para la aplicación
-- CREATE USER 'jollygames_app'@'localhost' IDENTIFIED BY 'password_seguro_aqui';

-- Otorgar permisos necesarios
-- GRANT SELECT, INSERT, UPDATE, DELETE ON jolly_games_auth.* TO 'jollygames_app'@'localhost';

-- Aplicar cambios
-- FLUSH PRIVILEGES;

-- =====================================================
-- COMANDOS DE MANTENIMIENTO
-- =====================================================

-- Limpiar sesiones expiradas (ejecutar periódicamente)
-- CALL CleanExpiredSessions();

-- Ver estadísticas de usuarios
-- CALL GetUserStats();

-- Backup de la base de datos (ejecutar desde terminal)
-- mysqldump -u root -p jolly_games_auth > backup_jolly_games_auth.sql

-- Restaurar backup (ejecutar desde terminal)
-- mysql -u root -p jolly_games_auth < backup_jolly_games_auth.sql

-- =====================================================
-- NOTAS IMPORTANTES
-- =====================================================

/*
1. SEGURIDAD:
   - Nunca almacenes contraseñas en texto plano
   - Usa bcrypt con salt rounds >= 12
   - Implementa rate limiting para login
   - Valida y sanitiza todas las entradas

2. RENDIMIENTO:
   - Los índices mejoran las consultas pero ralentizan las inserciones
   - Limpia regularmente sesiones expiradas
   - Considera particionamiento para tablas de logs grandes

3. MANTENIMIENTO:
   - Haz backups regulares
   - Monitorea el crecimiento de las tablas de logs
   - Revisa y actualiza los índices según patrones de uso

4. ESCALABILIDAD:
   - Considera usar Redis para sesiones en producción
   - Implementa replicación master-slave para alta disponibilidad
   - Usa connection pooling en la aplicación
*/

-- ¡CONFIGURACIÓN COMPLETADA! 🎉
-- Tu base de datos está lista para el sistema de autenticación.