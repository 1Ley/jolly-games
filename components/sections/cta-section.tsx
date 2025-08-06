'use client';

import { motion } from 'framer-motion';
import { Play, Download, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: Users,
    text: 'Multijugador masivo',
  },
  {
    icon: Zap,
    text: 'Actualizaciones semanales',
  },
  {
    icon: Play,
    text: '15+ minijuegos únicos',
  },
];

export function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }} // Sin animación inicial
      className="glass-card relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-accent-500/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Background Elements (sin animación) */}
      <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-primary-500/10 blur-xl" />
      <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-accent-500/10 blur-lg" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary-500/30 bg-primary-500/20 text-primary-300"
          >
            ¡Únete ahora!
          </Badge>

          <h2 className="mb-2 text-2xl font-bold text-white">
            Comienza tu aventura
          </h2>

          <p className="mx-auto max-w-sm text-sm text-gray-400">
            Únete a miles de jugadores en la experiencia de minijuegos más épica
            de Minecraft
          </p>
        </div>

        {/* Features */}
        <div className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, x: 0 }} // Sin animación inicial
              className="flex items-center space-x-3 text-sm text-gray-300"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                <feature.icon className="h-4 w-4 text-primary-400" />
              </div>
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 1, y: 0 }} // Sin animación inicial
          className="space-y-3"
        >
          <Button className="group w-full bg-gradient-to-r from-primary-600 to-primary-700 py-3 font-semibold text-white hover:from-primary-700 hover:to-primary-800">
            <Play className="mr-2 h-4 w-4" />
            Jugar Ahora
          </Button>

          <Button
            variant="outline"
            className="w-full border-white/20 py-3 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar Launcher
          </Button>
        </motion.div>

        {/* Server Info */}
        <motion.div
          initial={{ opacity: 1, y: 0 }} // Sin animación inicial
          className="mt-6 border-t border-white/10 pt-4 text-center"
        >
          <div className="mb-2 text-xs text-gray-500">IP del servidor</div>
          <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 font-mono text-sm text-white">
            play.jollygames.net
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
