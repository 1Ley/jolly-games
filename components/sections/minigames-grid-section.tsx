'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImagePath, getEmojiPath } from '@/lib/assets';

interface Minigame {
  id: string;
  name: string;
  emoji: string;
  image: string;
}

const minigames: Minigame[] = [
  {
    id: 'survival-games',
    name: 'Survival Games',
    emoji: getEmojiPath('Survival games.png'),
    image: getImagePath('games/survival-games.png')
  },
  {
    id: 'skywars',
    name: 'SkyWars',
    emoji: getEmojiPath('Skywars.png'),
    image: getImagePath('games/skywars.png')
  },
  {
    id: 'spleef',
    name: 'Spleef',
    emoji: getEmojiPath('Spleef.png'),
    image: getImagePath('games/spleef.png')
  },
  {
    id: 'battlebox',
    name: 'BattleBox',
    emoji: getEmojiPath('BattleBox.png'),
    image: getImagePath('games/battle_box.png')
  },
  {
    id: 'random-kits',
    name: 'Random Kits',
    emoji: getEmojiPath('Random Kits.png'),
    image: getImagePath('games/random-kits.png')
  },
  {
    id: 'beep-test',
    name: 'Beep Test',
    emoji: getEmojiPath('BeepTest.png'),
    image: getImagePath('games/beeptest.png')
  },
  {
    id: 'party',
    name: 'Party',
    emoji: getEmojiPath('Party.png'),
    image: getImagePath('games/party.png')
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export function MinigamesGridSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(minigames.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentGames = () => {
    const start = currentIndex * itemsPerPage;
    return minigames.slice(start, start + itemsPerPage);
  };

  const handleGameClick = (gameId: string) => {
    // Mapeo de IDs de minijuegos a títulos de secciones de parallax
    const gameToSectionMap: { [key: string]: string } = {
      'skywars': 'SkyWars',
      'party': 'Party',
      'race': 'Race',
      'battlebox': 'BattleBox',
      'random-kits': 'Random Kits',
      'survival-games': 'Survival Games',
      'beep-test': 'Beep Test',
      'spleef': 'Spleef',
      'bow-spleef': 'Bow Spleef'
    };

    const sectionTitle = gameToSectionMap[gameId];
    if (sectionTitle) {
      // Crear un ID válido para el elemento
      const elementId = `section-${sectionTitle.toLowerCase().replace(/\s+/g, '-')}`;
      const element = document.getElementById(elementId);
      if (element) {
        // Scroll más suave y lento usando una animación personalizada
        const targetPosition = element.offsetTop - 100; // Offset para mejor visualización
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 2000; // 2 segundos para un movimiento más lento
        let start: number | null = null;

        // Función de easing para un movimiento más suave
        const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const smoothScroll = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
        };

        requestAnimationFrame(smoothScroll);
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-12 minecraft-font text-white"
          >
            Minigames list
          </motion.h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40"
            disabled={currentIndex === totalPages - 1}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Games Grid */}
           <motion.div
             key={currentIndex}
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -50 }}
             transition={{ duration: 0.5, ease: "easeInOut" }}
             className="grid grid-cols-5 gap-2 px-16"
           >
            {getCurrentGames().map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => handleGameClick(game.id)}
                className={`group cursor-pointer flex flex-col items-center ${
                  index % 2 === 0 ? '-mt-4' : 'mt-4'
                }`}
              >
                {/* Game Card */}
                 <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 w-full h-96 mb-6">
                  {/* Game Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 1024px) 20vw, 200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Emoji Badge - Center Bottom */}
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                     <Image
                       src={game.emoji}
                       alt={`${game.name} emoji`}
                       width={40}
                       height={40}
                       className="w-10 h-10 drop-shadow-lg"
                     />
                   </div>
                </div>

                {/* Game Name - Outside Card */}
                <h3 className="text-white font-bold text-base text-center group-hover:text-blue-400 transition-colors duration-300 minecraft-font">
                  {game.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-400 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}