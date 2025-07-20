'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { formatNumber } from '@/lib/utils';
import { mockActivities as fetchMockCommunityActivities } from '@/data/mock-data';
import type { Comment as ActivityComment } from '@/types';

interface CommunityActivity {
  id: string;
  user: {
    username: string;
    avatar?: string;
  };
  type: 'screenshot' | 'artwork' | 'build' | 'achievement';
  title: string;
  likes: number;
  comments: ActivityComment[] | number;
  createdAt: string | Date;
  imageUrl?: string;
}

interface CommunityStats {
  creations: number;
  likes: number;
  comments: number;
}

const activityTypeColors = {
  screenshot: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  artwork: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  build: 'bg-green-500/20 text-green-400 border-green-500/30',
  achievement: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

const activityTypeLabels = {
  screenshot: 'Captura',
  artwork: 'Arte',
  build: 'Construcción',
  achievement: 'Logro',
};

export function CommunitySection() {
  const [activities, setActivities] = useState<CommunityActivity[]>([]);
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const data = fetchMockCommunityActivities;
      setActivities(data);
      const calculatedStats = data.reduce(
        (acc, activity) => {
          acc.likes += activity.likes;
          acc.comments += Array.isArray(activity.comments) ? activity.comments.length : activity.comments;
          return acc;
        },
        { creations: data.length, likes: 0, comments: 0 }
      );
      setStats(calculatedStats);
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Heart className="mx-auto mb-3 h-10 w-10 text-pink-500" />
            <p className="text-sm text-gray-400">Cargando actividad...</p>
          </div>
        </div>
      );
    }

    if (activities.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Heart className="mx-auto mb-3 h-10 w-10 text-gray-600" />
            <p className="text-sm font-semibold text-white">
              No hay actividad reciente
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {activities.slice(0, 3).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 1, x: 0 }} // Sin animación inicial
            className="group cursor-pointer rounded-lg bg-white/5 p-3 hover:bg-white/10"
          >
            <div className="flex space-x-3">
              <Image
                src={activity.user.avatar || 'https://mc-heads.net/avatar/steve/64'}
                alt={activity.user.username}
                width={32}
                height={32}
                className="mt-1 h-8 w-8 rounded-md"
              />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <p className="truncate text-sm font-semibold text-white group-hover:text-primary-400">
                    {activity.title}
                  </p>
                  <Badge
                    variant="outline"
                    className={`ml-2 px-1.5 py-0.5 text-xs ${activityTypeColors[activity.type]}`}
                  >
                    {activityTypeLabels[activity.type]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <p>
                    por{' '}
                    <span className="font-medium text-gray-400">
                      {activity.user.username}
                    </span>
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{formatNumber(activity.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{formatNumber(Array.isArray(activity.comments) ? activity.comments.length : activity.comments)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }} // Sin animación inicial
      className="glass-card flex h-full flex-col p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Actividad de la Comunidad
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="-mr-2 text-gray-400 hover:text-white"
        >
          Ver todo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {renderContent()}

      {stats && (
        <motion.div
          initial={{ opacity: 1 }} // Sin animación inicial
          className="mt-4 border-t border-white/10 pt-4"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">
                {formatNumber(stats.creations)}
              </div>
              <div className="text-xs text-gray-500">Creaciones</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {formatNumber(stats.likes)}
              </div>
              <div className="text-xs text-gray-500">Me Gusta</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {formatNumber(stats.comments)}
              </div>
              <div className="text-xs text-gray-500">Comentarios</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
