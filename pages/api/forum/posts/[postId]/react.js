import { query } from '../../../../../lib/database';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { postId } = req.query;
  const { reactionTypeId } = req.body;

  // Verificar autenticación
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de acceso requerido' });
  }

  const token = authHeader.substring(7);
  let userId;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  // Validar datos
  if (!postId || !reactionTypeId) {
    return res.status(400).json({ message: 'Post ID y Reaction Type ID son requeridos' });
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

    // Verificar que el tipo de reacción existe
    const reactionTypeExists = await query(
      'SELECT id FROM forum_reaction_types WHERE id = ?',
      [reactionTypeId]
    );

    if (reactionTypeExists.length === 0) {
      return res.status(404).json({ message: 'Tipo de reacción no encontrado' });
    }

    // Verificar si el usuario ya reaccionó con este tipo
    const existingReaction = await query(
      'SELECT id FROM forum_post_reactions WHERE post_id = ? AND user_id = ? AND reaction_type_id = ?',
      [postId, userId, reactionTypeId]
    );

    if (existingReaction.length > 0) {
      // Si ya existe, eliminar la reacción (toggle)
      await query(
        'DELETE FROM forum_post_reactions WHERE post_id = ? AND user_id = ? AND reaction_type_id = ?',
        [postId, userId, reactionTypeId]
      );
      
      // Actualizar contador en forum_posts
      await query(
        'UPDATE forum_posts SET reactions_count = reactions_count - 1 WHERE id = ? AND reactions_count > 0',
        [postId]
      );
      
      res.status(200).json({
        success: true,
        message: 'Reacción eliminada',
        action: 'removed'
      });
    } else {
      // Verificar si el usuario ya tiene otra reacción en este post
      const otherReaction = await query(
        'SELECT id FROM forum_post_reactions WHERE post_id = ? AND user_id = ?',
        [postId, userId]
      );

      if (otherReaction.length > 0) {
        // Actualizar la reacción existente
        await query(
          'UPDATE forum_post_reactions SET reaction_type_id = ?, created_at = NOW() WHERE post_id = ? AND user_id = ?',
          [reactionTypeId, postId, userId]
        );
        
        res.status(200).json({
          success: true,
          message: 'Reacción actualizada',
          action: 'updated'
        });
      } else {
        // Crear nueva reacción
        await query(
          'INSERT INTO forum_post_reactions (post_id, user_id, reaction_type_id, created_at) VALUES (?, ?, ?, NOW())',
          [postId, userId, reactionTypeId]
        );
        
        // Actualizar contador en forum_posts
        await query(
          'UPDATE forum_posts SET reactions_count = reactions_count + 1 WHERE id = ?',
          [postId]
        );
        
        res.status(200).json({
          success: true,
          message: 'Reacción agregada',
          action: 'added'
        });
      }
    }
  } catch (error) {
    console.error('Error al manejar reacción:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}