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

export interface NavLink {
  label: string;
  href: string;
  visible: boolean;
}

export interface SiteSettings {
  // Profile
  name: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  location: string;
  phone: string;
  avatarUrl: string;

  // Social
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    dribbble: string;
    youtube: string;
    instagram: string;
  };

  // About
  aboutText: string;
  skills: string[];

  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  showScrollIndicator: boolean;

  // Navigation
  customNavLinks: NavLink[];
  showNavCta: boolean;
  navCtaText: string;

  // Sections
  showWorkSection: boolean;
  showSkillsSection: boolean;
  showAboutSection: boolean;
  showBlogSection: boolean;
  showTestimonialsSection: boolean;
  showContactSection: boolean;
  featuredProjectsFirst: boolean;
  projectsPerPage: number;

  // Blog
  blogPostsPerPage: number;
  blogAuthor: string;
  showReadTime: boolean;

  // Appearance
  accentColor: string;
  backgroundColor: string;
  cardStyle: 'glass' | 'bordered' | 'solid';
  layoutWidth: 'narrow' | 'wide' | 'full';
  showGrainOverlay: boolean;
  fontStyle: 'modern' | 'classic' | 'minimal';

  // SEO
  metaKeywords: string;
  ogImageUrl: string;
  twitterHandle: string;
  googleAnalyticsId: string;
  facebookUrl: string;

  // Footer
  copyrightText: string;
  showFooterSocial: boolean;
  footerDescription: string;

  // Contact
  contactFormEnabled: boolean;
  contactEmail: string;
  showContactInfo: boolean;
  contactSuccessMessage: string;
  calendarLink: string;

  // Maintenance
  maintenanceMode: boolean;
  maintenanceMessage: string;
  allowedIps: string;
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
  totalSettings: number;
}