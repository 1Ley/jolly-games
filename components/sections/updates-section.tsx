'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Bug, Wrench, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockRecentUpdates } from '@/data/mock-data';
import { formatRelativeTime } from '@/lib/utils';

const typeIcons = {
  feature: Lightbulb,
  bugfix: Bug,
  update: Wrench,
};

const typeColors = {
  feature: 'text-purple-400',
  bugfix: 'text-red-400',
  update: 'text-blue-400',
};

export function UpdatesSection() {
  return (
    <section id="updates" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Últimas actualizaciones y noticias
          </h2>
          <p className="text-xl text-gray-400">
            Mantente al día con las últimas novedades de la comunidad y el servidor.
          </p>
        </motion.div>

        <div className="space-y-4">
          {mockRecentUpdates.map((update, index) => {
            const Icon = typeIcons[update.type as keyof typeof typeIcons];
            const colorClass =
              typeColors[update.type as keyof typeof typeColors];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bento-item flex items-center space-x-4 p-4"
              >
                <div className={`text-2xl ${colorClass}`}>
                  <Icon />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-white">{update.title}</p>
                </div>
                <div className="text-sm text-gray-500">{update.time}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="text-lg">
            Ver todas las noticias <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}