'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { MinigamesGridSection } from '@/components/sections/minigames-grid-section';
import { motion } from 'framer-motion';
import { ParallaxScrollSection } from '@/components/sections/parallax-scroll-section';
import { mockFeatureSections } from '@/data/mock-data';

const containerVariants = {
  hidden: { opacity: 1 }, // Cambiado a 1 para que no haya animación inicial
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0, // Sin retraso
    },
  },
};

const itemVariants = {
  hidden: { y: 0, opacity: 1 }, // Cambiado para que no haya animación inicial
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0 }, // Sin duración para transición instantánea
  },
};

export default function GamesPage() {
  return (
    <motion.main
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section className="relative" variants={itemVariants}>
        <HeroSection />
      </motion.section>

      {/* Minigames Grid Section */}
      <motion.section variants={itemVariants}>
        <MinigamesGridSection />
      </motion.section>

      {/* New Parallax Scroll Sections */}
      <div>
        {mockFeatureSections.map((section, index) => (
          <ParallaxScrollSection
            key={section.title}
            title={section.title}
            description={section.description}
            imageUrl={section.imageUrl}
            imageSide={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </motion.main>
  );
}
