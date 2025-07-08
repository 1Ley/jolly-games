'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { formatRelativeTime, formatNumber } from '@/lib/utils';
import { mockCommunityActivities as fetchMockCommunityActivities } from '@/data/mock-data';

interface CommunityActivity {
  id: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  type: 'screenshot' | 'artwork' | 'build' | 'achievement';
  title: string;
  likes: number;
  comments: number;
  createdAt: string;
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
      const calculatedStats = data.reduce((acc, activity) => {
        acc.likes += activity.likes;
        acc.comments += activity.comments;
        return acc;
      }, { creations: data.length, likes: 0, comments: 0 });
      setStats(calculatedStats);
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-10 h-10 text-pink-500 animate-pulse mx-auto mb-3" />
            <p className="text-sm text-gray-400">Cargando actividad...</p>
          </div>
        </div>
      );
    }

    if (activities.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-white">No hay actividad reciente</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {activities.slice(0, 3).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex space-x-3">
              <Image 
                src={activity.user.avatarUrl}
                alt={activity.user.username}
                width={32}
                height={32}
                className="w-8 h-8 rounded-md mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-white truncate group-hover:text-primary-400">
                    {activity.title}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`ml-2 text-xs px-1.5 py-0.5 ${activityTypeColors[activity.type]}`}
                  >
                    {activityTypeLabels[activity.type]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <p>
                    por <span className="font-medium text-gray-400">{activity.user.username}</span>
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{formatNumber(activity.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{formatNumber(activity.comments)}</span>
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bento-item p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Actividad de la Comunidad</h2>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white -mr-2">
          Ver todo
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {renderContent()}

      {stats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">{formatNumber(stats.creations)}</div>
              <div className="text-xs text-gray-500">Creaciones</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">{formatNumber(stats.likes)}</div>
              <div className="text-xs text-gray-500">Me Gusta</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">{formatNumber(stats.comments)}</div>
              <div className="text-xs text-gray-500">Comentarios</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}