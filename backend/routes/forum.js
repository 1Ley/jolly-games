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
const { verifyToken } = require('../middleware/auth');

// Rutas públicas (no requieren autenticación)
// Obtener todas las categorías
router.get('/categories', getCategories);

// Obtener temas (con filtros opcionales)
router.get('/topics', getTopics);

// Obtener un tema específico con sus posts
router.get('/topics/:topicId', getTopic);

// Rutas protegidas (requieren autenticación)
// Crear un nuevo tema
router.post('/topics', verifyToken, createTopic);

// Crear un nuevo post en un tema
router.post('/topics/:topicId/posts', verifyToken, createPost);

// Dar/quitar like a un post
router.post('/posts/:postId/like', verifyToken, likePost);

// Dar/quitar dislike a un post
router.post('/posts/:postId/dislike', verifyToken, dislikePost);

// Obtener tipos de reacciones disponibles
router.get('/reaction-types', getReactionTypes);

// Agregar/quitar reacción a un post
router.post('/posts/:postId/react', verifyToken, reactToPost);

// Obtener reacciones de un post
router.get('/posts/:postId/reactions', getPostReactions);

module.exports = router;