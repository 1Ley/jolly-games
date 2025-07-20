'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  MessageSquare,
  HelpCircle,
  Users,
  Trophy,
  FileText,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { getImagePath } from '@/lib/assets';

const navigation = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Updates', href: '/updates', icon: FileText },
  { name: 'Soporte', href: '/support', icon: HelpCircle },
  { name: 'Events', href: '/community', icon: Users },
  { name: 'Leaderboard', href: '/en-construccion', icon: Trophy },
  { name: 'Reglas', href: '/rules', icon: Shield },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 minecraft-font transition-all duration-300',
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
                src={getImagePath('logo.png')}
                alt="Jolly Games Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </motion.div>
            <Image
              src={getImagePath('jollygames.png')}
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

            {/* Tienda Link */}
            <Link href="https://jollygames.store/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="sm"
                className="hidden items-center space-x-2 text-gray-300 hover:text-white sm:flex hover:bg-green-500/10 hover:text-green-400 transition-all duration-200"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Tienda del Servidor</span>
              </Button>
            </Link>

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

                {/* Mobile Store Link */}
                <div className="border-t border-white/10 pt-2">
                  <Link
                    href="https://jollygames.store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-green-500/10 hover:text-green-400 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Tienda del Servidor</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
