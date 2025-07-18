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

// SQL para crear la tabla de ejemplo
const createTestTableSQL = `
CREATE TABLE IF NOT EXISTS test_example (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  activo BOOLEAN DEFAULT TRUE,
  numero_ejemplo INT DEFAULT 42
)`;

// Datos de ejemplo para insertar
const insertTestDataSQL = `
INSERT INTO test_example (nombre, descripcion, numero_ejemplo) VALUES
('Ejemplo 1', 'Esta es una tabla de prueba creada desde el backend', 100),
('Ejemplo 2', 'Demuestra que el backend puede crear tablas automáticamente', 200),
('Ejemplo 3', 'Puedes ver esta tabla en phpMyAdmin ahora', 300)
`;

async function createTestTable() {
  let connection;
  
  try {
    console.log('🧪 Creando tabla de ejemplo test_example...');
    
    // Conectar a la base de datos
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Conectado a jolly_games_auth');
    
    // Crear la tabla de ejemplo
    await connection.execute(createTestTableSQL);
    console.log('✅ Tabla test_example creada exitosamente');
    
    // Insertar datos de ejemplo
    await connection.execute(insertTestDataSQL);
    console.log('✅ Datos de ejemplo insertados');
    
    console.log('🎉 ¡Tabla de ejemplo creada!');
    console.log('📋 Nombre de la tabla: test_example');
    console.log('📋 Base de datos: jolly_games_auth');
    console.log('💡 Ahora puedes verificarla en phpMyAdmin');
    console.log('🗑️  Recuerda eliminarla manualmente cuando termines de verificar');
    
  } catch (error) {
    console.error('❌ Error al crear la tabla de ejemplo:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Conexión cerrada');
    }
  }
}

// Ejecutar si el archivo se ejecuta directamente
if (require.main === module) {
  createTestTable();
}

module.exports = { createTestTable };