'use client';

import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Users, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const supportChannels = [
  {
    icon: <HelpCircle className="mb-4 h-10 w-10 text-primary-400" />,
    title: 'Canal de #soporte-general',
    description:
      'Para preguntas generales, dudas sobre el juego o problemas que no sean críticos. La comunidad y el staff pueden ayudarte aquí.',
    link: 'https://discord.com/channels/YOUR_SERVER_ID/YOUR_SUPPORT_CHANNEL_ID',
    linkText: 'Ir a #soporte-general',
  },
  {
    icon: <MessageSquare className="mb-4 h-10 w-10 text-green-400" />,
    title: 'Crear un Ticket de Soporte',
    description:
      'Para problemas específicos con tu cuenta, compras, o reportar a un jugador, crea un ticket privado para hablar directamente con un miembro del staff.',
    link: 'https://discord.com/channels/YOUR_SERVER_ID/YOUR_TICKET_CHANNEL_ID',
    linkText: 'Crear un ticket',
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
  return (
    <main className="min-h-screen pb-12 pt-24 text-white">
      <div className="container mx-auto max-w-screen-lg px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <HelpCircle className="mx-auto mb-4 h-16 w-16 text-primary-500" />
          <h1 className="text-glow mb-4 font-minecraft text-4xl font-bold md:text-5xl">
            Centro de Soporte
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            ¿Necesitas ayuda? Has venido al lugar indicado. Encuentra aquí las
            respuestas y el contacto que necesitas.
          </p>
        </motion.div>

        {/* --- Discord --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bento-item mb-12 flex flex-col items-center justify-between gap-8 p-8 md:flex-row"
        >
          <div className="text-center md:text-left">
            <h2 className="mb-2 text-3xl font-bold">Únete a nuestro Discord</h2>
            <p className="mb-6 max-w-lg text-gray-300">
              La forma más rápida y efectiva de obtener soporte es a través de
              nuestro servidor de Discord. Únete a la comunidad, participa y
              obtén ayuda al instante.
            </p>
            <Button size="lg" asChild className="group">
              <Link href="https://discord.gg/jolly" target="_blank">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.283,3.021H3.717C3.321,3.021,3,3.342,3,3.738v16.524c0,0.396,0.321,0.717,0.717,0.717h16.566 c0.396,0,0.717-0.321,0.717-0.717V3.738C21,3.342,20.679,3.021,20.283,3.021z M8.815,13.444c-0.69,0-1.25-0.56-1.25-1.25 s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25S9.505,13.444,8.815,13.444z M12.003,9.477c-0.69,0-1.25-0.56-1.25-1.25 s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25S12.693,9.477,12.003,9.477z M15.185,13.444c-0.69,0-1.25-0.56-1.25-1.25 s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25S15.875,13.444,15.185,13.444z" />
                </svg>
                Unirse ahora
              </Link>
            </Button>
          </div>
          <div className="flex-shrink-0">
            <Users className="h-32 w-32 text-gray-700" />
          </div>
        </motion.div>

        {/* --- Canales de Soporte --- */}
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
                <h3 className="mb-3 text-xl font-semibold">{channel.title}</h3>
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

        {/* --- FAQ --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="mb-8 text-center text-3xl font-bold">
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

        {/* --- Contacto Directo --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="mb-8 text-center text-3xl font-bold">
            Contacto Directo con Administradores
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-gray-400">
            Si tienes un problema grave que no puede ser resuelto a través de
            los canales de soporte habituales, puedes contactar a un
            administrador directamente. Por favor, usa esta opción solo para
            casos urgentes.
          </p>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bento-item rounded-lg p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">zjjereee</h3>
                <span className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white">
                  Founder
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="break-all text-gray-300">
                    zjjeree@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="text-gray-300">zjjereee</span>
                </div>
              </div>
            </div>

            <div className="bento-item rounded-lg p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">1ley</h3>
                <div className="flex gap-2">
                  <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs font-semibold text-white">
                    Web Dev
                  </span>
                  <span className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
                    Admin
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="break-all text-gray-300">
                    imleidan@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="text-gray-300">1ley.</span>
                </div>
              </div>
            </div>

            <div className="bento-item rounded-lg p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">vac</h3>
                <span className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
                  Admin
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="break-all text-gray-300">
                    vac_insider@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="text-gray-300">vacprogrammer</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
