import { query } from '../../../../../lib/database';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { postId } = req.query;
  let userId = null;

  // Verificar autenticación (opcional para ver reacciones)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (error) {
      // Token inválido, pero no es crítico para ver reacciones
      console.log('Token inválido al obtener reacciones');
    }
  }

  if (!postId) {
    return res.status(400).json({ message: 'Post ID es requerido' });
  }

  try {
    // Verificar que el post existe
    const postExists = await query(
      'SELECT id FROM forum_posts WHERE id = ?',
      [postId]
    );

    if (postExists.length === 0) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Obtener reacciones agrupadas por tipo con información del usuario
    const reactionsQuery = `
      SELECT 
        rt.id as reactionTypeId,
        rt.emoji,
        rt.name,
        COUNT(pr.id) as count,
        ${userId ? `MAX(CASE WHEN pr.user_id = ? THEN 1 ELSE 0 END) as userReacted` : '0 as userReacted'}
      FROM forum_reaction_types rt
      LEFT JOIN forum_post_reactions pr ON rt.id = pr.reaction_type_id AND pr.post_id = ?
      GROUP BY rt.id, rt.emoji, rt.name
      HAVING count > 0
      ORDER BY count DESC, rt.id ASC
    `;

    const reactions = await query(
      reactionsQuery,
      userId ? [userId, postId] : [postId]
    );

    // Convertir userReacted a boolean
    const formattedReactions = reactions.map(reaction => ({
      ...reaction,
      userReacted: Boolean(reaction.userReacted)
    }));

    res.status(200).json({
      success: true,
      reactions: formattedReactions
    });
  } catch (error) {
    console.error('Error al obtener reacciones del post:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}