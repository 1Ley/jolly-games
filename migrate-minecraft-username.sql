-- =====================================================
-- MIGRACIÓN: Cambiar full_name por minecraft_username
-- Sistema de Autenticación para JollyGames
-- =====================================================

-- Usar la base de datos
USE jolly_games_auth;

-- 1. AGREGAR NUEVA COLUMNA minecraft_username
ALTER TABLE users 
ADD COLUMN minecraft_username VARCHAR(16) DEFAULT NULL 
AFTER password;

-- 2. MIGRAR DATOS EXISTENTES (opcional - solo si hay datos que migrar)
-- Si tienes usuarios existentes y quieres mantener algún dato, puedes hacer:
-- UPDATE users SET minecraft_username = 'Steve' WHERE full_name IS NOT NULL;

-- 3. ELIMINAR COLUMNA ANTIGUA full_name
ALTER TABLE users 
DROP COLUMN full_name;

-- 4. VERIFICAR ESTRUCTURA DE LA TABLA
DESCRIBE users;

-- 5. VERIFICAR DATOS
SELECT id, username, email, minecraft_username, role, status, created_at FROM users;

-- =====================================================
-- NOTA: Este script migra la base de datos existente
-- Si prefieres recrear la base de datos desde cero,
-- usa el archivo setup-database.sql actualizado
-- =====================================================