'use client';

import { motion } from 'framer-motion';
import { Play, Users, Trophy, Calendar, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '@/lib/assets';

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background GIF */}
      <Image
        src={getImagePath('fondo_home.gif')}
        alt="Jolly Games background"
        layout="fill"
        objectFit="cover"
        style={{
          objectFit: 'cover',
          transform: 'scale(1.4)',
          transformOrigin: 'center center',
        }}
        quality={100}
        unoptimized
        className="absolute inset-0 z-0 object-center opacity-40"
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-black/30" />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 py-32">
        <div className="flex min-h-[80vh] flex-col md:flex-row md:items-end md:justify-start">
          {/* Left side content - Main content on mobile, left on desktop */}
          <div className="order-1 max-w-2xl md:order-1">
            {/* Badge */}
            <motion.div initial={{ opacity: 1, y: 0 }} className="mb-4">
              <Badge
                variant="secondary"
                className="glass border-primary-500/30 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-300"
              >
                🎮 Temporada 5 - ¡Ya Disponible!
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 1, y: 0 }}
              className="minecraft-font mb-4 mt-8 text-5xl font-bold leading-tight tracking-wider md:text-6xl lg:text-7xl"
            >
              <span className="text-red-600 drop-shadow-lg">JOLLY</span>
              <span className="ml-4 text-blue-600 drop-shadow-lg">GAMES</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 1, y: 0 }}
              className="minecraft-font mb-4 text-lg text-gray-300 md:text-xl"
            >
              Minecraft event
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 1, y: 0 }}
              className="mb-6 max-w-xl text-sm leading-relaxed text-gray-300 md:text-base"
            >
              Únete a la mejor experiencia de minijuegos de Minecraft. Compite,
              diviértete y forma parte de nuestra increíble comunidad.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              className="mb-6 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/community">
                <Button
                  size="lg"
                  className="group border border-white/20 bg-black/60 px-6 py-3 text-base font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-black/80"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Events
                </Button>
              </Link>

              <Link href="/updates">
                <Button
                  size="lg"
                  className="border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Updates
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right side content - Bottom on mobile, right on desktop */}
          <div className="order-2 mt-8 md:order-2 md:ml-auto md:mt-0">
            {/* Server Info */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              className="mb-6 text-center md:text-right"
            >
              <div className="minecraft-font text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                IP: jollygames.live
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              className="mx-auto grid max-w-md grid-cols-3 gap-3 md:mx-0"
            >
              <div className="glass-card p-2 text-center">
                <div className="mb-1 text-lg font-bold text-white">2,000+</div>
                <div className="text-xs text-gray-400">Jugadores</div>
              </div>
              <div className="glass-card p-2 text-center">
                <div className="mb-1 text-lg font-bold text-white">9+</div>
                <div className="text-xs text-gray-400">Minijuegos</div>
              </div>
              <div className="glass-card p-2 text-center">
                <div className="mb-1 text-lg font-bold text-white">24/7</div>
                <div className="text-xs text-gray-400">Online</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
