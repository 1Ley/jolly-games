const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { validationResult } = require('express-validator');

// Generar token JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Registrar usuario
const register = async (req, res) => {
  try {
    // Validar errores de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { username, email, password, minecraftUsername } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await query(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El usuario o email ya existe'
      });
    }

    // Hashear contraseña
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar usuario en la base de datos
    const result = await query(
      'INSERT INTO users (username, email, password, minecraft_username) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, minecraftUsername || null]
    );

    const userId = result.insertId;

    // Registrar en logs
    await query(
      'INSERT INTO auth_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [userId, 'register', req.ip, req.get('User-Agent')]
    );

    // Generar token
    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: {
          id: userId,
          username,
          email,
          minecraft_username: minecraftUsername || null
        },
        token
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: errors.array()
      });
    }

    const { username, password } = req.body;

    // Buscar usuario
    const users = await query(
      'SELECT id, username, email, password, minecraft_username, role, status FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (users.length === 0) {
      // Registrar intento fallido
      await query(
        'INSERT INTO auth_logs (action, ip_address, user_agent, success, details) VALUES (?, ?, ?, ?, ?)',
        ['failed_login', req.ip, req.get('User-Agent'), false, JSON.stringify({ username })]
      );
      
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const user = users[0];

    // Verificar estado del usuario
    if (user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Cuenta inactiva o suspendida'
      });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      // Registrar intento fallido
      await query(
        'INSERT INTO auth_logs (user_id, action, ip_address, user_agent, success) VALUES (?, ?, ?, ?, ?)',
        [user.id, 'failed_login', req.ip, req.get('User-Agent'), false]
      );
      
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Actualizar último login
    await query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Registrar login exitoso
    await query(
      'INSERT INTO auth_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [user.id, 'login', req.ip, req.get('User-Agent')]
    );

    // Generar token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          minecraft_username: user.minecraft_username,
          role: user.role
        },
        token
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

// Obtener perfil del usuario
const getProfile = async (req, res) => {
  try {
    const user = await query(
      'SELECT id, username, email, minecraft_username, avatar, role, created_at, last_login FROM users WHERE id = ?',
      [req.user.id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        user: user[0]
      }
    });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Cerrar sesión
const logout = async (req, res) => {
  try {
    // Registrar logout
    await query(
      'INSERT INTO auth_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [req.user.id, 'logout', req.ip, req.get('User-Agent')]
    );

    res.json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    });

  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  logout
};