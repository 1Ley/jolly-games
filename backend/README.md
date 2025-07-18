# 🎮 JollyGames Backend

## 🚀 Configuración Automática de Base de Datos

### ✨ Nueva Funcionalidad: Migración Automática

Ahora puedes crear automáticamente la base de datos y todas las tablas desde el código, sin necesidad de ejecutar scripts SQL manualmente en phpMyAdmin.

### 📋 Requisitos Previos

1. **XAMPP instalado y ejecutándose**
   - MySQL debe estar iniciado
   - Puerto 3306 disponible

2. **Dependencias instaladas**
   ```bash
   npm install
   ```

3. **Archivo de configuración**
   ```bash
   # Copia el archivo de ejemplo
   cp .env.example .env
   
   # Edita las variables si es necesario
   # Por defecto funciona con XAMPP estándar
   ```

### 🛠️ Comandos Disponibles

#### Configuración Completa (Recomendado)
```bash
npm run setup-db
```
Este comando:
- ✅ Crea la base de datos `jolly_games_auth`
- ✅ Crea todas las tablas necesarias
- ✅ Inserta datos iniciales (categorías del foro, usuario admin)
- ✅ Verifica la conexión
- ✅ Proporciona confirmación del estado

#### Solo Migración
```bash
npm run migrate
# o
npm run db:migrate
```
Ejecuta únicamente la migración de base de datos.

#### Crear Base de Datos
```bash
npm run db:create
```
Alias para `setup-db`.

### 📊 Estructura de la Base de Datos

La migración automática crea las siguientes tablas:

- **`users`** - Usuarios del sistema
- **`forum_categories`** - Categorías del foro
- **`forum_topics`** - Temas del foro
- **`forum_posts`** - Posts del foro
- **`forum_post_reactions`** - Reacciones a posts
- **`forum_topic_tags`** - Etiquetas de temas
- **`auth_logs`** - Logs de autenticación
- **`user_sessions`** - Sesiones de usuario

### 🎯 Datos Iniciales

Se insertan automáticamente:

**Categorías del Foro:**
- General
- Anuncios
- Ayuda y Soporte
- Sugerencias
- Construcciones
- Eventos

**Usuario Administrador:**
- Email: `admin@jollygames.com`
- Username: `admin`
- Password: `password` (¡Cámbiala después!)

### 🚀 Iniciar el Servidor

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

### 🔧 Solución de Problemas

#### Error: "Cannot connect to MySQL"
1. Verifica que XAMPP esté ejecutándose
2. Asegúrate de que MySQL esté iniciado en XAMPP
3. Comprueba que el puerto 3306 esté disponible

#### Error: "Access denied for user 'root'"
1. Verifica las credenciales en el archivo `.env`
2. Asegúrate de que el usuario `root` tenga permisos

#### Error: "Database already exists"
Esto es normal. El script detecta si la base de datos ya existe y no la sobrescribe.

### 📝 Variables de Entorno

```env
# Base de datos
DB_HOST=localhost          # Host de MySQL
DB_PORT=3306              # Puerto de MySQL
DB_USER=root              # Usuario de MySQL
DB_PASSWORD=              # Contraseña (vacía por defecto en XAMPP)
DB_NAME=jolly_games_auth  # Nombre de la base de datos

# JWT
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=7d

# Servidor
PORT=5000
NODE_ENV=development
```

### 🎉 ¡Listo!

Una vez ejecutado `npm run setup-db` exitosamente, tu backend estará completamente configurado y listo para usar. No necesitas tocar phpMyAdmin para nada.

---

## 📚 Documentación Adicional

Para más información sobre la configuración manual o troubleshooting avanzado, consulta el archivo `backend-setup-guide.md` en la raíz del proyecto.