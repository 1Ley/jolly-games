'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Users, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockGameModes } from '@/data/mock-data';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';

const difficultyColors = {
  easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  expert: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

export function FeaturedGamesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % mockGameModes.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + mockGameModes.length) % mockGameModes.length);
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

  return (
    <section id="featured-games" className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Juegos Destacados
          </h2>
          <p className="text-xl text-gray-400">
            Sumérgete en nuestras experiencias de juego más populares.
          </p>
        </motion.div>

        <div className="relative h-[450px] md:h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bento-item grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8"
            >
              {/* Game Info */}
              <div className="text-center md:text-left">
                <div className="mb-4">
                  <Badge 
                    className={difficultyColors[mockGameModes[currentIndex].difficulty]}
                    variant="outline"
                  >
                    {mockGameModes[currentIndex].difficulty}
                  </Badge>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">
                  {mockGameModes[currentIndex].displayName}
                </h3>
                
                <p className="text-gray-300 mb-6 max-w-md mx-auto md:mx-0">
                  {mockGameModes[currentIndex].description}
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>
                      {formatNumber(mockGameModes[currentIndex].playerCount.current)} jugadores
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{mockGameModes[currentIndex].averageGameTime} min promedio</span>
                  </div>
                </div>
                
                <Button size="lg" className="group">
                  Jugar ahora <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Game Thumbnail */}
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src={mockGameModes[currentIndex].thumbnail}
                  alt={mockGameModes[currentIndex].displayName}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-110"
                />
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Buttons */}
          <button onClick={prevSlide} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-10">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-10">
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {mockGameModes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}