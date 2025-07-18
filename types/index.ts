// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  minecraft_username?: string;
  avatar?: string;
  role: UserRole;
  tags: UserTag[];
  joinedAt: Date;
  lastSeen: Date;
  isOnline: boolean;
  stats: UserStats;
}

// Role and Tag Types
export interface UserRole {
  id: number;
  name: string;
  displayName: string;
  description?: string;
  color: string;
  permissions: RolePermissions;
  hierarchyLevel: number;
}

export interface UserTag {
  id: number;
  name: string;
  displayName: string;
  description?: string;
  color: string;
  icon?: string;
  category: 'staff' | 'special' | 'achievement' | 'custom';
  isActive: boolean;
}

export interface RolePermissions {
  // Admin permissions
  manage_users?: boolean;
  manage_roles?: boolean;
  manage_tags?: boolean;
  manage_forum?: boolean;
  manage_content?: boolean;
  view_admin_panel?: boolean;
  ban_users?: boolean;
  
  // Moderator permissions
  moderate_forum?: boolean;
  delete_posts?: boolean;
  warn_users?: boolean;
  mute_users?: boolean;
  view_reports?: boolean;
  manage_topics?: boolean;
  
  // Player permissions
  create_posts?: boolean;
  create_topics?: boolean;
  react_posts?: boolean;
  view_forum?: boolean;
}

export interface RoleAssignment {
  id: number;
  userId: number;
  roleId: number;
  assignedBy?: number;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

export interface TagAssignment {
  id: number;
  userId: number;
  tagId: number;
  assignedBy?: number;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

export interface UserStats {
  totalPoints: number;
  totalKills: number;
  totalDeaths: number;
  kdr: number;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  currentRank: string;
  seasonPoints: number;
}

// Activity Types
export interface Activity {
  id: string;
  userId: string;
  user: User;
  type: 'screenshot' | 'artwork' | 'build' | 'achievement';
  title: string;
  description?: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isApproved: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  activityId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Leaderboard Types
export interface LeaderboardEntry {
  id: string;
  userId: string;
  user: User;
  gameMode: string;
  points: number;
  kills: number;
  deaths: number;
  kdr: number;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  rank: number;
  season: number;
  lastUpdated: Date;
}

export interface LeaderboardFilters {
  gameMode?: string;
  season?: number;
  timeRange?: 'daily' | 'weekly' | 'monthly' | 'all-time';
  sortBy?: 'points' | 'kills' | 'kdr' | 'winRate';
  limit?: number;
  offset?: number;
}

// Forum Types
export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  topicsCount: number;
  postsCount: number;
  lastPost?: ForumPost;
}

export interface ForumTopic {
  id: string;
  categoryId: string;
  category: ForumCategory;
  userId: string;
  user: User;
  title: string;
  content: string;
  isPinned: boolean;
  isLocked: boolean;
  views: number;
  replies: number;
  lastReply?: ForumPost;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface ForumPost {
  id: string;
  topicId: string;
  topic: ForumTopic;
  userId: string;
  user: User;
  content: string;
  isEdited: boolean;
  editedAt?: Date;
  createdAt: Date;
  likes: number;
  reports: number;
}

// Game Types
export interface GameMode {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  thumbnail: string;
  isActive: boolean;
  playerCount: {
    current: number;
    max: number;
  };
  averageGameTime: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  tags: string[];
}

export interface GameSession {
  id: string;
  userId: string;
  user: User;
  gameModeId: string;
  gameMode: GameMode;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  result: 'win' | 'loss' | 'draw' | 'abandoned';
  points: number;
  kills: number;
  deaths: number;
  assists: number;
  placement?: number;
  totalPlayers?: number;
}

// News/Updates Types
export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  authorId: string;
  author: User;
  category: 'update' | 'announcement' | 'event' | 'patch-notes';
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
}

// Support Types
export interface SupportTicket {
  id: string;
  userId: string;
  user: User;
  subject: string;
  description: string;
  category: 'bug-report' | 'feature-request' | 'account-issue' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo?: string;
  assignee?: User;
  responses: TicketResponse[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  userId: string;
  user: User;
  content: string;
  isStaffResponse: boolean;
  createdAt: Date;
  attachments?: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// UI Component Types
export interface BentoCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  variant?: 'default' | 'gradient' | 'glow';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

// Theme Types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  fonts: {
    sans: string;
    mono: string;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      default: string;
      smooth: string;
      bounce: string;
    };
  };
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
