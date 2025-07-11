'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import authService from '../lib/auth';

// Crear el contexto
const AuthContext = createContext({});

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    checkAuth();
  }, []);

  // Función para verificar autenticación
  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Verificar si hay datos en localStorage
      const token = authService.getToken();
      const userData = authService.getCurrentUser();
      
      if (token && userData) {
        // Verificar token con el servidor
        try {
          const response = await authService.verifyToken();
          if (response.success) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            // Token inválido, limpiar datos
            authService.clearAuth();
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          // Error al verificar token, limpiar datos
          authService.clearAuth();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar usuario
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success('¡Registro exitoso! Bienvenido a JollyGames.');
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.message || 'Error al registrar usuario';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success(`¡Bienvenido de nuevo, ${response.data.user.username}!`);
        return { success: true, data: response.data };
      }
    } catch (error) {
      const errorMessage = error.message || 'Error al iniciar sesión';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Sesión cerrada exitosamente.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Limpiar datos locales aunque falle el servidor
      authService.clearAuth();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Sesión cerrada.');
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar perfil
  const updateProfile = async () => {
    try {
      const response = await authService.getProfile();
      if (response.success) {
        setUser(response.data.user);
        // Actualizar localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error('Error actualizando perfil:', error);
    }
  };

  // Valor del contexto
  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;