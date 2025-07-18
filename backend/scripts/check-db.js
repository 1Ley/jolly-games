const { query } = require('../config/database');

async function checkDatabase() {
  try {
    console.log('🔍 Verificando estructura de la base de datos...');
    
    // Verificar estructura de la tabla users
    console.log('\n📋 Estructura de la tabla users:');
    const usersStructure = await query('DESCRIBE users');
    console.table(usersStructure);
    
    // Verificar categorías existentes
    console.log('\n📋 Categorías del foro existentes:');
    const categories = await query('SELECT * FROM forum_categories');
    console.table(categories);
    
    // Verificar usuarios existentes
    console.log('\n📋 Usuarios existentes:');
    const users = await query('SELECT id, email, username, created_at FROM users');
    console.table(users);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkDatabase();