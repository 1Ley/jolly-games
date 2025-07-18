const { query } = require('../config/database');

async function assignTagsToUser() {
  try {
    console.log('🏷️  Asignando tags al usuario imleidan@gmail.com...');
    
    const userEmail = 'imleidan@gmail.com';
    const userId = 3; // ID del usuario Ley
    const adminTagId = 1; // admin-tag
    const webDevTagId = 4; // web-dev
    
    // Verificar que el usuario existe
    const user = await query('SELECT id, username, email FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      console.error('❌ Usuario no encontrado');
      return;
    }
    
    console.log(`✅ Usuario encontrado: ${user[0].username} (${user[0].email})`);
    
    // Asignar tag de Admin
    console.log('📝 Asignando tag Admin...');
    await query(`
      INSERT INTO user_tag_assignments (user_id, tag_id, assigned_by, assigned_at, is_active)
      VALUES (?, ?, ?, NOW(), true)
      ON DUPLICATE KEY UPDATE 
        assigned_by = VALUES(assigned_by),
        assigned_at = VALUES(assigned_at),
        is_active = VALUES(is_active)
    `, [userId, adminTagId, userId]); // Se asigna a sí mismo
    
    console.log('✅ Tag Admin asignado exitosamente');
    
    // Asignar tag de Web Dev
    console.log('📝 Asignando tag Web Dev...');
    await query(`
      INSERT INTO user_tag_assignments (user_id, tag_id, assigned_by, assigned_at, is_active)
      VALUES (?, ?, ?, NOW(), true)
      ON DUPLICATE KEY UPDATE 
        assigned_by = VALUES(assigned_by),
        assigned_at = VALUES(assigned_at),
        is_active = VALUES(is_active)
    `, [userId, webDevTagId, userId]); // Se asigna a sí mismo
    
    console.log('✅ Tag Web Dev asignado exitosamente');
    
    // Verificar las asignaciones
    console.log('\n🔍 Verificando tags asignados...');
    const userTags = await query(`
      SELECT 
        ut.name,
        ut.display_name,
        ut.category,
        uta.assigned_at,
        uta.is_active
      FROM user_tag_assignments uta
      JOIN user_tags ut ON uta.tag_id = ut.id
      WHERE uta.user_id = ? AND uta.is_active = true
    `, [userId]);
    
    console.log('\n📋 Tags actuales del usuario:');
    console.table(userTags);
    
    console.log('\n🎉 ¡Tags asignados exitosamente!');
    
  } catch (error) {
    console.error('❌ Error asignando tags:', error);
  } finally {
    process.exit(0);
  }
}

// Ejecutar el script
assignTagsToUser();