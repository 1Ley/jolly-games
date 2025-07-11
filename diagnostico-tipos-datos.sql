-- Script de diagnóstico para identificar problemas de tipos de datos
-- Ejecutar ANTES del setup principal para verificar compatibilidad

-- 1. Verificar estructura de la tabla forum_posts
SELECT 
    'ESTRUCTURA DE forum_posts' as seccion,
    COLUMN_NAME as columna,
    DATA_TYPE as tipo_dato,
    IS_NULLABLE as permite_null,
    COLUMN_DEFAULT as valor_por_defecto,
    EXTRA as extra
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'forum_posts'
ORDER BY ORDINAL_POSITION;

-- 2. Verificar estructura de la tabla users
SELECT 
    'ESTRUCTURA DE users' as seccion,
    COLUMN_NAME as columna,
    DATA_TYPE as tipo_dato,
    IS_NULLABLE as permite_null,
    COLUMN_DEFAULT as valor_por_defecto,
    EXTRA as extra
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'users'
ORDER BY ORDINAL_POSITION;

-- 3. Verificar índices existentes en forum_posts
SELECT 
    'INDICES DE forum_posts' as seccion,
    INDEX_NAME as nombre_indice,
    COLUMN_NAME as columna,
    NON_UNIQUE as no_unico
FROM information_schema.STATISTICS 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'forum_posts'
ORDER BY INDEX_NAME, SEQ_IN_INDEX;

-- 4. Verificar índices existentes en users
SELECT 
    'INDICES DE users' as seccion,
    INDEX_NAME as nombre_indice,
    COLUMN_NAME as columna,
    NON_UNIQUE as no_unico
FROM information_schema.STATISTICS 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'users'
ORDER BY INDEX_NAME, SEQ_IN_INDEX;

-- 5. Verificar si ya existen las tablas de reacciones
SELECT 
    'TABLAS EXISTENTES' as seccion,
    TABLE_NAME as tabla,
    ENGINE as motor,
    TABLE_COLLATION as collation
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME IN ('forum_reaction_types', 'forum_post_reactions')
ORDER BY TABLE_NAME;

-- 6. Verificar claves foráneas existentes
SELECT 
    'CLAVES FORANEAS EXISTENTES' as seccion,
    CONSTRAINT_NAME as nombre_restriccion,
    TABLE_NAME as tabla,
    COLUMN_NAME as columna,
    REFERENCED_TABLE_NAME as tabla_referenciada,
    REFERENCED_COLUMN_NAME as columna_referenciada
FROM information_schema.KEY_COLUMN_USAGE 
WHERE TABLE_SCHEMA = DATABASE() 
AND REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY TABLE_NAME, CONSTRAINT_NAME;

-- 7. Verificar charset y collation de las tablas principales
SELECT 
    'CHARSET Y COLLATION' as seccion,
    TABLE_NAME as tabla,
    TABLE_COLLATION as collation,
    ENGINE as motor
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME IN ('forum_posts', 'users', 'forum_reaction_types', 'forum_post_reactions')
ORDER BY TABLE_NAME;

-- 8. Mostrar información específica de las columnas ID
SELECT 
    'COLUMNAS ID ESPECIFICAS' as seccion,
    CONCAT(TABLE_NAME, '.', COLUMN_NAME) as columna_completa,
    DATA_TYPE as tipo,
    NUMERIC_PRECISION as precision_numerica,
    IS_NULLABLE as permite_null,
    EXTRA as extra
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME IN ('forum_posts', 'users')
AND COLUMN_NAME = 'id'
ORDER BY TABLE_NAME;