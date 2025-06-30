'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Trophy,
  Medal,
  Award,
  Search,
  Calendar,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatNumber } from '@/lib/utils';
import users from '@/data/users.json';

const rankIcons: { [key: number]: { icon: React.ElementType; color: string; bg: string } } = {
  1: { icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  2: { icon: Medal, color: 'text-gray-300', bg: 'bg-gray-500/20' },
  3: { icon: Award, color: 'text-amber-600', bg: 'bg-amber-500/20' },
};

const timeFilters = [
  { id: 'season', name: 'Temporada actual' },
  { id: 'month', name: 'Este mes' },
  { id: 'week', name: 'Esta semana' },
  { id: 'all-time', name: 'Histórico' },
];

const statFilters: { id: keyof UserStats; name: string }[] = [
  { id: 'puntos', name: 'TOP PUNTOS' },
  { id: 'mvp', name: 'TOP MVP' },
  { id: 'elo', name: 'TOP ELO' },
  { id: 'partidas', name: 'TOP PARTIDAS' },
  { id: 'asesinatos', name: 'TOP ASESINATOS' },
  { id: 'muertes', name: 'TOP MUERTES' },
  { id: 'rondasGanadas', name: 'TOP RONDAS GANADAS' },
];

interface UserStats {
  puntos: number;
  partidas: number;
  victorias: number;
  mvp: number;
  elo: number;
  muertes: number;
  asesinatos: number;
  rondasGanadas: number;
}

interface User {
  id: string;
  username: string;
  premium: boolean;
  stats: UserStats;
  avatarUrl?: string;
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStat, setSelectedStat] = useState<keyof UserStats>('puntos');
  const [selectedTime, setSelectedTime] = useState('season');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 20;

  useEffect(() => {
    const processLeaderboardData = async () => {
      try {
        const enrichedUsers = await Promise.all(
          users.map(async (user) => {
            const defaultCatAvatar = `https://crafatar.com/avatars/5c3b379d-335a-4b51-93e5-849548454d62?overlay`;
            let avatarUrl = defaultCatAvatar;
            
            if (user.premium) {
              try {
                const response = await axios.get(
                  `https://playerdb.co/api/player/minecraft/${user.username}`
                );
                if (
                  response.data &&
                  response.data.code === 'player.found' &&
                  response.data.data.player.avatar
                ) {
                  avatarUrl = response.data.data.player.avatar;
                }
              } catch (error) {
                console.error(
                  `Could not fetch avatar for ${user.username}. Using default cat.`
                );
              }
            }

            return { ...user, avatarUrl };
          })
        );
        setLeaderboardData(enrichedUsers as User[]);
      } catch (error) {
        console.error('Failed to process leaderboard data', error);
      } finally {
        setLoading(false);
      }
    };

    processLeaderboardData();
  }, []);

  const sortedAndFilteredLeaderboard = useMemo(() => {
    return leaderboardData
      .filter((entry) =>
        entry.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort(
        (a, b) =>
          (b.stats[selectedStat] as number) - (a.stats[selectedStat] as number)
      );
  }, [leaderboardData, selectedStat, searchQuery]);

  const totalPages = Math.ceil(sortedAndFilteredLeaderboard.length / playersPerPage);

  const paginatedLeaderboard = useMemo(() => {
    const startIndex = (currentPage - 1) * playersPerPage;
    return sortedAndFilteredLeaderboard.slice(startIndex, startIndex + playersPerPage);
  }, [sortedAndFilteredLeaderboard, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="spinner"></div>
        <p className="text-white text-lg ml-4">Cargando clasificación...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-screen-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-minecraft text-glow">
            Tabla de Clasificación
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Compite con los mejores jugadores y escala en las clasificaciones.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bento-item p-4">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Estadísticas
            </h3>
            <Select
              onValueChange={(value) => setSelectedStat(value as keyof UserStats)}
              defaultValue={selectedStat}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar estadística..." />
              </SelectTrigger>
              <SelectContent>
                {statFilters.map((filter) => (
                  <SelectItem key={filter.id} value={filter.id}>
                    {filter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bento-item p-4">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Período
            </h3>
            <Select onValueChange={setSelectedTime} defaultValue={selectedTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar período..." />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map((filter) => (
                  <SelectItem key={filter.id} value={filter.id}>
                    {filter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bento-item p-4">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Buscar jugador
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre de usuario..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-end"
        >
          {sortedAndFilteredLeaderboard.slice(0, 3).map((entry, index) => {
            const rank = index + 1;
            const rankData = rankIcons[rank];
            
            const podiumOrderClass = 
              rank === 1 ? 'md:order-2 transform md:scale-110' :
              rank === 2 ? 'md:order-1' :
              'md:order-3';

            const borderTopColorClass =
              rank === 1 ? 'border-t-yellow-400' :
              rank === 2 ? 'border-t-sky-400' :
              'border-t-slate-400';

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  p-6 text-center relative overflow-hidden transition-all duration-300 rounded-2xl 
                  hover:scale-105 hover:shadow-2xl 
                  bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[var(--glass-shadow)]
                  border-l border-r border-b border-[rgba(255,255,255,0.2)]
                  border-t-4
                  ${podiumOrderClass} 
                  ${borderTopColorClass}
                `}
              >
                <img src={entry.avatarUrl} alt={entry.username} className="w-20 h-20 rounded-md mx-auto mb-4 border-2 border-gray-600" />
                <div className="flex items-center justify-center gap-2 mb-2">
                   <rankData.icon className={`w-8 h-8 ${rankData.color}`} />
                   <span className="text-3xl font-bold text-white">#{rank}</span>
                </div>
                <div className="text-lg font-semibold text-white mb-3 truncate">{entry.username}</div>
                <div className="space-y-1 text-sm text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Puntos:</span>
                    <span className="text-white font-semibold">{formatNumber(entry.stats.puntos)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Asesinatos:</span>
                    <span className="text-white">{formatNumber(entry.stats.asesinatos)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Victorias:</span>
                    <span className="text-white">{formatNumber(entry.stats.victorias)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bento-item p-4 md:p-6"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-700 text-xs uppercase text-gray-400">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Jugador</th>
                  <th className="p-3 text-right hidden sm:table-cell">Puntos</th>
                  <th className="p-3 text-right hidden md:table-cell">Partidas</th>
                  <th className="p-3 text-right hidden lg:table-cell">Victorias</th>
                  <th className="p-3 text-right hidden lg:table-cell">Asesinatos</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLeaderboard.map((entry, index) => {
                  const rank = (currentPage - 1) * playersPerPage + index + 1;
                  return (
                    <tr
                      key={entry.id}
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="p-4 font-semibold text-gray-400">#{rank}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={entry.avatarUrl}
                            alt={entry.username}
                            className="w-8 h-8 rounded-md"
                          />
                          <span className="font-medium text-white">{entry.username}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right text-gray-300 hidden sm:table-cell">{formatNumber(entry.stats.puntos)}</td>
                      <td className="p-4 text-right text-gray-300 hidden md:table-cell">{formatNumber(entry.stats.partidas)}</td>
                      <td className="p-4 text-right text-gray-300 hidden lg:table-cell">{formatNumber(entry.stats.victorias)}</td>
                      <td className="p-4 text-right text-gray-300 hidden lg:table-cell">{formatNumber(entry.stats.asesinatos)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-between mt-8"
          >
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="text-gray-400 text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}