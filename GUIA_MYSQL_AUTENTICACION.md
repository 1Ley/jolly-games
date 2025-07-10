# Guía Completa: Base de Datos MySQL para Sistema de Autenticación

## 📋 Introducción

Esta guía te ayudará a crear una base de datos MySQL sencilla para implementar un sistema de registro e inicio de sesión en tu aplicación React. No necesitas conocimientos previos de bases de datos.

## 🛠️ Paso 1: Instalación de la Extensión MySQL en VS Code

### ¿Por qué necesitamos esta extensión?
La extensión MySQL nos permite conectarnos y administrar bases de datos MySQL directamente desde VS Code, sin necesidad de programas adicionales.

### Instalación:
1. Abre VS Code
2. Ve a la pestaña de **Extensiones** (icono de cuadrados en la barra lateral izquierda)
3. Busca "MySQL" en la barra de búsqueda
4. Instala la extensión oficial **"MySQL"** de Jun Han
5. Reinicia VS Code si es necesario

## 🔌 Paso 2: Conexión a MySQL

### Requisitos previos:
- Tener MySQL Server instalado en tu computadora
- Conocer tu usuario y contraseña de MySQL (por defecto suele ser `root`)

### Conectar desde VS Code:
1. Presiona `Ctrl+Shift+P` (Windows) o `Cmd+Shift+P` (Mac)
2. Escribe "MySQL: Connect" y selecciona la opción
3. Completa los datos de conexión:
   - **Host**: `localhost` (si MySQL está en tu computadora)
   - **Puerto**: `3306` (puerto por defecto de MySQL)
   - **Usuario**: `root` (o tu usuario de MySQL)
   - **Contraseña**: Tu contraseña de MySQL

### ✅ Verificar conexión:
Si la conexión es exitosa, verás el servidor MySQL en la barra lateral izquierda bajo "MySQL".

## 🗄️ Paso 3: Crear la Base de Datos

### ¿Qué es una base de datos?
Una base de datos es como un archivero digital donde organizamos información relacionada. Para nuestro sistema de autenticación, necesitamos un lugar donde guardar los datos de los usuarios.

### Crear la base de datos:
1. Haz clic derecho en tu conexión MySQL
2. Selecciona "New Query"
3. Escribe el siguiente comando SQL:

```sql
-- Crear una nueva base de datos para nuestra aplicación
CREATE DATABASE jolly_games_auth;

-- Usar la base de datos que acabamos de crear
USE jolly_games_auth;
```

4. Ejecuta el comando presionando `Ctrl+Enter` o el botón "Run"

### ✅ Verificar creación:
Deberías ver "jolly_games_auth" en la lista de bases de datos.

## 📊 Paso 4: Crear la Tabla de Usuarios

### ¿Qué es una tabla?
Una tabla es como una hoja de cálculo dentro de la base de datos. Cada fila representa un usuario y cada columna representa una característica del usuario (nombre, email, etc.).

### Estructura de nuestra tabla:
- **id**: Número único para identificar cada usuario
- **username**: Nombre de usuario (único)
- **email**: Correo electrónico (único)
- **password**: Contraseña (almacenada de forma segura)
- **created_at**: Fecha de registro
- **updated_at**: Fecha de última actualización

### Crear la tabla:
```sql
-- Crear tabla de usuarios con campos necesarios para autenticación
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 📝 Explicación de cada campo:

- **`id INT AUTO_INCREMENT PRIMARY KEY`**:
  - `INT`: Número entero
  - `AUTO_INCREMENT`: Se incrementa automáticamente (1, 2, 3...)
  - `PRIMARY KEY`: Clave principal, identifica únicamente cada registro

- **`username VARCHAR(50) NOT NULL UNIQUE`**:
  - `VARCHAR(50)`: Texto de máximo 50 caracteres
  - `NOT NULL`: Campo obligatorio
  - `UNIQUE`: No puede repetirse

- **`email VARCHAR(100) NOT NULL UNIQUE`**:
  - Similar al username pero con 100 caracteres máximo
  - También único para evitar cuentas duplicadas

- **`password VARCHAR(255) NOT NULL`**:
  - 255 caracteres para almacenar contraseñas hasheadas
  - Las contraseñas NUNCA se guardan en texto plano

- **`created_at` y `updated_at`**:
  - Timestamps automáticos para auditoría
  - Útiles para saber cuándo se registró el usuario

## 🔒 Paso 5: Buenas Prácticas de Seguridad

### ⚠️ IMPORTANTE: Seguridad de Contraseñas

**NUNCA guardes contraseñas en texto plano**. Siempre usa hashing:

```javascript
// Ejemplo en React/Node.js usando bcrypt
const bcrypt = require('bcrypt');

// Al registrar un usuario:
const hashedPassword = await bcrypt.hash(password, 10);

// Al verificar login:
const isValid = await bcrypt.compare(password, hashedPassword);
```

### 🛡️ Otras buenas prácticas:

1. **Validación de email**: Asegúrate de que el formato sea correcto
2. **Contraseñas fuertes**: Mínimo 8 caracteres, mayúsculas, minúsculas, números
3. **Sanitización**: Limpia los datos antes de guardarlos
4. **Conexiones seguras**: Usa HTTPS en producción

## 🧪 Paso 6: Probar la Tabla

### Insertar un usuario de prueba:
```sql
-- Insertar un usuario de ejemplo (con contraseña hasheada)
INSERT INTO users (username, email, password) 
VALUES ('usuario_prueba', 'test@example.com', '$2b$10$ejemplo_hash_aqui');
```

### Consultar usuarios:
```sql
-- Ver todos los usuarios
SELECT id, username, email, created_at FROM users;

-- Buscar un usuario específico
SELECT * FROM users WHERE username = 'usuario_prueba';
```

## 🔗 Paso 7: Conectar con React

### Estructura recomendada:
```
tu-proyecto/
├── frontend/ (React)
├── backend/ (Node.js/Express)
└── database/ (MySQL)
```

### Ejemplo de conexión desde Node.js:
```javascript
// Instalar: npm install mysql2
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tu_password',
  database: 'jolly_games_auth'
});
```

## 📚 Comandos SQL Útiles

### Consultas básicas:
```sql
-- Ver estructura de la tabla
DESCRIBE users;

-- Contar usuarios registrados
SELECT COUNT(*) as total_usuarios FROM users;

-- Buscar por email
SELECT * FROM users WHERE email = 'ejemplo@email.com';

-- Actualizar información de usuario
UPDATE users SET email = 'nuevo@email.com' WHERE id = 1;

-- Eliminar usuario (¡cuidado!)
DELETE FROM users WHERE id = 1;
```

## 🚨 Solución de Problemas Comunes

### Error: "Access denied"
- Verifica usuario y contraseña
- Asegúrate de que MySQL esté ejecutándose

### Error: "Database doesn't exist"
- Ejecuta primero `CREATE DATABASE jolly_games_auth;`

### Error: "Table already exists"
- La tabla ya fue creada, puedes usar `DROP TABLE users;` para eliminarla y recrearla

### Error: "Duplicate entry"
- Estás intentando insertar un username o email que ya existe

## ✅ Checklist Final

- [ ] Extensión MySQL instalada en VS Code
- [ ] Conexión exitosa a MySQL
- [ ] Base de datos `jolly_games_auth` creada
- [ ] Tabla `users` creada con todos los campos
- [ ] Usuario de prueba insertado
- [ ] Consultas básicas funcionando

## 🎯 Próximos Pasos

1. **Backend**: Crear API REST con Node.js/Express
2. **Autenticación**: Implementar JWT tokens
3. **Frontend**: Crear formularios de registro/login en React
4. **Validación**: Añadir validaciones del lado cliente y servidor
5. **Seguridad**: Implementar rate limiting y otras medidas

---

**¡Felicidades!** 🎉 Has creado exitosamente tu primera base de datos MySQL para autenticación. Esta base sólida te permitirá construir un sistema de login seguro y escalable.

**Recuerda**: La seguridad es fundamental. Nunca comprometas la información de tus usuarios y siempre sigue las mejores prácticas de desarrollo.