'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { formatRelativeTime, formatNumber } from '@/lib/utils';

const activities: any[] = [];

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bento-item h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Comunidad</h2>
            <p className="text-gray-400 text-sm">Últimas creaciones</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          Ver galería
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {activities.slice(0, 3).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
            className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
          >
            <div className="flex space-x-3">
              {/* Activity Image */}
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                  <span className="text-2xl opacity-50">🖼️</span>
                </div>
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                    {activity.title}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`ml-2 text-xs ${activityTypeColors[activity.type]}`}
                  >
                    {activityTypeLabels[activity.type]}
                  </Badge>
                </div>
                
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                  {activity.description}
                </p>
                
                {/* Activity Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{formatNumber(activity.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{activity.comments.length}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      por {activity.user.username}
                    </span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(activity.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-white">1.2k</div>
            <div className="text-xs text-gray-500">Creaciones</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">8.5k</div>
            <div className="text-xs text-gray-500">Me Gusta</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">3.2k</div>
            <div className="text-xs text-gray-500">Comentarios</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}