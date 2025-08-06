'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Users, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import MinecraftAvatar from '@/components/ui/minecraft-avatar';
import { mockEvents } from '@/data/mock-data';
import { getImagePath } from '@/lib/assets';

interface Team {
  id: string;
  name: string;
  emoji: string;
  color: string;
  players: string[];
  placement?: number | null;
}

interface EventData {
  id: string;
  name: string;
  description: string;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
  teams: Team[];
}

function getEmojiPath(emoji: string): string {
  return `/emojis/${emoji}`;
}

function formatDate(dateString: string): string {
  // Handle special cases like 'Próximamente'
  if (dateString === 'Próximamente' || dateString === 'próximamente') {
    return dateString;
  }

  const date = new Date(dateString);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if not a valid date
  }

  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getStatusBadge(status: string) {
  const statusConfig = {
    upcoming: { label: 'Próximo', color: 'bg-blue-500' },
    live: { label: 'En Vivo', color: 'bg-red-500' },
    completed: { label: 'Completado', color: 'bg-green-500' },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  return <Badge className={`${config.color} text-white`}>{config.label}</Badge>;
}

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Get the current event
  const currentEvent = mockEvents.currentEvent;

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <motion.div
        className="relative h-[450px] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getImagePath('principal_banner.png')})`,
          maskImage:
            'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Dark overlay with vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="bg-gradient-radial absolute inset-0 from-transparent via-black/20 to-black/60" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 flex justify-center"
            >
              <Image
                src={getImagePath('jollygames.png')}
                alt="JollyGames"
                width={400}
                height={120}
                className="h-auto w-80 cursor-pointer drop-shadow-[0_0_20px_rgba(14,165,233,0.4)] filter transition-all duration-500 hover:scale-110 hover:brightness-110 hover:drop-shadow-[0_0_30px_rgba(14,165,233,0.8)] md:w-96"
                priority
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto max-w-2xl text-lg text-gray-200"
            >
              Minecraft minigames event.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="container relative z-20 mx-auto px-4 pt-12">
        {/* Event Info Card */}
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
                className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20"
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
                  <h3
                    className="mb-2 text-xl font-bold transition-colors"
                    style={{ color: team.color }}
                  >
                    {team.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <Users className="h-4 w-4" />
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
                        <MinecraftAvatar size="sm" className="flex-shrink-0" />
                        <span className="text-sm text-gray-300">{player}</span>
                      </div>
                    ))}
                  </div>
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
                    <h2
                      className="mb-2 text-3xl font-bold"
                      style={{ color: selectedTeam.color }}
                    >
                      {selectedTeam.name}
                    </h2>
                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                      <Users className="h-5 w-5" />
                      <span>{selectedTeam.players.length} jugadores</span>
                    </div>
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
      </div>
    </main>
  );
}
