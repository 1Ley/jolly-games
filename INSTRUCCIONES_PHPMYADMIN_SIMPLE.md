# 🚀 Instrucciones para phpMyAdmin - Sistema de Reacciones

## ⚠️ IMPORTANTE: Ejecutar paso a paso

Este script está diseñado para ser **100% compatible** con phpMyAdmin. Sigue estos pasos exactamente:

## 📋 Pasos de Instalación

### 1. Abrir phpMyAdmin
- Ve a tu panel de XAMPP
- Inicia Apache y MySQL
- Abre phpMyAdmin (http://localhost/phpmyadmin)
- Selecciona la base de datos `jolly_games_auth`

### 2. Ejecutar por Bloques

**BLOQUE 1: Crear tabla de tipos de reacciones**
```sql
CREATE TABLE IF NOT EXISTS forum_reaction_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emoji VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
✅ **Resultado esperado**: "1 tabla creada"

**BLOQUE 2: Insertar emojis**
```sql
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
```
✅ **Resultado esperado**: "10 filas insertadas"

**BLOQUE 3: Crear tabla de reacciones**
```sql
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
```
✅ **Resultado esperado**: "1 tabla creada"

**BLOQUE 4: Agregar columna contador**
```sql
ALTER TABLE forum_posts ADD COLUMN reactions_count INT DEFAULT 0;
```
✅ **Resultado esperado**: "1 columna agregada" 
❌ **Si da error "Duplicate column"**: ¡Perfecto! Significa que ya existe

**BLOQUE 5: Crear vista**
```sql
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
```
✅ **Resultado esperado**: "Vista creada"

### 3. Verificar Instalación

**Verificar tipos de reacciones:**
```sql
SELECT 'Instalación completada' as estado, COUNT(*) as tipos_reacciones FROM forum_reaction_types;
```
✅ **Debe mostrar**: 10 tipos de reacciones

**Verificar tabla de reacciones:**
```sql
SELECT 'Tabla creada correctamente' as estado FROM forum_post_reactions LIMIT 1;
```
✅ **Debe ejecutarse sin errores**

## 🔧 Solución de Problemas

### Error "Table doesn't exist"
- Asegúrate de estar en la base de datos correcta (`jolly_games_auth`)
- Verifica que las tablas `forum_posts` y `users` existan

### Error "Duplicate column name"
- Es normal para `reactions_count` si ya existe
- Simplemente continúa con el siguiente bloque

### Error de charset
- Asegúrate de que tu base de datos soporte utf8mb4
- En phpMyAdmin: Operaciones → Cotejamiento → utf8mb4_unicode_ci

## 🎯 Resultado Final

Después de ejecutar todos los bloques, deberías tener:
- ✅ Tabla `forum_reaction_types` con 10 emojis
- ✅ Tabla `forum_post_reactions` para almacenar reacciones
- ✅ Columna `reactions_count` en `forum_posts`
- ✅ Vista `forum_post_reactions_summary`

## 🚀 Siguiente Paso

Una vez completada la instalación, el sistema de reacciones estará listo para usar en tu aplicación web.

---

**💡 Tip**: Si algún bloque falla, puedes ejecutar los demás. El sistema está diseñado para ser tolerante a errores.