'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getEmojiPath } from '@/lib/assets';

interface ParallaxScrollSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  imageSide: 'left' | 'right';
}

export function ParallaxScrollSection({
  title,
  description,
  imageUrl,
  imageSide,
}: ParallaxScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para obtener el emoji correspondiente al juego
  const getGameEmojiPath = (gameTitle: string): string => {
    const emojiMap: { [key: string]: string } = {
      'SkyWars': 'Skywars.png',
      'Party': 'Party.png',
      'Race': 'Cohete.png',
      'BattleBox': 'BattleBox.png',
      'Random Kits': 'Random Kits.png',
      'Survival Games': 'Survival games.png',
      'Beep Test': 'BeepTest.png',
      'Spleef': 'Spleef.png',
      'Bow Spleef': 'Bow_Spleef.png',
    };
    return getEmojiPath(emojiMap[gameTitle] || 'JollyGames.png');
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
    layoutEffect: false, // Usa useEffect en lugar de useLayoutEffect para mejor rendimiento
  });

  // Transformación directa sin suavizado para movimiento instantáneo con el scroll
  const xPosition = useTransform(
    scrollYProgress,
    [0, 1],
    imageSide === 'left' ? ['-20vw', '5vw'] : ['20vw', '-5vw'],
    { ease: undefined } // Elimina cualquier función de suavizado
  );

  // Crear un ID único basado en el título
  const sectionId = `section-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section
      id={sectionId}
      ref={containerRef}
      className="relative flex h-[80vh] items-center justify-center overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 md:grid-cols-2">
        {/* Text Column */}
        <motion.div
          className={`text-center md:text-left ${
            imageSide === 'left' ? 'md:order-last' : 'md:order-first'
          }`}
          initial={{ opacity: 1, y: 0 }} // Sin animación inicial, aparece directamente
          // Eliminamos whileInView y transition para evitar suavizados
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl minecraft-font flex items-center justify-center md:justify-start gap-3">
            {title}
            <Image
              src={getGameEmojiPath(title)}
              alt={`${title} emoji`}
              width={48}
              height={48}
              className="inline-block"
            />
          </h2>
          <p className="text-lg text-gray-300 md:text-xl">{description}</p>
        </motion.div>

        {/* Image Column */}
        <div className="flex items-center justify-center">
          <motion.div
            className="image-card h-96 w-full max-w-lg" // Usando image-card para que la imagen ocupe todo el espacio incluyendo bordes
            style={{
              x: xPosition,
              willChange: 'transform', // Hinting the browser for GPU acceleration
            }}
            transition={{ duration: 0 }} // Elimina cualquier transición predeterminada
          >
            {/* The image now fills the entire card including borders */}
            <div className="relative h-full w-full">
              <Image src={imageUrl} alt={title} fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
