const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile, logout } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validaciones para registro
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
  
  body('email')
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una letra minúscula, una mayúscula y un número'),
  
  body('fullName')
    .optional()
    .isLength({ max: 100 })
    .withMessage('El nombre completo no puede exceder 100 caracteres')
    .trim()
];

// Validaciones para login
const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('El nombre de usuario o email es requerido')
    .trim(),
  
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
];

// Rutas públicas
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Rutas protegidas (requieren autenticación)
router.get('/profile', verifyToken, getProfile);
router.post('/logout', verifyToken, logout);

// Ruta para verificar token
router.get('/verify', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token válido',
    data: {
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role
      }
    }
  });
});

module.exports = router;