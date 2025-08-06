'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Users, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockFeatureSections } from '@/data/mock-data';
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
      // Transform mockFeatureSections to GameMode format
      const transformedGameModes: GameMode[] = mockFeatureSections.map((section, index) => ({
        id: section.title.toLowerCase().replace(/\s+/g, '-'),
        displayName: section.title,
        description: section.description,
        playerCount: {
          current: Math.floor(Math.random() * 100) + 20,
          max: 200
        },
        averageGameTime: Math.floor(Math.random() * 10) + 5,
        difficulty: ['easy', 'medium', 'hard', 'expert'][Math.floor(Math.random() * 4)] as 'easy' | 'medium' | 'hard' | 'expert',
        thumbnail: section.imageUrl
      }));
      setGameModes(transformedGameModes);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    if (gameModes.length === 0) return;
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % gameModes.length);
  };

  const prevSlide = () => {
    if (gameModes.length === 0) return;
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + gameModes.length) % gameModes.length);
  };

  // Variantes de animación sin suavizado para movimiento instantáneo
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1,
      scale: 1,
    }),
    visible: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0,
      },
    }),
  };

  if (isLoading) {
    return (
      <div className="glass-card flex h-[400px] items-center justify-center">
        <div className="text-center">
          <Gamepad2 className="mx-auto mb-4 h-12 w-12 text-primary-500" />
          <p className="text-lg text-gray-400">Cargando juegos...</p>
        </div>
      </div>
    );
  }

  if (gameModes.length === 0) {
    return (
      <div className="glass-card flex h-[400px] items-center justify-center">
        <div className="text-center">
          <Gamepad2 className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <h3 className="mb-2 text-xl font-bold text-white">
            No hay juegos destacados
          </h3>
          <p className="text-gray-400">Vuelve a intentarlo más tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card flex h-full flex-col">
      <div className="p-6 md:p-8">
        <h2 className="mb-2 flex items-center text-2xl font-bold text-white">
          <Gamepad2 className="mr-3 h-6 w-6 text-primary-400" />
          Juegos Destacados
        </h2>
        <p className="text-gray-400">
          Sumérgete en nuestras experiencias de juego más populares.
        </p>
      </div>

      <div className="relative flex flex-1 flex-col justify-between">
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
              <div className="flex h-full flex-col gap-2 p-6 md:flex-row md:p-8">
                {/* Game Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <Badge
                      className={
                        difficultyColors[gameModes[currentIndex].difficulty]
                      }
                      variant="outline"
                    >
                      {gameModes[currentIndex].difficulty}
                    </Badge>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {gameModes[currentIndex].displayName}
                  </h3>

                  <p className="mb-5 text-sm leading-relaxed text-gray-400">
                    {gameModes[currentIndex].description}
                  </p>

                  <div className="mb-6 flex flex-wrap justify-center gap-4 md:justify-start">
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>
                        {formatNumber(
                          gameModes[currentIndex].playerCount.current
                        )}{' '}
                        jugadores
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>
                        {gameModes[currentIndex].averageGameTime} min promedio
                      </span>
                    </div>
                  </div>

                  <Button size="lg" className="group w-full md:w-auto">
                    Jugar ahora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Game Thumbnail */}
                <div className="image-card relative h-48 w-full md:h-auto md:w-1/2">
                  <Image
                    src={gameModes[currentIndex].thumbnail}
                    alt={gameModes[currentIndex].displayName}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 md:p-6">
          <button
            onClick={prevSlide}
            className="z-10 rounded-full bg-white/10 p-2 hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>

          <div className="z-10 flex justify-center space-x-1">
            {gameModes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 w-2.5 rounded-full ${
                  currentIndex === index
                    ? 'bg-white'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="z-10 rounded-full bg-white/10 p-2 hover:bg-white/20"
          >
            <ArrowRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
