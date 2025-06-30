'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Youtube, 
  Instagram,
  Mail,
  MapPin,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const footerLinks = {
  game: {
    title: 'Juego',
    links: [
      { name: 'Ip del servidor', href: '/' },
      { name: 'Guía de Inicio', href: '/getting-started' },
      { name: 'Actualizaciones', href: '/updates' },
      { name: 'Estadísticas', href: '/stats' },
    ],
  },
  community: {
    title: 'Comunidad',
    links: [
      { name: 'Foro', href: '/forum' },
      { name: 'Discord', href: 'https://discord.gg/jollygames' },
      { name: 'Galería', href: '/community' },
      { name: 'Eventos', href: '/events' },
    ],
  },
  support: {
    title: 'Soporte',
    links: [
      { name: 'Centro de Ayuda', href: '/support' },
      { name: 'Reportar Bug', href: '/support/bug-report' },
      { name: 'Contacto', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Términos de Servicio', href: '/terms' },
      { name: 'Política de Privacidad', href: '/privacy' },
      { name: 'Reglas del Servidor', href: '/rules' },
      { name: 'DMCA', href: '/dmca' },
    ],
  },
};

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/jollygames',
    icon: Twitter,
    color: 'hover:text-[#1DA1F2]',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@jollygames',
    icon: Youtube,
    color: 'hover:text-[#FF0000]',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/jollygames',
    icon: Instagram,
    color: 'hover:text-[#E4405F]',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/jollystudio',
    icon: Github,
    color: 'hover:text-white',
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-900 to-transparent" />
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 group mb-4">
                <Image 
                  src="/images/logo.png" 
                  alt="Jolly Games Logo" 
                  width={40} 
                  height={40} 
                  className="h-10 w-auto"
                />
                <Image
                  src="/images/jollygames.png"
                  alt="Jolly Games"
                  width={140}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              
              <p className="text-gray-400 mb-6 max-w-sm">
                La mejor experiencia de minijuegos de Minecraft. Únete a nuestra comunidad y disfruta de juegos únicos y emocionantes.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>zjjeree@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Argentina</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>© {currentYear} Jolly Studio. Todos los derechos reservados.</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline flex items-center space-x-1">
                  <span>Hecho con</span>
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>en Argentina y Perú</span>
                </span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 transition-colors duration-200 ${social.color}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}