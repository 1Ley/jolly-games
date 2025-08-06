const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de conexión a la base de datos
const connectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'jolly_games_auth'
};

// Función para verificar si una tabla existe
async function tableExists(connection, tableName) {
  try {
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?',
      ['jolly_games_auth', tableName]
    );
    return rows[0].count > 0;
  } catch (error) {
    return false;
  }
}

// Función para verificar si una columna existe
async function columnExists(connection, tableName, columnName) {
  try {
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM information_schema.columns WHERE table_schema = ? AND table_name = ? AND column_name = ?',
      ['jolly_games_auth', tableName, columnName]
    );
    return rows[0].count > 0;
  } catch (error) {
    return false;
  }
}

// Nuevas tablas para el sistema de roles y etiquetas
const newTables = {
  'user_roles': `CREATE TABLE IF NOT EXISTS user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#6B7280',
    permissions JSON,
    hierarchy_level INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_hierarchy (hierarchy_level)
  )`,

  'user_tags': `CREATE TABLE IF NOT EXISTS user_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    icon VARCHAR(50),
    category ENUM('staff', 'special', 'achievement', 'custom') DEFAULT 'custom',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category (category)
  )`,

  'user_role_assignments': `CREATE TABLE IF NOT EXISTS user_role_assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    assigned_by INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES user_roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_role (user_id, role_id),
    INDEX idx_user (user_id),
    INDEX idx_role (role_id),
    INDEX idx_active (is_active)
  )`,

  'user_tag_assignments': `CREATE TABLE IF NOT EXISTS user_tag_assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tag_id INT NOT NULL,
    assigned_by INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES user_tags(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_tag (user_id, tag_id),
    INDEX idx_user (user_id),
    INDEX idx_tag (tag_id),
    INDEX idx_active (is_active)
  )`
};

// Datos iniciales para roles
const initialRoles = `INSERT IGNORE INTO user_roles (name, display_name, description, color, permissions, hierarchy_level) VALUES
  ('admin', 'Administrador', 'Acceso completo al sistema', '#DC2626', JSON_OBJECT(
    'manage_users', true,
    'manage_roles', true,
    'manage_tags', true,
    'manage_forum', true,
    'manage_content', true,
    'view_admin_panel', true,
    'ban_users', true,
    'delete_posts', true,
    'moderate_forum', true
  ), 100),
  ('moderator', 'Moderador', 'Moderación del foro y contenido', '#F59E0B', JSON_OBJECT(
    'moderate_forum', true,
    'delete_posts', true,
    'warn_users', true,
    'mute_users', true,
    'view_reports', true,
    'manage_topics', true
  ), 50),
  ('player', 'Jugador', 'Usuario estándar del servidor', '#6B7280', JSON_OBJECT(
    'create_posts', true,
    'create_topics', true,
    'react_posts', true,
    'view_forum', true
  ), 10)`;

// Datos iniciales para etiquetas
const initialTags = `INSERT IGNORE INTO user_tags (name, display_name, description, color, icon, category) VALUES
  -- Etiquetas de Staff
  ('admin-tag', 'Admin', 'Etiqueta de Administrador', '#DC2626', 'Shield', 'staff'),
  ('mod-tag', 'Mod', 'Etiqueta de Moderador', '#F59E0B', 'ShieldCheck', 'staff'),
  
  -- Etiquetas Especiales
  ('founder', 'Founder', 'Fundador del servidor', '#7C3AED', 'Crown', 'special'),
  ('web-dev', 'Web Dev', 'Desarrollador Web', '#10B981', 'Code', 'special'),
  ('media', 'Media', 'Creador de Contenido', '#EC4899', 'Video', 'special'),
  
  -- Etiquetas de Logros
  ('veteran', 'Veteran', 'Jugador veterano', '#8B5CF6', 'Star', 'achievement'),
  ('top-player', 'Top Player', 'Jugador destacado', '#F59E0B', 'Trophy', 'achievement'),
  ('builder', 'Builder', 'Constructor experto', '#06B6D4', 'Building', 'achievement'),
  
  -- Etiquetas Personalizadas
  ('vip', 'VIP', 'Miembro VIP', '#EF4444', 'Gem', 'custom'),
  ('supporter', 'Supporter', 'Supporter del servidor', '#10B981', 'Heart', 'custom')`;

async function addRolesAndTags() {
  let connection;
  
  try {
    console.log('🚀 Iniciando migración de roles y etiquetas...');
    
    // Conectar a la base de datos
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Conectado a jolly_games_auth');
    
    // Crear tablas de roles y etiquetas primero
    console.log('📝 Creando tablas de roles y etiquetas...');
    let createdCount = 0;
    let existingCount = 0;
    
    for (const [tableName, createSQL] of Object.entries(newTables)) {
      const exists = await tableExists(connection, tableName);
      if (exists) {
        console.log(`  ⏭️  Tabla '${tableName}' ya existe`);
        existingCount++;
      } else {
        await connection.execute(createSQL);
        console.log(`  ✅ Tabla '${tableName}' creada`);
        createdCount++;
      }
    }
    
    console.log(`✅ Verificación completada: ${existingCount} existentes, ${createdCount} creadas`);
    
    // Insertar datos iniciales
    console.log('📊 Insertando roles iniciales...');
    try {
      await connection.execute(initialRoles);
      console.log('  ✅ Roles iniciales insertados');
    } catch (error) {
      console.log(`  ⏭️  Roles ya existen o error: ${error.message}`);
    }
    
    console.log('📊 Insertando etiquetas iniciales...');
    try {
      await connection.execute(initialTags);
      console.log('  ✅ Etiquetas iniciales insertadas');
    } catch (error) {
      console.log(`  ⏭️  Etiquetas ya existen o error: ${error.message}`);
    }
    
    // Agregar columna role_id a la tabla users si no existe
    const roleColumnExists = await columnExists(connection, 'users', 'role_id');
    if (!roleColumnExists) {
      await connection.execute(`
        ALTER TABLE users 
        ADD COLUMN role_id INT DEFAULT 3
      `);
      console.log('✅ Columna role_id agregada a la tabla users');
      
      // Agregar la clave foránea después
      await connection.execute(`
        ALTER TABLE users 
        ADD FOREIGN KEY (role_id) REFERENCES user_roles(id) ON DELETE SET NULL
      `);
      console.log('✅ Clave foránea agregada a role_id');
      
      // Agregar índice
      await connection.execute(`
        ALTER TABLE users 
        ADD INDEX idx_role (role_id)
      `);
      console.log('✅ Índice agregado a role_id');
    } else {
      console.log('⏭️  Columna role_id ya existe en la tabla users');
    }

    
    // Actualizar usuarios existentes con rol por defecto
    console.log('👥 Actualizando usuarios existentes...');
    try {
      await connection.execute(`
        UPDATE users 
        SET role_id = 3 
        WHERE role_id IS NULL
      `);
      console.log('  ✅ Usuarios actualizados con rol por defecto (player)');
    } catch (error) {
      console.log(`  ⏭️  Error actualizando usuarios: ${error.message}`);
    }
    
    console.log('🎉 ¡Migración de roles y etiquetas completada exitosamente!');
    console.log('📋 Nuevas tablas creadas:');
    console.log('  - user_roles (roles del sistema)');
    console.log('  - user_tags (etiquetas personalizables)');
    console.log('  - user_role_assignments (asignación de roles)');
    console.log('  - user_tag_assignments (asignación de etiquetas)');
    console.log('📋 Roles disponibles: Admin, Moderador, Jugador');
    console.log('📋 Etiquetas disponibles: Admin, Mod, Founder, Web Dev, Media, y más...');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error.message);
    console.error('💡 Asegúrate de que la base de datos jolly_games_auth exista');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Conexión cerrada');
    }
  }
}

// Ejecutar migración si el archivo se ejecuta directamente
if (require.main === module) {
  addRolesAndTags();
}

module.exports = { addRolesAndTags };