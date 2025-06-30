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
  avatar: 'https://crafatar.com/avatars/069a79f4-44e9-4726-a5be-fca90e38aaf5',
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
    description: 'Lucha por la supervivencia en islas flotantes. ¡El último en pie gana!',
    icon: '☁️',
    thumbnail: '/images/games/skywars.jpg',
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
    description: 'Busca cofres, equípate y sé el último superviviente en la arena.',
    icon: '🏹',
    thumbnail: '/images/games/hungergames.jpg',
    isActive: true,
    playerCount: { current: 280, max: 400 },
    averageGameTime: 20,
    difficulty: 'hard',
    tags: ['PvP', 'Survival', 'Battle Royale'],
  },
];

// Mock Recent Updates (for a smaller component)
export const mockRecentUpdates: {
  type: 'feature' | 'bugfix' | 'update';
  title: string;
  time: string;
}[] = [
  {
    type: 'feature',
    title: 'Nuevo modo de juego: The Bridge',
    time: 'hace 2 horas',
  },
  {
    type: 'bugfix',
    title: 'Corregido un error de duplicación en SkyWars',
    time: 'hace 5 horas',
  },
  {
    type: 'update',
    title: 'Actualización del mapa del lobby principal',
    time: 'hace 1 día',
  },
];

// Mock News Posts (more detailed)
export const mockNewsPosts: NewsPost[] = [
    {
        id: 'news-1',
        slug: 'nueva-temporada-skywars',
        title: '¡Comienza la Temporada 4 de SkyWars!',
        excerpt: 'Nuevos mapas, kits y un sistema de ranking renovado te esperan en la nueva temporada de SkyWars. ¡Prepárate para la batalla!',
        content: '<h2>¡La espera ha terminado!</h2><p>La temporada 4 de SkyWars ya está aquí, y viene cargada de novedades que cambiarán tu forma de jugar. Hemos escuchado a la comunidad y hemos trabajado duro para traer una experiencia renovada y emocionante.</p><h3>Nuevos Mapas</h3><ul><li>Templo del Cielo</li><li>Archipiélago Pirata</li><li>Ciudadela Flotante</li></ul><h3>Kits Renovados</h3><p>Hemos rebalanceado todos los kits existentes y hemos añadido 3 nuevos kits exclusivos de esta temporada. ¡Descúbrelos en la tienda!</p>',
        featuredImage: '/images/news/skywars-season4.jpg',
        author: mockUser,
        authorId: mockUser.id,
        category: 'announcement',
        tags: ['SkyWars', 'Temporada 4', 'PvP'],
        isPublished: true,
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        views: 15200,
    }
];

// Mock Community Activities
export const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    userId: 'user-2',
    user: { ...mockUser, id: 'user-2', username: 'Jiro', avatar: 'https://crafatar.com/avatars/6d03b355-6213-4355-827c-03f958a0b094' },
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
    user: { ...mockUser, id: 'user-3', username: 'TripRod', avatar: 'https://crafatar.com/avatars/4c8a22a3-3392-411a-96a8-9a861582e91e' },
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
    user: { ...mockUser, id: 'user-4', username: 'RxpliedSL', avatar: 'https://crafatar.com/avatars/4b260431-a889-4475-b44c-474d27c0e801' },
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
  }
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
        description: 'Hola, compré el rango VIP hace una hora y todavía no se me ha aplicado en el servidor. Adjunto recibo de la compra.',
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
        description: 'En el mapa "Templo", a veces es posible atravesar los bloques de la base enemiga sin romperlos.',
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
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            }
        ],
    }
]

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
    { id: 'lb-1', userId: 'user-1', user: mockUser, gameMode: 'SkyWars', points: 12500, kills: 850, deaths: 320, kdr: 2.65, gamesPlayed: 400, gamesWon: 250, winRate: 62.5, rank: 1, season: 4, lastUpdated: new Date() },
    { id: 'lb-2', userId: 'user-2', user: { ...mockUser, id: 'user-2', username: 'Jiro' }, gameMode: 'SkyWars', points: 11800, kills: 790, deaths: 350, kdr: 2.25, gamesPlayed: 420, gamesWon: 230, winRate: 54.7, rank: 2, season: 4, lastUpdated: new Date() },
    { id: 'lb-3', userId: 'user-3', user: { ...mockUser, id: 'user-3', username: 'TripRod' }, gameMode: 'SkyWars', points: 11250, kills: 750, deaths: 340, kdr: 2.20, gamesPlayed: 390, gamesWon: 220, winRate: 56.4, rank: 3, season: 4, lastUpdated: new Date() },
]; 