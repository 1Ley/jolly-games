const { query } = require('../config/database');

const reactions = [
  { emoji: '👍', name: 'like', description: 'Me gusta' },
  { emoji: '👎', name: 'dislike', description: 'No me gusta' },
  { emoji: '😂', name: 'laugh', description: 'Divertido' },
  { emoji: '😮', name: 'wow', description: 'Sorprendente' },
  { emoji: '😢', name: 'sad', description: 'Triste' },
  { emoji: '😡', name: 'angry', description: 'Enojado' }
];

async function addReactionTypes() {
  try {
    console.log('Agregando tipos de reacciones...');
    
    for (const reaction of reactions) {
      await query(
        'INSERT IGNORE INTO forum_reaction_types (emoji, name, description, is_active) VALUES (?, ?, ?, 1)',
        [reaction.emoji, reaction.name, reaction.description]
      );
    }
    
    console.log('Tipos de reacciones agregados exitosamente');
    
    // Mostrar todos los tipos disponibles
    const result = await query('SELECT * FROM forum_reaction_types ORDER BY id');
    console.log('Tipos disponibles:');
    console.table(result);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

addReactionTypes();