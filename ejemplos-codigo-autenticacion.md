# Ejemplos de Código: Integración MySQL + React + Node.js

## 🚀 Configuración del Backend (Node.js + Express)

### 1. Instalación de dependencias
```bash
npm init -y
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv
npm install -D nodemon
```

### 2. Configuración de la base de datos (db.js)
```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la conexión
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jolly_games_auth',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para ejecutar consultas
const executeQuery = async (query, params = []) => {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error;
  }
};

module.exports = { executeQuery, pool };
```

### 3. Archivo de variables de entorno (.env)
```env
# Configuración de la base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=jolly_games_auth

# JWT Secret (genera uno seguro en producción)
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui

# Puerto del servidor
PORT=5000
```

### 4. Controlador de autenticación (authController.js)
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery } = require('../config/db');

// Registrar nuevo usuario
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validaciones básicas
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await executeQuery(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El usuario o email ya existe'
      });
    }

    // Hashear la contraseña
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar nuevo usuario
    const result = await executeQuery(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    // Generar JWT token
    const token = jwt.sign(
      { userId: result.insertId, username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: result.insertId,
        username,
        email
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
    const { username, password } = req.body;

    // Validaciones
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña son obligatorios'
      });
    }

    // Buscar usuario
    const users = await executeQuery(
      'SELECT id, username, email, password FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const user = users[0];

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Generar JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
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

// Verificar token
const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuario actual
    const users = await executeQuery(
      'SELECT id, username, email FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      user: users[0]
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

module.exports = { register, login, verifyToken };
```

### 5. Rutas de autenticación (authRoutes.js)
```javascript
const express = require('express');
const { register, login, verifyToken } = require('../controllers/authController');
const router = express.Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas
router.get('/verify', verifyToken);

module.exports = router;
```

### 6. Servidor principal (server.js)
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Servidor de autenticación funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
```

## ⚛️ Frontend React

### 1. Instalación de dependencias
```bash
npm install axios react-router-dom
```

### 2. Servicio de autenticación (authService.js)
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Configurar axios
axios.defaults.baseURL = API_URL;

// Interceptor para incluir token en requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  // Registrar usuario
  register: async (userData) => {
    try {
      const response = await axios.post('/register', userData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error de conexión' };
    }
  },

  // Iniciar sesión
  login: async (credentials) => {
    try {
      const response = await axios.post('/login', credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error de conexión' };
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verificar token
  verifyToken: async () => {
    try {
      const response = await axios.get('/verify');
      return response.data;
    } catch (error) {
      authService.logout();
      throw error.response?.data || { message: 'Token inválido' };
    }
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
```

### 3. Contexto de autenticación (AuthContext.js)
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.verifyToken();
        setUser(userData.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 4. Componente de Login (Login.jsx)
```javascript
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/dashboard'); // Redirigir después del login
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="sr-only">
              Usuario o Email
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Usuario o Email"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
```

### 5. Componente de Registro (Register.jsx)
```javascript
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <input
              name="username"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
            />
            
            <input
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
            />
            
            <input
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
            
            <input
              name="confirmPassword"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
```

## 🛡️ Middleware de Protección de Rutas

### Backend (authMiddleware.js)
```javascript
const jwt = require('jsonwebtoken');
const { executeQuery } = require('../config/db');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Acceso denegado. Token requerido.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar que el usuario existe
    const users = await executeQuery(
      'SELECT id, username, email FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    req.user = users[0];
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

module.exports = authMiddleware;
```

### Frontend (ProtectedRoute.jsx)
```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

## 📱 Uso en App.js
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

---

**¡Listo!** 🎉 Con estos ejemplos tienes un sistema completo de autenticación con MySQL, Node.js y React. Recuerda siempre seguir las mejores prácticas de seguridad y validar todos los datos tanto en el frontend como en el backend.