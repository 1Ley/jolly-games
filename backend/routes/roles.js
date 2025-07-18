const express = require('express');
const router = express.Router();
const {
  getAllRoles,
  getAllTags,
  getUserRolesAndTags,
  assignRole,
  assignTag,
  removeTag,
  createTag,
  getUsersWithRolesAndTags
} = require('../controllers/rolesController');


// Rutas públicas (solo lectura)
router.get('/roles', getAllRoles);
router.get('/tags', getAllTags);
router.get('/users/:userId/roles-tags', getUserRolesAndTags);

// Rutas públicas (sin autenticación requerida)
// Obtener usuarios con roles y etiquetas
router.get('/users', getUsersWithRolesAndTags);

// Gestión de roles
router.post('/assign-role', assignRole);

// Gestión de etiquetas
router.post('/assign-tag', assignTag);
router.delete('/users/:userId/tags/:tagId', removeTag);
router.post('/tags', createTag);

module.exports = router;