'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Heart, Send, Loader2, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { forumService } from '@/lib/forum';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import MinecraftAvatar from '@/components/ui/minecraft-avatar';
import PostReactions from './PostReactions';

interface ReactionType {
  id: number;
  emoji: string;
  name: string;
  description?: string;
}

interface PostReaction {
  reactionTypeId: number;
  emoji: string;
  name: string;
  count: number;
  userReacted: boolean;
}

interface Post {
  id: string;
  content: string;
  created_at: string;
  likes: number;
  dislikes: number;
  user_liked: boolean;
  user_disliked: boolean;
  reactions?: PostReaction[];
  user: {
    id: string;
    minecraft_username: string;
  };
}

interface Topic {
  id: string;
  title: string;
  content: string;
  created_at: string;
  replies_count: number;
  views_count: number;
  user: {
    id: string;
    minecraft_username: string;
  };
  category: {
    id: string;
    name: string;
  };
}

interface TopicViewProps {
  topicId: string;
  onBack: () => void;
}

export default function TopicView({ topicId, onBack }: TopicViewProps) {
  const { user } = useAuth();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);




  const loadPostReactions = async (postId: string) => {
    try {
      const response = await fetch(`/api/forum/posts/${postId}/reactions`, {
        headers: user ? {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        } : {}
      });
      if (response.ok) {
        const data = await response.json();
        return data.reactions;
      }
    } catch (error) {
      console.error('Error loading post reactions:', error);
    }
    return [];
  };

  const loadTopic = async (page = 1) => {
    try {
      setLoading(true);
      const response = await forumService.getTopic(topicId, { page, limit: 10 });
      
      if (page === 1) {
        setTopic(response.topic);
      }
      
      // Cargar reacciones para cada post
      const postsWithReactions = await Promise.all(
        response.posts.map(async (post: Post) => {
          const reactions = await loadPostReactions(post.id);
          return { ...post, reactions };
        })
      );
      
      setPosts(postsWithReactions);
      setCurrentPage(response.pagination.page);
      setTotalPages(response.pagination.totalPages);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar el tema');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopic();
  }, [topicId]);



  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) {
      toast.error('El contenido del post no puede estar vacío');
      return;
    }

    if (!user) {
      toast.error('Debes iniciar sesión para comentar');
      return;
    }

    setIsSubmittingPost(true);
    
    try {
      await forumService.createPost(topicId, newPostContent.trim());
      setNewPostContent('');
      toast.success('Comentario creado exitosamente');
      // Recargar la última página para ver el nuevo post
      await loadTopic(totalPages);
    } catch (error: any) {
      toast.error(error.message || 'Error al crear el comentario');
    } finally {
      setIsSubmittingPost(false);
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user) {
      toast.error('Debes iniciar sesión para dar like');
      return;
    }

    try {
      const response = await fetch(`/api/forum/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // Recargar el tema para actualizar los likes
        loadTopic(currentPage);
      } else {
        toast.error('Error al dar like');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al dar like');
    }
  };

  const handleDislikePost = async (postId: string) => {
    if (!user) {
      toast.error('Debes iniciar sesión para dar dislike');
      return;
    }

    try {
      const response = await fetch(`/api/forum/posts/${postId}/dislike`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // Recargar el tema para actualizar los dislikes
        loadTopic(currentPage);
      } else {
        toast.error('Error al dar dislike');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al dar dislike');
    }
  };

  const handleReactionUpdate = (postId: string, reactions: PostReaction[]) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, reactions }
          : post
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Ahora mismo';
    } else if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInMinutes < 1440) { // 24 horas
      const hours = Math.floor(diffInMinutes / 60);
      return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    } else if (diffInMinutes < 10080) { // 7 días
      const days = Math.floor(diffInMinutes / 1440);
      return `Hace ${days} día${days > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  if (loading && !topic) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Tema no encontrado</p>
        <Button onClick={onBack} className="mt-4">
          Volver al foro
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al foro
        </Button>
      </div>

      {/* Topic Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card bento-item p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Badge className="mb-3 bg-primary-500/20 text-primary-400 border-primary-500/30">
              {topic.category.name}
            </Badge>
            <h1 className="text-glow font-minecraft text-2xl font-bold text-white mb-3">{topic.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MinecraftAvatar username={topic.user.minecraft_username} size={24} />
                <span className="font-medium">{topic.user.minecraft_username}</span>
              </div>
              <span className="text-primary-400">{formatDate(topic.created_at)}</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {topic.replies_count} respuestas
                </span>
                <span>{topic.views_count} vistas</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{topic.content}</p>
        </div>
      </motion.div>

      {/* Posts */}
      <div className="space-y-3">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card bento-item p-4 hover:bg-gray-800/30 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <MinecraftAvatar username={post.user.minecraft_username} size={28} />
                <div>
                  <div className="font-medium text-white text-sm">{post.user.minecraft_username}</div>
                  <div className="text-xs text-primary-400">{formatDate(post.created_at)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-1 px-2 py-1 h-auto ${post.user_liked ? 'text-green-400 bg-green-500/10' : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10'} transition-all duration-200`}
                >
                  <ThumbsUp className={`w-3 h-3 ${post.user_liked ? 'fill-current' : ''}`} />
                  <span className="text-xs">{post.likes || 0}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDislikePost(post.id)}
                  className={`flex items-center gap-1 px-2 py-1 h-auto ${post.user_disliked ? 'text-red-400 bg-red-500/10' : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'} transition-all duration-200`}
                >
                  <ThumbsDown className={`w-3 h-3 ${post.user_disliked ? 'fill-current' : ''}`} />
                  <span className="text-xs">{post.dislikes || 0}</span>
                </Button>

              </div>
            </div>
            
            <div className="pl-10">
              <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">{post.content}</p>
              
              {/* Sistema de reacciones */}
              <div className="mt-4">
                <PostReactions
                  postId={post.id}
                  reactions={post.reactions || []}
                  onReactionUpdate={handleReactionUpdate}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => loadTopic(page)}
              className={currentPage === page ? "bg-primary-600 hover:bg-primary-700" : "border-gray-700 hover:bg-primary-600/20"}
            >
              {page}
            </Button>
          ))}
        </div>
      )}

      {/* Create Post Form */}
      {user ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card bento-item p-6"
        >
          <h3 className="text-glow font-minecraft text-lg font-semibold text-white mb-4">Responder al tema</h3>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <Textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Escribe tu respuesta..."
              disabled={isSubmittingPost}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 min-h-[100px] resize-none focus:border-primary-500 transition-colors"
              maxLength={2000}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">
                <span className={newPostContent.length > 1800 ? 'text-yellow-400' : newPostContent.length > 1900 ? 'text-red-400' : ''}>
                  {newPostContent.length}/2000
                </span>
              </div>
              <Button
                type="submit"
                disabled={isSubmittingPost || !newPostContent.trim()}
                className="bg-primary-600 hover:bg-primary-700 transition-all duration-200"
              >
                {isSubmittingPost ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Responder
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="glass-card bento-item p-6 text-center">
          <User className="w-12 h-12 mx-auto mb-4 text-primary-500" />
          <p className="text-gray-400 mb-4">Debes iniciar sesión para responder a este tema</p>
          <Button className="bg-primary-600 hover:bg-primary-700">
            Iniciar Sesión
          </Button>
        </div>
      )}
    </div>
  );
}