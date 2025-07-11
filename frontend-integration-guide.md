# 🔗 GUÍA DE INTEGRACIÓN FRONTEND-BACKEND

## 📋 PASO 1: INSTALAR DEPENDENCIAS DEL FRONTEND

### 1.1 Instalar Librerías Necesarias
```bash
# Desde la raíz del proyecto (donde está package.json del frontend)
npm install axios react-query @tanstack/react-query react-hot-toast
```

### 1.2 Dependencias Explicadas
- **axios**: Para realizar peticiones HTTP al backend
- **react-query**: Para manejo de estado del servidor y cache
- **react-hot-toast**: Para notificaciones elegantes

## 🔧 PASO 2: CONFIGURAR SERVICIOS DE API

### 2.1 Crear lib/api.js
```javascript
import axios from 'axios';
import toast from 'react-hot-toast';

// Configuración base de Axios
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Error de conexión';
    
    // Si el token expiró, limpiar localStorage y redirigir
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    
    // Mostrar error al usuario
    toast.error(message);
    
    return Promise.reject(error);
  }
);

export default api;
```

### 2.2 Crear lib/auth.js
```javascript
import api from './api';

// Servicio de autenticación
export const authService = {
  // Registrar usuario
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { user, token } = response.data.data;
      
      // Guardar en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  // Iniciar sesión
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data.data;
      
      // Guardar en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar localStorage siempre
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  // Obtener perfil del usuario
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data.data.user;
    } catch (error) {
      throw error;
    }
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem('authToken');
  }
};
```

### 2.3 Crear contexts/AuthContext.js
```javascript
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../lib/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
          
          // Verificar que el token siga siendo válido
          try {
            const profile = await authService.getProfile();
            setUser(profile);
          } catch (error) {
            // Token inválido, limpiar
            await logout();
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        await logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función de login
  const login = async (credentials) => {
    try {
      setLoading(true);
      const { user: userData } = await authService.login(credentials);
      setUser(userData);
      setIsAuthenticated(true);
      toast.success(`¡Bienvenido, ${userData.username}!`);
      return userData;
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función de registro
  const register = async (userData) => {
    try {
      setLoading(true);
      const { user: newUser } = await authService.register(userData);
      setUser(newUser);
      setIsAuthenticated(true);
      toast.success(`¡Cuenta creada exitosamente! Bienvenido, ${newUser.username}!`);
      return newUser;
    } catch (error) {
      const message = error.response?.data?.message || 'Error al registrar usuario';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar perfil
  const updateProfile = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
      return profile;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 🔄 PASO 3: MODIFICAR COMPONENTES EXISTENTES

### 3.1 Actualizar app/layout.js
```javascript
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JollyGames - Servidor de Minecraft',
  description: 'El mejor servidor de Minecraft con modos únicos y comunidad activa',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(17, 25, 40, 0.8)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
```

### 3.2 Actualizar app/auth/page.tsx
```javascript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login({
          username: formData.username,
          password: formData.password
        });
      } else {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName
        });
      }
      
      // Redirigir al home después del éxito
      router.push('/');
    } catch (error) {
      // El error ya se maneja en el contexto
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      fullName: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bento-item w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h1>
          <p className="text-gray-300">
            {isLogin ? 'Accede a tu cuenta de JollyGames' : 'Únete a la comunidad de JollyGames'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tu nombre de usuario"
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo (Opcional)
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tu contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}
              </div>
            ) : (
              isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </p>
          <button
            onClick={toggleMode}
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
          >
            {isLogin ? 'Crear una cuenta' : 'Iniciar sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 3.3 Crear components/Navbar.js (Componente de Navegación)
```javascript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/rules', label: 'Reglas' },
    { href: '/forum', label: 'Foro' },
    { href: '/community', label: 'Comunidad' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              JollyGames
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">
                  Hola, <span className="text-white font-semibold">{user?.username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/40 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-gray-300 text-sm">
                    Hola, <span className="text-white font-semibold">{user?.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
```

### 3.4 Actualizar app/page.tsx (Página Principal)
```javascript
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Resto del contenido de tu página principal */}
        <div className="pt-16"> {/* Padding para compensar navbar fijo */}
          {/* Tu contenido existente aquí */}
        </div>
      </main>
    </>
  );
}
```

## 🔒 PASO 4: CREAR MIDDLEWARE DE PROTECCIÓN

### 4.1 Crear components/ProtectedRoute.js
```javascript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, requireAuth = true, redirectTo = '/auth' }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        router.push('/');
      }
    }
  }, [isAuthenticated, loading, requireAuth, redirectTo, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null; // Se redirigirá
  }

  if (!requireAuth && isAuthenticated) {
    return null; // Se redirigirá
  }

  return children;
}
```

## 🌐 PASO 5: CONFIGURAR VARIABLES DE ENTORNO

### 5.1 Crear .env.local
```env
# URL del backend
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Otras configuraciones
NEXT_PUBLIC_APP_NAME=JollyGames
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🚀 PASO 6: PROBAR LA INTEGRACIÓN

### 6.1 Iniciar Backend
```bash
# En la carpeta backend
npm run dev
```

### 6.2 Iniciar Frontend
```bash
# En la raíz del proyecto
npm run dev
```

### 6.3 Probar Funcionalidades
1. **Registro**: Ir a `/auth` y crear una cuenta nueva
2. **Login**: Iniciar sesión con las credenciales
3. **Navegación**: Verificar que el navbar muestre el usuario logueado
4. **Logout**: Cerrar sesión y verificar redirección
5. **Protección**: Intentar acceder a rutas protegidas sin autenticación

## 🔧 PRÓXIMOS PASOS

1. **Implementar Foro**: Crear servicios y componentes para el sistema de foro
2. **Perfil de Usuario**: Página para editar perfil y cambiar contraseña
3. **Roles y Permisos**: Implementar sistema de moderación
4. **Notificaciones**: Sistema de notificaciones en tiempo real
5. **Subida de Archivos**: Sistema para avatares y archivos del foro

¡Tu frontend ya está conectado con el backend! 🎉

## 🐛 SOLUCIÓN DE PROBLEMAS COMUNES

### Error de CORS
- Verifica que el backend esté ejecutándose en puerto 5000
- Confirma que `NEXT_PUBLIC_API_URL` esté correctamente configurado

### Error de Autenticación
- Verifica que el token se esté guardando en localStorage
- Confirma que el backend esté respondiendo correctamente

### Error de Conexión
- Asegúrate de que tanto frontend como backend estén ejecutándose
- Verifica que no haya conflictos de puertos