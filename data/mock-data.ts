import type {
  User,
  NewsPost,
  SupportTicket,
  Activity,
  ForumCategory,
  ForumTopic,
  GameMode,
  LeaderboardEntry,
} from '@/types';
import {
  Users,
  Swords,
  Shield,
  Heart,
  Image as ImageIcon,
  Award,
} from 'lucide-react';

// Mock User Base
export const mockUser: User = {
  id: 'user-1',
  username: '1Ley',
  email: '1ley@jollygames.com',
  avatar: 'https://mc-heads.net/avatar/Notch/64',
  role: 'admin',
  joinedAt: new Date('2023-01-15'),
  lastSeen: new Date(),
  isOnline: true,
  stats: {
    totalPoints: 12500,
    totalKills: 850,
    totalDeaths: 320,
    kdr: 2.65,
    gamesPlayed: 400,
    gamesWon: 250,
    winRate: 62.5,
    currentRank: 'Diamond',
    seasonPoints: 4500,
  },
};

// Mock Server Stats
export const mockServerStats = {
  onlinePlayers: 1337,
  totalPlayers: 25000,
  gamesThisWeek: 5234,
  uptime: '99.9%',
  averageLatency: '45ms',
};

// Mock Game Modes
export const mockGameModes: GameMode[] = [
  {
    id: 'skywars',
    name: 'SkyWars',
    displayName: 'SkyWars',
    description:
      'Lucha por la supervivencia en islas flotantes. ¡El último en pie gana!',
    icon: '☁️',
    thumbnail: '/images/games/skywars.svg',
    isActive: true,
    playerCount: { current: 342, max: 500 },
    averageGameTime: 8,
    difficulty: 'medium',
    tags: ['PvP', 'Survival', 'Strategy'],
  },
  {
    id: 'bedwars',
    name: 'BedWars',
    displayName: 'BedWars',
    description: 'Protege tu cama y destruye las de tus oponentes para ganar.',
    icon: '🛏️',
    thumbnail: '/images/games/bedwars.jpg',
    isActive: true,
    playerCount: { current: 412, max: 600 },
    averageGameTime: 15,
    difficulty: 'hard',
    tags: ['PvP', 'Team-based', 'Strategy'],
  },
  {
    id: 'creative',
    name: 'Creative',
    displayName: 'Creativo',
    description: 'Construye lo que quieras en tu propia parcela privada.',
    icon: '🎨',
    thumbnail: '/images/games/creative.jpg',
    isActive: true,
    playerCount: { current: 150, max: 300 },
    averageGameTime: 0,
    difficulty: 'easy',
    tags: ['Building', 'Relaxing'],
  },
  {
    id: 'hungergames',
    name: 'HungerGames',
    displayName: 'Juegos del Hambre',
    description:
      'Busca cofres, equípate y sé el último superviviente en la arena.',
    icon: '🏹',
    thumbnail: '/images/games/hungergames.jpg',
    isActive: true,
    playerCount: { current: 280, max: 400 },
    averageGameTime: 20,
    difficulty: 'hard',
    tags: ['PvP', 'Survival', 'Battle Royale'],
  },
];

// Mock Community Activities
export const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    userId: 'user-2',
    user: {
      ...mockUser,
      id: 'user-2',
      username: 'Jiro',
      avatar:
        'https://mc-heads.net/avatar/jeb_/64',
    },
    type: 'screenshot',
    title: '¡Mi nueva base en survival!',
    description: 'Después de 100 horas de trabajo, ¡por fin está terminada!',
    imageUrl: '/images/community/activity-1.jpg',
    likes: 152,
    comments: [],
    tags: ['survival', 'base'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isApproved: true,
  },
  {
    id: 'activity-2',
    userId: 'user-3',
    user: {
      ...mockUser,
      id: 'user-3',
      username: 'TripRod',
      avatar:
        'https://mc-heads.net/avatar/Dinnerbone/64',
    },
    type: 'artwork',
    title: 'Un fanart del admin 1Ley',
    description: 'Espero que le guste al admin :D',
    imageUrl: '/images/community/activity-2.jpg',
    likes: 230,
    comments: [],
    tags: ['fanart', 'digitalart'],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    isApproved: true,
  },
  {
    id: 'activity-3',
    userId: 'user-4',
    user: {
      ...mockUser,
      id: 'user-4',
      username: 'RxpliedSL',
      avatar:
        'https://mc-heads.net/avatar/Grumm/64',
    },
    type: 'build',
    title: 'Réplica del Castillo de Hyrule',
    description: 'Me ha llevado un mes, pero creo que ha merecido la pena.',
    imageUrl: '/images/community/activity-3.jpg',
    likes: 450,
    comments: [],
    tags: ['build', 'creative', 'zelda'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isApproved: true,
  },
];

export const mockFeatureSections = [
  {
    title: 'SkyWars',
    description:
      'La experiencia PvP definitiva en islas flotantes. Saquea cofres, equípate y lucha por ser el último jugador en pie en una arena que se desmorona bajo tus pies.',
    imageUrl: '/images/games/skywars.svg',
  },
  {
    title: 'Party',
    description:
      'Sumérgete en una caótica rotación de minijuegos. Sobrevive a la patata caliente en TNT Tag o mantén la bandera para evitar la eliminación en una variante única de Captura la Bandera.',
    imageUrl: '/images/jollygames.png',
  },
  {
    title: 'Race',
    description:
      'Pon a prueba tu agilidad y velocidad en circuitos de parkour competitivos. Domina cada salto y atajo para cruzar la meta el primero y acumular la mayor cantidad de puntos.',
    imageUrl: '/images/fondohome.gif',
  },
  {
    title: 'BattleBox',
    description:
      'Dos equipos se enfrentan en rondas de combate rápido. El objetivo: ser el primero en rellenar el área central con los bloques de tu color. Estrategia y trabajo en equipo son la clave.',
    imageUrl: '/images/logo.png',
  },
  {
    title: 'Random Kits',
    description:
      'La igualdad de condiciones llevada al extremo. Todos los jugadores reciben el mismo kit de combate aleatorio al empezar. Adapta tu estrategia y que gane el mejor equipo.',
    imageUrl: '/images/games/creative.jpg',
  },
  {
    title: 'Survival Games',
    description:
      'El clásico modo de supervivencia y saqueo. Explora el mapa en busca de cofres con equipamiento y recursos. Forja alianzas o lucha en solitario para ser el último equipo en pie.',
    imageUrl: '/images/games/hungergames.jpg',
  },
  {
    title: 'Beep Test',
    description:
      'Un desafío de parkour progresivo que pondrá a prueba tus límites. Supera secciones cada vez más difíciles mientras la velocidad aumenta, demostrando tu precisión y resistencia.',
    imageUrl: '/images/beeptest.png',
  },
  {
    title: 'Spleef',
    description:
      'Un juego de pura destrucción y supervivencia. Usa tu pala para romper el suelo bajo los pies de tus oponentes y hacerlos caer. ¡El último jugador en la plataforma más alta gana!',
    imageUrl: '/images/games/skywars.svg',
  },
  {
    title: 'Bow Spleef',
    description:
      'La variante explosiva de Spleef. Armado con un arco y flechas de fuego, haz llover destrucción sobre un suelo de TNT para eliminar a tus rivales. Precisión y caos garantizados.',
    imageUrl: '/images/games/creative.jpg',
  },
];

// Mock Forum Data
export const mockForumCategories: ForumCategory[] = [
  {
    id: 'announcements',
    name: 'Anuncios',
    description: 'Noticias y anuncios importantes.',
    color: 'blue',
    icon: '📢',
    topicsCount: 5,
    postsCount: 120,
  },
  {
    id: 'general',
    name: 'Discusión General',
    description: 'Habla de lo que quieras.',
    color: 'green',
    icon: '💬',
    topicsCount: 152,
    postsCount: 2345,
  },
  {
    id: 'support',
    name: 'Soporte',
    description: '¿Necesitas ayuda? Este es tu lugar.',
    color: 'yellow',
    icon: '❓',
    topicsCount: 80,
    postsCount: 540,
  },
  {
    id: 'suggestions',
    name: 'Sugerencias',
    description: 'Aporta tus ideas para mejorar el servidor.',
    color: 'purple',
    icon: '💡',
    topicsCount: 45,
    postsCount: 320,
  },
];

export const mockForumTopics: ForumTopic[] = [
  {
    id: 'topic-1',
    categoryId: 'announcements',
    category: mockForumCategories[0],
    userId: 'user-1',
    user: mockUser,
    title: '¡Gran apertura del servidor JollyGames!',
    content:
      'Bienvenidos a todos al lanzamiento oficial. ¡Esperamos que disfrutéis de vuestra estancia!',
    isPinned: true,
    isLocked: false,
    views: 12000,
    replies: 350,
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2023-10-02'),
    tags: ['servidor', 'noticias'],
  },
  {
    id: 'topic-2',
    categoryId: 'general',
    category: mockForumCategories[1],
    userId: 'user-2',
    user: { ...mockUser, id: 'user-2', username: 'Jiro' },
    title: '¿Cuál es vuestro modo de juego favorito?',
    content: 'Abro debate. El mío es SkyWars, sin duda.',
    isPinned: false,
    isLocked: false,
    views: 540,
    replies: 25,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    tags: ['debate', 'juegos'],
  },
];

// Mock Support Tickets
export const mockSupportTickets: SupportTicket[] = [
  {
    id: 'ticket-1',
    userId: 'user-5',
    user: { ...mockUser, id: 'user-5', username: 'Crydamoure' },
    subject: 'No he recibido mi rango VIP',
    description:
      'Hola, compré el rango VIP hace una hora y todavía no se me ha aplicado en el servidor. Adjunto recibo de la compra.',
    category: 'account-issue',
    priority: 'high',
    status: 'open',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    responses: [],
  },
  {
    id: 'ticket-2',
    userId: 'user-6',
    user: { ...mockUser, id: 'user-6', username: 'TralaleroAsesino' },
    subject: 'Bug en BedWars',
    description:
      'En el mapa "Templo", a veces es posible atravesar los bloques de la base enemiga sin romperlos.',
    category: 'bug-report',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'user-1',
    assignee: mockUser,
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    responses: [
      {
        id: 'resp-1',
        ticketId: 'ticket-2',
        userId: 'user-1',
        user: mockUser,
        content: 'Gracias por el reporte. Estamos investigando el problema.',
        isStaffResponse: true,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ],
  },
];

// Updates page
export interface UpdatePost {
  id: number;
  title: string;
  content: string;
  version: string;
  date: string;
  author: string;
  categories: ('game' | 'server' | 'event' | 'bot' | 'maintenance' | 'battlebox' | 'skywars' | 'beeptest' | 'spleef' | 'caol' | 'survival-games' | 'random-kits' | 'bow-spleef' | 'tag-games' | 'information')[];
  gradient: string;
  size: 'small' | 'medium' | 'large';
  featured?: boolean;
  imageUrl?: string;
}

export const mockUpdates: NewsPost[] = [
  {
    id: 47,
    title: 'Jolly Games',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los mensajes de los 3 lenguajes actuales fueron traducidos, si encuentras alguno con algún color mal puesto o con algún mensaje mal puesto puedes reportar en 🐛 | bug-report. (Los menú todavía no aplican)\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> <strong>Random Kits</strong>\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> El kit que no daba items fue arreglado.\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> <strong>SkyWars</strong>\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> Se agregaron patos en los cofres normales ya que no salían.\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> <span class="font-bold text-red-400">SkyWars Trío</span> ya se encuentra disponible. <span class="font-bold text-red-400">BETA</span>\n<img src="/emojils/Market.png" alt="tienda" class="inline-block w-5 h-5 mx-1" /> <strong>Tienda</strong>\n<img src="/emojils/Market.png" alt="tienda" class="inline-block w-5 h-5 mx-1" /> Las descripciones fueron mejoradas y mejor aclaradas de los paquetes.',
    version: '8.3',
    date: '20/07/2025',
    author: 'zijeree',
    categories: ['server', 'random-kits', 'skywars', 'maintenance'],
    gradient: 'from-blue-500 via-indigo-600 to-purple-600',
    size: 'large',
    featured: false
  },
  {
    id: 46,
    title: 'Jolly Games',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los sombreros ya se encuentran disponible.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los mensajes de entrada ya fueron traducidos al inglés y portugués.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló un bug efectos y se quitó la fatiga minera.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Algunos errores de los cuales no te dejaba moverte fueron arreglados.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> <strong>Battle Box</strong>\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> Todos los mapas fueron modificados.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> El timer del bossbar ya funciona.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> <strong>Random Kits</strong>\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Vuelve el border move.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> <strong>Survival Games</strong>\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> El borde de deathmatch es mas chico.',
    version: '8.2',
    date: '16/07/2025',
    author: 'zijeree',
    categories: ['server', 'battlebox', 'random-kits', 'survival-games', 'maintenance'],
    gradient: 'from-green-500 via-emerald-600 to-teal-600',
    size: 'large',
    featured: false
  },
  {
    id: 45,
    title: 'Jolly Games',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los jugadores ya no serán invisibles mientras cargan su texture pack.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Lo de que aveces salía el "return to hub" en juego fue arreglado.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los lang no traducidos fueron hechos.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El bug de votación que hacía que te murieras varias veces fue arreglado.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Ya no aparecerás vivo si reconectas.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló la música de dodgeball.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló el bug de que aveces no te dejaba aceptar el equipo en el chosen.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El reach fue arreglado de manera default.\n<img src="/emojils/Spleef.png" alt="spleef" class="inline-block w-5 h-5 mx-1" /> <strong>Spleef</strong>\n<img src="/emojils/Spleef.png" alt="spleef" class="inline-block w-5 h-5 mx-1" /> Bug de los bloques que no dejaban romperlos bien fue arreglado.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> <strong>Random Kits</strong>\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> El mapa de la feria ronda de Random Kits fue arreglado.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> <strong>Battle Box</strong>\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> Los creepers ahora tardan en explotar <span class="font-bold text-orange-400">3 segundos</span>.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> El creeper tendrá un nametag de cuanto tarda en explotarse.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> El creeper ya no se podrá colocar en la zona de spawn.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> El creeper no hará daño a tus compañeros.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> El creeper ahora baja menos vida.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> Solamente una persona del equipo puede elegir el kit troll.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> En el menú saldrá quien eligió el kit.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> <strong>Survival Games</strong>\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Las pepitas ya son crafteables.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> La distancia de bloques que salía en el bossbar fue arreglada.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> El bossbar del drop ya aparece. (editado)',
    version: '8.1',
    date: '14/07/2025',
    author: 'zijeree',
    categories: ['server', 'spleef', 'random-kits', 'battlebox', 'survival-games', 'maintenance'],
    gradient: 'from-purple-500 via-pink-600 to-red-600',
    size: 'large',
    featured: false
  },
  {
    id: 44,
    title: 'Jolly Games',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las <span class="font-bold text-blue-400">cargas de viento</span> ya funcionan y no rompen bloques.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> La interacción con <span class="font-bold text-orange-400">fogatas y vasijas</span> fue eliminada.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El bideo del <span class="font-bold text-green-400">market</span> fue arreglado ya que aveces no era de 5 en 5.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El <span class="font-bold text-purple-400">chosen</span> fue arreglado ya que no dejaba meter suplentes.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> La <span class="font-bold text-red-400">distancia de bloques</span> de la que puedes pegar fue arreglado de manera "eficiente" hasta poder hacer un cambio "default".\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los espectadores del <span class="font-bold text-yellow-400">dodgeball</span> se arreglaron.',
    version: '8.0',
    date: '13/07/2025',
    author: 'zijeree',
    categories: ['server', 'maintenance', 'game'],
    gradient: 'from-blue-500 via-indigo-600 to-purple-600',
    size: 'medium',
    featured: false
  },
  {
    id: 43,
    title: 'Survival Games',
    content: '<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Ciertas partes del mapa fueron arregladas.\n<img src="/emojils/Spleef.png" alt="spleef" class="inline-block w-5 h-5 mx-1" /> <strong>Spleef</strong>\n<img src="/emojils/Spleef.png" alt="spleef" class="inline-block w-5 h-5 mx-1" /> La textura fue arreglada.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> <strong>Battle Box</strong>\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> La textura fue arreglada.',
    version: '7.9',
    date: '12/07/2025',
    author: 'zjjeree',
    categories: ['survival-games', 'spleef', 'battlebox', 'maintenance'],
    gradient: 'from-orange-500 via-red-600 to-pink-600',
    size: 'small',
    featured: false
  },
  {
    id: 42,
    title: 'Jolly Games',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El menú de <span class="font-bold text-blue-400">espectadores</span> fue arreglado.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los colores de los <span class="font-bold text-purple-400">hologramas</span> fueron arreglados.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Algunos <span class="font-bold text-red-400">mensajes de muerte</span> fueron arreglados.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las <span class="font-bold text-cyan-400">cargas de viento</span> ya funcionan.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las tablas fueron arregladas.\n<img src="/emojils/Equipos.png" alt="team" class="inline-block w-5 h-5 mx-1" /> <strong>¡<span class="font-bold text-lime-400">New Team Election</span> (Exclusive Trio)</strong>\n<img src="/emojils/Equipos.png" alt="team" class="inline-block w-5 h-5 mx-1" /> Este team election solo estará disponible para <span class="font-bold text-yellow-400">tríos</span>.\n<img src="/emojils/Equipos.png" alt="team" class="inline-block w-5 h-5 mx-1" /> Una vez elegidos los capitanes, ellos podrán invitar a jugadores con el comando <span class="text-red-200 font-medium">/team invite (jugador)</span>, tendrán <span class="font-bold text-orange-400">5 minutos</span>, de no llenar el equipo se les meterán jugadores aleatorios.\n<img src="/emojils/Equipos.png" alt="team" class="inline-block w-5 h-5 mx-1" /> El jugador invitado deberá utilizar el comando <span class="text-red-200 font-medium">/team accept (team)</span>\n<img src="/emojils/Alerta.png" alt="anticheat" class="inline-block w-5 h-5 mx-1" /> <strong><span class="font-bold text-red-400">New AntiCheat</span></strong>\n<img src="/emojils/Alerta.png" alt="anticheat" class="inline-block w-5 h-5 mx-1" /> Colocamos un nuevo anticheat de <span class="font-bold text-green-400">PAGA</span>\n<img src="/emojils/Alerta.png" alt="anticheat" class="inline-block w-5 h-5 mx-1" /> Los jugadores que sean baneados por el anticheat no podrán apelar al menos que tengan <span class="font-bold text-blue-400">clip</span> de cuando los baneo.',
    version: '7.8',
    date: '12/07/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'maintenance', 'anticheat'],
    gradient: 'from-blue-500 via-indigo-600 to-purple-600',
    size: 'large',
    featured: false
  },
  {
    id: 41,
    title: 'Random Kits',
    content: '<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Se arreglaron los spawnpoints.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> <strong>Survival Games</strong>\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Se colocó una mesa de encantamiento en el centro.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Se quitaron algunos ítems de los loots de los cofres.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Se agregaron barreras en la parte de arriba.',
    version: '7.7',
    date: '12/07/2025',
    author: 'zjjeree',
    categories: ['random-kits', 'survival-games', 'maintenance'],
    gradient: 'from-green-500 via-emerald-600 to-teal-600',
    size: 'small',
    featured: false
  },
  {
    id: 40,
    title: 'Jolly Games',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arreglaron las texturas bugueadas del texture pack.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló el voice chat que no andaba.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se agregaron los canales de voz faltantes.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló el team-election y tradeos que se bugueaban los prefix de los nuevos equipos.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló la arena.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arreglaron las asistencias.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los jugadores que reciban bypass les saldrá un icono verde al lado de su nombre.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> <strong>Survival Games</strong>\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Se arregló la resurrección de Survival Games.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Cuando un compañero tuyo se muera, saldrá un bossbar de a cuantos bloques estas de la tarjeta.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Cuando tengas la tarjeta, saldrá un bossbar de a cuantos bloques estas del punto de resurrección.\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> <strong>SkyWars</strong>\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> Ahora solo podrá salir un tipo de cofre por partida.',
    version: '7.6',
    date: '11/07/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'maintenance', 'survival-games', 'skywars'],
    gradient: 'from-blue-500 via-indigo-600 to-purple-600',
    size: 'large',
    featured: false
  },
  {
    id: 39,
    title: 'Jolly Games',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El texture pack ahora es compatible hasta la versión 1.21.5.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los nombres de los jugadores se mostrarán en color blanco.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Con la actualización del servidor a 1.21, el complemento de "Sombreros" fue reemplazado.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Esto provocó la pérdida de todos los sombreros anteriores.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Si querés recuperar tus sombreros, por favor abrí un ticket.\n<img src="/emojils/Alerta.png" alt="importante" class="inline-block w-5 h-5 mx-1" /> <strong>Importante</strong>\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Es posible que durante la temporada el <span class="font-bold text-blue-400">@Jolly Rank</span> pierda uno de sus beneficios importantes.',
    version: '7.5',
    date: '11/07/2025',
    author: 'zjjeree',
    categories: ['server', 'maintenance', 'cosmetics'],
    gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
    size: 'medium',
    featured: false
  },
  {
    id: 38,
    title: 'SkyWars',
    content: '<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> Al lootear un cofre por completo, este desaparecerá.\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> Se quitó la textura del cofre.\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> El loot de los cofres básicos, normales y OP fue mejorado.\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> Se añadieron 3 mapas nuevos junto a sus variantes para Jolly Tríos.\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> Se quitaron las flechas del kit inicial.\n<img src="/emojils/Skywars.png" alt="skywars" class="inline-block w-5 h-5 mx-1" /> Al caer desde la jaula, no podrás colocar bloques por 1 segundo, para evitar ventajas desde la parte superior.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> <strong>Survival Games</strong>\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Al lootear un cofre por completo, este desaparecerá y reaparecerá en el refill.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Se agregó un nuevo mapa al modo.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Ya no se jugarán 2 rondas, ahora será solo 1 ronda por partida.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> La duración de la ronda se extendió de 6 minutos → 10 minutos.\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> Ahora podrás revivir a tus compañeros, al estilo Fortnite:\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> – Recogé su tarjeta de resurrección\n<img src="/emojils/Survival games.png" alt="survival" class="inline-block w-5 h-5 mx-1" /> – El juego te indicará dónde está la zona de resurrección para traerlos de vuelta.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> <strong>Extra</strong>\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los hosts ahora tienen un mayor control sobre la selección de capitanes.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las partidas privadas fueron optimizadas para hacerse de forma más rápida.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El ítem de configuración de equipos fue reemplazado por un "pincel".\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se agregó el plugin de Voice Chat al servidor.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El servidor fue actualizado a la versión 1.21 de Minecraft.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> La espada del lobby fue eliminada y se habilitó una arena exclusiva para los usuarios con el rango <span class="font-bold text-yellow-400">@Rank Jolly</span>.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las estadísticas han sido reiniciadas.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El modo "Bow Spleef" se encontrará inactivo y en posible eliminación.\n<img src="/emojils/Party.png" alt="party" class="inline-block w-5 h-5 mx-1" /> <strong>Jolly Tríos ¡NEW!</strong>\n<img src="/emojils/Party.png" alt="party" class="inline-block w-5 h-5 mx-1" /> ¡Ahora podés jugar en equipos de 3!\n<img src="/emojils/Party.png" alt="party" class="inline-block w-5 h-5 mx-1" /> Hasta 90 jugadores por partida, divididos en 30 equipos de distintos colores.\n<img src="/emojils/Party.png" alt="party" class="inline-block w-5 h-5 mx-1" /> Modos Activos en Tríos: Survival Games, SkyWars, Random Kits, Spleef, Party, Beep Test, Race.',
    version: '7.4',
    date: '09/07/2025',
    author: 'zjjeree',
    categories: ['skywars', 'survival-games', 'server', 'game', 'party'],
    gradient: 'from-orange-500 via-red-600 to-pink-600',
    size: 'large',
    featured: false
  },
  {
    id: 37,
    title: 'Random Kits',
    content: '<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Se añadieron 2 nuevos scenarios: Syphon y Double Health. (¡Podés sugerir más y los iremos agregando!)\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Se agregó un centro visible en cada mapa para facilitar la localización.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Algunas estructuras fueron removidas para mejorar la jugabilidad.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Se añadieron nuevos kits al juego. (También podés sugerir kits que te gustaría ver.)\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> <strong>Battle Box</strong>\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> En el kit "Acrobata" se añadieron 3 wind charges.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> Se removieron los arcos y flechas de todos los kits, excepto:\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> – Kit Arquero: 3 flechas\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> – Kit Francotirador: 2 flechas\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> El kit "Troll" ahora incluye 1 creeper <img src="/emojils/Alerta.png" alt="creeper" class="inline-block w-5 h-5 mx-1" />\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> Las rondas ya no terminarán en empate. Si se acaba el tiempo, ganará el equipo que haya colocado más bloques en el centro.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> Se agregaron 3 nuevos mapas.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> <strong>🛠️ Update en Proceso:</strong> Próximamente podrán aparecer más de 1 mapa por partida, rotando entre varias opciones.',
    version: '7.3',
    date: '09/07/2025',
    author: 'zjjeree',
    categories: ['random-kits', 'battlebox', 'game', 'maintenance'],
    gradient: 'from-green-500 via-emerald-600 to-teal-600',
    size: 'large',
    featured: false
  },
  {
    id: 36,
    title: 'Actualización del Sistema Competitivo',
    content: '<img src="/emojils/Copa.png" alt="copa" class="inline-block w-5 h-5 mx-1" /> El bonus de capitán aumenta de <span class="font-bold text-lime-400">10% → 15%</span>.\n<img src="/emojils/Elo.png" alt="elo" class="inline-block w-5 h-5 mx-1" /> Si sos Capitán Principal, recibirás <span class="font-bold text-yellow-400">+5 de elo</span> en todas las partidas (no aplica si fuiste asignado automáticamente).\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Los <span class="font-bold text-orange-400">puntos por asesinato</span> suben de <span class="font-bold text-red-400">15 → 20</span>.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> El comando <span class="text-red-200 font-medium">/randomcaps</span> <span class="font-bold text-red-400">ya no se aplicará a los ranks Jolly</span>, sino a jugadores con <span class="font-bold text-yellow-400">+10 partidas jugadas</span> (este requisito aumentará conforme avance la temporada).\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> En el chat, aparecerá un <span class="font-bold text-blue-400">icono de tu clasificación de elo</span> junto a tu nombre.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se añadió un <span class="font-bold text-purple-400">nuevo menú en el perfil</span> con:\n– Historial de partidas\n– Cuánto elo ganas según tu clasificación\n– Leaderboard de los <span class="font-bold text-yellow-400">clasificados a la Jolly Cup</span> <img src="/emojils/Copa.png" alt="copa" class="inline-block w-5 h-5 mx-1" />',
    version: '7.2',
    date: '08/07/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'competitive'],
    gradient: 'from-yellow-500 via-orange-600 to-red-600',
    size: 'large',
    featured: true
  },
  {
    id: 35,
    title: 'Beep Test',
    content: '<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> En el mensaje de llegada ahora se mostrará en qué posición llegaste.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> Se añadieron 80 nuevos niveles.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> El ítem de visibilidad ahora también estará disponible mientras estés de espectador.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> Se eliminó el actionbar de niveles perdidos; ahora solo verás el del siguiente nivel.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> ¡Se agregó música al juego para una mejor experiencia!\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Los puntos por World Record se redujeron de <span class="font-bold text-red-400">50 → 30</span>.\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Los puntos por Fastest Time bajaron de <span class="font-bold text-red-400">25 → 15</span>.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> Todos los World Records anteriores han sido eliminados.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> Se ha actualizado el exterior del mapa.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> Al finalizar el modo, aparecerá un Top con los jugadores que más Fastests y World Records hayan conseguido durante el modo.',
    version: '7.1',
    date: '08/07/2025',
    author: 'zjjeree',
    categories: ['beeptest', 'game', 'maintenance'],
    gradient: 'from-green-500 via-emerald-600 to-teal-600',
    size: 'large',
    featured: false
  },
  {
    id: 34,
    title: '¡Nuevas mejoras estéticas en el servidor!',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los estandartes de países fueron eliminados y se añadieron 30 nuevos estandartes.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se crearon 19 nuevos mensajes de entrada.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se agregaron 3 sombreros exclusivos para quienes hayan sido Top Donador en algún mes.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se añadieron 3 nuevos mensajes de muerte.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Ahora, para conseguir mensajes de entrada, sombreros o estandartes, necesitas comprar una key en la tienda. <a href="https://jollygames.store/" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">(editado)</a>',
    version: '7.0',
    date: '07/07/2025',
    author: 'zjjeree',
    categories: ['server', 'cosmetics', 'store'],
    gradient: 'from-purple-500 via-pink-600 to-red-600',
    size: 'medium',
    featured: false
  },
  {
    id: 35,
    title: 'Actualización de Versión',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Ya actualizamos el servidor a la última versión en Java y Bedrock.',
    version: '6.9',
    date: '07/07/2025',
    author: 'zjjeree',
    categories: ['server', 'maintenance'],
    gradient: 'from-blue-500 via-indigo-600 to-purple-600',
    size: 'small',
    featured: false
  },
  {
    id: 34,
    title: 'Actualización 6.8',
    content: '<img src="/emojils/Discord.svg" alt="discord" class="inline-block w-5 h-5 mx-1" /> Nuevo canal <span class="font-bold text-lime-400">#</span> desconocido\nLos <span class="font-bold text-orange-400">@Content Creator</span> ahora pueden compartir sus streams, videos y mencionar a <span class="font-bold text-green-400">@Media Ping</span> para darles visibilidad.\n<img src="/emojils/Discord.svg" alt="discord" class="inline-block w-5 h-5 mx-1" /> Nueva categoría: CANALES DE VOZ\nInteractúa con otros miembros a través de llamadas públicas y pasa un buen rato en comunidad.\n<img src="/emojils/Discord.svg" alt="discord" class="inline-block w-5 h-5 mx-1" /> Nuevo canal <img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> | bug-report\nReporta errores o problemas del servidor y recibí recompensas a cambio. ¡Tu ayuda nos mejora!\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> ¡Vuelven las encuestas diarias!\nEstaremos consultando a la comunidad sobre algunas actualizaciones que aún están en duda. ¡Tu opinión será clave para futuras decisiones!\n<img src="/emojils/Market.png" alt="market" class="inline-block w-5 h-5 mx-1" /> ¡Ofertas semanales!\nDesde ahora, las ofertas semanales se reiniciarán todos los viernes al mediodía.',
    version: '6.8',
    date: '29/06/2025',
    author: '1Ley',
    categories: ['server', 'information', 'event'],
    gradient: 'from-purple-500 via-indigo-600 to-blue-600',
    size: 'large',
    featured: true
  },
  {
    id: 33,
    title: 'Actualización 6.7',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las estadísticas ya suman, ya no hace falta quedarse hasta terminar la partida.\n<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> El bug de visibilidad de espectador que te hacía ver a ciertas personas fue arreglado. (editado)',
    version: '6.7',
    date: '28/06/2025',
    author: '1Ley',
    categories: ['server', 'maintenance', 'game'],
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    size: 'medium',
    featured: false
  },
  {
    id: 32,
    title: 'Actualización 6.6',
    content: '<img src="/emojils/Alerta.png" alt="alerta" class="inline-block w-5 h-5 mx-1" /> Sub-Queue\nLos <span class="font-bold text-lime-400">@Host</span> ya tienen acceso a eliminar la sub-queue.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Actualización STAFF\nLos soportes y reguladores ya pueden emitir sanciones dentro del servidor de Minecraft. Además, ahora contarán con la etiqueta "STAFF" tanto en el chat como en el tabulador para mayor visibilidad.\n<img src="/emojils/Prohibido.png" alt="prohibido" class="inline-block w-5 h-5 mx-1" /> Desbaneo Global\n¿Fuiste baneado o muteado? <img src="/emojils/check.png" alt="check" class="inline-block w-5 h-5 mx-1" /> Buenas noticias: tu sanción ha sido eliminada. Todos tienen una segunda oportunidad, ¡aprovéchala! (A partir del viernes)\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Actualización de Versión\nYa actualizamos el servidor a la última versión en Java y Bedrock.',
    version: '6.6',
    date: '27/06/2025',
    author: '1Ley',
    categories: ['server', 'maintenance', 'information'],
    gradient: 'from-red-500 via-orange-600 to-yellow-600',
    size: 'large',
    featured: false
  },
  {
    id: 31,
    title: 'Servidor',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se realizó una limpieza de creadores de contenido que no cumplen con los requisitos mínimos y no están creando contenido del servidor.',
    version: '6.6',
    date: '26/06/2025',
    author: '1Ley',
    categories: ['server', 'information'],
    gradient: 'from-rose-500 via-pink-600 to-purple-600',
    size: 'small',
    featured: false
  },
  {
    id: 30,
    title: 'Server',
    content: 'Actualización 6.6 <span class="font-bold text-yellow-400">@Updates Ping</span>\n\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las estadísticas ya suman, ya no hace falta quedarse hasta terminar la partida.\n<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> El bug de visibilidad de espectador que te hacía ver a ciertas personas fue arreglado.',
    version: '6.6',
    date: '26/06/2025',
    author: '1Ley',
    categories: ['server', 'maintenance', 'game'],
    gradient: 'from-blue-500 via-purple-600 to-indigo-600',
    size: 'medium',
    featured: false
  },
  {
    id: 29,
    title: 'Actualización 6.9',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Nuevas mejoras en el sistema de equipos.\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Sistema de puntuación optimizado.\n<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> Correcciones de bugs menores.',
    version: '6.9',
    date: '25/06/2025',
    author: '1Ley',
    categories: ['server', 'game', 'maintenance'],
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    size: 'medium',
    featured: false
  },
  {
    id: 28,
    title: 'Actualización 6.5',
    content: '<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> Se arregló el bug por el cual no contaban los asesinatos. (Party)\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló el bug por el cual te contaban puntos estando muerto.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arreglaron las kills que a veces salías muerto por vos mismo.\n<img src="/emojils/Market.png" alt="market" class="inline-block w-5 h-5 mx-1" /> Se agregó una nueva ventaja "banners" con el cual podrás personalizar tu estandarte de la 3era ronda de party y tu escudo.',
    version: '6.5',
    date: '24/06/2025',
    author: 'zjjeree',
    categories: ['maintenance', 'game', 'server'],
    gradient: 'from-red-500 via-orange-600 to-yellow-600',
    size: 'large',
    featured: false
  },
  {
    id: 27,
    title: 'Actualización 6.4',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> La espada de votación solo tendrá 1 uso.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se actualizó el servidor y ahora podrás entrar desde 1.16 a 1.21.6 (Versión Nativa: 1.20.4)\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los baneos del servidor ahora serán públicos.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las estadísticas se sumarán al finalizar la partida, por más que te desconectes. (editado)',
    version: '6.4',
    date: '23/06/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'maintenance'],
    gradient: 'from-blue-500 via-purple-600 to-indigo-600',
    size: 'medium',
    featured: false
  },
  {
    id: 26,
    title: 'Actualización 6.3',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló el sistema de votacion, ya no contaran las muertes y las kills. También los items del lobby no lo tendrán, ni los de <span class="text-red-200 font-medium">/elytra</span>.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El orden de votos de votacion será de mayor a menor.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló la feed que no bajaba.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> En Anonymous ya no se mostrarán los nombres y teams eliminados.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló el mensaje de stats.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El mensaje de spleef ahora sale bien.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> El kit de meetup ahora podrá salir en las 2 rondas.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Ya no podrán salir kits repetidos.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló el bug de capitan que aveces no lo daba.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Si se sale el capitan principal se le dará el capitan al usuario con mas elo del equipo.',
    version: '6.3',
    date: '22/06/2025',
    author: 'zjjeree',
    categories: ['game', 'server', 'maintenance', 'random-kits'],
    gradient: 'from-green-500 via-teal-600 to-blue-600',
    size: 'large',
    featured: false
  },
  {
    id: 25,
    title: 'Actualización 6.2',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Nuevo sistema de votación.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> Se arregló el bug de la muerte en beeptest.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El anonymous fue arreglado.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Se eliminó un kit mal hecho.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Se arreglaron los spawnpoints.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se quito la velocidad.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se coloco el mapa viejo de 3era ronda.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se aumento el tiempo de inicio de sesion a 90 segundos.',
    version: '6.2',
    date: '21/06/2025',
    author: 'zjjeree',
    categories: ['game', 'beeptest', 'random-kits', 'server'],
    gradient: 'from-purple-500 via-pink-600 to-red-600',
    size: 'large',
    featured: false
  },
  {
    id: 24,
    title: 'Actualización 6.1',
    content: '<img src="/emojils/Market.png" alt="market" class="inline-block w-5 h-5 mx-1" /> Se agregaron nuevos paquetes de las categorías "Mensajes de Muerte" y "Mensajes de Entrada" por tan solo 1.49 USD\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se agregaron nuevas ventajas.',
    version: '6.1',
    date: '20/06/2025',
    author: 'zjjeree',
    categories: ['server', 'market'],
    gradient: 'from-yellow-500 via-orange-600 to-red-600',
    size: 'small',
    featured: false
  },
  {
    id: 23,
    title: 'Actualización 6.0',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Nueva versión mayor con mejoras significativas.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Sistema de emojis completamente renovado.\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Mejoras en el sistema de equipos.\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Nuevo sistema de puntuación balanceado.',
    version: '6.0',
    date: '19/06/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'maintenance'],
    gradient: 'from-pink-500 via-rose-600 to-red-600',
    size: 'large',
    featured: false
  },
  {
    id: 22,
    title: 'Actualización 5.9',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Nuevas ventajas: Podrás cambiar tu mensaje de entrada.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> En el último juego se activará el scenario "Anonymous" que básicamente no mostrará tu nombre, tu skin, tu color de armadura ni tu color de bloque. Tampoco mostrará los puntos y quien ganó la ronda. FOCUS OFF\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> En el TAB saldrá el fill actual.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El mensaje de borde de altura ya no mostrará los decimales.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se cambiaron los colores de los modos.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se actualizaron ciertos mensajes de death.',
    version: '5.9',
    date: '18/06/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'maintenance'],
    gradient: 'from-purple-500 via-violet-600 to-indigo-600',
    size: 'large',
    featured: false
  },
  {
    id: 21,
    title: 'Actualización 5.8',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Todos los mensajes del <span class="text-red-200 font-medium">"/lang br"</span> fueron actualizados',
    version: '5.8',
    date: '17/06/2025',
    author: 'zjjeree',
    categories: ['server', 'maintenance'],
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    size: 'small',
    featured: false
  },
  {
    id: 20,
    title: 'Actualización 5.7',
    content: '<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> Mensajes de muerte arreglados.\n<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> Vote Kick arreglado.\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> En los mensajes de leaderboard ahora aparecerá la posición.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Nuevos paquetes creados: "Mensajes de Muerte" y "Comandos"\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Nuevo comando <span class="text-red-200 font-medium">/hide</span> con el que podrás ocultar tu nombre, de momento solo <span class="font-bold text-orange-400">@Content Creator</span> tienen acceso.',
    version: '5.7',
    date: '16/06/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'maintenance'],
    gradient: 'from-amber-500 via-orange-600 to-red-600',
    size: 'medium',
    featured: false,
    imageUrl: 'https://media.discordapp.net/attachments/1313721533562355732/1385003423497453628/image.png?ex=687b60b4&is=687a0f34&hm=0bf9ea58dfceaf7a0bf292eb729e3050f530f943c3fe2dbd5655904e1ba268bd&=&format=webp&quality=lossless'
  },
  {
    id: 19,
    title: 'Actualización 5.6',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los mensajes de leaderboard al finalizar la partida fueron arreglados.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Nuevos mensajes al finalizar un juego.\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Comando <span class="text-red-200 font-medium">"/teamconfig"</span> para abrir el menú del equipo.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Nuevas ventajas en la sección de "Objetos y Ventajas"',
    version: '5.6',
    date: '15/06/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'maintenance'],
    gradient: 'from-violet-500 via-purple-600 to-indigo-600',
    size: 'medium',
    featured: false
  },
  {
    id: 18,
    title: 'Actualización 5.5',
    content: '<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> Beep Test se encuentra activo nuevamente con mapas nuevos.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Mensajes de leaderboard al finalizar partida actualizados + mensaje de stats actualizado.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Borde de Altura arreglado.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> En preparación de 2 mapas nuevos.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> En preparación de 3 mapas nuevos.',
    version: '5.5',
    date: '14/06/2025',
    author: 'zjjeree',
    categories: ['beeptest', 'server', 'maintenance', 'game'],
    gradient: 'from-green-500 via-emerald-600 to-teal-600',
    size: 'medium',
    featured: false,
    imageUrl: 'https://media.discordapp.net/attachments/1313721533562355732/1383884587213525162/image.png?ex=687b4334&is=6879f1b4&hm=e26fe88b78894f1238a4a897244b727137648390f35133d989d01edb9a80653e&=&format=webp&quality=lossless'
  },
  {
    id: 13,
    title: 'Actualización 5.4',
    content: '<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Se subieron los puntos por empate.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El borde de altura fue actualizado.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Al lado de tus stats en <span class="text-red-200 font-medium">/stats</span> saldrá cuando sumaste de cada estadística luego de una partida.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arreglaron algunos mensajes con decimales infinitos.',
    version: '5.4',
    date: '13/06/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'maintenance'],
    gradient: 'from-orange-500 via-red-600 to-pink-600',
    size: 'medium',
    featured: false
  },
  {
    id: 14,
    title: 'Actualización 5.3',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se colocó un nuevo borde creado con partículas. BETA\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Se arregló el bug de los puntos.',
    version: '5.3',
    date: '12/06/2025',
    author: 'zjjeree',
    categories: ['server', 'maintenance', 'game'],
    gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
    size: 'small',
    featured: false
  },
  {
    id: 15,
    title: 'Actualización 5.2',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las sanciones por salirte en el 1er juego fueron arregladas.\n<img src="/emojils/Time.png" alt="time" class="inline-block w-5 h-5 mx-1" /> Los timers fueron arreglados.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Canal # desconocido actualizado.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Nuevo ping en # 🇫🇷 | autorol.',
    version: '5.2',
    date: '10/06/2025',
    author: 'zjjeree',
    categories: ['server', 'maintenance', 'bot'],
    gradient: 'from-blue-500 via-purple-600 to-indigo-600',
    size: 'medium',
    featured: false
  },
  {
    id: 16,
    title: 'Actualización 5.1',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló el bug de las jaulas.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> Se arreglaron los bugs de dodge ball.\n<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> Se arreglaron bugs.',
    version: '5.1',
    date: '09/06/2025',
    author: 'zjjeree',
    categories: ['maintenance', 'game', 'server'],
    gradient: 'from-red-500 via-orange-600 to-yellow-600',
    size: 'small',
    featured: false
  },
  {
    id: 12,
    title: 'Actualización 5.0',
    content: '<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Los <span class="font-bold text-lime-400">@Host</span> ya no deberán meter suplentes, los harán los mismos capitanes desde su menú de equipo.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El Orden Propio fue arreglado y se encuentra activo nuevamente.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Si un jugador se desconecta durante los modos de PvP, lo reemplazará un zombie y podrá reconectarse. (También lo podrán matar estando de zombie)\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> El modo Beep Test se encontrará inactivo hasta colocar nuevos niveles originales.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El nivel morado fue eliminado.\n<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> Cuando el borde se mueva por el deathmatch se achicará 5 bloques.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Cuando el borde se mueva por el deathmatch se achicará 5 bloques. (También se moverá el block-animation)\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> En varios mensajes, se mostrará el color del equipo en los nombres.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Los escudos ya no podrán usarlos.\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Ahora se contarán los decimales en los puntos.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Ya no se podrá buguear con bloques.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El canal # 🔨 | reglas fue actualizado.',
    version: '5.0',
    date: '07/06/2025',
    author: 'zjjeree',
    categories: ['game', 'server', 'maintenance', 'beeptest'],
    gradient: 'from-purple-500 via-pink-600 to-red-600',
    size: 'large',
    featured: true
  },
  {
    id: 11,
    title: 'Actualización 4.9',
    content: '<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Los puntos de victoria y empate se les dará solo a los jugadores vivos.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> La regeneración natural solo se desactivará si toca el kit "meetup".\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> Bug de los espectadores en dodgeball fue arreglado.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> Al bajar el sonido en la sección "Bloques Musicales" bajarás la música de dodge ball.\n<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> Bugs de las rondas en el scoreboard fue arreglado.',
    version: '4.9',
    date: '06/06/2025',
    author: 'zjjeree',
    categories: ['game', 'maintenance', 'server'],
    gradient: 'from-cyan-500 via-blue-600 to-purple-600',
    size: 'medium',
    featured: false
  },
  {
    id: 10,
    title: 'Actualización 4.8',
    content: '<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> El title de los modos randoms ahora solo mostrará los modos activos.\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Si un capitán pasa 1 minuto desconectado se le asignará el capitán a otro jugador del equipo.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> El kit troll ahora tendrá 1 solo arco.\n<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> Se arregló el placeholder del scoreboard que no mostraba las rondas ganadas, empatadas y perdidas.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> En DodgeBall las rondas ganadas se mostrarán con el color verde para evitar confusiones con el equipo blanco.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> En DodgeBall ahora solo reproducirá una música.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> La whitelist se activará cuando salga el 1er mensaje de información de jolly games.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El title de "Bienvenidos a Jolly Games" fue anulado.\n<img src="/emojils/Market.png" alt="market" class="inline-block w-5 h-5 mx-1" /> En Double Market saldrá el elo al lado de los nombres de los jugadores.\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> En Captains cuando algún jugador se desconecte se podrá elegir igual.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El comando "/lang pt" fue cambiado a "/lang br"\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El comando /stats ahora se podrá usar por más de que el jugador este desconectado.\n<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> En la 2da ronda ahora podrán salir kits randoms, no solo saldrá el kit de "meetup".\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se agregó el scenario "SuperHero".\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> En el bossbar se mostrará el color verde para evitar confusiones con el equipo negro.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se agregó un mensaje por si te expulsa la purga.',
    version: '4.8',
    date: '05/06/2025',
    author: 'zjjeree',
    categories: ['game', 'server', 'maintenance', 'random-kits'],
    gradient: 'from-green-500 via-teal-600 to-blue-600',
    size: 'large',
    featured: false
  },
  {
    id: 9,
    title: 'Actualización 4.7',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se arregló el mapa bugueado.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Vuelven las 2 rondas.',
    version: '4.7',
    date: '04/06/2025',
    author: 'zjjeree',
    categories: ['maintenance', 'server'],
    gradient: 'from-emerald-500 via-green-600 to-teal-600',
    size: 'small',
    featured: false
  },
  {
    id: 8,
    title: 'Actualización 4.6',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se va el mapa de temática navidad luego de ser el 1er mapa creado de Jolly Games.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se agregó un nuevo mapa.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> La textura del cofre se actualizó.',
    version: '4.6',
    date: '03/06/2025',
    author: 'zjjeree',
    categories: ['server', 'game'],
    gradient: 'from-red-500 via-green-600 to-red-600',
    size: 'medium',
    featured: false
  },
  {
    id: 7,
    title: 'Actualización 4.5',
    content: '<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> En caso de necesitar capitanes, el <span class="text-red-200 font-medium">/randomcaps</span> aplicará a los ranks jolly.\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Si un capitán se sale tendrá 3 minutos para reconectarse, en caso de no reconectar se le dará capitán automáticamente a otro jugador del equipo.\n<img src="/emojils/Puntuacion.png" alt="puntos" class="inline-block w-5 h-5 mx-1" /> Si entra un suplente recibirá los puntos del último jugador.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> En el comando <span class="text-red-200 font-medium">/top</span> ahora saldrá al lado si está conectado, desconectado o fuera de un equipo.\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Si colocas <span class="text-red-200 font-medium">/teamchat</span> en el chat de espectador, te cambiará al chat del equipo.\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Te saldrá un mensaje si es que te expulsan de tu equipo.',
    version: '4.5',
    date: '02/06/2025',
    author: 'zjjeree',
    categories: ['server', 'game', 'maintenance'],
    gradient: 'from-blue-500 via-indigo-600 to-purple-600',
    size: 'large',
    featured: false
  },
  {
    id: 6,
    title: 'Actualización 4.4',
    content: '<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Las máquinas de juego del lobby fueron arregladas.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El anticheat vuelve luego de ser remasterizado.',
    version: '4.4',
    date: '02/06/2025',
    author: 'zjjeree',
    categories: ['maintenance', 'game'],
    gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
    size: 'small',
    featured: false
  },
  {
    id: 5,
    title: 'Actualización 4.3',
    content: '<img src="/emojils/Random Kits.png" alt="kits" class="inline-block w-5 h-5 mx-1" /> Los kits de randomkits fueron obstruidos, por lo cual todos los kits serán nuevos.\n<img src="/emojils/Caol.png" alt="caol" class="inline-block w-5 h-5 mx-1" /> Vuelve a estar C.A.O.L. activo.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El KB de los huevos/bolas de nieve fue arreglado.\n<img src="/emojils/BattleBox.png" alt="battlebox" class="inline-block w-5 h-5 mx-1" /> DodgeBall se encuentra activo en fase BETA',
    version: '4.3',
    date: '30/05/2025',
    author: 'zjjeree',
    categories: ['random-kits', 'game', 'caol'],
    gradient: 'from-purple-500 via-pink-600 to-red-600',
    size: 'medium',
    featured: false
  },
  {
    id: 4,
    title: 'Actualización 4.2',
    content: '<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Los capitanes ya no podrán expulsar jugadores durante un team-election.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> Beep Test fue modificado y ahora será de un lado hacia el otro.\n<img src="/emojils/Alerta.png" alt="bug" class="inline-block w-5 h-5 mx-1" /> Se arregló el bug de los world records que daban los mismos puntos que fastest.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Mensajes de # | sub-queue y # | link fueron actualizados.',
    version: '4.2',
    date: '26/05/2025',
    author: 'zjjeree',
    categories: ['game', 'beeptest'],
    gradient: 'from-blue-500 via-cyan-600 to-teal-600',
    size: 'medium',
    featured: false
  },
  {
    id: 3,
    title: 'Actualización 4.1',
    content: '<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Los capitanes tendrán un ítem de configuración de equipo, en el tendrán las siguientes funciones:\n• Dar bonus de capitán a otro usuario.\n• Iniciar una votación para expulsar jugadores. (Nueva regla sobre esto)\n• Ver los jugadores conectados y desconectados.\n• Ver los miembros del equipo con las estadísticas de la partida.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> El server ya no te quitará de la whitelist si pasan 3 minutos, lo deberá hacer el capitán cuando quiera.\n<img src="/emojils/BeepTest.png" alt="beeptest" class="inline-block w-5 h-5 mx-1" /> Beep Test estará listo para mañana.',
    version: '4.1',
    date: '24/05/2025',
    author: 'zjjeree',
    categories: ['game', 'server', 'maintenance'],
    gradient: 'from-orange-500 via-yellow-600 to-amber-600',
    size: 'large',
    featured: false
  },
  {
    id: 2,
    title: 'Actualización 4.0',
    content: '<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> Se actualizaron los mensajes de team-election.\n<img src="/emojils/JollyGames.png" alt="jolly" class="inline-block w-5 h-5 mx-1" /> Se actualizaron los mensajes de los juegos del bar.\n<img src="/emojils/Equipos.png" alt="equipos" class="inline-block w-5 h-5 mx-1" /> El team-election "Draft" fue cambiado de nombre a "Chains"',
    version: '4.0',
    date: '23/05/2025',
    author: 'zjjeree',
    categories: ['game', 'server'],
    gradient: 'from-green-500 via-blue-600 to-purple-600',
    size: 'medium',
    featured: false
  }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    userId: 'user-1',
    user: mockUser,
    gameMode: 'SkyWars',
    points: 12500,
    kills: 850,
    deaths: 320,
    kdr: 2.65,
    gamesPlayed: 400,
    gamesWon: 250,
    winRate: 62.5,
    rank: 1,
    season: 4,
    lastUpdated: new Date(),
  },
  {
    id: 'lb-2',
    userId: 'user-2',
    user: { ...mockUser, id: 'user-2', username: 'Jiro' },
    gameMode: 'SkyWars',
    points: 11800,
    kills: 790,
    deaths: 350,
    kdr: 2.25,
    gamesPlayed: 420,
    gamesWon: 230,
    winRate: 54.7,
    rank: 2,
    season: 4,
    lastUpdated: new Date(),
  },
  {
    id: 'lb-3',
    userId: 'user-3',
    user: { ...mockUser, id: 'user-3', username: 'TripRod' },
    gameMode: 'SkyWars',
    points: 11250,
    kills: 750,
    deaths: 340,
    kdr: 2.2,
    gamesPlayed: 390,
    gamesWon: 220,
    winRate: 56.4,
    rank: 3,
    season: 4,
    lastUpdated: new Date(),
  },
];
