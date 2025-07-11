-- Script de Verificación del Sistema de Reacciones
-- Ejecutar en phpMyAdmin para confirmar que todo funciona correctamente

-- ========================================
-- VERIFICACIÓN 1: Tablas Existentes
-- ========================================
SELECT 'VERIFICANDO TABLAS...' as status;

SELECT 
    TABLE_NAME as tabla,
    CASE 
        WHEN TABLE_NAME IN ('users', 'forum_posts', 'forum_categories', 'forum_topics') THEN '✅ REQUERIDA'
        WHEN TABLE_NAME IN ('forum_reaction_types', 'forum_post_reactions') THEN '✅ NUEVA'
        ELSE '📋 EXISTENTE'
    END as estado
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = DATABASE() 
AND (TABLE_NAME LIKE 'forum_%' OR TABLE_NAME = 'users')
ORDER BY TABLE_NAME;

-- ========================================
-- VERIFICACIÓN 2: Estructura de Tablas
-- ========================================
SELECT 'VERIFICANDO ESTRUCTURA...' as status;

-- Verificar columnas de forum_reaction_types
SELECT 
    'forum_reaction_types' as tabla,
    COLUMN_NAME as columna,
    DATA_TYPE as tipo,
    IS_NULLABLE as nulo
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'forum_reaction_types'
ORDER BY ORDINAL_POSITION;

-- Verificar columnas de forum_post_reactions
SELECT 
    'forum_post_reactions' as tabla,
    COLUMN_NAME as columna,
    DATA_TYPE as tipo,
    IS_NULLABLE as nulo
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'forum_post_reactions'
ORDER BY ORDINAL_POSITION;

-- Verificar que se agregó reactions_count a forum_posts
SELECT 
    'forum_posts' as tabla,
    COLUMN_NAME as columna,
    DATA_TYPE as tipo,
    COLUMN_DEFAULT as valor_defecto
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'forum_posts'
AND COLUMN_NAME = 'reactions_count';

-- ========================================
-- VERIFICACIÓN 3: Datos Insertados
-- ========================================
SELECT 'VERIFICANDO DATOS...' as status;

-- Contar emojis insertados
SELECT 
    COUNT(*) as total_emojis,
    CASE 
        WHEN COUNT(*) = 10 THEN '✅ CORRECTO (10 emojis)'
        WHEN COUNT(*) > 0 THEN '⚠️ PARCIAL'
        ELSE '❌ FALTA INSERTAR'
    END as estado
FROM forum_reaction_types;

-- Mostrar emojis disponibles
SELECT 
    id,
    emoji,
    name,
    description,
    is_active
FROM forum_reaction_types 
ORDER BY id;

-- ========================================
-- VERIFICACIÓN 4: Claves Foráneas
-- ========================================
SELECT 'VERIFICANDO CLAVES FORÁNEAS...' as status;

SELECT 
    CONSTRAINT_NAME as nombre_restriccion,
    COLUMN_NAME as columna,
    REFERENCED_TABLE_NAME as tabla_referenciada,
    REFERENCED_COLUMN_NAME as columna_referenciada
FROM information_schema.KEY_COLUMN_USAGE 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'forum_post_reactions'
AND REFERENCED_TABLE_NAME IS NOT NULL;

-- ========================================
-- VERIFICACIÓN 5: Vista Creada
-- ========================================
SELECT 'VERIFICANDO VISTA...' as status;

SELECT 
    TABLE_NAME as vista,
    TABLE_TYPE as tipo
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'forum_post_reactions_summary';

-- ========================================
-- VERIFICACIÓN 6: Triggers (Opcional)
-- ========================================
SELECT 'VERIFICANDO TRIGGERS...' as status;

SELECT 
    TRIGGER_NAME as trigger_nombre,
    EVENT_MANIPULATION as evento,
    ACTION_TIMING as momento
FROM information_schema.TRIGGERS 
WHERE TRIGGER_SCHEMA = DATABASE() 
AND TRIGGER_NAME LIKE '%reactions_count%';

-- ========================================
-- VERIFICACIÓN 7: Charset UTF8MB4
-- ========================================
SELECT 'VERIFICANDO CHARSET...' as status;

SELECT 
    TABLE_NAME as tabla,
    TABLE_COLLATION as collation,
    CASE 
        WHEN TABLE_COLLATION LIKE 'utf8mb4%' THEN '✅ UTF8MB4'
        WHEN TABLE_COLLATION LIKE 'utf8%' THEN '⚠️ UTF8 (puede funcionar)'
        ELSE '❌ CHARSET INCORRECTO'
    END as estado
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME IN ('forum_reaction_types', 'forum_post_reactions');

-- ========================================
-- RESUMEN FINAL
-- ========================================
SELECT 'RESUMEN FINAL' as status;

SELECT 
    'Sistema de Reacciones' as componente,
    CASE 
        WHEN (
            SELECT COUNT(*) FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME IN ('forum_reaction_types', 'forum_post_reactions')
        ) = 2 
        AND (
            SELECT COUNT(*) FROM forum_reaction_types
        ) >= 10
        AND (
            SELECT COUNT(*) FROM information_schema.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'forum_posts'
            AND COLUMN_NAME = 'reactions_count'
        ) = 1
        THEN '✅ INSTALADO CORRECTAMENTE'
        ELSE '❌ INSTALACIÓN INCOMPLETA'
    END as estado;

-- Instrucciones finales
SELECT 
    'SIGUIENTE PASO' as accion,
    CASE 
        WHEN (
            SELECT COUNT(*) FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME IN ('forum_reaction_types', 'forum_post_reactions')
        ) = 2 
        THEN 'Ir a http://localhost:3000/forum y probar las reacciones'
        ELSE 'Ejecutar setup-forum-reactions-phpmyadmin.sql primero'
    END as instruccion;

-- ========================================
-- CONSULTA DE PRUEBA (Solo si hay datos)
-- ========================================
SELECT 'PRUEBA DE FUNCIONAMIENTO' as status;

-- Esta consulta solo funcionará si tienes posts en el foro
SELECT 
    fp.id as post_id,
    fp.title as titulo_post,
    fp.reactions_count as contador_reacciones,
    COUNT(fpr.id) as reacciones_reales
FROM forum_posts fp
LEFT JOIN forum_post_reactions fpr ON fp.id = fpr.post_id
GROUP BY fp.id, fp.title, fp.reactions_count
LIMIT 5;