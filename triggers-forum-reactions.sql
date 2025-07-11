-- Triggers para automatizar el contador de reacciones
-- Ejecutar DESPUÉS de setup-forum-reactions-phpmyadmin.sql
-- IMPORTANTE: Ejecutar cada trigger por separado en phpMyAdmin

-- Trigger 1: Actualizar contador cuando se agrega una reacción
-- Copiar y ejecutar este bloque completo:
CREATE TRIGGER update_reactions_count_insert
AFTER INSERT ON forum_post_reactions
FOR EACH ROW
BEGIN
    UPDATE forum_posts 
    SET reactions_count = (
        SELECT COUNT(*) 
        FROM forum_post_reactions 
        WHERE post_id = NEW.post_id
    )
    WHERE id = NEW.post_id;
END

-- Trigger 2: Actualizar contador cuando se elimina una reacción
-- Copiar y ejecutar este bloque completo:
CREATE TRIGGER update_reactions_count_delete
AFTER DELETE ON forum_post_reactions
FOR EACH ROW
BEGIN
    UPDATE forum_posts 
    SET reactions_count = (
        SELECT COUNT(*) 
        FROM forum_post_reactions 
        WHERE post_id = OLD.post_id
    )
    WHERE id = OLD.post_id;
END

-- INSTRUCCIONES:
-- 1. Ejecutar setup-forum-reactions-phpmyadmin.sql primero
-- 2. Ir a la pestaña "SQL" en phpMyAdmin
-- 3. Copiar y ejecutar el primer trigger (desde CREATE hasta el primer END)
-- 4. Copiar y ejecutar el segundo trigger (desde CREATE hasta el segundo END)
-- 5. Si los triggers se crean correctamente, el contador se actualizará automáticamente
-- 6. Si hay errores, el sistema funcionará igual usando el contador manual en el backend