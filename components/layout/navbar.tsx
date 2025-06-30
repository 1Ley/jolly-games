'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-minecraft',
        scrolled
          ? 'glass-nav backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center space-x-2 group">
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
              className="h-8 w-auto hidden sm:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative',
                    isActive
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary-500/20 rounded-lg border border-primary-500/30"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
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
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2 text-gray-300 hover:text-white"
            >
              <User className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
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
              className="md:hidden border-t border-white/10 mt-2 pt-2"
            >
              <div className="space-y-1 pb-3">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200',
                        isActive
                          ? 'text-primary-400 bg-primary-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                
                {/* Mobile User Actions */}
                <div className="pt-2 border-t border-white/10">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Iniciar Sesión
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}