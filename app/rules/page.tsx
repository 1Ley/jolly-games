'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  MessageSquare,
  AlertTriangle,
  Info,
  Eye,
} from 'lucide-react';

const rules = [
  {
    number: '1',
    name: 'Uso de Hacks o Modificaciones',
    description: 'Está estrictamente prohibido el uso de hacks, clientes modificados o texture packs que brinden cualquier tipo de ventaja frente a otros jugadores.',
    severity: 'alta'
  },
  {
    number: '2',
    name: 'Aprovechamiento de Bugs',
    description: 'Está totalmente prohibido aprovecharse de bugs, glitches o cualquier tipo de error del servidor o del juego para obtener ventajas.',
    severity: 'alta'
  },
  {
    number: '3',
    name: 'Alianzas Prohibidas',
    description: 'No está permitido realizar alianzas entre jugadores o equipos que no estén oficialmente en el mismo grupo (Crossteaming), ni hacer Truce (pactos de no agresión) con otros participantes fuera de tu equipo.',
    severity: 'media'
  },
  {
    number: '4',
    name: 'Abandono de Partida',
    description: 'Está terminantemente prohibido salirse de una partida en curso para unirse a la sub-queue con la intención de cambiar de equipo o volver a jugar.',
    severity: 'media'
  },
  {
    number: '5',
    name: 'Trolling y Sabotaje',
    description: 'Está totalmente prohibido trollear, griefear o sabotear a tu equipo, ya sea rompiendo bloques, bloqueando caminos, robando items o realizando cualquier acción que perjudique directa o indirectamente a tus compañeros.',
    severity: 'alta'
  },
  {
    number: '6',
    name: 'Conducta Ofensiva',
    description: 'No se tolerará ningún tipo de insulto, discriminación, racismo, xenofobia o conducta ofensiva en los chats de Minecraft o Discord.',
    severity: 'alta'
  },
  {
    number: '7',
    name: 'Multicuentas',
    description: 'Está completamente prohibido entrar con más de una cuenta (multicuentas) con la intención de evadir la purga.',
    severity: 'alta'
  },
  {
    number: '8',
    name: 'Selección de Equipos',
    description: 'Si eres seleccionado como capitán y decides salirte durante el proceso de elección de equipos o durante los tradeos, serás baneado del servidor.',
    severity: 'media'
  },
  {
    number: '9',
    name: 'Recibir Ban Automático',
    description: 'Si recibes un baneo automático por parte de la consola (por detección de cheats, comportamiento sospechoso, multicuentas, etc.), no podrás apelar la sanción sin pruebas claras e irrefutables que demuestren un error.',
    severity: 'alta'
  },
  {
    number: '10',
    name: 'Capitán y Abandono de Equipo',
    description: 'Un capitán tiene permitido expulsar a un jugador de su equipo si incurre en alguna de las siguientes conductas: Toxicidad o faltas de respeto hacia el equipo o el chat, Estar AFK durante la partida, Negarse a entrar a llamada cuando es requerido por el equipo, Trollear, sabotear o perjudicar intencionalmente al grupo.',
    severity: 'media'
  },
  {
    number: '11',
    name: 'Evasión de Ban',
    description: 'Intentar evadir un baneo utilizando otra cuenta, otra IP o cualquier otro método, solo empeorará tu situación.',
    severity: 'alta'
  },
  {
    number: '12',
    name: 'Crasheo del Servidor',
    description: 'Si el servidor sufre un crasheo durante una partida, el host deberá cancelarla obligatoriamente, sin excepción.',
    severity: 'alta'
  },
  {
    number: '13',
    name: 'Donaciones y Pagos',
    description: 'Todas las compras, donaciones o pagos realizados dentro del servidor son finales y no reembolsables, sin importar el motivo.',
    severity: 'media'
  },
  {
    number: '14',
    name: 'Difamación del Staff',
    description: 'Cualquier intento de difamar, desacreditar o atacar públicamente al equipo de staff, ya sea dentro o fuera del servidor (Minecraft, Discord, redes sociales, etc.), será considerado una falta grave.',
    severity: 'alta'
  },
  {
    number: '15',
    name: 'Asegurar Partidas Competitivas',
    description: 'Para asegurar que las partidas competitivas sean justas y equilibradas, el sistema de ELO solo estará activo si en la purga pasan 50 jugadores o más.',
    severity: 'media'
  },
  {
    number: '16',
    name: 'Política de Temas Prohibidos',
    description: 'No está permitido mencionar, promover o debatir temas relacionados con política, ideologías extremas, movimientos radicales o cualquier símbolo asociado a ellos dentro del servidor.',
    severity: 'alta'
  },
  {
    number: '17',
    name: 'Targeting Intencional',
    description: 'No está permitido hacer focus de forma intencional a un jugador, equipo o streamer específico con el objetivo de molestarlo, eliminarlo rápidamente o perjudicar su experiencia.',
    severity: 'media'
  },
  {
    number: '18',
    name: 'Reglas Especiales para Jolly Tríos',
    description: 'En la modalidad Jolly Tríos se aplican las siguientes restricciones específicas para garantizar el correcto desarrollo de las partidas: No habrá Dodgeball para definir partidas. Esta modalidad queda desactivada para Tríos. No habrá tradeos. Todos los equipos deben ser tríos completos. No está permitido jugar con duos, solos o grupos incompletos. Solo se permite el Team Election tipo Chosen.',
    severity: 'media'
  }
];

const sanctions = [
  {
    type: 'Kick',
    description: 'Expulsión inmediata del servidor por comportamiento disruptivo.',
    color: 'text-yellow-400'
  },
  {
    type: 'Mute Prolongado',
    description: 'Silenciamiento del chat por infracciones de comunicación.',
    color: 'text-orange-400'
  },
  {
    type: 'Ban Temporal',
    description: 'Prohibición temporal de acceso al servidor.',
    color: 'text-red-400'
  },
  {
    type: 'Blacklist',
    description: 'Prohibición permanente de acceso al servidor.',
    color: 'text-red-600'
  }
];

export default function RulesPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-glow mb-4 font-minecraft text-4xl font-bold md:text-5xl">
            Reglas del Servidor
          </h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Reglas numeradas para mantener un ambiente justo y competitivo
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bento-item mb-8 border-l-4 border-yellow-500"
        >
          <div className="flex items-start space-x-3">
            <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-500/20">
              <Info className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Aviso Importante
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                Al jugar en nuestro servidor, aceptas cumplir con todas estas reglas. 
                El desconocimiento de las reglas no exime de su cumplimiento. 
                Cada regla está numerada para facilitar las referencias en sanciones.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rules List */}
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bento-item"
            >
              <div className="flex items-start space-x-4">
                {/* Rule Number */}
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                  rule.severity === 'alta' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  <span className="text-lg font-bold">{rule.number}</span>
                </div>
                
                {/* Rule Content */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">
                      {rule.name}
                    </h3>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      rule.severity === 'alta'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {rule.severity === 'alta' ? 'Severidad Alta' : 'Severidad Media'}
                    </span>
                  </div>
                  <p className="leading-relaxed text-gray-300">
                    {rule.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sanctions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bento-item mt-12"
        >
          <div className="mb-6 flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Sistema de Sanciones
              </h2>
              <p className="text-sm text-gray-400">
                Tipos de sanciones aplicables según la infracción
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sanctions.map((sanction, index) => (
              <div
                key={index}
                className="rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <h4 className={`mb-2 font-semibold ${sanction.color}`}>
                  {sanction.type}
                </h4>
                <p className="text-sm text-gray-300">
                  {sanction.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bento-item mt-8 text-center"
        >
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-white">
            ¿Tienes dudas sobre las reglas?
          </h3>

          <p className="mb-4 text-gray-400">
            Si tienes preguntas sobre alguna regla o necesitas aclaraciones, no
            dudes en contactarnos
          </p>

          <div className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-400 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Discord: discord.gg/jolly</span>
            </div>
            <div className="hidden text-gray-600 sm:block">•</div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Tickets de soporte en la web</span>
            </div>
          </div>
        </motion.div>


      </div>
    </main>
  );
}
