# 🚀 GUÍA COMPLETA: BACKEND CON XAMPP Y PHPMYADMIN

## 📋 PASO 1: CONFIGURAR LA BASE DE DATOS EN XAMPP

### 1.1 Ejecutar el Script SQL
1. Abre **phpMyAdmin** desde XAMPP (http://localhost/phpmyadmin)
2. Haz clic en **"SQL"** en la barra superior
3. Copia y pega todo el contenido del archivo `setup-database-simple.sql`
4. Haz clic en **"Continuar"** para ejecutar el script
5. Verifica que se haya creado la base de datos `jolly_games_auth` con todas las tablas

### 1.2 Verificar la Instalación
```sql
-- Ejecuta estas consultas en phpMyAdmin para verificar:
USE jolly_games_auth;
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM forum_categories;
```

## 📦 PASO 2: CREAR EL BACKEND

### 2.1 Crear Carpeta del Backend
```bash
# Desde la raíz de tu proyecto
mkdir backend
cd backend
```

### 2.2 Inicializar Proyecto Node.js
```bash
npm init -y
```

### 2.3 Instalar Dependencias
```bash
# Dependencias principales
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv helmet express-rate-limit express-validator

# Dependencias de desarrollo
npm install --save-dev nodemon
```

## ⚙️ PASO 3: CONFIGURACIÓN DEL SERVIDOR

### 3.1 Crear archivo .env
```env
# Configuración de la base de datos (XAMPP)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=jolly_games_auth

# Configuración JWT
JWT_SECRET=tu_clave_secreta_muy_segura_aqui_2024
JWT_EXPIRES_IN=7d

# Configuración del servidor
PORT=5000
NODE_ENV=development

# Configuración CORS
FRONTEND_URL=http://localhost:3000
```

### 3.2 Crear config/database.js
```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la conexión a MySQL (XAMPP)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jolly_games_auth',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para probar la conexión
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL (XAMPP) establecida correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error.message);
    return false;
  }
};

// Función para ejecutar consultas
const query = async (sql, params = []) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Error en consulta SQL:', error);
    throw error;
  }
};

module.exports = {
  pool,
  query,
  testConnection
};
```

### 3.3 Crear middleware/auth.js
```javascript
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

// Middleware para verificar token JWT
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token de acceso requerido' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar que el usuario existe y está activo
    const user = await query(
      'SELECT id, username, email, role, status FROM users WHERE id = ? AND status = "active"',
      [decoded.userId]
    );

    if (user.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario no válido o inactivo' 
      });
    }

    req.user = user[0];
    next();
  } catch (error) {
    console.error('Error en verificación de token:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Token inválido' 
    });
  }
};

// Middleware para verificar roles
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario no autenticado' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Permisos insuficientes' 
      });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  requireRole
};
```

### 3.4 Crear controllers/authController.js
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { validationResult } = require('express-validator');

// Generar token JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Registrar usuario
const register = async (req, res) => {
  try {
    // Validar errores de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { username, email, password, fullName } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await query(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El usuario o email ya existe'
      });
    }

    // Hashear contraseña
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar usuario en la base de datos
    const result = await query(
      'INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, fullName || null]
    );

    const userId = result.insertId;

    // Registrar en logs
    await query(
      'INSERT INTO auth_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [userId, 'register', req.ip, req.get('User-Agent')]
    );

    // Generar token
    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: {
          id: userId,
          username,
          email,
          fullName: fullName || null
        },
        token
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { username, password } = req.body;

    // Buscar usuario
    const users = await query(
      'SELECT id, username, email, password, full_name, role, status FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (users.length === 0) {
      // Registrar intento fallido
      await query(
        'INSERT INTO auth_logs (action, ip_address, user_agent, success, details) VALUES (?, ?, ?, ?, ?)',
        ['failed_login', req.ip, req.get('User-Agent'), false, JSON.stringify({ username })]
      );
      
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const user = users[0];

    // Verificar estado del usuario
    if (user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Cuenta inactiva o suspendida'
      });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      // Registrar intento fallido
      await query(
        'INSERT INTO auth_logs (user_id, action, ip_address, user_agent, success) VALUES (?, ?, ?, ?, ?)',
        [user.id, 'failed_login', req.ip, req.get('User-Agent'), false]
      );
      
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Actualizar último login
    await query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Registrar login exitoso
    await query(
      'INSERT INTO auth_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [user.id, 'login', req.ip, req.get('User-Agent')]
    );

    // Generar token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.full_name,
          role: user.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener perfil del usuario
const getProfile = async (req, res) => {
  try {
    const user = await query(
      'SELECT id, username, email, full_name, avatar, role, created_at, last_login FROM users WHERE id = ?',
      [req.user.id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        user: user[0]
      }
    });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Cerrar sesión
const logout = async (req, res) => {
  try {
    // Registrar logout
    await query(
      'INSERT INTO auth_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [req.user.id, 'logout', req.ip, req.get('User-Agent')]
    );

    res.json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    });

  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  logout
};
```

### 3.5 Crear routes/auth.js
```javascript
const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile, logout } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validaciones
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una minúscula, una mayúscula y un número')
];

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Usuario o email requerido'),
  body('password')
    .notEmpty()
    .withMessage('Contraseña requerida')
];

// Rutas públicas
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Rutas protegidas
router.get('/profile', verifyToken, getProfile);
router.post('/logout', verifyToken, logout);

module.exports = router;
```

### 3.6 Crear server.js
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { testConnection } = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de seguridad
app.use(helmet());

// Configuración CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    success: false,
    message: 'Demasiadas solicitudes, intenta de nuevo más tarde'
  }
});
app.use(limiter);

// Rate limiting específico para auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos de login por IP
  message: {
    success: false,
    message: 'Demasiados intentos de autenticación, intenta de nuevo más tarde'
  }
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para obtener IP real
app.use((req, res, next) => {
  req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
  next();
});

// Rutas
app.use('/api/auth', authLimiter, authRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ No se pudo conectar a la base de datos. Verifica XAMPP.');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`📊 Base de datos: MySQL (XAMPP) - ${process.env.DB_NAME}`);
      console.log(`🌐 Frontend permitido: ${process.env.FRONTEND_URL}`);
      console.log(`📝 Logs disponibles en: http://localhost/phpmyadmin`);
    });

  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

startServer();
```

### 3.7 Actualizar package.json
```json
{
  "name": "jollygames-backend",
  "version": "1.0.0",
  "description": "Backend API para JollyGames con XAMPP/MySQL",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["nodejs", "express", "mysql", "jwt", "authentication"],
  "author": "Tu Nombre",
  "license": "MIT"
}
```

## 🚀 PASO 4: EJECUTAR EL BACKEND

### 4.1 Verificar XAMPP
1. Asegúrate de que **Apache** y **MySQL** estén ejecutándose en XAMPP
2. Verifica que phpMyAdmin esté accesible en http://localhost/phpmyadmin
3. Confirma que la base de datos `jolly_games_auth` existe

### 4.2 Ejecutar el Servidor
```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

### 4.3 Probar la API
```bash
# Probar que el servidor funciona
curl http://localhost:5000/api/health

# Registrar un usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser2",
    "email": "test2@example.com",
    "password": "Test123456",
    "fullName": "Usuario de Prueba 2"
  }'

# Iniciar sesión
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser2",
    "password": "Test123456"
  }'
```

## 🔧 PASO 5: PRÓXIMOS PASOS

1. **Conectar Frontend**: Modificar el frontend React para usar esta API
2. **Implementar Foro**: Crear controladores y rutas para el sistema de foro
3. **Subir Archivos**: Implementar sistema de subida de avatares
4. **Notificaciones**: Sistema de notificaciones en tiempo real
5. **Moderación**: Panel de administración para moderadores

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error de Conexión a MySQL
- Verifica que XAMPP esté ejecutándose
- Confirma que MySQL esté en el puerto 3306
- Revisa las credenciales en el archivo `.env`

### Error de CORS
- Verifica que `FRONTEND_URL` en `.env` coincida con tu frontend
- Asegúrate de que el frontend esté en http://localhost:3000

### Error de Token JWT
- Verifica que `JWT_SECRET` esté configurado en `.env`
- Asegúrate de que el token se envíe en el header Authorization

¡Tu backend está listo para conectarse con XAMPP y phpMyAdmin! 🎉