'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Calendar,
  Users,
  Clock,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { mockEvents } from '@/data/mock-data';

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
  const currentEvent = mockEvents.currentEvent;

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
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Próximamente
          </Badge>
        );
      case 'live':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <Star className="w-3 h-3 mr-1" />
            En Vivo
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Trophy className="w-3 h-3 mr-1" />
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
        className="relative h-[450px] overflow-hidden"
        style={{
          backgroundImage: 'url(/images/fondo_events.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)'
        }}
      >
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/40" style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)'
        }} />
        
        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-glow mb-4 font-minecraft text-5xl font-bold text-white md:text-6xl"
            >
              Eventos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto max-w-2xl text-lg text-gray-200"
            >
              Descubre los próximos eventos y equipos que competirán por la gloria
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">

        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bento-item mb-8"
        >
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-3">
                <Image
                  src="/emojils/Copa.png"
                  alt="Copa"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span>{currentEvent.name}</span>
              </h2>
              <p className="text-gray-400 mb-3">
                {currentEvent.description}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">
                    {formatDate(currentEvent.date)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-400" />
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

        {/* Teams Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {currentEvent.teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:border-white/20 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${team.color}20 0%, ${team.color}10 100%)`,
                  borderColor: `${team.color}40`
                }}
                onClick={() => setSelectedTeam(selectedTeam?.id === team.id ? null : team)}
              >
                {/* Team Header */}
                <div 
                  className="p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${team.color}30 0%, ${team.color}20 100%)`
                  }}
                >
                  <div className="mb-4 flex justify-center">
                    <div 
                      className="flex h-16 w-16 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-110"
                      style={{
                        borderColor: team.color,
                        background: `${team.color}20`
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
                  <h3 
                    className="text-xl font-bold mb-2 transition-colors"
                    style={{ color: team.color }}
                  >
                    {team.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{team.players.length} jugadores</span>
                  </div>
                </div>

                {/* Team Players */}
                <div className="p-4">
                  <div className="space-y-2">
                    {team.players.map((player, playerIndex) => (
                      <div
                        key={playerIndex}
                        className="flex items-center space-x-3 rounded-lg bg-white/5 p-2 transition-colors hover:bg-white/10"
                      >
                        <div 
                          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: team.color }}
                        >
                          {player.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-300">{player}</span>
                      </div>
                    ))}
                  </div>
                  
                  {team.placement && (
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-semibold text-yellow-400">
                        Puesto #{team.placement}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: `linear-gradient(135deg, ${selectedTeam.color}10 0%, rgba(17, 24, 39, 0.95) 100%)`
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
                          background: `${selectedTeam.color}20`
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
                    <h2 
                      className="text-3xl font-bold mb-2"
                      style={{ color: selectedTeam.color }}
                    >
                      {selectedTeam.name}
                    </h2>
                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                      <Users className="w-5 h-5" />
                      <span>{selectedTeam.players.length} jugadores</span>
                    </div>
                  </div>

                  {/* Players List */}
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-semibold text-white">Jugadores</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {selectedTeam.players.map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10"
                        >
                          <div 
                            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{ backgroundColor: selectedTeam.color }}
                          >
                            {player.charAt(0)}
                          </div>
                          <span className="text-gray-300">{player}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Stats */}
                  {selectedTeam.placement && (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 rounded-lg bg-yellow-400/20 px-4 py-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="font-semibold text-yellow-400">
                          Puesto #{selectedTeam.placement} en el evento anterior
                        </span>
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
