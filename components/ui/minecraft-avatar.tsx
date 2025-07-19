'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MinecraftAvatarProps {
  username?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
  showUsername?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

const MinecraftAvatar: React.FC<MinecraftAvatarProps> = ({
  username,
  size = 'md',
  className,
  fallback = 'Ocullar',
  showUsername = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Resetear error cuando cambie el username
  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [username]);

  // Usar fallback si no hay username o si hay error
  const displayUsername = username && !imageError ? username : fallback;
  
  // URL de la API de Minecraft para obtener el avatar con overlay (ambas capas)
  const avatarUrl = `https://mc-heads.net/head/${displayUsername}/128`;
  
  // URL alternativa en caso de error
  const fallbackUrl = `https://mc-heads.net/head/Ocullar/128`;

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'relative overflow-hidden',
        sizeClasses[size]
      )}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <Image
          src={!imageError ? avatarUrl : fallbackUrl}
          alt={`Avatar de ${displayUsername}`}
          width={128}
          height={128}
          className={cn(
            'object-cover transition-opacity duration-200',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onError={handleImageError}
          onLoad={handleImageLoad}
          unoptimized // Para permitir URLs externas
        />
      </div>
      
      {showUsername && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {username || 'Usuario'}
          </span>
          {username && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Minecraft: {displayUsername}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MinecraftAvatar;

// Hook personalizado para obtener información del usuario con skin
export const useMinecraftUser = (username?: string) => {
  const [skinData, setSkinData] = useState<{
    username: string;
    uuid?: string;
    skinUrl: string;
    isValid: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) {
      setSkinData(null);
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Intentar obtener UUID del usuario
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        
        if (response.ok) {
          const data = await response.json();
          setSkinData({
            username: data.name,
            uuid: data.id,
            skinUrl: `https://mc-heads.net/head/${data.name}/128`,
            isValid: true
          });
        } else {
          // Usuario no encontrado, usar fallback
          setSkinData({
            username: username,
            skinUrl: `https://mc-heads.net/head/Steve/128`,
            isValid: false
          });
        }
      } catch (error) {
        console.error('Error fetching Minecraft user data:', error);
        setSkinData({
          username: username,
          skinUrl: `https://mc-heads.net/head/Steve/128`,
          isValid: false
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  return { skinData, loading };
};