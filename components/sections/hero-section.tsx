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

// Eliminamos los elementos flotantes que no se utilizan

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 z-0 bg-black/50" />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 1, y: 0 }} // Sin animación inicial
            className="mb-6"
          >
            <Badge
              variant="secondary"
              className="glass border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300"
            >
              🎮 Temporada 4 - ¡Ya Disponible!
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 1, y: 0 }} // Sin animación inicial
            className="mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
          >
            <span className="gradient-text font-minecraft">Jolly Games</span>
            <span className="mt-4 block text-3xl text-white md:text-4xl lg:text-5xl">
              Minecraft
            </span>
            <span className="block text-3xl text-gray-300 md:text-4xl lg:text-5xl">
              Minijuegos
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 1, y: 0 }} // Sin animación inicial
            className="mx-auto mb-8 max-w-2xl font-minecraft text-xl leading-relaxed text-gray-300 md:text-2xl"
          >
            Únete a la mejor experiencia de minijuegos de Minecraft. Compite,
            diviértete y forma parte de nuestra increíble comunidad.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 1, y: 0 }} // Sin animación inicial
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group bg-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-red-500/30 hover:bg-red-700"
            >
              <Play className="mr-2 h-5 w-5" />
              Jugar Ahora
            </Button>

            <Button
              size="lg"
              className="bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700"
            >
              Ver Trailer
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 1, y: 0 }} // Sin animación inicial
            className="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-3"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 1, scale: 1 }} // Sin animación inicial
                  className="glass-card text-center"
                >
                  <Icon className={`mx-auto mb-2 h-8 w-8 ${stat.color}`} />
                  <div className="mb-1 text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 1 }} // Sin animación inicial
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <motion.div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
          <motion.div className="mt-2 h-3 w-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
