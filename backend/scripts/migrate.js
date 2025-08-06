const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración para conectar sin especificar base de datos
const connectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
};

// SQL para crear la base de datos
const createDatabaseSQL = `
CREATE DATABASE IF NOT EXISTS jolly_games_auth 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci
`;

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

// Definición de tablas con sus SQLs de creación
const tables = {
  'users': `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
  )`,

  'forum_categories': `CREATE TABLE IF NOT EXISTS forum_categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    icon VARCHAR(50) DEFAULT 'MessageSquare',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,

  'forum_topics': `CREATE TABLE IF NOT EXISTS forum_topics (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    views INT DEFAULT 0,
    category_id VARCHAR(36) NOT NULL,
    author_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES forum_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_author (author_id),
    INDEX idx_created (created_at)
  )`,

  'forum_posts': `CREATE TABLE IF NOT EXISTS forum_posts (
    id VARCHAR(36) PRIMARY KEY,
    content TEXT NOT NULL,
    topic_id VARCHAR(36) NOT NULL,
    author_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_topic (topic_id),
    INDEX idx_author (author_id),
    INDEX idx_created (created_at)
  )`,

  'forum_reaction_types': `CREATE TABLE IF NOT EXISTS forum_reaction_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    emoji VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,

  'forum_post_reactions': `CREATE TABLE IF NOT EXISTS forum_post_reactions (
    id VARCHAR(36) PRIMARY KEY,
    post_id VARCHAR(36) NOT NULL,
    user_id INT NOT NULL,
    reaction_type_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_post_reaction (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reaction_type_id) REFERENCES forum_reaction_types(id) ON DELETE CASCADE,
    INDEX idx_post (post_id),
    INDEX idx_user (user_id),
    INDEX idx_reaction_type (reaction_type_id)
  )`,

  'forum_topic_tags': `CREATE TABLE IF NOT EXISTS forum_topic_tags (
    id VARCHAR(36) PRIMARY KEY,
    topic_id VARCHAR(36) NOT NULL,
    tag_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    INDEX idx_topic (topic_id),
    INDEX idx_tag (tag_name)
  )`,

  'auth_logs': `CREATE TABLE IF NOT EXISTS auth_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id INT,
    action ENUM('login', 'logout', 'register', 'failed_login') NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_created (created_at)
  )`,

  'user_sessions': `CREATE TABLE IF NOT EXISTS user_sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_token (token_hash),
    INDEX idx_expires (expires_at)
  )`
};

// Datos iniciales
const initialData = {
  'forum_categories': `INSERT IGNORE INTO forum_categories (id, name, description, color, icon) VALUES
  ('cat-general', 'General', 'Discusiones generales sobre JollyGames', '#3B82F6', 'MessageSquare'),
  ('cat-anuncios', 'Anuncios', 'Noticias y actualizaciones oficiales', '#10B981', 'Megaphone'),
  ('cat-ayuda', 'Ayuda y Soporte', 'Obtén ayuda con problemas técnicos', '#F59E0B', 'HelpCircle'),
  ('cat-sugerencias', 'Sugerencias', 'Comparte tus ideas para mejorar el servidor', '#8B5CF6', 'Lightbulb'),
  ('cat-builds', 'Construcciones', 'Muestra tus increíbles construcciones', '#EF4444', 'Building'),
  ('cat-eventos', 'Eventos', 'Información sobre eventos del servidor', '#06B6D4', 'Calendar')`,

  'forum_reaction_types': `INSERT IGNORE INTO forum_reaction_types (name, emoji) VALUES
  ('like', '👍'),
  ('dislike', '👎'),
  ('love', '❤️'),
  ('laugh', '😂'),
  ('angry', '😠')`
};

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function runMigration() {
  let connection;
  
  try {
    console.log('🚀 Iniciando migración de base de datos...');
    
    // Conectar a MySQL sin especificar base de datos
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Conectado a MySQL');
    
    // Crear base de datos
    console.log('📝 Creando base de datos...');
    await connection.execute(createDatabaseSQL);
    console.log('✅ Base de datos creada/verificada');
    
    // Cerrar conexión y reconectar a la base de datos específica
    await connection.end();
    
    const dbConnectionConfig = {
      ...connectionConfig,
      database: 'jolly_games_auth'
    };
    
    connection = await mysql.createConnection(dbConnectionConfig);
    console.log('✅ Conectado a jolly_games_auth');
    
    // Verificar y crear tablas
    console.log('📝 Verificando y creando tablas...');
    let createdCount = 0;
    let existingCount = 0;
    
    for (const [tableName, createSQL] of Object.entries(tables)) {
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
    console.log('📊 Insertando datos iniciales...');
    for (const [tableName, insertSQL] of Object.entries(initialData)) {
      try {
        await connection.execute(insertSQL);
        console.log(`  ✅ Datos iniciales para '${tableName}' insertados`);
      } catch (error) {
        console.log(`  ⏭️  Datos para '${tableName}' ya existen o error: ${error.message}`);
      }
    }
    
    console.log('🎉 ¡Migración completada exitosamente!');
    console.log('📋 Base de datos: jolly_games_auth');
    console.log('📋 Tablas disponibles:', Object.keys(tables).join(', '));
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error.message);
    console.error('💡 Asegúrate de que XAMPP esté ejecutándose y MySQL esté disponible');
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
  runMigration();
}

module.exports = { runMigration };