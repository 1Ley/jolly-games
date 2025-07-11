# 📋 Guía de Migración: Cambiar full_name por minecraft_username
## Usando phpMyAdmin

### 🎯 Objetivo
Cambiar el campo `full_name` por `minecraft_username` en la tabla `users` para integrar con la API de Mojang y mostrar skins de Minecraft como avatares.

---

## 📝 Pasos a seguir en phpMyAdmin

### 1. 🔐 Acceder a phpMyAdmin
- Abre tu navegador web
- Ve a `http://localhost/phpmyadmin` (o la URL de tu phpMyAdmin)
- Inicia sesión con tus credenciales de MySQL

### 2. 🎯 Seleccionar la base de datos
- En el panel izquierdo, haz clic en la base de datos `jolly_games_auth`
- Si no existe, créala primero usando el archivo `setup-database.sql`

### 3. 📊 Acceder a la tabla users
- Haz clic en la tabla `users` en el panel izquierdo
- Ve a la pestaña **"Estructura"**

### 4. ➕ Agregar nueva columna minecraft_username

**📍 UBICACIÓN EXACTA:**
- Estás en: `jolly_games_auth` → `users` → pestaña **"Estructura"**
- Busca el botón **"Agregar"** o **"Add"** en la parte superior de la tabla
- También puedes usar **"Agregar 1 columna"** al final de la lista

**⚙️ CONFIGURACIÓN DE LA COLUMNA:**
1. Haz clic en **"Agregar"** (Add)
2. En el formulario que aparece, configura:
   - **Nombre**: `minecraft_username`
   - **Tipo**: Selecciona `VARCHAR` del dropdown
   - **Longitud/Valores**: `16`
   - **Predeterminado**: Selecciona `NULL` del dropdown
   - **Nulo**: ✅ (debe estar marcado)
   - **Comentario**: `Nombre de usuario de Minecraft para mostrar skin como avatar`
3. **MUY IMPORTANTE**: En la sección **"Después de"**, selecciona `password` del dropdown
4. Haz clic en **"Guardar"** o **"Save"**

**✅ RESULTADO ESPERADO:**
La nueva columna `minecraft_username` aparecerá justo después de la columna `password` en la estructura de la tabla.

### 5. 🗑️ Eliminar columna full_name
1. En la estructura de la tabla, busca la columna `full_name`
2. Haz clic en **"Eliminar"** (Drop) en esa fila
3. Confirma la eliminación

### 6. ✅ Verificar cambios
1. Ve a la pestaña **"Estructura"** para confirmar que:
   - La columna `minecraft_username` existe
   - La columna `full_name` ya no existe
2. Ve a la pestaña **"Examinar"** para ver los datos

---

## 🔄 Migración de datos existentes (Opcional)

Si ya tienes usuarios registrados y quieres asignarles un nombre de Minecraft:

### Opción A: Asignar nombres genéricos
1. Ve a la pestaña **"SQL"**
2. Ejecuta esta consulta:
```sql
UPDATE users SET minecraft_username = 'Steve' WHERE minecraft_username IS NULL;
```

### Opción B: Asignar nombres específicos
1. Ve a la pestaña **"Examinar"**
2. Haz clic en **"Editar"** para cada usuario
3. Asigna manualmente el nombre de Minecraft deseado

---

## 🧪 Verificación final

### Ejecutar consulta de prueba
En la pestaña **"SQL"**, ejecuta:
```sql
SELECT id, username, email, minecraft_username, role, status, created_at FROM users;
```

### Resultado esperado
Deberías ver una tabla con:
- ✅ Columna `minecraft_username` presente
- ❌ Columna `full_name` ausente
- 📊 Datos de usuarios intactos

---

## ⚠️ Notas importantes

1. **Backup**: Antes de hacer cambios, exporta tu base de datos:
   - Selecciona la base de datos `jolly_games_auth`
   - Ve a **"Exportar"**
   - Descarga el archivo SQL como respaldo

2. **Nombres de Minecraft válidos**:
   - Máximo 16 caracteres
   - Solo letras, números y guiones bajos
   - No espacios ni caracteres especiales

3. **API de Mojang**:
   - URL del skin: `https://mc-heads.net/avatar/{minecraft_username}`
   - Ejemplo: `https://mc-heads.net/avatar/Notch`

---

## 🚀 Después de la migración

Una vez completada la migración en phpMyAdmin:

1. ✅ El backend ya está actualizado para usar `minecraft_username`
2. ✅ El frontend ya está actualizado para el nuevo campo
3. 🔄 Reinicia los servidores si es necesario
4. 🧪 Prueba el registro de nuevos usuarios
5. 🎨 Los avatares de Minecraft se mostrarán automáticamente

---

## 🆘 Solución de problemas

### Error: "Column doesn't exist"
- Verifica que estés en la base de datos correcta
- Asegúrate de que la tabla `users` existe

### Error: "Cannot add column"
- Verifica que no exista ya una columna con ese nombre
- Revisa los permisos de tu usuario MySQL

### Los cambios no se reflejan
- Refresca la página de phpMyAdmin
- Verifica que guardaste los cambios
- Reinicia los servidores backend y frontend

---

**¡Listo!** 🎉 Tu base de datos ahora está configurada para usar nombres de usuario de Minecraft y mostrar skins como avatares.