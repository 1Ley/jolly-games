'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  Filter,
  Calendar,
  User,
  Eye,
  MessageSquare,
  X,
  Gamepad2,
  Shield,
  Zap,
  Trophy,
  Settings,
  Server,
  PartyPopper,
  Bot,
  Wrench,
  Sword,
  Plane,
  Timer,
  Pickaxe,
  Target,
  Wand2,
  Crosshair,
  Users,
  Info,
} from 'lucide-react';
import { mockUpdates, UpdatePost } from '@/data/mock-data';
import Image from 'next/image';
import MinecraftAvatar from '@/components/ui/minecraft-avatar';
import { getImagePath } from '@/lib/assets';

// Function to process content - simplified to avoid hydration issues
function processContentWithEmojis(content: string): string {
  // Convert HTML img tags to have correct className attribute and ensure proper emoji sizing
  let processedContent = content.replace(
    /<img src="([^"]+)" alt="([^"]+)" class="([^"]+)" \/>/g,
    '<img src="$1" alt="$2" className="$3" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle;" />'
  );

  // Convert line breaks to <br> tags
  processedContent = processedContent.replace(/\n/g, '<br>');

  return processedContent;
}

export default function UpdatesPage() {
  const [selectedUpdate, setSelectedUpdate] = useState<UpdatePost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredUpdates = mockUpdates.filter(update => {
    const matchesSearch =
      update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      update.categories.includes(selectedCategory as any);
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'game':
        return <Gamepad2 className="h-4 w-4" />;
      case 'server':
        return <Server className="h-4 w-4" />;
      case 'event':
        return <PartyPopper className="h-4 w-4" />;
      case 'bot':
        return <Bot className="h-4 w-4" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4" />;
      case 'skywars':
        return <Plane className="h-4 w-4" />;
      case 'battlebox':
        return <Sword className="h-4 w-4" />;
      case 'beeptest':
        return <Timer className="h-4 w-4" />;
      case 'spleef':
        return <Pickaxe className="h-4 w-4" />;
      case 'survival-games':
        return <Target className="h-4 w-4" />;
      case 'random-kits':
        return <Wand2 className="h-4 w-4" />;
      case 'bow-spleef':
        return <Crosshair className="h-4 w-4" />;
      case 'tag-games':
        return <Users className="h-4 w-4" />;
      case 'caol':
        return <Shield className="h-4 w-4" />;
      case 'information':
        return <Info className="h-4 w-4" />;
      case 'jolly':
        return <PartyPopper className="h-4 w-4" />;
      case 'party':
        return <Users className="h-4 w-4" />;
      case 'market':
        return <Gamepad2 className="h-4 w-4" />;
      case 'discord':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'game':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'server':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'event':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'bot':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'maintenance':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'skywars':
        return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'battlebox':
        return 'bg-red-600/20 text-red-400 border-red-600/30';
      case 'beeptest':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'spleef':
        return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'survival-games':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'random-kits':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'bow-spleef':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'tag-games':
        return 'bg-lime-500/20 text-lime-400 border-lime-500/30';
      case 'caol':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'information':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'jolly':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'party':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'market':
        return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'discord':
        return 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-12">
      {/* Hero Banner */}
      <div
        className="relative h-[450px] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getImagePath('banner_updates.png')})`,
          maskImage:
            'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
        }}
      >
        {/* Dark overlay with vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="bg-gradient-radial absolute inset-0 from-transparent via-black/20 to-black/60" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-glow minecraft-font mb-6 text-5xl font-bold text-white md:text-6xl"
            >
              Updates
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto max-w-2xl text-xl text-gray-200"
            >
              Mantente al día con las últimas novedades, mejoras y eventos del
              servidor
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container relative z-20 mx-auto -mt-8 max-w-screen-2xl px-4">
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
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título o contenido..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
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
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all" className="bg-gray-800 text-white">
                Todas las Categorías
              </option>
              <option value="game" className="bg-gray-800 text-white">
                Game Updates
              </option>
              <option value="server" className="bg-gray-800 text-white">
                Server
              </option>
              <option value="maintenance" className="bg-gray-800 text-white">
                Maintenance
              </option>
              <option value="random-kits" className="bg-gray-800 text-white">
                Random Kits
              </option>
              <option value="skywars" className="bg-gray-800 text-white">
                SkyWars
              </option>
              <option value="battlebox" className="bg-gray-800 text-white">
                BattleBox
              </option>
              <option value="beeptest" className="bg-gray-800 text-white">
                BeepTest
              </option>
              <option value="spleef" className="bg-gray-800 text-white">
                Spleef
              </option>
              <option value="survival-games" className="bg-gray-800 text-white">
                Survival Games
              </option>
              <option value="bow-spleef" className="bg-gray-800 text-white">
                Bow Spleef
              </option>
              <option value="tag-games" className="bg-gray-800 text-white">
                Tag Games
              </option>
              <option value="caol" className="bg-gray-800 text-white">
                C.A.O.L.
              </option>
              <option value="event" className="bg-gray-800 text-white">
                Events
              </option>
              <option value="bot" className="bg-gray-800 text-white">
                Bot
              </option>
              <option value="information" className="bg-gray-800 text-white">
                Information
              </option>
              <option value="jolly" className="bg-gray-800 text-white">
                Jolly
              </option>
              <option value="party" className="bg-gray-800 text-white">
                Party
              </option>
              <option value="market" className="bg-gray-800 text-white">
                Market
              </option>
            </select>
          </div>
        </motion.div>

        {/* Updates Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {filteredUpdates && filteredUpdates.length > 0 ? (
            filteredUpdates
              .sort((a, b) => b.id - a.id) // Sort by ID descending (newest first)
              .map((update, index) => {
                return (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`bento-card group h-80 cursor-pointer transition-all duration-300 hover:scale-105 ${update.featured ? 'shadow-yellow-500/20 ring-2 ring-yellow-500/50' : ''}`}
                    style={{
                      background: `linear-gradient(135deg, ${update.gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})`,
                    }}
                    onClick={() => setSelectedUpdate(update)}
                  >
                    <div className="gradient-overlay" />
                    <div className="relative z-10 flex h-full flex-col p-6">
                      {/* Header with badges */}
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex max-w-[60%] flex-wrap gap-1">
                          {update.categories &&
                            update.categories
                              .slice(0, 3)
                              .map((category, idx) => (
                                <Badge
                                  key={idx}
                                  className={`${getCategoryColor(category)} border text-xs backdrop-blur-sm`}
                                >
                                  {getCategoryIcon(category)}
                                  <span className="minecraft-font ml-1 capitalize">
                                    {category.replace('-', ' ')}
                                  </span>
                                </Badge>
                              ))}
                          {update.categories &&
                            update.categories.length > 3 && (
                              <Badge className="border-gray-500/30 bg-gray-500/20 text-xs text-gray-400 backdrop-blur-sm">
                                +{update.categories.length - 3}
                              </Badge>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {update.featured && (
                            <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400 backdrop-blur-sm">
                              <Trophy className="mr-1 h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                          <span className="minecraft-font rounded bg-black/30 px-2 py-1 text-xs text-white">
                            #{update.id}
                          </span>
                        </div>
                      </div>

                      {/* Title and Image Row */}
                      <div
                        className={`flex items-start justify-between gap-3 ${update.imageUrl ? 'mb-2' : 'mb-3'}`}
                      >
                        <h3
                          className="minecraft-font flex-1 text-3xl font-black font-extrabold leading-tight"
                          style={{
                            textShadow:
                              '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0px rgba(0,0,0,0.5), 1px -1px 0px rgba(0,0,0,0.5), -1px 1px 0px rgba(0,0,0,0.5), 1px 1px 0px rgba(0,0,0,0.5)',
                          }}
                        >
                          <span className="text-red-500">Jolly</span>
                          <span className="ml-1 text-blue-500">Games</span>
                          <span className="ml-2 text-white">
                            {update.version}
                          </span>
                        </h3>

                        {/* Small Image Indicator */}
                        {update.imageUrl && (
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800/50">
                            <Image
                              src={update.imageUrl}
                              alt={`Imagen de ${update.title}`}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div
                        className="mb-4 line-clamp-3 flex-grow text-sm leading-relaxed text-gray-200"
                        dangerouslySetInnerHTML={{
                          __html: processContentWithEmojis(update.content),
                        }}
                      />

                      {/* Footer with metadata */}
                      <div className="mt-auto">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2 rounded bg-black/30 px-2 py-1">
                            <MinecraftAvatar
                              username={update.author}
                              size="sm"
                            />
                            <span className="text-xs text-gray-300">
                              by {update.author}
                            </span>
                          </div>
                          <span className="minecraft-font rounded bg-black/30 px-2 py-1 text-xs text-white">
                            {update.version}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="rounded bg-black/30 px-2 py-1 text-xs text-gray-300">
                            {update.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-gray-400">
                No se encontraron updates que coincidan con los filtros.
              </p>
            </div>
          )}
        </motion.div>

        {/* Detailed View Modal */}
        {selectedUpdate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bento-item max-h-[90vh] w-full max-w-4xl overflow-y-auto"
              style={{
                background: `linear-gradient(135deg, ${selectedUpdate.gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})`,
              }}
            >
              <div className="gradient-overlay" />
              <div className="relative z-10 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedUpdate.categories &&
                      selectedUpdate.categories.map((category, idx) => (
                        <Badge
                          key={idx}
                          className={`${getCategoryColor(category)} border backdrop-blur-sm`}
                        >
                          {getCategoryIcon(category)}
                          <span className="minecraft-font ml-1 capitalize">
                            {category.replace('-', ' ')}
                          </span>
                        </Badge>
                      ))}
                    {selectedUpdate.featured && (
                      <Badge className="border-yellow-500/30 bg-yellow-500/20 text-yellow-400 backdrop-blur-sm">
                        <Trophy className="mr-1 h-4 w-4" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedUpdate(null)}
                    className="bg-black/20 text-white/80 hover:bg-black/40 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <h2
                  className="minecraft-font mb-4 text-5xl font-black leading-tight"
                  style={{
                    textShadow:
                      '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0px rgba(0,0,0,0.5), 1px -1px 0px rgba(0,0,0,0.5), -1px 1px 0px rgba(0,0,0,0.5), 1px 1px 0px rgba(0,0,0,0.5)',
                  }}
                >
                  <span className="text-red-500">Jolly</span>
                  <span className="ml-1 text-blue-500">Games</span>
                  <span className="ml-2 text-white">
                    {selectedUpdate.version}
                  </span>
                </h2>

                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
                  <span className="minecraft-font rounded bg-black/30 px-3 py-1 text-white">
                    {selectedUpdate.version}
                  </span>
                  <span className="rounded bg-black/30 px-3 py-1 text-white">
                    {selectedUpdate.date}
                  </span>
                  <div className="flex items-center space-x-2 rounded bg-black/30 px-3 py-1 text-white">
                    <MinecraftAvatar
                      username={selectedUpdate.author}
                      size="sm"
                    />
                    <span>by {selectedUpdate.author}</span>
                  </div>
                  <span className="minecraft-font rounded bg-black/30 px-3 py-1 text-white">
                    #{selectedUpdate.id}
                  </span>
                </div>

                <div className="mb-6 rounded-lg bg-black/20 p-6 backdrop-blur-sm">
                  <div
                    className="text-lg leading-relaxed text-white"
                    dangerouslySetInnerHTML={{
                      __html: processContentWithEmojis(selectedUpdate.content),
                    }}
                  />
                </div>

                {selectedUpdate.imageUrl && (
                  <div className="overflow-hidden rounded-lg bg-gray-800/50">
                    <Image
                      src={selectedUpdate.imageUrl}
                      alt={`Imagen de ${selectedUpdate.title}`}
                      width={600}
                      height={300}
                      className="h-64 w-full bg-gray-900/30 object-contain"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
