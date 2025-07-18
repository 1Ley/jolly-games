const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require('../middleware/auth');

// Obtener tipos de reacciones disponibles
router.get('/types', async (req, res) => {
  try {
    const querySQL = 'SELECT id, name, emoji FROM forum_reaction_types ORDER BY id';
    const reactionTypes = await query(querySQL);
    res.json(reactionTypes);
  } catch (error) {
    console.error('Error al obtener tipos de reacciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener reacciones de un post
router.get('/post/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    
    const querySQL = `
      SELECT 
        rt.name as reaction_type,
        rt.emoji,
        COUNT(*) as count
      FROM forum_post_reactions fpr
      JOIN forum_reaction_types rt ON fpr.reaction_type_id = rt.id
      WHERE fpr.post_id = ?
      GROUP BY rt.id, rt.name, rt.emoji
    `;
    
    const reactions = await query(querySQL, [postId]);
    
    // Formatear respuesta
    const formattedReactions = {};
    reactions.forEach(reaction => {
      formattedReactions[reaction.reaction_type] = {
        count: reaction.count,
        emoji: reaction.emoji
      };
    });
    
    res.json(formattedReactions);
  } catch (error) {
    console.error('Error al obtener reacciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener reacción específica del usuario para un post
router.get('/post/:postId/user', verifyToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    
    const querySQL = `
      SELECT rt.name as reaction_type, rt.emoji
      FROM forum_post_reactions fpr
      JOIN forum_reaction_types rt ON fpr.reaction_type_id = rt.id
      WHERE fpr.post_id = ? AND fpr.user_id = ?
    `;
    
    const result = await query(querySQL, [postId, userId]);
    
    if (result.length > 0) {
      res.json({
        hasReaction: true,
        reactionType: result[0].reaction_type,
        emoji: result[0].emoji
      });
    } else {
      res.json({ hasReaction: false });
    }
  } catch (error) {
    console.error('Error al obtener reacción del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Agregar o actualizar reacción
router.post('/post/:postId', verifyToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const { reactionType } = req.body;
    const userId = req.user.id;
    
    if (!reactionType) {
      return res.status(400).json({ error: 'Tipo de reacción requerido' });
    }
    
    // Verificar que el tipo de reacción existe
    const reactionTypeQuery = 'SELECT id FROM forum_reaction_types WHERE name = ?';
    const reactionTypeResult = await query(reactionTypeQuery, [reactionType]);
    
    if (reactionTypeResult.length === 0) {
      return res.status(400).json({ error: 'Tipo de reacción inválido' });
    }
    
    const reactionTypeId = reactionTypeResult[0].id;
    
    // Verificar si el post existe
    const postQuery = 'SELECT id FROM forum_posts WHERE id = ?';
    const postResult = await query(postQuery, [postId]);
    
    if (postResult.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    // Verificar si el usuario ya tiene una reacción en este post
    const existingReactionQuery = 'SELECT id FROM forum_post_reactions WHERE post_id = ? AND user_id = ?';
    const existingReaction = await query(existingReactionQuery, [postId, userId]);
    
    if (existingReaction.length > 0) {
      // Actualizar reacción existente
      const updateQuery = 'UPDATE forum_post_reactions SET reaction_type_id = ? WHERE post_id = ? AND user_id = ?';
      await query(updateQuery, [reactionTypeId, postId, userId]);
    } else {
      // Crear nueva reacción
      const insertQuery = `
        INSERT INTO forum_post_reactions (id, post_id, user_id, reaction_type_id)
        VALUES (?, ?, ?, ?)
      `;
      await query(insertQuery, [uuidv4(), postId, userId, reactionTypeId]);
    }
    
    res.json({ success: true, message: 'Reacción actualizada' });
  } catch (error) {
    console.error('Error al agregar/actualizar reacción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar reacción
router.delete('/post/:postId', verifyToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    
    const deleteQuery = 'DELETE FROM forum_post_reactions WHERE post_id = ? AND user_id = ?';
    const result = await query(deleteQuery, [postId, userId]);
    
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Reacción eliminada' });
    } else {
      res.status(404).json({ error: 'Reacción no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar reacción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;