// Servicio para la API del foro
import api from './api';

export const forumService = {
  // Obtener todas las categorías
  async getCategories() {
    try {
      const response = await api.get('/forum/categories');
      return response;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  // Obtener temas con filtros opcionales
  async getTopics(params = {}) {
    try {
      const response = await api.get('/forum/topics', { params });
      return response;
    } catch (error) {
      console.error('Error al obtener temas:', error);
      throw error;
    }
  },

  // Obtener un tema específico con sus posts
  async getTopic(topicId, params = {}) {
    try {
      const response = await api.get(`/forum/topics/${topicId}`, { params });
      return response;
    } catch (error) {
      console.error('Error al obtener tema:', error);
      throw error;
    }
  },

  // Crear un nuevo tema
  async createTopic(topicData) {
    try {
      const response = await api.post('/forum/topics', topicData);
      return response;
    } catch (error) {
      console.error('Error al crear tema:', error);
      throw error;
    }
  },

  // Crear un nuevo post en un tema
  async createPost(topicId, content) {
    try {
      const response = await api.post(`/forum/topics/${topicId}/posts`, { content });
      return response;
    } catch (error) {
      console.error('Error al crear post:', error);
      throw error;
    }
  },

  // Dar/quitar like a un post
  async likePost(postId) {
    try {
      const response = await api.post(`/forum/posts/${postId}/like`);
      return response;
    } catch (error) {
      console.error('Error al dar like:', error);
      throw error;
    }
  }
};

export default forumService;