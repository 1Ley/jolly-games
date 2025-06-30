'use client';

import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Users, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const supportChannels = [
  {
    icon: <HelpCircle className="w-10 h-10 text-primary-400 mb-4" />,
    title: 'Canal de #soporte-general',
    description: 'Para preguntas generales, dudas sobre el juego o problemas que no sean críticos. La comunidad y el staff pueden ayudarte aquí.',
    link: 'https://discord.com/channels/YOUR_SERVER_ID/YOUR_SUPPORT_CHANNEL_ID',
    linkText: 'Ir a #soporte-general'
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-green-400 mb-4" />,
    title: 'Crear un Ticket de Soporte',
    description: 'Para problemas específicos con tu cuenta, compras, o reportar a un jugador, crea un ticket privado para hablar directamente con un miembro del staff.',
    link: 'https://discord.com/channels/YOUR_SERVER_ID/YOUR_TICKET_CHANNEL_ID',
    linkText: 'Crear un ticket'
  },
];

const faq = [
  {
    question: '¿Cómo reporto a un jugador que está haciendo trampas?',
    answer: 'La mejor forma es crear un ticket de soporte adjuntando pruebas (vídeos o capturas de pantalla). Esto nos permite investigar y actuar de forma confidencial.',
  },
  {
    question: 'He comprado un rango pero no lo he recibido.',
    answer: 'Por favor, crea un ticket de soporte en la sección de #compras y adjunta el recibo de tu compra. Un administrador revisará tu caso lo antes posible.',
  },
  {
    question: '¿Puedo apelar una sanción?',
    answer: 'Sí, las apelaciones se gestionan exclusivamente a través de los tickets de soporte. Explica tu caso con detalle para que podamos revisarlo.',
  },
];


export default function SupportPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 text-white">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <HelpCircle className="w-16 h-16 mx-auto mb-4 text-primary-500" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-minecraft text-glow">
            Centro de Soporte
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            ¿Necesitas ayuda? Has venido al lugar indicado. Encuentra aquí las respuestas y el contacto que necesitas.
          </p>
        </motion.div>

        {/* --- Discord --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bento-item p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Únete a nuestro Discord</h2>
            <p className="text-gray-300 mb-6 max-w-lg">
              La forma más rápida y efectiva de obtener soporte es a través de nuestro servidor de Discord. Únete a la comunidad, participa y obtén ayuda al instante.
            </p>
            <Button size="lg" asChild className="group">
              <Link href="https://discord.gg/jolly" target="_blank">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.283,3.021H3.717C3.321,3.021,3,3.342,3,3.738v16.524c0,0.396,0.321,0.717,0.717,0.717h16.566 c0.396,0,0.717-0.321,0.717-0.717V3.738C21,3.342,20.679,3.021,20.283,3.021z M8.815,13.444c-0.69,0-1.25-0.56-1.25-1.25 s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25S9.505,13.444,8.815,13.444z M12.003,9.477c-0.69,0-1.25-0.56-1.25-1.25 s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25S12.693,9.477,12.003,9.477z M15.185,13.444c-0.69,0-1.25-0.56-1.25-1.25 s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25S15.875,13.444,15.185,13.444z"/>
                </svg>
                Unirse ahora
              </Link>
            </Button>
          </div>
          <div className="flex-shrink-0">
             <Users className="w-32 h-32 text-gray-700" />
          </div>
        </motion.div>


        {/* --- Canales de Soporte --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">¿Cómo te podemos ayudar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bento-item p-6 text-center">
                {channel.icon}
                <h3 className="text-xl font-semibold mb-3">{channel.title}</h3>
                <p className="text-gray-400 mb-6">{channel.description}</p>
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
          <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {faq.map((item, index) => (
               <div key={index} className="bento-item p-5">
                 <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                 <p className="text-gray-400 mt-2">{item.answer}</p>
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
          <h2 className="text-3xl font-bold text-center mb-8">Contacto Directo con Administradores</h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Si tienes un problema grave que no puede ser resuelto a través de los canales de soporte habituales, puedes contactar a un administrador directamente. Por favor, usa esta opción solo para casos urgentes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            <div className="bento-item p-6 rounded-lg transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
              <h3 className="text-xl font-bold text-white mb-4">zjjereee</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 break-all">zjjeree@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300">zjjereee</span>
                </div>
              </div>
            </div>

            <div className="bento-item p-6 rounded-lg transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
              <h3 className="text-xl font-bold text-white mb-4">1ley</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 break-all">imleidan@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300">1ley.</span>
                </div>
              </div>
            </div>

            <div className="bento-item p-6 rounded-lg transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
              <h3 className="text-xl font-bold text-white mb-4">vac</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 break-all">vac_insider@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0" />
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