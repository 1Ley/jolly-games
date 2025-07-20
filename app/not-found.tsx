'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { getImagePath, getAssetPath } from '@/lib/assets';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background matching other pages */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ backgroundImage: `url(${getAssetPath('/grid.svg')})` }}
        />
      </div>
      <div className="text-center max-w-xl mx-auto">
        {/* Animated 404 Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-2">
            Error 404
          </h1>
        </motion.div>

        {/* Meme Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mb-2">
            Esta página aún está en construcción pibe
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Parece que te perdiste
          </p>
        </motion.div>

        {/* Error 404 Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src={getImagePath('error404.png')}
              alt="Error 404 - Página no encontrada"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Link href="/">
            <Button 
              size="default" 
              className="bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 px-6 py-2 rounded-md transition-colors duration-200 shadow-sm"
            >
              <Home className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="default"
            onClick={() => window.history.back()}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-md transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Página Anterior
          </Button>
        </motion.div>

        {/* Jolly Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-gray-500 text-xs"
        >
          <p>💡 Tip: Mientras tanto, ¿por qué no juegas un Jolly?</p>
        </motion.div>
      </div>
    </main>
  );
}