// Servicio para la API del foro
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Función helper para manejar respuestas de la API
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud');
  }
  
  return data;
};

// Función helper para obtener headers con autenticación
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const forumService = {
  // Obtener todas las categorías
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  // Obtener temas con filtros opcionales
  async getTopics(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.categoryId) queryParams.append('categoryId', params.categoryId);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      
      const url = `${API_BASE_URL}/forum/topics${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al obtener temas:', error);
      throw error;
    }
  },

  // Obtener un tema específico con sus posts
  async getTopic(topicId, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      
      const url = `${API_BASE_URL}/forum/topics/${topicId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al obtener tema:', error);
      throw error;
    }
  },

  // Crear un nuevo tema
  async createTopic(topicData) {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/topics`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(topicData)
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al crear tema:', error);
      throw error;
    }
  },

  // Crear un nuevo post en un tema
  async createPost(topicId, content) {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/topics/${topicId}/posts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ content })
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al crear post:', error);
      throw error;
    }
  },

  // Dar/quitar like a un post
  async likePost(postId) {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/posts/${postId}/like`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al dar like:', error);
      throw error;
    }
  }
};

export default forumService;