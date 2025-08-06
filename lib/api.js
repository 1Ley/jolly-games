import axios from 'axios';
import { toast } from 'react-hot-toast';

// Configuración base de Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
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

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, retornar los datos
    return response.data;
  },
  (error) => {
    // Manejar diferentes tipos de errores
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Token inválido o expirado
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
          // Redirigir a login si es necesario
          if (typeof window !== 'undefined') {
            window.location.href = '/auth';
          }
          break;
          
        case 403:
          toast.error('No tienes permisos para realizar esta acción.');
          break;
          
        case 404:
          toast.error('Recurso no encontrado.');
          break;
          
        case 429:
          toast.error('Demasiadas solicitudes. Intenta de nuevo más tarde.');
          break;
          
        case 500:
          toast.error('Error interno del servidor. Intenta de nuevo más tarde.');
          break;
          
        default:
          toast.error(data?.message || 'Ha ocurrido un error inesperado.');
      }
      
      return Promise.reject(data || error.response);
    } else if (error.request) {
      // Error de red
      toast.error('Error de conexión. Verifica tu conexión a internet.');
      return Promise.reject({ message: 'Error de conexión' });
    } else {
      // Error desconocido
      toast.error('Ha ocurrido un error inesperado.');
      return Promise.reject(error);
    }
  }
);

export default api;