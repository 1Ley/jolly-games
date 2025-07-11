'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, MessageSquare, Eye, Clock, User, Filter, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { forumService } from '@/lib/forum';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import CreateTopicModal from '@/components/forum/CreateTopicModal';
import TopicView from '@/components/forum/TopicView';
import MinecraftAvatar from '@/components/ui/minecraft-avatar';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topic_count: number;
  post_count: number;
}

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  replies_count: number;
  views_count: number;
  is_pinned: boolean;
  is_locked: boolean;
  user: {
    id: string;
    minecraft_username: string;
  };
  category: {
    id: string;
    name: string;
  };
  last_post?: {
    created_at: string;
    user: {
      minecraft_username: string;
    };
  };
}

const categoryColors = {
  'General': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Anuncios': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Soporte': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Sugerencias': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Off-Topic': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default function ForumPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'topic'>('list');

  const loadCategories = async () => {
    try {
      const response = await forumService.getCategories();
      setCategories(response.categories);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar categorías');
    }
  };

  const loadTopics = async (page = 1) => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit: 10
      };
      
      if (selectedCategory !== 'all') {
        params.categoryId = selectedCategory;
      }
      
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      
      const response = await forumService.getTopics(params);
      setTopics(response.topics);
      setCurrentPage(response.pagination.page);
      setTotalPages(response.pagination.totalPages);
    } catch (error: any) {
      toast.error(error.message || 'Error al cargar temas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadTopics(1);
  }, [selectedCategory, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadTopics(1);
  };

  const handleTopicCreated = () => {
    loadTopics(currentPage);
    loadCategories(); // Actualizar contadores
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setView('topic');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedTopicId(null);
    loadTopics(currentPage); // Recargar para actualizar contadores
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString('es-ES', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
  };

  if (view === 'topic' && selectedTopicId) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <TopicView topicId={selectedTopicId} onBack={handleBackToList} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 pt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <MessageSquare className="mx-auto mb-4 h-16 w-16 text-primary-500" />
          <h1 className="text-glow mb-4 font-minecraft text-4xl font-bold md:text-5xl">
            Foro de la Comunidad
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Únete a las discusiones y comparte con otros jugadores de JollyGames
          </p>
          {user && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="mt-6 bg-primary-600 hover:bg-primary-700"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Tema
            </Button>
          )}
        </motion.div>

        {/* Categories Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bento-grid mb-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass-card bento-item cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{category.name}</h3>
                <Badge
                  variant="secondary"
                  className={categoryColors[category.name] || 'bg-primary-500/20 text-primary-400'}
                >
                  {category.topic_count}
                </Badge>
              </div>
              <p className="text-gray-400 text-sm mb-3">{category.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{category.post_count} posts</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card mb-6"
        >
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar en el foro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white">
                    Todas las categorías
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="text-white"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="latest" className="text-white">
                    Más recientes
                  </SelectItem>
                  <SelectItem value="popular" className="text-white">
                    Más populares
                  </SelectItem>
                  <SelectItem value="replies" className="text-white">
                    Más respuestas
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {/* Topics List */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="glass-card cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                onClick={() => handleTopicClick(topic.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {topic.is_pinned && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          Fijado
                        </Badge>
                      )}
                      {topic.is_locked && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          Cerrado
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className={categoryColors[topic.category.name] || 'bg-primary-500/20 text-primary-400'}
                      >
                        {topic.category.name}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {topic.content}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MinecraftAvatar username={topic.user.minecraft_username} size={24} />
                        <span>{topic.user.minecraft_username}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(topic.created_at)}</span>
                      </div>
                      {topic.last_post && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>Última respuesta por {topic.last_post.user.minecraft_username}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{topic.replies_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{topic.views_count}</span>
                      </div>
                    </div>
                    {topic.last_post && (
                      <div className="text-xs text-gray-500 text-right">
                        {formatDate(topic.last_post.created_at)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => loadTopics(page)}
                className={currentPage === page ? "bg-primary-600 hover:bg-primary-700" : "border-gray-700 hover:border-primary-500"}
              >
                {page}
              </Button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && topics.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No se encontraron temas
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? 'Intenta con otros términos de búsqueda'
                : 'Sé el primero en crear un tema en esta categoría'}
            </p>
            {user && (
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Tema
              </Button>
            )}
          </motion.div>
        )}

        {/* Create Topic Modal */}
        <CreateTopicModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          categories={categories}
          onTopicCreated={handleTopicCreated}
        />
      </div>
    </div>
  );
}
