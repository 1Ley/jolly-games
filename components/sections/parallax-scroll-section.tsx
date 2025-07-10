'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
    smooth: false, // Desactiva el suavizado del scroll
    layoutEffect: false, // Usa useEffect en lugar de useLayoutEffect para mejor rendimiento
  });

  // Transformación directa sin suavizado para movimiento instantáneo con el scroll
  const xPosition = useTransform(
    scrollYProgress,
    [0, 1],
    imageSide === 'left' ? ['-20vw', '5vw'] : ['20vw', '-5vw'],
    { ease: undefined } // Elimina cualquier función de suavizado
  );

  return (
    <section
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
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {title}
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
              transition: { duration: 0 }, // Elimina cualquier transición predeterminada
            }}
            transition={{ type: false }} // Desactiva las transiciones de Framer Motion
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
