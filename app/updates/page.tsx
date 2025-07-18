'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Filter, Calendar, User, Eye, MessageSquare, X, Gamepad2, Shield, Zap, Trophy, Settings, Server, PartyPopper, Bot, Wrench, Sword, Plane, Timer, Pickaxe, Target, Wand2, Crosshair, Users, Info } from 'lucide-react'
import { mockUpdates, UpdatePost } from '@/data/mock-data'
import Image from 'next/image'
import axios from 'axios'

// Function to process content - content already has HTML img tags
function processContentWithEmojis(content: string): string {
  // Content already contains HTML img tags, just return as is
  return content;
}

interface MinecraftAvatarProps {
  username: string;
  size?: number;
  className?: string;
}

function MinecraftAvatar({ username, size = 32, className = '' }: MinecraftAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState(`https://mc-heads.net/avatar/${username}/${size}`);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(
          `https://playerdb.co/api/player/minecraft/${username}`
        );
        if (
          response.data &&
          response.data.code === 'player.found' &&
          response.data.data.player.avatar
        ) {
          setAvatarUrl(response.data.data.player.avatar);
        }
      } catch (error) {
        console.error(`Could not fetch avatar for ${username}. Using fallback.`);
        setHasError(true);
      }
    };

    if (username && username !== 'steve') {
      fetchAvatar();
    }
  }, [username]);

  return (
    <Image
      src={hasError ? `https://mc-heads.net/avatar/steve/${size}` : avatarUrl}
      alt={`${username} avatar`}
      width={size}
      height={size}
      className={`rounded-md ${className}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (!hasError) {
          setHasError(true);
          target.src = `https://mc-heads.net/avatar/steve/${size}`;
        }
      }}
    />
  );
}

export default function UpdatesPage() {
  const [selectedUpdate, setSelectedUpdate] = useState<UpdatePost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredUpdates = mockUpdates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || update.categories.includes(selectedCategory as any)
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'game': return <Gamepad2 className="w-4 h-4" />
      case 'server': return <Server className="w-4 h-4" />
      case 'event': return <PartyPopper className="w-4 h-4" />
      case 'bot': return <Bot className="w-4 h-4" />
      case 'maintenance': return <Wrench className="w-4 h-4" />
      case 'skywars': return <Plane className="w-4 h-4" />
      case 'battlebox': return <Sword className="w-4 h-4" />
      case 'beeptest': return <Timer className="w-4 h-4" />
      case 'spleef': return <Pickaxe className="w-4 h-4" />
      case 'survival-games': return <Target className="w-4 h-4" />
      case 'random-kits': return <Wand2 className="w-4 h-4" />
      case 'bow-spleef': return <Crosshair className="w-4 h-4" />
      case 'tag-games': return <Users className="w-4 h-4" />
      case 'caol': return <Shield className="w-4 h-4" />
      case 'information': return <Info className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'game': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'server': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'event': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'bot': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'maintenance': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'skywars': return 'bg-sky-500/20 text-sky-400 border-sky-500/30'
      case 'battlebox': return 'bg-red-600/20 text-red-400 border-red-600/30'
      case 'beeptest': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'spleef': return 'bg-violet-500/20 text-violet-400 border-violet-500/30'
      case 'survival-games': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'random-kits': return 'bg-pink-500/20 text-pink-400 border-pink-500/30'
      case 'bow-spleef': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      case 'tag-games': return 'bg-lime-500/20 text-lime-400 border-lime-500/30'
      case 'caol': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
      case 'information': return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <main className="min-h-screen pb-12 pt-24">
      <div className="container mx-auto max-w-screen-2xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-glow minecraft-font text-4xl md:text-5xl font-bold mb-4">
            Updates
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Mantente al día con las últimas novedades, mejoras y eventos del servidor
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="bento-item p-4">
            <h3 className="mb-3 flex items-center text-sm font-semibold text-white">
              <Search className="mr-2 h-4 w-4" />
              Buscar Updates
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por título o contenido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-transparent py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="bento-item p-4">
            <h3 className="mb-3 flex items-center text-sm font-semibold text-white">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar por Categoría
            </h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-gray-800 py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all" className="bg-gray-800 text-white">Todas las Categorías</option>
              <option value="game" className="bg-gray-800 text-white">Game Updates</option>
              <option value="server" className="bg-gray-800 text-white">Server</option>
              <option value="maintenance" className="bg-gray-800 text-white">Maintenance</option>
              <option value="random-kits" className="bg-gray-800 text-white">Random Kits</option>
              <option value="skywars" className="bg-gray-800 text-white">SkyWars</option>
              <option value="battlebox" className="bg-gray-800 text-white">BattleBox</option>
              <option value="beeptest" className="bg-gray-800 text-white">BeepTest</option>
              <option value="spleef" className="bg-gray-800 text-white">Spleef</option>
              <option value="survival-games" className="bg-gray-800 text-white">Survival Games</option>
              <option value="bow-spleef" className="bg-gray-800 text-white">Bow Spleef</option>
              <option value="tag-games" className="bg-gray-800 text-white">Tag Games</option>
              <option value="caol" className="bg-gray-800 text-white">C.A.O.L.</option>
              <option value="event" className="bg-gray-800 text-white">Events</option>
              <option value="bot" className="bg-gray-800 text-white">Bot</option>
              <option value="information" className="bg-gray-800 text-white">Information</option>
            </select>
          </div>
        </motion.div>

        {/* Updates Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredUpdates
            .sort((a, b) => b.id - a.id) // Sort by ID descending (newest first)
            .map((update, index) => {
              const zIndex = filteredUpdates.length - index // Higher ID = higher z-index
              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 bento-card h-80 ${update.featured ? 'ring-2 ring-yellow-500/50 shadow-yellow-500/20' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, ${update.gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})`,
                    zIndex: zIndex,
                    position: 'relative'
                  }}
                  onClick={() => setSelectedUpdate(update)}
                >
                  <div className="gradient-overlay" />
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Header with badges */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap gap-1 max-w-[60%]">
                        {update.categories.slice(0, 3).map((category, idx) => (
                          <Badge key={idx} className={`${getCategoryColor(category)} border backdrop-blur-sm text-xs`}>
                            {getCategoryIcon(category)}
                            <span className="ml-1 capitalize minecraft-font">{category.replace('-', ' ')}</span>
                          </Badge>
                        ))}
                        {update.categories.length > 3 && (
                          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 backdrop-blur-sm text-xs">
                            +{update.categories.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {update.featured && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 backdrop-blur-sm">
                            <Trophy className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <span className="minecraft-font bg-black/30 px-2 py-1 rounded text-xs text-white">#{update.id}</span>
                      </div>
                    </div>
                    
                    {/* Title and Image Row */}
                    <div className={`flex items-start justify-between gap-3 ${update.imageUrl ? 'mb-2' : 'mb-3'}`}>
                      <h3 className="text-3xl font-black minecraft-font leading-tight font-extrabold flex-1" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0px rgba(0,0,0,0.5), 1px -1px 0px rgba(0,0,0,0.5), -1px 1px 0px rgba(0,0,0,0.5), 1px 1px 0px rgba(0,0,0,0.5)'}}>
                        <span className="text-red-500">
                          Jolly
                        </span>
                        <span className="text-blue-500 ml-1">
                          Games
                        </span>
                        <span className="text-white ml-2">
                          {update.version}
                        </span>
                      </h3>
                      
                      {/* Small Image Indicator */}
                      {update.imageUrl && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800/50 flex-shrink-0">
                          <Image 
                            src={update.imageUrl} 
                            alt={`Imagen de ${update.title}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div 
                      className="text-gray-200 text-sm mb-4 flex-grow line-clamp-3 leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: processContentWithEmojis(update.content).replace(/\n/g, '<br>') }}
                    />
                    
                    {/* Footer with metadata */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 bg-black/30 px-2 py-1 rounded">
                          <MinecraftAvatar username={update.author} size={16} />
                          <span className="text-xs text-gray-300">by {update.author}</span>
                        </div>
                        <span className="minecraft-font bg-black/30 px-2 py-1 rounded text-xs text-white">{update.version}</span>
                      </div>
                      <div className="text-right">
                        <span className="bg-black/30 px-2 py-1 rounded text-xs text-gray-300">{update.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
        </motion.div>

        {/* Detailed View Modal */}
        {selectedUpdate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bento-item max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: `linear-gradient(135deg, ${selectedUpdate.gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})`,
              }}
            >
              <div className="gradient-overlay" />
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedUpdate.categories.map((category, idx) => (
                      <Badge key={idx} className={`${getCategoryColor(category)} border backdrop-blur-sm`}>
                        {getCategoryIcon(category)}
                        <span className="ml-1 capitalize minecraft-font">{category.replace('-', ' ')}</span>
                      </Badge>
                    ))}
                    {selectedUpdate.featured && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 backdrop-blur-sm">
                        <Trophy className="w-4 h-4 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedUpdate(null)}
                    className="text-white/80 hover:text-white bg-black/20 hover:bg-black/40"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <h2 className="text-5xl font-black mb-4 minecraft-font leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0px rgba(0,0,0,0.5), 1px -1px 0px rgba(0,0,0,0.5), -1px 1px 0px rgba(0,0,0,0.5), 1px 1px 0px rgba(0,0,0,0.5)'}}>
                  <span className="text-red-500">
                    Jolly
                  </span>
                  <span className="text-blue-500 ml-1">
                    Games
                  </span>
                  <span className="text-white ml-2">
                    {selectedUpdate.version}
                  </span>
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                  <span className="minecraft-font bg-black/30 px-3 py-1 rounded text-white">{selectedUpdate.version}</span>
                  <span className="bg-black/30 px-3 py-1 rounded text-white">{selectedUpdate.date}</span>
                  <div className="flex items-center space-x-2 bg-black/30 px-3 py-1 rounded text-white">
                    <MinecraftAvatar username={selectedUpdate.author} size={20} />
                    <span>by {selectedUpdate.author}</span>
                  </div>
                  <span className="minecraft-font bg-black/30 px-3 py-1 rounded text-white">#{selectedUpdate.id}</span>
                </div>
                
                <div className="bg-black/20 rounded-lg p-6 backdrop-blur-sm mb-6">
                  <div 
                    className="text-white leading-relaxed whitespace-pre-line text-lg"
                    dangerouslySetInnerHTML={{ __html: processContentWithEmojis(selectedUpdate.content).replace(/\n/g, '<br>') }}
                  />
                </div>
                
                {selectedUpdate.imageUrl && (
                  <div className="rounded-lg overflow-hidden bg-gray-800/50">
                    <Image 
                      src={selectedUpdate.imageUrl} 
                      alt={`Imagen de ${selectedUpdate.title}`}
                      width={600}
                      height={300}
                      className="w-full h-64 object-contain bg-gray-900/30"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  )
}