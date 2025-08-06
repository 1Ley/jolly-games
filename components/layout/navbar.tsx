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
  Gamepad2,
  ChevronDown,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { getImagePath } from '@/lib/assets';

const navigation = [
  { name: 'Updates', href: '/updates', icon: FileText },
  { name: 'Events', href: '/events', icon: Users },
];

const extrasItems = [
  { name: 'Soporte', href: '/support', icon: HelpCircle },
  { name: 'Reglas', href: '/rules', icon: Shield },
  { name: 'Games', href: '/games', icon: Gamepad2 },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExtrasOpen) {
        setIsExtrasOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isExtrasOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'minecraft-font fixed left-0 right-0 top-0 z-50 transition-all duration-300',
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
          <div className="hidden items-center space-x-1 md:flex ml-auto mr-8">
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
            
            {/* Extras Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExtrasOpen(!isExtrasOpen);
                }}
                className={cn(
                  'group relative flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                  extrasItems.some(item => pathname === item.href)
                    ? 'bg-primary-500/10 text-primary-400'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                )}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span>Extras</span>
                <ChevronDown className={cn(
                  'h-3 w-3 transition-transform duration-200',
                  isExtrasOpen ? 'rotate-180' : ''
                )} />
                {extrasItems.some(item => pathname === item.href) && (
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
              </button>
              
              <AnimatePresence>
                {isExtrasOpen && (
                  <motion.div
                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -10, scale: 0.95 }}
                     transition={{ duration: 0.2, ease: "easeOut" }}
                     onClick={(e) => e.stopPropagation()}
                     className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-white/20 bg-black/40 backdrop-blur-2xl shadow-2xl ring-1 ring-white/10"
                     style={{
                       background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(30,30,30,0.8) 100%)',
                       backdropFilter: 'blur(20px) saturate(180%)',
                       WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                     }}
                   >
                    <div className="p-3">
                      <div className="mb-2 px-3 py-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navegación</span>
                      </div>
                      {extrasItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        
                        return (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsExtrasOpen(false)}
                              className={cn(
                                'group flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden',
                                isActive
                                  ? 'bg-gradient-to-r from-primary-500/30 to-primary-600/20 text-primary-300 shadow-lg'
                                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:text-white hover:shadow-md'
                              )}
                            >
                              <div className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300',
                                isActive 
                                  ? 'bg-primary-500/40 text-primary-200'
                                  : 'bg-white/10 group-hover:bg-white/20'
                              )}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <span className="font-medium">{item.name}</span>
                              {isActive && (
                                <motion.div
                                  layoutId="dropdown-indicator"
                                  className="absolute right-2 h-2 w-2 rounded-full bg-primary-400"
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                              )}
                            </Link>
                          </motion.div>
                         );
                       })}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">

            {/* Tienda Link */}
            <Link
              href="https://jollygames.store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="sm"
                className="hidden items-center space-x-2 text-gray-300 transition-all duration-200 hover:bg-green-500/10 hover:text-green-400 hover:text-white sm:flex"
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
                
                {/* Mobile Extras Section */}
                <div className="border-t border-white/10 pt-2 mt-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Extras
                  </div>
                  {extrasItems.map(item => {
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
                </div>

                {/* Mobile Store Link */}
                <div className="border-t border-white/10 pt-2">
                  <Link
                    href="https://jollygames.store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-medium text-gray-300 transition-all duration-200 hover:bg-green-500/10 hover:text-green-400"
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
