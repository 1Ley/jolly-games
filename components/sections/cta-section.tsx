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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bento-item relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-accent-500/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-accent-500/10 rounded-full blur-lg animate-pulse delay-1000" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <Badge 
            variant="outline" 
            className="mb-4 bg-primary-500/20 text-primary-300 border-primary-500/30"
          >
            ¡Únete ahora!
          </Badge>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            Comienza tu aventura
          </h2>
          
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Únete a miles de jugadores en la experiencia de minijuegos más épica de Minecraft
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              className="flex items-center space-x-3 text-sm text-gray-300"
            >
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-4 h-4 text-primary-400" />
              </div>
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="space-y-3"
        >
          <Button 
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 group"
          >
            <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Jugar Ahora
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-white/20 text-gray-300 hover:bg-white/10 hover:text-white py-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar Launcher
          </Button>
        </motion.div>

        {/* Server Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-6 pt-4 border-t border-white/10 text-center"
        >
          <div className="text-xs text-gray-500 mb-2">IP del servidor</div>
          <div className="font-mono text-sm text-white bg-black/20 px-3 py-2 rounded-lg border border-white/10">
            play.jollygames.net
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}