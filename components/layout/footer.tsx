'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Youtube, Instagram, Mail, MapPin, Heart } from 'lucide-react';
import { FaDiscord, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getImagePath } from '@/lib/assets';

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
      { name: 'Galería', href: '/events' },
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
    name: 'X (Twitter)',
    href: 'https://twitter.com/jollygamesevent',
    icon: FaXTwitter,
    color: 'hover:text-white',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@jollygamesevent',
    icon: FaTiktok,
    color: 'hover:text-[#ff0050]',
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/jolly',
    icon: FaDiscord,
    color: 'hover:text-[#5865F2]',
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="group mb-4 flex items-center space-x-2">
                <Image
                  src={getImagePath('logo.png')}
                  alt="Jolly Games Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <Image
                  src={getImagePath('jollygames.png')}
                  alt="Jolly Games"
                  width={140}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>

              <p className="mb-6 max-w-sm text-gray-400">
                La mejor experiencia de minijuegos de Minecraft. Únete a nuestra
                comunidad y disfruta de juegos únicos y emocionantes.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>zjjeree@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Argentina</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="mb-4 font-semibold text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors duration-200 hover:text-primary-400"
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
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>
                  © {currentYear} Jolly Studio. Todos los derechos reservados.
                </span>
                <span className="hidden md:inline">•</span>
                <span className="flex hidden items-center space-x-1 md:inline">
                  <span>Hecho con</span>
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>en Argentina y Perú</span>
                </span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map(social => {
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
                      <Icon className="h-5 w-5" />
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
