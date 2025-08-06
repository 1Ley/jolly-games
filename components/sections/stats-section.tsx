'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Swords, Shield, Star, Activity } from 'lucide-react';
import { mockServerStats as fetchMockServerStats } from '@/data/mock-data';
import { formatNumber } from '@/lib/utils';

interface ServerStats {
  onlinePlayers: number;
  totalPlayers: number;
  gamesThisWeek: number;
  uptime: string;
  averageLatency: string;
}

export function StatsSection() {
  const [stats, setStats] = useState<ServerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats(fetchMockServerStats);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const statItems = stats
    ? [
        {
          icon: Users,
          label: 'Jugadores Online',
          value: formatNumber(stats.onlinePlayers),
          color: 'text-green-400',
        },
        {
          icon: Swords,
          label: 'Asesinatos esta semana',
          value: formatNumber(stats.gamesThisWeek),
          color: 'text-red-400',
        },
        {
          icon: Shield,
          label: 'Uptime del Servidor',
          value: stats.uptime,
          color: 'text-blue-400',
        },
        {
          icon: Star,
          label: 'Latencia Promedio',
          value: stats.averageLatency,
          color: 'text-yellow-400',
        },
      ]
    : [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <Activity className="mx-auto mb-3 h-10 w-10 text-primary-500" />
            <p className="text-sm text-gray-400">Cargando stats...</p>
          </div>
        </div>
      );
    }

    if (!stats) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <Activity className="mx-auto mb-3 h-10 w-10 text-gray-600" />
            <p className="text-sm font-semibold text-white">
              Estadísticas no disponibles
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-4">
        {statItems.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 1, scale: 1 }} // Sin animación inicial
            className="flex flex-col items-center justify-center p-2 text-center"
          >
            <stat.icon className={`mb-2 h-7 w-7 ${stat.color}`} />
            <p className="text-xl font-bold text-white md:text-2xl">
              {stat.value}
            </p>
            <p className="text-xs text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="glass-card h-full p-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        Estadísticas del Servidor
      </h2>
      {renderContent()}
    </div>
  );
}
