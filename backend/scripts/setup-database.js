const { runMigration } = require('./migrate');
const { testConnection } = require('../config/database');

/**
 * Script para configurar automáticamente la base de datos
 * Este script:
 * 1. Ejecuta la migración para crear la base de datos y tablas
 * 2. Verifica la conexión
 * 3. Proporciona información sobre el estado de la base de datos
 */

async function setupDatabase() {
  console.log('🎮 JollyGames - Configuración Automática de Base de Datos');
  console.log('=' .repeat(60));
  
  try {
    // Ejecutar migración
    await runMigration();
    
    // Esperar un momento para que la base de datos se estabilice
    console.log('⏳ Esperando estabilización de la base de datos...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verificar conexión
    console.log('🔍 Verificando conexión a la base de datos...');
    const isConnected = await testConnection();
    
    if (isConnected) {
      console.log('\n🎉 ¡CONFIGURACIÓN COMPLETADA EXITOSAMENTE!');
      console.log('=' .repeat(60));
      console.log('✅ Base de datos: jolly_games_auth');
      console.log('✅ Todas las tablas han sido creadas');
      console.log('✅ Datos iniciales insertados');
      console.log('✅ Conexión verificada');
      console.log('\n🚀 Tu backend está listo para usar!');
      console.log('💡 Puedes iniciar el servidor con: npm start');
    } else {
      throw new Error('No se pudo verificar la conexión a la base de datos');
    }
    
  } catch (error) {
    console.error('\n❌ ERROR EN LA CONFIGURACIÓN');
    console.error('=' .repeat(60));
    console.error('Error:', error.message);
    console.error('\n🔧 SOLUCIONES POSIBLES:');
    console.error('1. Asegúrate de que XAMPP esté ejecutándose');
    console.error('2. Verifica que MySQL esté iniciado en XAMPP');
    console.error('3. Comprueba las credenciales en el archivo .env');
    console.error('4. Verifica que el puerto 3306 esté disponible');
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };