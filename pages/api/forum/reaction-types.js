import { query } from '../../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    // Obtener todos los tipos de reacciones disponibles
    const reactionTypes = await query(
      'SELECT id, emoji, name, description FROM forum_reaction_types ORDER BY id ASC'
    );

    res.status(200).json({
      success: true,
      reactionTypes
    });
  } catch (error) {
    console.error('Error al obtener tipos de reacciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}