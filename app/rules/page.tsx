'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  Users, 
  MessageSquare, 
  Gavel, 
  AlertTriangle,
  Info,
  Lock,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const rulesData = [
  {
    id: 'general',
    title: 'Reglas Generales',
    icon: Shield,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    sections: [
      {
        title: '1. Respeto y Cortesía',
        content: 'Trata a todos los jugadores con respeto. No se toleran insultos, acoso, discriminación o comportamiento tóxico de ningún tipo. Mantén un ambiente amigable y acogedor para todos.'
      },
      {
        title: '2. Idioma Apropiado',
        content: 'Evita el uso de lenguaje ofensivo, vulgar o inapropiado. El spam, las mayúsculas excesivas y los mensajes repetitivos están prohibidos.'
      },
      {
        title: '3. Nombres de Usuario',
        content: 'Los nombres de usuario deben ser apropiados y no contener contenido ofensivo, referencias inapropiadas o intentos de suplantar a otros jugadores o staff.'
      },
      {
        title: '4. Publicidad',
        content: 'No está permitida la publicidad de otros servidores, Discord, redes sociales o cualquier contenido externo sin autorización previa del staff.'
      }
    ]
  },
  {
    id: 'gameplay',
    title: 'Reglas de Juego',
    icon: Users,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    sections: [
      {
        title: '1. Juego Limpio',
        content: 'Está prohibido el uso de hacks, cheats, mods no autorizados, macros o cualquier software que proporcione ventajas injustas. Esto incluye autoclickers, killaura, fly, speed hacks, etc.'
      },
      {
        title: '2. Explotación de Bugs',
        content: 'No aproveches bugs o glitches del servidor para obtener ventajas. Si encuentras un bug, repórtalo inmediatamente al staff a través del sistema de tickets.'
      },
      {
        title: '3. Griefing y Trolling',
        content: 'No destruyas, modifiques o sabotees las construcciones de otros jugadores. El trolling que arruine la experiencia de otros jugadores está prohibido.'
      },
      {
        title: '4. Teamwork',
        content: 'En juegos de equipo, colabora con tus compañeros. No hagas team-killing, sabotajes internos o abandones partidas intencionalmente.'
      }
    ]
  },
  {
    id: 'chat',
    title: 'Reglas del Chat',
    icon: MessageSquare,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    sections: [
      {
        title: '1. Contenido Apropiado',
        content: 'No compartas contenido NSFW, violento, político controvertido o que pueda resultar ofensivo para otros jugadores.'
      },
      {
        title: '2. Spam y Flood',
        content: 'Evita enviar mensajes repetitivos, caracteres sin sentido o flood. Respeta el flujo natural de la conversación.'
      },
      {
        title: '3. Información Personal',
        content: 'No compartas información personal tuya o de otros jugadores (direcciones, números de teléfono, datos personales, etc.).'
      },
      {
        title: '4. Idiomas',
        content: 'El idioma principal del servidor es el español. Puedes usar otros idiomas en mensajes privados, pero en el chat público mantén el español.'
      }
    ]
  },
  {
    id: 'punishments',
    title: 'Sistema de Sanciones',
    icon: Gavel,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    sections: [
      {
        title: 'Advertencias',
        content: 'Primera infracción menor: Se emitirá una advertencia verbal o escrita. Las advertencias quedan registradas en tu historial.'
      },
      {
        title: 'Silenciamiento (Mute)',
        content: 'Infracciones de chat: Silenciamiento temporal de 1 hora a 7 días, dependiendo de la gravedad y reincidencia.'
      },
      {
        title: 'Expulsión Temporal (Kick)',
        content: 'Comportamiento disruptivo: Expulsión inmediata del servidor con posibilidad de reconexión.'
      },
      {
        title: 'Suspensión (Ban Temporal)',
        content: 'Infracciones graves: Suspensión de 1 día a 30 días, dependiendo de la gravedad de la infracción.'
      },
      {
        title: 'Prohibición Permanente',
        content: 'Infracciones muy graves o reincidencia: Prohibición permanente del servidor. Puede apelarse después de 6 meses.'
      }
    ]
  },
  {
    id: 'appeals',
    title: 'Apelaciones',
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    sections: [
      {
        title: 'Proceso de Apelación',
        content: 'Si crees que tu sanción fue injusta, puedes apelar a través del sistema de tickets en Discord o en nuestra web. Proporciona evidencia y explica tu situación claramente.'
      },
      {
        title: 'Tiempo de Respuesta',
        content: 'Las apelaciones son revisadas en un plazo de 24-72 horas. Ten paciencia y no envíes múltiples tickets sobre el mismo tema.'
      },
      {
        title: 'Decisiones Finales',
        content: 'Las decisiones del staff administrativo son finales. Acepta el resultado de tu apelación con deportividad.'
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacidad y Datos',
    icon: Lock,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
    sections: [
      {
        title: 'Recopilación de Datos',
        content: 'Recopilamos datos mínimos necesarios para el funcionamiento del servidor: UUID, nombre de usuario, estadísticas de juego y logs de chat para moderación.'
      },
      {
        title: 'Uso de la Información',
        content: 'Tus datos se usan únicamente para mejorar tu experiencia de juego, moderar el servidor y generar estadísticas anónimas.'
      },
      {
        title: 'Protección de Datos',
        content: 'Implementamos medidas de seguridad para proteger tu información. No vendemos ni compartimos tus datos con terceros sin tu consentimiento.'
      },
      {
        title: 'Derechos del Usuario',
        content: 'Puedes solicitar la eliminación de tus datos contactando al staff. Ten en cuenta que esto puede afectar tu progreso en el servidor.'
      }
    ]
  }
];

export default function RulesPage() {
  const [openSections, setOpenSections] = useState<{ [key: string]: number | null }>({});

  const toggleSection = (ruleId: string, sectionIndex: number) => {
    setOpenSections(prev => ({
      ...prev,
      [ruleId]: prev[ruleId] === sectionIndex ? null : sectionIndex
    }));
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-minecraft text-glow">
            Reglas y Políticas
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Lee y comprende nuestras reglas para mantener una comunidad sana y divertida para todos
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
            <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Info className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Aviso Importante</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Al jugar en nuestro servidor, aceptas cumplir con todas estas reglas. 
                El desconocimiento de las reglas no exime de su cumplimiento. 
                Las reglas pueden actualizarse sin previo aviso, por lo que recomendamos revisarlas periódicamente.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rules Sections */}
        <div className="space-y-6">
          {rulesData.map((rule, ruleIndex) => {
            const Icon = rule.icon;
            
            return (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + ruleIndex * 0.1 }}
                className="bento-item"
              >
                {/* Rule Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 ${rule.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${rule.color}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{rule.title}</h2>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {rule.sections.length} secciones
                    </Badge>
                  </div>
                </div>

                {/* Rule Sections */}
                <div className="space-y-3">
                  {rule.sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="border border-white/10 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(rule.id, sectionIndex)}
                        className="w-full px-4 py-3 text-left bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between"
                      >
                        <span className="font-medium text-white">{section.title}</span>
                        {openSections[rule.id] === sectionIndex ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      
                      {openSections[rule.id] === sectionIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 py-4 bg-white/2 border-t border-white/10"
                        >
                          <p className="text-gray-300 leading-relaxed">{section.content}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bento-item mt-8 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2">
            ¿Tienes dudas sobre las reglas?
          </h3>
          
          <p className="text-gray-400 mb-4">
            Si tienes preguntas sobre alguna regla o necesitas aclaraciones, no dudes en contactarnos
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Discord: discord.gg/jollygames</span>
            </div>
            <div className="hidden sm:block text-gray-600">•</div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Tickets de soporte en la web</span>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          Última actualización: 15 de Enero, 2025
        </motion.div>
      </div>
    </main>
  );
}