'use client';

import { motion } from 'framer-motion';
import { Play, Users, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const stats = [
  {
    icon: Users,
    value: '4,000+',
    label: 'Jugadores',
    color: 'text-blue-400',
  },
  {
    icon: Trophy,
    value: '9+',
    label: 'Minijuegos Únicos',
    color: 'text-yellow-400',
  },
  {
    icon: Zap,
    value: '24/7',
    label: 'Servidores Online',
    color: 'text-green-400',
  },
];

const floatingElements = [
  { x: '10%', y: '20%', delay: 0 },
  { x: '80%', y: '10%', delay: 0.5 },
  { x: '15%', y: '70%', delay: 1 },
  { x: '85%', y: '60%', delay: 1.5 },
  { x: '50%', y: '15%', delay: 2 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background GIF */}
      <Image
        src="/images/fondohome.gif"
        alt="Jolly Games background"
        layout="fill"
        objectFit="cover"
        quality={100}
        unoptimized
        className="absolute inset-0 z-0 opacity-50"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Badge 
              variant="secondary" 
              className="glass px-4 py-2 text-sm font-medium border-primary-500/30 bg-primary-500/10 text-primary-300"
            >
              🎮 Temporada 4 - ¡Ya Disponible!
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text font-minecraft">Jolly Games</span>
            <span className="mt-4 block text-3xl md:text-4xl lg:text-5xl text-white">
              Minecraft
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-300">
              Minijuegos
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-minecraft"
          >
            Únete a la mejor experiencia de minijuegos de Minecraft. 
            Compite, diviértete y forma parte de nuestra increíble comunidad.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-red-500/30 group transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Jugar Ahora
            </Button>
            
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              Ver Trailer
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="glass-card text-center group hover:scale-105 transition-transform duration-300"
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}