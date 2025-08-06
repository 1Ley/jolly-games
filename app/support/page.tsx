'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { getImagePath } from '@/lib/assets';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  MessageSquare,
  Users,
  Mail,
  X,
  Heart,
  Code,
  Coffee,
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getEmojiPath } from '@/lib/assets';

const supportChannels = [
  {
    icon: <HelpCircle className="mb-4 h-10 w-10 text-blue-400" />,
    title: 'Canal de General',
    titleColor: 'text-blue-400',
    description:
      'Para preguntas generales, dudas sobre el juego o problemas que no sean críticos. La comunidad te puede ayudar por chat general junto con el staff.',
    link: 'https://discord.com/channels/1313716572283736086/1313722365355491428',
    linkText: 'Ir a 📃︱general',
  },
  {
    icon: <MessageSquare className="mb-4 h-10 w-10 text-green-400" />,
    title: 'Crear un Ticket de Soporte',
    titleColor: 'text-green-400',
    description:
      'Para problemas específicos con tu cuenta, compras, o reportar a un jugador, crea un ticket privado para hablar directamente con un miembro del staff.',
    link: 'https://discord.com/channels/1313716572283736086/1317329483937874071',
    linkText: 'Ir a 🎫︱soporte',
  },
];

const faq = [
  {
    question: '¿Cómo reporto a un jugador que está haciendo trampas?',
    answer:
      'La mejor forma es crear un ticket de soporte adjuntando pruebas (vídeos o capturas de pantalla). Esto nos permite investigar y actuar de forma confidencial.',
  },
  {
    question: 'He comprado un rango pero no lo he recibido.',
    answer:
      'Por favor, crea un ticket de soporte en la sección de #compras y adjunta el recibo de tu compra. Un administrador revisará tu caso lo antes posible.',
  },
  {
    question: '¿Puedo apelar una sanción?',
    answer:
      'Sí, las apelaciones se gestionan exclusivamente a través de los tickets de soporte. Explica tu caso con detalle para que podamos revisarlo.',
  },
];

export default function SupportPage() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showJereEasterEgg, setShowJereEasterEgg] = useState(false);
  const [showShinyEasterEgg, setShowShinyEasterEgg] = useState(false);
  const [jereAvatar, setJereAvatar] = useState<string>('');
  const [leyAvatar, setLeyAvatar] = useState<string>('');

  const fetchMinecraftAvatar = async (username: string) => {
    try {
      const response = await axios.get(
        `https://playerdb.co/api/player/minecraft/${username}`
      );
      if (
        response.data &&
        response.data.code === 'player.found' &&
        response.data.data.player.avatar
      ) {
        return response.data.data.player.avatar;
      }
    } catch (error) {
      console.error(`Could not fetch avatar for ${username}`);
    }
    return `https://mc-heads.net/avatar/steve/64`;
  };

  useEffect(() => {
    const loadAvatars = async () => {
      const jereAvatarUrl = await fetchMinecraftAvatar('zjjeree');
      const leyAvatarUrl = await fetchMinecraftAvatar('1Ley');
      setJereAvatar(jereAvatarUrl);
      setLeyAvatar(leyAvatarUrl);
    };
    loadAvatars();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[450px] overflow-hidden"
        style={{
          backgroundImage: `url(${getImagePath('banner_support.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maskImage:
            'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)',
        }}
      >
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div
          className="bg-gradient-radial absolute inset-0 from-transparent via-black/20 to-black/40"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <HelpCircle className="mx-auto h-16 w-16 text-primary-500" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-glow mb-4 font-minecraft text-5xl font-bold text-white md:text-6xl"
            >
              Centro de Soporte
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto max-w-2xl text-lg text-gray-200"
            >
              ¿Necesitas ayuda? Este es el lugar perfecto para resolver tus
              dudas y encontrar el soporte que buscas de forma rápida y
              sencilla.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="container relative z-20 mx-auto -mt-8 max-w-screen-lg px-4 pb-12 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bento-item mb-12 flex flex-col items-center justify-between gap-8 p-8 md:flex-row"
        >
          <div className="text-center md:text-left">
            <h2 className="mb-2 text-3xl font-bold text-blue-400">
              Únete a nuestro Discord
            </h2>
            <p className="mb-6 max-w-lg text-gray-300">
              La forma más{' '}
              <span className="text-blue-300">rápida y efectiva</span> de
              obtener soporte es a través de nuestro servidor de Discord. Únete
              a la comunidad, participa y obtén ayuda al instante.
            </p>
            <Button
              size="lg"
              asChild
              className="group bg-blue-600 text-white hover:bg-blue-700"
            >
              <Link href="https://discord.gg/jolly" target="_blank">
                <FaDiscord className="mr-2 h-5 w-5" />
                Unirse ahora
              </Link>
            </Button>
          </div>
          <div className="flex-shrink-0">
            <FaDiscord className="h-32 w-32 text-blue-500/30" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="mb-8 text-center text-3xl font-bold">
            ¿Cómo te podemos ayudar?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bento-item p-6 text-center">
                {channel.icon}
                <h3
                  className={`mb-3 text-xl font-semibold ${channel.titleColor}`}
                >
                  {channel.title}
                </h3>
                <p className="mb-6 text-gray-400">{channel.description}</p>
                <Button variant="outline" asChild>
                  <Link href={channel.link} target="_blank">
                    {channel.linkText}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-purple-400">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="bento-item p-5">
                <h3 className="text-lg font-semibold text-white">
                  {item.question}
                </h3>
                <p className="mt-2 text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-orange-400">
            Administración
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-gray-400">
            Nuestro equipo de administración está disponible para resolver
            problemas críticos y tomar decisiones importantes sobre el servidor.
            Contacta directamente solo para casos urgentes.
          </p>

          <div className="mb-12">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
              <div
                className="bento-item min-h-[180px] w-full cursor-pointer rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
                onClick={() => setShowJereEasterEgg(true)}
              >
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-3">
                    <img
                      src="https://mc-heads.net/avatar/zjjeree/64"
                      alt="zjjeree avatar"
                      className="h-10 w-10 flex-shrink-0 rounded-lg"
                    />
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">zjjeree</h3>
                      <span className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white">
                        Founder
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span className="break-all text-sm text-gray-300">
                      zjjeree@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-300">zjjereee</span>
                  </div>
                </div>
              </div>

              <div
                className="bento-item min-h-[180px] w-full cursor-pointer rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
                onClick={() => setShowEasterEgg(true)}
              >
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-3">
                    <img
                      src="https://mc-heads.net/avatar/1ley/64"
                      alt="1ley avatar"
                      className="h-10 w-10 flex-shrink-0 rounded-lg"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-white">1ley</h3>
                      <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs font-semibold text-white">
                        Web Dev
                      </span>
                      <span className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
                        Admin
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span className="break-all text-sm text-gray-300">
                      imleidan@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-300">1ley.</span>
                  </div>
                </div>
              </div>

              <div
                className="bento-item min-h-[180px] w-full cursor-pointer rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
                onClick={() => setShowShinyEasterEgg(true)}
              >
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-3">
                    <img
                      src="https://mc-heads.net/avatar/elchachobles/64"
                      alt="elchachobles avatar"
                      className="h-10 w-10 flex-shrink-0 rounded-lg"
                    />
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">Shiny</h3>
                      <span className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                        Dev MC
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span className="break-all text-sm text-gray-300">
                      shinybless2019@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-300">shinybless</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Título para el equipo de staff */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-8 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Equipo de Staff
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Nuestro equipo de soporte está aquí para ayudarte con cualquier
            consulta o problema que puedas tener. Por favor, usa esta opción
            solo para casos urgentes.
          </p>
        </motion.div>

        {showEasterEgg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bento-item relative mx-4 max-w-md shadow-2xl"
            >
              <button
                onClick={() => setShowEasterEgg(false)}
                className="absolute right-4 top-4 z-10 text-gray-400 transition-colors hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center">
                <div className="mb-6">
                  <div className="glow mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Code className="h-8 w-8 text-white" />
                  </div>

                  <p className="gradient-text text-lg font-semibold">
                    Desarrollador de la web Jolly Games
                  </p>
                </div>

                <div className="space-y-4 text-left">
                  <div className="bento-item p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-400" />
                      <span className="font-semibold text-white">
                        Sobre este proyecto
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">
                      He desarrollado esta web completamente desde cero para la
                      comunidad de Jolly Games. Cada línea de código ha sido
                      escrita con dedicación para brindar la mejor experiencia
                      posible.
                    </p>
                  </div>

                  <div className="bento-item p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Coffee className="h-5 w-5 text-yellow-400" />
                      <span className="font-semibold text-white">
                        ¿Te gusta mi trabajo?
                      </span>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-gray-300">
                      Si aprecias el esfuerzo y quieres apoyar el desarrollo
                      continuo de la web, puedes invitarme un café ☕
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-colors hover:from-blue-700 hover:to-purple-700"
                      asChild
                    >
                      <Link
                        href="https://paypal.me/1miley"
                        target="_blank"
                        className="inline-flex items-center gap-2 font-semibold"
                      >
                        <Heart className="h-4 w-4 text-red-600" />
                        Donar vía PayPal
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Hecho con ❤️ por 1ley para la comunidad
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Secciones de Supports y Hosters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {/* Supports Disponibles */}
          <div className="bento-item rounded-lg p-8">
            <h3 className="mb-6 text-center text-2xl font-bold text-primary-400">
              Supports Disponibles
            </h3>
            <div className="space-y-4">
              <p className="mb-6 text-center text-gray-400">
                Nuestro equipo de soporte está aquí para ayudarte con cualquier
                consulta o problema que puedas tener.
              </p>

              {/* Lista de Supports */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/slownnn_/32"
                    alt="Slownnn avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">Slownnn</span>
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-1 text-xs font-semibold text-orange-300">
                      Regulator
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>slownnn_</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/guillexer/32"
                    alt="guillexer avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">guillexer</span>
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-1 text-xs font-semibold text-orange-300">
                      Support
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>guillexer2.0</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/_cqritxs/32"
                    alt="iCqritxs avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">iCqritxs</span>
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-1 text-xs font-semibold text-orange-300">
                      Support
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>cqritxs</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/_shuts/32"
                    alt="shuts avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">shuts</span>
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-1 text-xs font-semibold text-orange-300">
                      Support
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>.shuts</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/soylianx/32"
                    alt="SoyLianx avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">SoyLianx</span>
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-1 text-xs font-semibold text-orange-300">
                      Support
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>soylianx</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/wjeff123/32"
                    alt="wJeff123 avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">wJeff123</span>
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-1 text-xs font-semibold text-orange-300">
                      Support
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>wjeff123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hosters Activos */}
          <div className="bento-item rounded-lg p-8">
            <h3 className="mb-6 text-center text-2xl font-bold text-primary-400">
              Hosters Activos
            </h3>
            <div className="space-y-4">
              <p className="mb-6 text-center text-gray-400">
                Nuestros hosters se encargan de organizar y gestionar los
                eventos y partidas especiales.
              </p>

              {/* Lista de Hosters */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/crystaxol/32"
                    alt="CrystAxol avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">CrystAxol</span>
                    <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-300">
                      Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>crystaxol</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/dogmy/32"
                    alt="Dogmy avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">Dogmy</span>
                    <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-300">
                      Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>dogmy</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/montoyatr/32"
                    alt="MontoyaTrr avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">MontoyaTrr</span>
                    <span className="rounded-full border border-green-500/30 bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-300">
                      Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>montoyatr</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/vdiegoz/32"
                    alt="FalseXo_ avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">FalseXo_</span>
                    <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                      T.Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>vdiegoz</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/khali_tv/32"
                    alt="Khali avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">Khali</span>
                    <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                      T.Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>khali_tv</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/oscarramos/32"
                    alt="Oscar avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">Oscar</span>
                    <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                      T.Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>oscarramos</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/wintersggez/32"
                    alt="Previo avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">Previo</span>
                    <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                      T.Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>wintersggez</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/sbloosh/32"
                    alt="Sbloosh avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">Sbloosh</span>
                    <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                      T.Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>sbloosh</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/xic_julius/32"
                    alt="julianoviix avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">julianoviix</span>
                    <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                      T.Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>xic_julius</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/sthefanw/32"
                    alt="sthefanw avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">sthefanw</span>
                    <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                      T.Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>sthefanw</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-700/50">
                  <img
                    src="https://mc-heads.net/head/jollygamesevent/32"
                    alt="jollygamesevent avatar"
                    className="h-8 w-8 rounded"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">
                      jollygamesevent
                    </span>
                    <span className="rounded-full border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                      T.Host
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <img
                      src={getEmojiPath('Discord.svg')}
                      alt="Discord"
                      className="h-4 w-4"
                    />
                    <span>jollygamesevent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {showJereEasterEgg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bento-item relative mx-4 max-w-lg shadow-2xl"
            >
              <button
                onClick={() => setShowJereEasterEgg(false)}
                className="absolute right-4 top-4 z-10 text-gray-400 transition-colors hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center">
                <div className="mb-6">
                  <p className="gradient-text text-lg font-semibold">
                    Fundador de Jolly Games
                  </p>
                  <p className="mt-2 text-sm text-gray-300">
                    Creador de todos los minijuegos para la comunidad latina
                  </p>
                </div>

                <div className="space-y-4 text-left">
                  <div className="bento-item p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-yellow-400" />
                      <span className="font-semibold text-white">Historia</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">
                      Un día jugué un evento con mis seguidores, mis seguidores
                      eran pobres ya que no tenían cuenta premium y cree mi
                      propio evento no premium para que ellos jugarán.
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Fundador y creador de Jolly Games 🎮
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showShinyEasterEgg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bento-item relative mx-4 max-w-lg shadow-2xl"
            >
              <button
                onClick={() => setShowShinyEasterEgg(false)}
                className="absolute right-4 top-4 z-10 text-gray-400 transition-colors hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center">
                <div className="mb-6">
                  <p className="gradient-text text-lg font-semibold">
                    Desarrollador de Plugins MC
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Creador del plugin principal de Jolly Games
                  </p>
                </div>

                <div className="space-y-4 text-left">
                  <div className="bento-item p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-green-400" />
                      <span className="font-semibold text-white">
                        Proyectos destacados
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">
                      Creador del plugin principal de Jolly Games, con
                      experiencia en el diseño de mecánicas únicas, optimización
                      avanzada de rendimiento y desarrollo de sistemas
                      personalizados para garantizar una experiencia de juego
                      fluida y dinámica.
                    </p>
                  </div>

                  <div className="bento-item p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Code className="h-5 w-5 text-blue-400" />
                      <span className="font-semibold text-white">
                        Experiencia
                      </span>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-gray-300">
                      Más de 3 años de experiencia desarrollando plugins a
                      medida, APIs y sistemas backend para servidores de
                      Minecraft. Especialista en Spigot/Paper, optimización de
                      rendimiento y gestión avanzada de bases de datos.
                    </p>
                    <Button
                      size="sm"
                      className="glow w-full transform bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
                      asChild
                    >
                      <Link
                        href="https://tinyurl.com/shiny-portfolio"
                        target="_blank"
                        className="inline-flex items-center gap-2 font-semibold"
                      >
                        <Code className="h-4 w-4" />
                        Ver Portafolio
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Desarrollador especializado en plugins de Minecraft 🎮
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
