'use client';

import { motion } from 'framer-motion';
import { Users, Swords, Shield, Star, Crown } from 'lucide-react';
import { mockServerStats } from '@/data/mock-data';
import { formatNumber } from '@/lib/utils';

const stats = [
  {
    icon: Users,
    label: 'Jugadores Online',
    value: mockServerStats.onlinePlayers,
    total: mockServerStats.totalPlayers,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
  {
    icon: Swords,
    label: 'Asesinatos esta semana',
    value: mockServerStats.gamesThisWeek, // Assuming this maps to kills
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
  },
  {
    icon: Shield,
    label: 'Uptime del Servidor',
    value: mockServerStats.uptime,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  {
    icon: Star,
    label: 'Latencia Promedio',
    value: mockServerStats.averageLatency,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
  },
];

export function StatsSection() {
  return (
    <section id="stats" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Estadísticas del Servidor en Tiempo Real
          </h2>
          <p className="text-xl text-gray-400">
            Los números nunca mienten. Echa un vistazo a la actividad actual.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bento-item p-6 text-center"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${stat.bgColor}`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className="text-4xl font-bold text-white mb-2">
                {typeof stat.value === 'number'
                  ? formatNumber(stat.value)
                  : stat.value}
                {stat.total && (
                  <span className="text-2xl text-gray-500">
                    /{formatNumber(stat.total)}
                  </span>
                )}
              </p>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}