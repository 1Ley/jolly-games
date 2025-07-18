const express = require('express');
const router = express.Router();
const {
  getCategories,
  getTopics,
  getTopic,
  createTopic,
  createPost,
  likePost,
  dislikePost,
  getReactionTypes,
  reactToPost,
  getPostReactions
} = require('../controllers/forumController');


// Rutas públicas (no requieren autenticación)
// Obtener todas las categorías
router.get('/categories', getCategories);

// Obtener temas (con filtros opcionales)
router.get('/topics', getTopics);

// Obtener un tema específico con sus posts
router.get('/topics/:topicId', getTopic);

// Rutas públicas (sin autenticación requerida)
// Crear un nuevo tema
router.post('/topics', createTopic);

// Crear un nuevo post en un tema
router.post('/topics/:topicId/posts', createPost);

// Dar/quitar like a un post
router.post('/posts/:postId/like', likePost);

// Dar/quitar dislike a un post
router.post('/posts/:postId/dislike', dislikePost);

// Obtener tipos de reacciones disponibles
router.get('/reaction-types', getReactionTypes);

// Agregar/quitar reacción a un post
router.post('/posts/:postId/react', reactToPost);

// Obtener reacciones de un post
router.get('/posts/:postId/reactions', getPostReactions);

module.exports = router;