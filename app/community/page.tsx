'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Eye, 
  Filter, 
  Search, 
  Grid, 
  List, 
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Image as ImageIcon,
  Users,
  Swords,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { formatRelativeTime, formatNumber } from '@/lib/utils';
import { mockActivities } from '@/data/mock-data';

const activityTypeConfig = {
  screenshot: {
    icon: ImageIcon,
    color: 'text-blue-400',
    label: 'Captura',
  },
  artwork: {
    icon: Users,
    color: 'text-purple-400',
    label: 'Arte',
  },
  build: {
    icon: Swords,
    color: 'text-green-400',
    label: 'Construcción',
  },
  achievement: {
    icon: Heart,
    color: 'text-yellow-400',
    label: 'Logro',
  },
};

const filterOptions = [
  { id: 'all', label: 'Todas' },
  { id: 'screenshot', label: 'Capturas' },
  { id: 'artwork', label: 'Arte' },
  { id: 'build', label: 'Construcciones' },
  { id: 'achievement', label: 'Logros' },
];

const sortOptions = [
  { id: 'recent', label: 'Más recientes' },
  { id: 'popular', label: 'Más populares' },
  { id: 'commented', label: 'Más comentadas' },
];

export default function CommunityPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredActivities = mockActivities.filter(activity => {
    const matchesFilter = selectedFilter === 'all' || activity.type === selectedFilter;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (activity.description && activity.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    switch (selectedSort) {
      case 'popular':
        return b.likes - a.likes;
      case 'commented':
        return b.comments.length - a.comments.length;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const openLightbox = (activity: any, index: number) => {
    setSelectedActivity(activity);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setSelectedActivity(null);
    setLightboxOpen(false);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % sortedActivities.length;
    setLightboxIndex(nextIndex);
    setSelectedActivity(sortedActivities[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (lightboxIndex - 1 + sortedActivities.length) % sortedActivities.length;
    setLightboxIndex(prevIndex);
    setSelectedActivity(sortedActivities[prevIndex]);
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-minecraft text-glow">
            Galería de la Comunidad
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre las increíbles creaciones, capturas y logros de nuestra comunidad de jugadores
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bento-item mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar creaciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {filterOptions.map(option => (
                    <option key={option.id} value={option.id} className="bg-gray-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="bento-item group cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(activity, index)}
                >
                  {/* Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                      <span className="text-4xl opacity-50">🖼️</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                        {activity.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${activityTypeConfig[activity.type as keyof typeof activityTypeConfig].color}`}
                      >
                        {activityTypeConfig[activity.type as keyof typeof activityTypeConfig].label}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>por {activity.user.username}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{formatNumber(activity.likes)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{activity.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="bento-item group cursor-pointer"
                  onClick={() => openLightbox(activity, index)}
                >
                  <div className="flex space-x-4">
                    {/* Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                        <span className="text-2xl opacity-50">🖼️</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {activity.title}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${activityTypeConfig[activity.type as keyof typeof activityTypeConfig].color}`}
                        >
                          {activityTypeConfig[activity.type as keyof typeof activityTypeConfig].label}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">
                        {activity.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>por {activity.user.username}</span>
                          <span>{formatRelativeTime(activity.createdAt)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{formatNumber(activity.likes)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{activity.comments.length}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {selectedActivity.user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedActivity.title}</h3>
                      <p className="text-sm text-gray-400">por {selectedActivity.user.username}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={closeLightbox}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Image */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                    <span className="text-8xl opacity-30">🖼️</span>
                  </div>
                  
                  {/* Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant="outline" 
                      className={activityTypeConfig[selectedActivity.type as keyof typeof activityTypeConfig].color}
                    >
                      {activityTypeConfig[selectedActivity.type as keyof typeof activityTypeConfig].label}
                    </Badge>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{formatNumber(selectedActivity.likes)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{selectedActivity.comments.length}</span>
                      </div>
                      <span>{formatRelativeTime(selectedActivity.createdAt)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{selectedActivity.description}</p>
                  
                  {/* Comments Preview */}
                  {selectedActivity.comments.length > 0 && (
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="font-semibold text-white mb-3">Comentarios</h4>
                      <div className="space-y-3 max-h-32 overflow-y-auto">
                        {selectedActivity.comments.slice(0, 3).map((comment: any) => (
                          <div key={comment.id} className="flex space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white">
                                {comment.user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-white">{comment.user.username}</span>
                                <span className="text-xs text-gray-500">{formatRelativeTime(comment.createdAt)}</span>
                              </div>
                              <p className="text-sm text-gray-300">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}