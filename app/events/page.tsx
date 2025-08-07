'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Users, Clock, Star, X, ChevronRight, Medal, Menu, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import MinecraftAvatar from '@/components/ui/minecraft-avatar';
import { mockEvents } from '@/data/mock-data';
import { getEmojiPath, getImagePath } from '@/lib/assets';

interface Team {
  id: string;
  name: string;
  color: string;
  emoji: string;
  players: string[];
  placement: number | null;
}

interface EventData {
  id: string;
  name: string;
  description: string;
  date: string;
  status: string;
  teams: Team[];
}

export default function EventsPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventData>(mockEvents.currentEvent);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const currentEvent = selectedEvent;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <Badge className="border-blue-500/30 bg-blue-500/20 text-blue-400">
            <Clock className="mr-1 h-3 w-3" />
            Próximamente
          </Badge>
        );
      case 'live':
        return (
          <Badge className="border-red-500/30 bg-red-500/20 text-red-400">
            <Star className="mr-1 h-3 w-3" />
            En Vivo
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
            <Trophy className="mr-1 h-3 w-3" />
            Completado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[350px] overflow-hidden"
        style={{
          backgroundImage: `url(${getImagePath('fondo_events.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maskImage:
            'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
        }}
      >
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div
          className="bg-gradient-radial absolute inset-0 from-transparent via-black/20 to-black/40"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-glow mb-4 font-minecraft text-4xl font-bold text-white md:text-5xl"
            >
              Historial de Eventos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto max-w-2xl text-lg text-gray-200"
            >
              Explora todos los eventos pasados y actuales de Jolly Games
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Content with Sidebar */}
      <div className="relative z-20">
        {/* Mobile Menu Button */}
        <div className="sticky top-4 z-30 mx-6 mb-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center space-x-2 rounded-lg bg-gray-800/90 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-gray-700/90"
          >
            <Menu className="h-5 w-5" />
            <span>Ver Eventos</span>
          </button>
        </div>

        {/* Container for organized layout */}
        <div className="mx-auto max-w-[2000px] px-6">
          <div className="flex gap-8">
            {/* Sidebar - Left side - Hidden on mobile */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden w-[380px] flex-shrink-0 lg:block"
              style={{ width: '380px', minWidth: '380px', maxWidth: '380px' }}
            >
              <div className="bento-item sticky top-6">
                <div className="p-6">
                  <h2 className="mb-8 flex items-center space-x-2 text-xl font-bold text-white">
                    <Trophy className="h-6 w-6 text-yellow-400" />
                    <span>Eventos</span>
                  </h2>
                  
                  {/* Current Event */}
                  <div className="mb-8">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
                      Evento Actual
                    </h3>
                    <motion.div
                      className={`bento-item cursor-pointer p-5 min-h-[80px] transition-all duration-200 ${
                        selectedEvent.id === mockEvents.currentEvent.id
                          ? 'border-blue-500/50 bg-blue-500/10'
                          : 'hover:border-white/20 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedEvent(mockEvents.currentEvent)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 pr-4">
                          <h4 className="font-semibold text-white text-base leading-tight">{mockEvents.currentEvent.name}</h4>
                          <p className="text-sm text-gray-400 mt-2">{mockEvents.currentEvent.date}</p>
                        </div>
                        <div className="flex items-center space-x-3 flex-shrink-0">
                          <div className="flex-shrink-0">
                            {getStatusBadge(mockEvents.currentEvent.status)}
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Historical Events */}
                  <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
                      Eventos Pasados
                    </h3>
                    <div className="space-y-4">
                      {mockEvents.historicalEvents.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                          className={`bento-item cursor-pointer p-5 min-h-[90px] transition-all duration-200 ${
                            selectedEvent.id === event.id
                              ? 'border-green-500/50 bg-green-500/10'
                              : 'hover:border-white/20 hover:bg-white/10'
                          }`}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 pr-4">
                              <h4 className="font-semibold text-white text-base leading-tight">{event.name}</h4>
                              <p className="text-sm text-gray-400 mt-2">
                                {formatDate(event.date)}
                              </p>
                              <div className="mt-3 flex items-center space-x-2">
                                <Medal className="h-3 w-3 text-yellow-400" />
                                <span className="text-xs text-yellow-400">
                                  Ganador: {event.winner}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Event Info - Full width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bento-item mb-8"
              >
                <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                  <div className="flex-1">
                    <h2 className="mb-2 flex items-center space-x-3 text-2xl font-bold text-white">
                      <Image
                        src={getEmojiPath('Copa.png')}
                        alt="Copa"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                      />
                      <span>{currentEvent.name}</span>
                    </h2>
                    <p className="mb-3 text-gray-400">{currentEvent.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300">
                          {formatDate(currentEvent.date)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">
                          {currentEvent.teams.length} equipos
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(currentEvent.status)}
                  </div>
                </div>
              </motion.div>

              {/* Teams Grid - Responsive */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                  {currentEvent.teams.map((team, index) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:border-white/20 w-full"
                      style={{
                        background: `linear-gradient(135deg, ${team.color}20 0%, ${team.color}10 100%)`,
                        borderColor: `${team.color}40`,
                      }}
                      onClick={() =>
                        setSelectedTeam(selectedTeam?.id === team.id ? null : team)
                      }
                    >
                    {/* Team Header */}
                    <div
                      className="p-6 text-center"
                      style={{
                        background: `linear-gradient(135deg, ${team.color}30 0%, ${team.color}20 100%)`,
                      }}
                    >
                      <div className="mb-4 flex justify-center">
                        <div
                              className="flex h-16 w-16 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-110"
                              style={{
                                borderColor: team.color,
                                background: `${team.color}20`,
                              }}
                            >
                              <Image
                                src={team.emoji}
                                alt={team.name}
                                width={32}
                                height={32}
                                className="h-8 w-8"
                              />
                            </div>
                      </div>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <h3
                          className="text-xl font-bold transition-colors"
                          style={{ color: team.color }}
                        >
                          {team.name}
                        </h3>
                        {team.placement === 1 && (
                          <Crown className="h-5 w-5 text-yellow-400" />
                        )}
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                         <Users className="h-4 w-4" />
                         <span>{team.players.length} jugadores</span>
                       </div>
                       {team.placement === 1 && (
                         <div className="mt-2 flex justify-center">
                           <span className="inline-flex items-center rounded-full bg-yellow-400/20 px-2 py-1 text-xs font-medium text-yellow-400">
                             🏆 GANADOR
                           </span>
                         </div>
                       )}
                    </div>

                    {/* Team Players */}
                    <div className="p-4">
                      <div className="space-y-2">
                        {team.players.map((player, playerIndex) => (
                          <div
                            key={playerIndex}
                            className="flex items-center space-x-3 rounded-lg bg-white/5 p-2 transition-colors hover:bg-white/10"
                          >
                            <MinecraftAvatar username={player} size="sm" className="flex-shrink-0" />
                            <span className="text-sm text-gray-300">{player}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </motion.div>



              {/* Selected Team Details */}
              <AnimatePresence>
                {selectedTeam && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <div
                      className="bento-item overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${selectedTeam.color}10 0%, ${selectedTeam.color}05 100%)`,
                        borderColor: `${selectedTeam.color}30`,
                      }}
                    >
                      <div className="p-6">
                        <div className="mb-6 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className="flex h-12 w-12 items-center justify-center rounded-full border-2"
                              style={{
                                borderColor: selectedTeam.color,
                                background: `${selectedTeam.color}20`,
                              }}
                            >
                              <Image
                                src={selectedTeam.emoji}
                                alt={selectedTeam.name}
                                width={24}
                                height={24}
                                className="h-6 w-6"
                              />
                            </div>
                            <div>
                              <h3
                                className="text-xl font-bold"
                                style={{ color: selectedTeam.color }}
                              >
                                {selectedTeam.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {selectedTeam.players.length} jugadores en el equipo
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedTeam(null)}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {selectedTeam.players.map((player, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className="flex items-center space-x-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10"
                            >
                              <MinecraftAvatar username={player} size="md" className="flex-shrink-0" />
                              <span className="font-medium text-white">{player}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Modal */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: -380 }}
              animate={{ x: 0 }}
              exit={{ x: -380 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="h-full w-[380px] overflow-y-auto bg-gray-900/95 backdrop-blur-sm"
              onClick={e => e.stopPropagation()}
            >
              <div className="bento-item m-4">
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="flex items-center space-x-2 text-xl font-bold text-white">
                      <Trophy className="h-6 w-6 text-yellow-400" />
                      <span>Eventos</span>
                    </h2>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Current Event */}
                  <div className="mb-8">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
                      Evento Actual
                    </h3>
                    <motion.div
                      className={`bento-item cursor-pointer p-5 min-h-[80px] transition-all duration-200 ${
                        selectedEvent.id === mockEvents.currentEvent.id
                          ? 'border-blue-500/50 bg-blue-500/10'
                          : 'hover:border-white/20 hover:bg-white/10'
                      }`}
                      onClick={() => {
                        setSelectedEvent(mockEvents.currentEvent);
                        setSidebarOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 pr-4">
                          <h4 className="font-semibold text-white text-base leading-tight">{mockEvents.currentEvent.name}</h4>
                          <p className="text-sm text-gray-400 mt-2">{mockEvents.currentEvent.date}</p>
                        </div>
                        <div className="flex items-center space-x-3 flex-shrink-0">
                          <div className="flex-shrink-0">
                            {getStatusBadge(mockEvents.currentEvent.status)}
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Historical Events */}
                  <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
                      Eventos Pasados
                    </h3>
                    <div className="space-y-4">
                      {mockEvents.historicalEvents.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                          className={`bento-item cursor-pointer p-5 min-h-[90px] transition-all duration-200 ${
                            selectedEvent.id === event.id
                              ? 'border-green-500/50 bg-green-500/10'
                              : 'hover:border-white/20 hover:bg-white/10'
                          }`}
                          onClick={() => {
                            setSelectedEvent(event);
                            setSidebarOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 pr-4">
                              <h4 className="font-semibold text-white text-base leading-tight">{event.name}</h4>
                              <p className="text-sm text-gray-400 mt-2">
                                {formatDate(event.date)}
                              </p>
                              <div className="mt-3 flex items-center space-x-2">
                                <Medal className="h-3 w-3 text-yellow-400" />
                                <span className="text-xs text-yellow-400">
                                  Ganador: {event.winner}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team Details Modal */}
      <AnimatePresence>
        {selectedTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedTeam(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-xl bg-gray-900 shadow-2xl"
              onClick={e => e.stopPropagation()}
              style={{
                background: `linear-gradient(135deg, ${selectedTeam.color}10 0%, rgba(17, 24, 39, 0.95) 100%)`,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTeam(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8">
                {/* Team Header */}
                <div className="mb-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-full border-4"
                      style={{
                        borderColor: selectedTeam.color,
                        background: `${selectedTeam.color}20`,
                      }}
                    >
                      <Image
                        src={selectedTeam.emoji}
                        alt={selectedTeam.name}
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <h2
                      className="text-3xl font-bold"
                      style={{ color: selectedTeam.color }}
                    >
                      {selectedTeam.name}
                    </h2>
                    {selectedTeam.placement === 1 && (
                      <Crown className="h-7 w-7 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-400">
                     <Users className="h-5 w-5" />
                     <span>{selectedTeam.players.length} jugadores</span>
                   </div>
                   {selectedTeam.placement === 1 && (
                     <div className="mt-3 flex justify-center">
                       <span className="inline-flex items-center rounded-full bg-yellow-400/20 px-3 py-1 text-sm font-medium text-yellow-400">
                         🏆 EQUIPO GANADOR
                       </span>
                     </div>
                   )}
                </div>

                {/* Players List */}
                <div className="mb-6">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Jugadores
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {selectedTeam.players.map((player, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10"
                      >
                        <MinecraftAvatar
                          username={player}
                          size="md"
                          className="flex-shrink-0"
                        />
                        <span className="text-gray-300">{player}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
