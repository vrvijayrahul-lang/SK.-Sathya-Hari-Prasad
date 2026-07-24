export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  imageUrl: string;
  images?: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  date: string;
  client?: string;
  role?: string;
  duration?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  author: string;
  published: boolean;
  date: string;
  readTime: string;
}

export interface SiteSettings {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  location: string;
  avatarUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    dribbble: string;
  };
  skills: string[];
  aboutText: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface DashboardStats {
  totalProjects: number;
  totalBlogPosts: number;
  totalMessages: number;
  unreadMessages: number;
  publishedPosts: number;
  featuredProjects: number;
}
