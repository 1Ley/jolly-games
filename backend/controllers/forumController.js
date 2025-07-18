const { pool } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Obtener todas las categorías del foro
const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(`
      SELECT 
        id,
        name,
        description,
        color,
        icon,
        topics_count,
        posts_count,
        created_at,
        updated_at
      FROM forum_categories 
      ORDER BY name ASC
    `);

    // Obtener último post para cada categoría
    const categoryIds = categories.map(cat => cat.id);
    let lastPostsMap = {};
    
    if (categoryIds.length > 0) {
      const [lastPostResult] = await pool.execute(`
        SELECT 
          ft.category_id,
          ft.id as topic_id,
          ft.title as topic_title,
          ft.created_at as topic_created_at,
          u.id as user_id,
          u.username,
          u.minecraft_username,
          u.role_id,
          ur.name as role_name,
          ur.color as role_color
        FROM forum_topics ft
        JOIN users u ON ft.user_id = u.id
        LEFT JOIN user_roles ur ON u.role_id = ur.id
        WHERE ft.category_id IN (${categoryIds.map(() => '?').join(',')})
        AND ft.id IN (
          SELECT MAX(id)
          FROM forum_topics
          WHERE category_id IN (${categoryIds.map(() => '?').join(',')})
          GROUP BY category_id
        )
      `, [...categoryIds, ...categoryIds]);

      // Obtener etiquetas para los usuarios de los últimos posts
      const userIds = lastPostResult.map(post => post.user_id);
      let userTagsMap = {};
      
      if (userIds.length > 0) {
        const [userTagsResult] = await pool.execute(`
          SELECT 
            uta.user_id,
            ut.id as tag_id,
            ut.name as tag_name,
            ut.color as tag_color,
            ut.category as tag_type
          FROM user_tag_assignments uta
          JOIN user_tags ut ON uta.tag_id = ut.id
          WHERE uta.user_id IN (${userIds.map(() => '?').join(',')}) AND uta.is_active = 1
          ORDER BY uta.user_id, ut.category, ut.name
        `, userIds);

        // Agrupar etiquetas por usuario
        userTagsResult.forEach(tag => {
          if (!userTagsMap[tag.user_id]) {
            userTagsMap[tag.user_id] = [];
          }
          userTagsMap[tag.user_id].push({
            id: tag.tag_id,
            name: tag.tag_name,
            color: tag.tag_color,
            type: tag.tag_type
          });
        });
      }

      // Crear mapa de últimos posts por categoría
      lastPostResult.forEach(post => {
        lastPostsMap[post.category_id] = {
          topicId: post.topic_id,
          topicTitle: post.topic_title,
          createdAt: post.topic_created_at,
          user: {
            id: post.user_id,
            username: post.username,
            minecraft_username: post.minecraft_username,
            role: {
              id: post.role_id,
              name: post.role_name,
              color: post.role_color
            },
            tags: userTagsMap[post.user_id] || []
          }
        };
      });
    }

    // Formatear categorías con información de último post
    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon,
      topicsCount: category.topics_count,
      postsCount: category.posts_count,
      createdAt: category.created_at,
      updatedAt: category.updated_at,
      lastPost: lastPostsMap[category.id] || null
    }));

    res.json({
      success: true,
      categories: formattedCategories
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener temas de una categoría específica o todos
const getTopics = async (req, res) => {
  try {
    const { categoryId, page = 1, limit = 20, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = '';
    let queryParams = [];

    if (categoryId && categoryId !== 'all') {
      whereClause = 'WHERE ft.category_id = ?';
      queryParams.push(categoryId);
    }

    if (search) {
      whereClause += whereClause ? ' AND ' : 'WHERE ';
      whereClause += '(ft.title LIKE ? OR ft.content LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    const [topics] = await pool.execute(`
      SELECT 
        ft.id,
        ft.category_id,
        ft.title,
        ft.content,
        ft.is_pinned,
        ft.is_locked,
        ft.views,
        ft.replies,
        ft.created_at,
        ft.updated_at,
        u.id as user_id,
        u.username,
        u.minecraft_username,
        u.role_id,
        ur.name as role_name,
        ur.color as role_color,
        fc.name as category_name,
        fc.color as category_color,
        fc.icon as category_icon,
        GROUP_CONCAT(ftt.tag) as tags
      FROM forum_topics ft
      JOIN users u ON ft.user_id = u.id
      LEFT JOIN user_roles ur ON u.role_id = ur.id
      JOIN forum_categories fc ON ft.category_id = fc.id
      LEFT JOIN forum_topic_tags ftt ON ft.id = ftt.topic_id
      ${whereClause}
      GROUP BY ft.id
      ORDER BY ft.is_pinned DESC, ft.updated_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, parseInt(limit), parseInt(offset)]);

    // Obtener etiquetas de usuarios para los temas
    const topicUserIds = [...new Set(topics.map(topic => topic.user_id))];
    let topicUserTags = [];
    if (topicUserIds.length > 0) {
      const placeholders = topicUserIds.map(() => '?').join(',');
      const [tagsResult] = await pool.execute(`
        SELECT 
          uta.user_id,
          ut.id as tag_id,
          ut.name as tag_name,
          ut.color as tag_color,
          ut.category as tag_type
        FROM user_tag_assignments uta
        JOIN user_tags ut ON uta.tag_id = ut.id
        WHERE uta.user_id IN (${placeholders}) AND uta.is_active = 1
        ORDER BY ut.category, ut.name
      `, topicUserIds);
      topicUserTags = tagsResult;
    }

    // Obtener el total de temas para paginación
    const [countResult] = await pool.execute(`
      SELECT COUNT(DISTINCT ft.id) as total
      FROM forum_topics ft
      JOIN users u ON ft.user_id = u.id
      JOIN forum_categories fc ON ft.category_id = fc.id
      ${whereClause}
    `, queryParams);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Formatear los temas
    const formattedTopics = topics.map(topic => {
      const topicUserTagsList = topicUserTags.filter(tag => tag.user_id === topic.user_id);
      return {
        id: topic.id,
        categoryId: topic.category_id,
        category: {
          id: topic.category_id,
          name: topic.category_name,
          color: topic.category_color,
          icon: topic.category_icon
        },
        userId: topic.user_id,
        user: {
          id: topic.user_id,
          username: topic.username,
          minecraft_username: topic.minecraft_username,
          role: {
            id: topic.role_id,
            name: topic.role_name,
            color: topic.role_color
          },
          tags: topicUserTagsList.map(tag => ({
            id: tag.tag_id,
            name: tag.tag_name,
            color: tag.tag_color,
            type: tag.tag_type
          }))
        },
        title: topic.title,
        content: topic.content,
        isPinned: Boolean(topic.is_pinned),
        isLocked: Boolean(topic.is_locked),
        views: topic.views,
        replies: topic.replies,
        createdAt: topic.created_at,
        updatedAt: topic.updated_at,
        tags: topic.tags ? topic.tags.split(',') : []
      };
    });

    res.json({
      success: true,
      topics: formattedTopics,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error al obtener temas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener un tema específico con sus posts
const getTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Obtener información del tema
    const [topicResult] = await pool.execute(`
      SELECT 
        ft.id,
        ft.category_id,
        ft.title,
        ft.content,
        ft.is_pinned,
        ft.is_locked,
        ft.views,
        ft.replies,
        ft.created_at,
        ft.updated_at,
        u.id as user_id,
        u.username,
        u.minecraft_username,
        u.role_id,
        ur.name as role_name,
        ur.color as role_color,
        fc.name as category_name,
        fc.color as category_color,
        fc.icon as category_icon,
        GROUP_CONCAT(ftt.tag) as tags
      FROM forum_topics ft
      JOIN users u ON ft.user_id = u.id
      LEFT JOIN user_roles ur ON u.role_id = ur.id
      JOIN forum_categories fc ON ft.category_id = fc.id
      LEFT JOIN forum_topic_tags ftt ON ft.id = ftt.topic_id
      WHERE ft.id = ?
      GROUP BY ft.id
    `, [topicId]);



    // Obtener etiquetas del usuario del tema
    if (topicResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tema no encontrado'
      });
    }

    const topic = topicResult[0];

    const [topicUserTagsResult] = await pool.execute(`
      SELECT 
        ut.id as tag_id,
        ut.name as tag_name,
        ut.color as tag_color,
        ut.category as tag_type
      FROM user_tag_assignments uta
      JOIN user_tags ut ON uta.tag_id = ut.id
      WHERE uta.user_id = ? AND uta.is_active = 1
      ORDER BY ut.category, ut.name
    `, [topic.user_id]);

    // Incrementar vistas
    await pool.execute('UPDATE forum_topics SET views = views + 1 WHERE id = ?', [topicId]);

    // Obtener posts del tema con roles y etiquetas
    const [posts] = await pool.execute(`
      SELECT 
        fp.id,
        fp.content,
        fp.is_edited,
        fp.edited_at,
        fp.likes,
        fp.dislikes,
        fp.reports,
        fp.created_at,
        fp.updated_at,
        u.id as user_id,
        u.username,
        u.minecraft_username,
        u.role_id,
        ur.name as role_name,
        ur.color as role_color,
        ur.permissions as role_permissions
      FROM forum_posts fp
      JOIN users u ON fp.user_id = u.id
      LEFT JOIN user_roles ur ON u.role_id = ur.id
      WHERE fp.topic_id = ?
      ORDER BY fp.created_at ASC
      LIMIT ? OFFSET ?
    `, [topicId, parseInt(limit), parseInt(offset)]);

    // Obtener etiquetas de usuarios para los posts
    const userIds = posts.map(post => post.user_id);
    let userTags = [];
    if (userIds.length > 0) {
      const placeholders = userIds.map(() => '?').join(',');
      const [tagsResult] = await pool.execute(`
        SELECT 
          uta.user_id,
          ut.id as tag_id,
          ut.name as tag_name,
          ut.color as tag_color,
          ut.category as tag_type
        FROM user_tag_assignments uta
        JOIN user_tags ut ON uta.tag_id = ut.id
        WHERE uta.user_id IN (${placeholders}) AND uta.is_active = 1
        ORDER BY ut.category, ut.name
      `, userIds);
      userTags = tagsResult;
    }

    // Obtener total de posts para paginación
    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM forum_posts WHERE topic_id = ?',
      [topicId]
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Formatear respuesta
    const formattedTopic = {
      id: topic.id,
      categoryId: topic.category_id,
      category: {
        id: topic.category_id,
        name: topic.category_name,
        color: topic.category_color,
        icon: topic.category_icon
      },
      userId: topic.user_id,
      user: {
        id: topic.user_id,
        username: topic.username,
        minecraft_username: topic.minecraft_username,
        role: {
          id: topic.role_id,
          name: topic.role_name,
          color: topic.role_color
        },
        tags: topicUserTagsResult.map(tag => ({
          id: tag.tag_id,
          name: tag.tag_name,
          color: tag.tag_color,
          type: tag.tag_type
        }))
      },
      title: topic.title,
      content: topic.content,
      isPinned: Boolean(topic.is_pinned),
      isLocked: Boolean(topic.is_locked),
      views: topic.views + 1, // Incluir la vista actual
      replies: topic.replies,
      createdAt: topic.created_at,
      updatedAt: topic.updated_at,
      tags: topic.tags ? topic.tags.split(',') : []
    };

    const formattedPosts = posts.map(post => {
      const postUserTags = userTags.filter(tag => tag.user_id === post.user_id);
      return {
        id: post.id,
        topicId: topicId,
        userId: post.user_id,
        user: {
          id: post.user_id,
          username: post.username,
          minecraft_username: post.minecraft_username,
          role: {
            id: post.role_id,
            name: post.role_name,
            color: post.role_color,
            permissions: post.role_permissions ? JSON.parse(post.role_permissions) : {}
          },
          tags: postUserTags.map(tag => ({
            id: tag.tag_id,
            name: tag.tag_name,
            color: tag.tag_color,
            type: tag.tag_type
          }))
        },
        content: post.content,
        isEdited: Boolean(post.is_edited),
        editedAt: post.edited_at,
        likes: post.likes || 0,
        dislikes: post.dislikes || 0,
        reports: post.reports,
        createdAt: post.created_at,
        updatedAt: post.updated_at
      };
    });

    res.json({
      success: true,
      topic: formattedTopic,
      posts: formattedPosts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error al obtener tema:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo tema
const createTopic = async (req, res) => {
  try {
    const { categoryId, title, content, tags = [] } = req.body;
    const userId = req.user.id;

    // Validaciones
    if (!categoryId || !title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Categoría, título y contenido son requeridos'
      });
    }

    if (title.length < 5 || title.length > 255) {
      return res.status(400).json({
        success: false,
        message: 'El título debe tener entre 5 y 255 caracteres'
      });
    }

    if (content.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'El contenido debe tener al menos 10 caracteres'
      });
    }

    // Verificar que la categoría existe
    const [categoryResult] = await pool.execute(
      'SELECT id FROM forum_categories WHERE id = ?',
      [categoryId]
    );

    if (categoryResult.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Categoría no válida'
      });
    }

    const topicId = uuidv4();

    // Crear el tema
    await pool.execute(`
      INSERT INTO forum_topics (id, category_id, user_id, title, content)
      VALUES (?, ?, ?, ?, ?)
    `, [topicId, categoryId, userId, title, content]);

    // Agregar tags si existen
    if (tags.length > 0) {
      const tagValues = tags.map(tag => [topicId, tag.toLowerCase().trim()]);
      const placeholders = tagValues.map(() => '(?, ?)').join(', ');
      const flatValues = tagValues.flat();
      
      await pool.execute(`
        INSERT INTO forum_topic_tags (topic_id, tag) VALUES ${placeholders}
      `, flatValues);
    }

    // Obtener el tema creado con toda la información
    const [newTopic] = await pool.execute(`
      SELECT 
        ft.id,
        ft.category_id,
        ft.title,
        ft.content,
        ft.is_pinned,
        ft.is_locked,
        ft.views,
        ft.replies,
        ft.created_at,
        ft.updated_at,
        u.id as user_id,
        u.username,
        u.minecraft_username,
        fc.name as category_name,
        fc.color as category_color,
        fc.icon as category_icon
      FROM forum_topics ft
      JOIN users u ON ft.user_id = u.id
      JOIN forum_categories fc ON ft.category_id = fc.id
      WHERE ft.id = ?
    `, [topicId]);

    const topic = newTopic[0];

    res.status(201).json({
      success: true,
      message: 'Tema creado exitosamente',
      topic: {
        id: topic.id,
        categoryId: topic.category_id,
        category: {
          id: topic.category_id,
          name: topic.category_name,
          color: topic.category_color,
          icon: topic.category_icon
        },
        userId: topic.user_id,
        user: {
          id: topic.user_id,
          username: topic.username,
          minecraft_username: topic.minecraft_username
        },
        title: topic.title,
        content: topic.content,
        isPinned: Boolean(topic.is_pinned),
        isLocked: Boolean(topic.is_locked),
        views: topic.views,
        replies: topic.replies,
        createdAt: topic.created_at,
        updatedAt: topic.updated_at,
        tags: tags
      }
    });
  } catch (error) {
    console.error('Error al crear tema:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Crear un nuevo post en un tema
const createPost = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // Validaciones
    if (!content || content.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'El contenido debe tener al menos 5 caracteres'
      });
    }

    // Verificar que el tema existe y no está bloqueado
    const [topicResult] = await pool.execute(
      'SELECT id, is_locked FROM forum_topics WHERE id = ?',
      [topicId]
    );

    if (topicResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Tema no encontrado'
      });
    }

    if (topicResult[0].is_locked) {
      return res.status(403).json({
        success: false,
        message: 'Este tema está cerrado y no se pueden agregar respuestas'
      });
    }

    const postId = uuidv4();

    // Crear el post
    await pool.execute(`
      INSERT INTO forum_posts (id, topic_id, user_id, content)
      VALUES (?, ?, ?, ?)
    `, [postId, topicId, userId, content.trim()]);

    // Obtener el post creado con información del usuario
    const [newPost] = await pool.execute(`
      SELECT 
        fp.id,
        fp.content,
        fp.is_edited,
        fp.edited_at,
        fp.likes,
        fp.dislikes,
        fp.reports,
        fp.created_at,
        fp.updated_at,
        u.id as user_id,
        u.username,
        u.minecraft_username,
        u.role
      FROM forum_posts fp
      JOIN users u ON fp.user_id = u.id
      WHERE fp.id = ?
    `, [postId]);

    const post = newPost[0];

    res.status(201).json({
      success: true,
      message: 'Respuesta creada exitosamente',
      post: {
        id: post.id,
        topicId: topicId,
        userId: post.user_id,
        user: {
          id: post.user_id,
          username: post.username,
          minecraft_username: post.minecraft_username,
          role: post.role
        },
        content: post.content,
        isEdited: Boolean(post.is_edited),
        editedAt: post.edited_at,
        likes: post.likes || 0,
        dislikes: post.dislikes || 0,
        reports: post.reports,
        createdAt: post.created_at,
        updatedAt: post.updated_at
      }
    });
  } catch (error) {
    console.error('Error al crear post:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Dar like a un post
const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Verificar que el post existe
    const [postResult] = await pool.execute(
      'SELECT id FROM forum_posts WHERE id = ?',
      [postId]
    );

    if (postResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    // Verificar si ya le dio like
    const [existingLike] = await pool.execute(
      'SELECT id FROM forum_post_likes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );

    if (existingLike.length > 0) {
      // Quitar like
      await pool.execute(
        'DELETE FROM forum_post_likes WHERE post_id = ? AND user_id = ?',
        [postId, userId]
      );
      
      res.json({
        success: true,
        message: 'Like removido',
        liked: false
      });
    } else {
      // Agregar like (esto automáticamente quitará el dislike si existe)
      await pool.execute(
        'INSERT INTO forum_post_likes (post_id, user_id) VALUES (?, ?)',
        [postId, userId]
      );
      
      res.json({
        success: true,
        message: 'Like agregado',
        liked: true
      });
    }
  } catch (error) {
    console.error('Error al dar like:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Dar dislike a un post
const dislikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Verificar que el post existe
    const [postResult] = await pool.execute(
      'SELECT id FROM forum_posts WHERE id = ?',
      [postId]
    );

    if (postResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    // Verificar si ya le dio dislike
    const [existingDislike] = await pool.execute(
      'SELECT id FROM forum_post_dislikes WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );

    if (existingDislike.length > 0) {
      // Quitar dislike
      await pool.execute(
        'DELETE FROM forum_post_dislikes WHERE post_id = ? AND user_id = ?',
        [postId, userId]
      );
      
      res.json({
        success: true,
        message: 'Dislike removido',
        disliked: false
      });
    } else {
      // Agregar dislike (esto automáticamente quitará el like si existe)
      await pool.execute(
        'INSERT INTO forum_post_dislikes (post_id, user_id) VALUES (?, ?)',
        [postId, userId]
      );
      
      res.json({
        success: true,
        message: 'Dislike agregado',
        disliked: true
      });
    }
  } catch (error) {
    console.error('Error al dar dislike:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener tipos de reacciones disponibles
const getReactionTypes = async (req, res) => {
  try {
    const [reactionTypes] = await pool.execute(`
      SELECT id, emoji, name, description
      FROM forum_reaction_types
      WHERE is_active = TRUE
      ORDER BY id ASC
    `);

    res.json({
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
};

// Agregar o quitar reacción a un post
const reactToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { reactionTypeId } = req.body;
    const userId = req.user.id;

    // Validaciones
    if (!reactionTypeId) {
      return res.status(400).json({
        success: false,
        message: 'Tipo de reacción requerido'
      });
    }

    // Verificar que el post existe
    const [postResult] = await pool.execute(
      'SELECT id FROM forum_posts WHERE id = ?',
      [postId]
    );

    if (postResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    // Verificar que el tipo de reacción existe y está activo
    const [reactionTypeResult] = await pool.execute(
      'SELECT id, emoji, name FROM forum_reaction_types WHERE id = ? AND is_active = TRUE',
      [reactionTypeId]
    );

    if (reactionTypeResult.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tipo de reacción no válido'
      });
    }

    // Verificar si ya tiene esta reacción
    const [existingReaction] = await pool.execute(
      'SELECT id FROM forum_post_reactions WHERE post_id = ? AND user_id = ? AND reaction_type_id = ?',
      [postId, userId, reactionTypeId]
    );

    if (existingReaction.length > 0) {
      // Quitar reacción
      await pool.execute(
        'DELETE FROM forum_post_reactions WHERE post_id = ? AND user_id = ? AND reaction_type_id = ?',
        [postId, userId, reactionTypeId]
      );
      
      // Actualizar contador de reacciones manualmente
      await pool.execute(
        'UPDATE forum_posts SET reactions_count = (SELECT COUNT(*) FROM forum_post_reactions WHERE post_id = ?) WHERE id = ?',
        [postId, postId]
      );
      
      res.json({
        success: true,
        message: `Reacción ${reactionTypeResult[0].emoji} removida`,
        reacted: false,
        reactionType: reactionTypeResult[0]
      });
    } else {
      // Agregar reacción
      await pool.execute(
        'INSERT INTO forum_post_reactions (post_id, user_id, reaction_type_id) VALUES (?, ?, ?)',
        [postId, userId, reactionTypeId]
      );
      
      // Actualizar contador de reacciones manualmente
      await pool.execute(
        'UPDATE forum_posts SET reactions_count = (SELECT COUNT(*) FROM forum_post_reactions WHERE post_id = ?) WHERE id = ?',
        [postId, postId]
      );
      
      res.json({
        success: true,
        message: `Reacción ${reactionTypeResult[0].emoji} agregada`,
        reacted: true,
        reactionType: reactionTypeResult[0]
      });
    }
  } catch (error) {
    console.error('Error al reaccionar al post:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener reacciones de un post
const getPostReactions = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id;

    // Verificar que el post existe
    const [postResult] = await pool.execute(
      'SELECT id FROM forum_posts WHERE id = ?',
      [postId]
    );

    if (postResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    // Obtener resumen de reacciones del post
    const [reactions] = await pool.execute(`
      SELECT 
        frt.id as reaction_type_id,
        frt.emoji,
        frt.name,
        COUNT(fpr.id) as count,
        ${userId ? `MAX(CASE WHEN fpr.user_id = ? THEN 1 ELSE 0 END) as user_reacted` : '0 as user_reacted'}
      FROM forum_reaction_types frt
      LEFT JOIN forum_post_reactions fpr ON frt.id = fpr.reaction_type_id AND fpr.post_id = ?
      WHERE frt.is_active = TRUE
      GROUP BY frt.id, frt.emoji, frt.name
      HAVING count > 0 OR user_reacted = 1
      ORDER BY count DESC, frt.id ASC
    `, userId ? [userId, postId] : [postId]);

    res.json({
      success: true,
      reactions: reactions.map(reaction => ({
        reactionTypeId: reaction.reaction_type_id,
        emoji: reaction.emoji,
        name: reaction.name,
        count: reaction.count,
        userReacted: Boolean(reaction.user_reacted)
      }))
    });
  } catch (error) {
    console.error('Error al obtener reacciones del post:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  getCategories,
  getTopics,
  getTopic,
  createTopic,
  createPost,
  likePost,
  dislikePost,
  getReactionTypes,
  reactToPost,
  getPostReactions
};