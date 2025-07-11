'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  MessageSquare,
  HelpCircle,
  Users,
  Trophy,
  FileText,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import MinecraftAvatar from '@/components/ui/minecraft-avatar';
import Image from 'next/image';

const navigation = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Foro', href: '/forum', icon: MessageSquare },
  { name: 'Soporte', href: '/support', icon: HelpCircle },
  { name: 'Comunidad', href: '/community', icon: Users },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Reglas', href: '/rules', icon: FileText },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && !(event.target as Element).closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 font-minecraft transition-all duration-300',
        scrolled ? 'glass-nav backdrop-blur-xl' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-shrink-0 items-center space-x-2"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/images/logo.png"
                alt="Jolly Games Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </motion.div>
            <Image
              src="/images/jollygames.png"
              alt="Jolly Games"
              width={120}
              height={40}
              className="hidden h-8 w-auto sm:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navigation.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group relative flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-lg border border-primary-500/30 bg-primary-500/20"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative hidden sm:block user-menu">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <MinecraftAvatar 
                    username={user?.minecraft_username} 
                    size="sm" 
                    className="flex-shrink-0"
                  />
                  <span className="max-w-24 truncate">{user?.username}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-xl"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 flex items-center space-x-3">
                          <MinecraftAvatar 
                            username={user?.minecraft_username} 
                            size="md" 
                          />
                          <div className="flex flex-col">
                            <span className="text-white font-medium text-sm">{user?.username}</span>
                            {user?.minecraft_username && (
                              <span className="text-gray-400 text-xs">MC: {user.minecraft_username}</span>
                            )}
                          </div>
                        </div>
                        <hr className="border-white/10 my-1" />
                        <Link
                          href="/profile"
                          className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Perfil</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/auth" passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden items-center space-x-2 text-gray-300 hover:text-white sm:flex"
                  disabled={loading}
                >
                  <User className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 border-t border-white/10 pt-2 md:hidden"
            >
              <div className="space-y-1 pb-3">
                {navigation.map(item => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-medium transition-colors duration-200',
                        isActive
                          ? 'bg-primary-500/10 text-primary-400'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* Mobile User Actions */}
                <div className="border-t border-white/10 pt-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 flex items-center space-x-3">
                        <MinecraftAvatar 
                          username={user?.minecraft_username} 
                          size="md" 
                        />
                        <div className="flex flex-col">
                          <span className="text-white font-medium text-sm">{user?.username}</span>
                          {user?.minecraft_username && (
                            <span className="text-gray-400 text-xs">MC: {user.minecraft_username}</span>
                          )}
                        </div>
                      </div>
                      <Link href="/profile" passHref>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-300 hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          <Settings className="mr-3 h-5 w-5" />
                          Perfil
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:text-red-300"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <Link href="/auth" passHref>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white"
                        onClick={() => setIsOpen(false)}
                        disabled={loading}
                      >
                        <User className="mr-3 h-5 w-5" />
                        Iniciar Sesión
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
