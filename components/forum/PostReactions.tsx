'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';

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

interface PostReactionsProps {
  postId: string;
  reactions: PostReaction[];
  onReactionUpdate: (postId: string, reactions: PostReaction[]) => void;
}

export default function PostReactions({ postId, reactions, onReactionUpdate }: PostReactionsProps) {
  const { user } = useAuth();
  const [reactionTypes, setReactionTypes] = useState<ReactionType[]>([]);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadReactionTypes = async () => {
    try {
      const response = await fetch('/api/forum/reaction-types');
      if (response.ok) {
        const data = await response.json();
        setReactionTypes(data.reactionTypes);
      }
    } catch (error) {
      console.error('Error loading reaction types:', error);
    }
  };

  const loadPostReactions = async () => {
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

  useEffect(() => {
    loadReactionTypes();
  }, []);

  // Cerrar picker al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showReactionPicker && !(event.target as Element).closest('.reaction-picker-container')) {
        setShowReactionPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showReactionPicker]);

  const handleReaction = async (reactionTypeId: number) => {
    if (!user) {
      toast.error('Debes iniciar sesión para reaccionar');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/forum/posts/${postId}/react`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reactionTypeId })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Actualizar reacciones
        const updatedReactions = await loadPostReactions();
        onReactionUpdate(postId, updatedReactions);
        
        // Mostrar mensaje apropiado
        if (data.action === 'added') {
          toast.success('¡Reacción agregada!');
        } else if (data.action === 'removed') {
          toast.success('Reacción eliminada');
        } else if (data.action === 'updated') {
          toast.success('Reacción actualizada');
        }
        
        setShowReactionPicker(false);
      } else {
        toast.error('Error al reaccionar');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al reaccionar');
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableReactions = () => {
    // Mostrar todos los tipos de reacciones disponibles
    return reactionTypes;
  };

  const hasReactions = reactions && reactions.length > 0;

  return (
    <div className="space-y-3">
      {/* Reacciones existentes */}
      <AnimatePresence>
        {hasReactions && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap gap-2"
          >
            {reactions.map((reaction) => (
              <motion.button
                key={reaction.reactionTypeId}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleReaction(reaction.reactionTypeId)}
                disabled={isLoading}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  reaction.userReacted 
                    ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 border border-primary-500/40 shadow-lg shadow-primary-500/10' 
                    : 'bg-gray-700/40 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30 hover:border-gray-500/50'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={`${reaction.name} - ${reaction.count} ${reaction.count === 1 ? 'persona' : 'personas'}`}
              >
                <span className="text-base">{reaction.emoji}</span>
                <span className="font-semibold">{reaction.count}</span>
                {reaction.userReacted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 bg-primary-400 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón para agregar reacción */}
      <div className="relative reaction-picker-container">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowReactionPicker(!showReactionPicker)}
          disabled={isLoading}
          className="flex items-center gap-1 px-2 py-1 h-auto text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-200"
        >
          {hasReactions ? (
            <Plus className="w-3 h-3" />
          ) : (
            <Smile className="w-3 h-3" />
          )}
          <span className="text-xs">
            {hasReactions ? 'Agregar' : 'Reaccionar'}
          </span>
        </Button>
        
        {/* Picker de reacciones */}
        <AnimatePresence>
          {showReactionPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 p-3 bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-xl shadow-2xl z-20 min-w-[280px]"
            >
              <div className="text-xs text-gray-400 mb-2 font-medium">Elige una reacción:</div>
              <div className="grid grid-cols-6 gap-2">
                {getAvailableReactions().map((reactionType) => {
                  const existingReaction = reactions.find(r => r.reactionTypeId === reactionType.id);
                  const isUserReacted = existingReaction?.userReacted || false;
                  
                  return (
                    <motion.button
                      key={reactionType.id}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleReaction(reactionType.id)}
                      disabled={isLoading}
                      className={`p-2 rounded-lg transition-all duration-200 text-2xl flex items-center justify-center aspect-square group relative ${
                        isUserReacted 
                          ? 'bg-primary-500/20 border border-primary-500/40' 
                          : 'hover:bg-gray-700/50'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={reactionType.name}
                    >
                      <span className={`${!isLoading ? 'group-hover:animate-bounce' : ''}`}>
                        {reactionType.emoji}
                      </span>
                      {existingReaction && (
                        <div className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                          {existingReaction.count}
                        </div>
                      )}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        {reactionType.name}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}