const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Obtener todos los roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await query(`
      SELECT 
        id,
        name,
        display_name as displayName,
        description,
        color,
        permissions,
        hierarchy_level as hierarchyLevel,
        created_at as createdAt,
        updated_at as updatedAt
      FROM user_roles 
      ORDER BY hierarchy_level DESC
    `);

    // Parsear permisos JSON
    const rolesWithPermissions = roles.map(role => ({
      ...role,
      permissions: typeof role.permissions === 'string' 
        ? JSON.parse(role.permissions) 
        : role.permissions
    }));

    res.json({
      success: true,
      data: rolesWithPermissions
    });
  } catch (error) {
    console.error('Error obteniendo roles:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todas las etiquetas
const getAllTags = async (req, res) => {
  try {
    const { category } = req.query;
    
    let sql = `
      SELECT 
        id,
        name,
        display_name as displayName,
        description,
        color,
        icon,
        category,
        is_active as isActive,
        created_at as createdAt,
        updated_at as updatedAt
      FROM user_tags 
      WHERE is_active = true
    `;
    
    const params = [];
    
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    
    sql += ' ORDER BY category, display_name';
    
    const tags = await query(sql, params);

    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    console.error('Error obteniendo etiquetas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener roles y etiquetas de un usuario
const getUserRolesAndTags = async (req, res) => {
  try {
    const { userId } = req.params;

    // Obtener rol del usuario
    const userRole = await query(`
      SELECT 
        ur.id,
        ur.name,
        ur.display_name as displayName,
        ur.description,
        ur.color,
        ur.permissions,
        ur.hierarchy_level as hierarchyLevel
      FROM users u
      JOIN user_roles ur ON u.role_id = ur.id
      WHERE u.id = ?
    `, [userId]);

    // Obtener etiquetas del usuario
    const userTags = await query(`
      SELECT 
        ut.id,
        ut.name,
        ut.display_name as displayName,
        ut.description,
        ut.color,
        ut.icon,
        ut.category,
        uta.assigned_at as assignedAt,
        uta.expires_at as expiresAt
      FROM user_tag_assignments uta
      JOIN user_tags ut ON uta.tag_id = ut.id
      WHERE uta.user_id = ? AND uta.is_active = true AND ut.is_active = true
      ORDER BY ut.category, ut.display_name
    `, [userId]);

    const role = userRole[0] || null;
    if (role && role.permissions) {
      role.permissions = typeof role.permissions === 'string' 
        ? JSON.parse(role.permissions) 
        : role.permissions;
    }

    res.json({
      success: true,
      data: {
        role,
        tags: userTags
      }
    });
  } catch (error) {
    console.error('Error obteniendo roles y etiquetas del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Asignar rol a usuario
const assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const assignedBy = req.user.id;

    // Verificar permisos
    if (!req.user.permissions?.manage_roles) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para asignar roles'
      });
    }

    // Verificar que el rol existe
    const roleExists = await query('SELECT id FROM user_roles WHERE id = ?', [roleId]);
    if (roleExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    // Actualizar el rol del usuario
    await query(
      'UPDATE users SET role_id = ? WHERE id = ?',
      [roleId, userId]
    );

    // Registrar la asignación
    await query(`
      INSERT INTO user_role_assignments (user_id, role_id, assigned_by, assigned_at, is_active)
      VALUES (?, ?, ?, NOW(), true)
      ON DUPLICATE KEY UPDATE 
        assigned_by = VALUES(assigned_by),
        assigned_at = VALUES(assigned_at),
        is_active = VALUES(is_active)
    `, [userId, roleId, assignedBy]);

    res.json({
      success: true,
      message: 'Rol asignado exitosamente'
    });
  } catch (error) {
    console.error('Error asignando rol:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Asignar etiqueta a usuario
const assignTag = async (req, res) => {
  try {
    const { userId, tagId, expiresAt } = req.body;
    const assignedBy = req.user.id;

    // Verificar permisos
    if (!req.user.permissions?.manage_tags) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para asignar etiquetas'
      });
    }

    // Verificar que la etiqueta existe
    const tagExists = await query('SELECT id FROM user_tags WHERE id = ? AND is_active = true', [tagId]);
    if (tagExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Etiqueta no encontrada'
      });
    }

    // Asignar la etiqueta
    await query(`
      INSERT INTO user_tag_assignments (user_id, tag_id, assigned_by, assigned_at, expires_at, is_active)
      VALUES (?, ?, ?, NOW(), ?, true)
      ON DUPLICATE KEY UPDATE 
        assigned_by = VALUES(assigned_by),
        assigned_at = VALUES(assigned_at),
        expires_at = VALUES(expires_at),
        is_active = VALUES(is_active)
    `, [userId, tagId, assignedBy, expiresAt || null]);

    res.json({
      success: true,
      message: 'Etiqueta asignada exitosamente'
    });
  } catch (error) {
    console.error('Error asignando etiqueta:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Remover etiqueta de usuario
const removeTag = async (req, res) => {
  try {
    const { userId, tagId } = req.params;

    // Verificar permisos
    if (!req.user.permissions?.manage_tags) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para remover etiquetas'
      });
    }

    // Desactivar la asignación de etiqueta
    await query(
      'UPDATE user_tag_assignments SET is_active = false WHERE user_id = ? AND tag_id = ?',
      [userId, tagId]
    );

    res.json({
      success: true,
      message: 'Etiqueta removida exitosamente'
    });
  } catch (error) {
    console.error('Error removiendo etiqueta:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Crear nueva etiqueta
const createTag = async (req, res) => {
  try {
    const { name, displayName, description, color, icon, category } = req.body;

    // Verificar permisos
    if (!req.user.permissions?.manage_tags) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para crear etiquetas'
      });
    }

    // Validar datos requeridos
    if (!name || !displayName || !category) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, nombre de visualización y categoría son requeridos'
      });
    }

    // Crear la etiqueta
    const result = await query(`
      INSERT INTO user_tags (name, display_name, description, color, icon, category, is_active)
      VALUES (?, ?, ?, ?, ?, ?, true)
    `, [name, displayName, description || null, color || '#3B82F6', icon || null, category]);

    res.json({
      success: true,
      message: 'Etiqueta creada exitosamente',
      data: { id: result.insertId }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una etiqueta con ese nombre'
      });
    }
    
    console.error('Error creando etiqueta:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener usuarios con sus roles y etiquetas
const getUsersWithRolesAndTags = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, tag } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = '';
    const params = [];

    if (role) {
      whereClause += ' AND ur.name = ?';
      params.push(role);
    }

    if (tag) {
      whereClause += ` AND u.id IN (
        SELECT DISTINCT uta.user_id 
        FROM user_tag_assignments uta 
        JOIN user_tags ut ON uta.tag_id = ut.id 
        WHERE ut.name = ? AND uta.is_active = true
      )`;
      params.push(tag);
    }

    // Obtener usuarios con roles
    const users = await query(`
      SELECT 
        u.id,
        u.username,
        u.email,
        u.avatar,
        u.created_at as joinedAt,
        ur.id as roleId,
        ur.name as roleName,
        ur.display_name as roleDisplayName,
        ur.color as roleColor,
        ur.hierarchy_level as roleHierarchy
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.id
      WHERE 1=1 ${whereClause}
      ORDER BY ur.hierarchy_level DESC, u.username
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), parseInt(offset)]);

    // Obtener etiquetas para cada usuario
    for (const user of users) {
      const tags = await query(`
        SELECT 
          ut.id,
          ut.name,
          ut.display_name as displayName,
          ut.color,
          ut.icon,
          ut.category
        FROM user_tag_assignments uta
        JOIN user_tags ut ON uta.tag_id = ut.id
        WHERE uta.user_id = ? AND uta.is_active = true AND ut.is_active = true
        ORDER BY ut.category, ut.display_name
      `, [user.id]);
      
      user.tags = tags;
    }

    // Contar total de usuarios
    const totalResult = await query(`
      SELECT COUNT(DISTINCT u.id) as total
      FROM users u
      LEFT JOIN user_roles ur ON u.role_id = ur.id
      WHERE 1=1 ${whereClause}
    `, params);

    const total = totalResult[0].total;

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error obteniendo usuarios con roles y etiquetas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  getAllRoles,
  getAllTags,
  getUserRolesAndTags,
  assignRole,
  assignTag,
  removeTag,
  createTag,
  getUsersWithRolesAndTags
};