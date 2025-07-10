'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MessageSquare,
  Users,
  Clock,
  Pin,
  Lock,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatRelativeTime, formatNumber } from '@/lib/utils';
import { mockForumCategories, mockForumTopics } from '@/data/mock-data';
import Link from 'next/link';

const categoryColors = {
  Anuncios: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Discusión General': 'bg-green-500/20 text-green-400 border-green-500/30',
  Soporte: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Comunidad: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('latest');

  const filteredTopics = mockForumTopics.filter(topic => {
    const matchesCategory =
      selectedCategory === 'all' || topic.category.id === selectedCategory;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-glow mb-4 font-minecraft text-4xl font-bold md:text-5xl">
            Foro de la Comunidad
          </h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Conecta con otros jugadores, comparte estrategias y obtén ayuda de
            la comunidad
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Search */}
            <div className="bento-item mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar temas..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bento-item">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Categorías
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full rounded-lg px-3 py-2 text-left transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary-500/20 text-primary-300'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Todas las categorías
                </button>
                {mockForumCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-500/20 text-primary-300'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs">{category.topicsCount}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-white">
                  {selectedCategory === 'all'
                    ? 'Todos los temas'
                    : mockForumCategories.find(c => c.id === selectedCategory)
                        ?.name}
                </h2>
                <Badge variant="secondary">
                  {formatNumber(filteredTopics.length)} temas
                </Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
                <Button size="sm">Nuevo tema</Button>
              </div>
            </div>

            {/* Topics List */}
            <div className="space-y-4">
              {filteredTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bento-item cursor-pointer transition-colors hover:bg-white/10"
                >
                  <div className="flex space-x-4">
                    {/* Topic Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-800">
                        {topic.isPinned && (
                          <Pin className="h-5 w-5 text-yellow-400" />
                        )}
                        {topic.isLocked && (
                          <Lock className="h-5 w-5 text-red-400" />
                        )}
                        {!topic.isPinned && !topic.isLocked && (
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Topic Content */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white transition-colors hover:text-blue-300">
                            {topic.title}
                          </h3>
                          {topic.isPinned && (
                            <Badge
                              variant="outline"
                              className="border-yellow-500/30 bg-yellow-500/20 text-xs text-yellow-400"
                            >
                              Fijado
                            </Badge>
                          )}
                          {topic.isLocked && (
                            <Badge
                              variant="outline"
                              className="border-red-500/30 bg-red-500/20 text-xs text-red-400"
                            >
                              Cerrado
                            </Badge>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${categoryColors[topic.category.name as keyof typeof categoryColors]}`}
                        >
                          {
                            mockForumCategories.find(
                              c => c.id === topic.category.id
                            )?.name
                          }
                        </Badge>
                      </div>

                      <p className="mb-3 line-clamp-2 text-sm text-gray-400">
                        {topic.content}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>por {topic.user.username}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatRelativeTime(topic.createdAt)}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{topic.replies} respuestas</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{topic.views} vistas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex justify-center"
            >
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary-500/20 text-primary-300"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
