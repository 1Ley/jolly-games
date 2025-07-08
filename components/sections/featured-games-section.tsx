'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Users, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockGameModes as fetchMockGameModes } from '@/data/mock-data';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';

interface GameMode {
  id: string;
  displayName: string;
  description: string;
  playerCount: {
    current: number;
    max: number;
  };
  averageGameTime: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  thumbnail: string;
}

const difficultyColors = {
  easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  expert: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

export function FeaturedGamesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [gameModes, setGameModes] = useState<GameMode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setGameModes(fetchMockGameModes);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    if (gameModes.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % gameModes.length);
  };

  const prevSlide = () => {
    if (gameModes.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + gameModes.length) % gameModes.length);
  };

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
    }),
    visible: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 30,
      },
    }),
  };

  if (isLoading) {
    return (
      <div className="bento-item h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Gamepad2 className="w-12 h-12 text-primary-500 animate-pulse mx-auto mb-4" />
          <p className="text-lg text-gray-400">Cargando juegos...</p>
        </div>
      </div>
    );
  }

  if (gameModes.length === 0) {
    return (
      <div className="bento-item h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Gamepad2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No hay juegos destacados</h3>
          <p className="text-gray-400">Vuelve a intentarlo más tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bento-item h-full flex flex-col">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          <Gamepad2 className="w-6 h-6 mr-3 text-primary-400" />
          Juegos Destacados
        </h2>
        <p className="text-gray-400">Sumérgete en nuestras experiencias de juego más populares.</p>
      </div>
      
      <div className="relative flex-1 flex flex-col justify-between">
        <div className="relative flex-1">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
            >
              <div className="h-full flex flex-col md:flex-row gap-6 p-6 md:p-8">
                {/* Game Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <Badge 
                      className={difficultyColors[gameModes[currentIndex].difficulty]}
                      variant="outline"
                    >
                      {gameModes[currentIndex].difficulty}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {gameModes[currentIndex].displayName}
                  </h3>
                  
                  <p className="text-gray-400 mb-5 text-sm leading-relaxed">
                    {gameModes[currentIndex].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>
                        {formatNumber(gameModes[currentIndex].playerCount.current)} jugadores
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{gameModes[currentIndex].averageGameTime} min promedio</span>
                    </div>
                  </div>
                  
                  <Button size="lg" className="group w-full md:w-auto">
                    Jugar ahora <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Game Thumbnail */}
                <div className="relative w-full h-48 md:h-auto md:w-1/2 rounded-lg overflow-hidden">
                  <Image
                    src={gameModes[currentIndex].thumbnail}
                    alt={gameModes[currentIndex].displayName}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between p-4 md:p-6">
          <button onClick={prevSlide} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-10">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex justify-center space-x-2 z-10">
            {gameModes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-white scale-110' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <button onClick={nextSlide} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-10">
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}