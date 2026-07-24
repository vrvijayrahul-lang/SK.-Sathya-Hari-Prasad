import type { Project, BlogPost, SiteSettings, ContactMessage } from '@/types';

export const defaultSettings: SiteSettings = {
  name: 'Sathya',
  title: 'Sathya — Creative Developer & Designer',
  subtitle: 'Crafting Digital Experiences',
  description:
    'I design and develop premium digital experiences that blend cutting-edge technology with elegant design.',
  email: 'hello@sathya.dev',
  location: 'Based in Stockholm',
  phone: '+1 (555) 123-4567',
  avatarUrl: '',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    dribbble: 'https://dribbble.com',
    youtube: '',
    instagram: '',
  },
  skills: [
    'React / Next.js', 'TypeScript', 'Tailwind CSS',
    'Framer Motion', 'Three.js', 'Node.js',
    'PostgreSQL', 'GraphQL', 'Figma', 'GSAP',
  ],
  aboutText:
    'I am a creative developer with over 6 years of experience crafting digital experiences for forward-thinking brands.\n\nI specialize in building premium web applications using modern technologies, with a deep focus on performance, accessibility, and delightful micro-interactions.\n\nWhen I\'m not coding, you\'ll find me exploring generative art or contributing to open-source projects.',

  // Hero
  heroTitle: 'Crafting Digital',
  heroSubtitle: 'Experiences That Matter',
  heroDescription: 'I design and develop premium digital experiences.',
  ctaText: 'View My Work',
  ctaLink: '#work',
  secondaryCtaText: 'Get in Touch',
  showScrollIndicator: true,

  // Navigation
  customNavLinks: [
    { label: 'Work', href: '/#work', visible: true },
    { label: 'About', href: '/#about', visible: true },
    { label: 'Blog', href: '/#blog', visible: true },
    { label: 'Contact', href: '/contact', visible: true },
  ],
  showNavCta: true,
  navCtaText: "Let's Talk",

  // Sections
  showWorkSection: true,
  showSkillsSection: true,
  showAboutSection: true,
  showBlogSection: true,
  showTestimonialsSection: true,
  showContactSection: true,
  featuredProjectsFirst: true,
  projectsPerPage: 6,

  // Blog
  blogPostsPerPage: 6,
  blogAuthor: 'Sathya',
  showReadTime: true,

  // Appearance
  accentColor: '#a78bfa',
  backgroundColor: '#050505',
  cardStyle: 'glass' as const,
  layoutWidth: 'wide' as const,
  showGrainOverlay: true,
  fontStyle: 'modern' as const,

  // SEO
  metaKeywords: 'creative developer, designer, portfolio, web development, UI/UX',
  ogImageUrl: '',
  twitterHandle: '@sathya',
  googleAnalyticsId: '',
  facebookUrl: '',

  // Footer
  copyrightText: 'All rights reserved.',
  showFooterSocial: true,
  footerDescription: 'Crafting premium digital experiences at the intersection of design and engineering.',

  // Contact
  contactFormEnabled: true,
  contactEmail: 'hello@sathya.dev',
  showContactInfo: true,
  contactSuccessMessage: 'Thank you for reaching out. I\'ll get back to you within 24 hours.',
  calendarLink: '',

  // Maintenance
  maintenanceMode: false,
  maintenanceMessage: 'Site is under maintenance. Back soon!',
  allowedIps: '',
};

export const defaultProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Nebula Dashboard',
    slug: 'nebula-dashboard',
    description: 'A real-time analytics platform with immersive data visualization and AI-powered insights.',
    longDescription:
      'Nebula is a comprehensive analytics dashboard designed for enterprise teams. It features real-time data streaming, customizable widgets, AI-driven anomaly detection, and beautiful interactive charts. The interface was built with a focus on clarity, speed, and delight — making complex data feel approachable.',
    category: 'Web App',
    tags: ['React', 'D3.js', 'WebSocket', 'AI/ML'],
    imageUrl: '',
    images: [],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    date: '2025-12-15',
    client: 'TechCorp',
    role: 'Lead Developer',
    duration: '4 months',
  },
  {
    id: 'proj-2',
    title: 'Verdant — E-Commerce',
    slug: 'verdant-ecommerce',
    description: 'A sustainable fashion marketplace with an immersive shopping experience and 3D product viewer.',
    longDescription:
      'Verdant reimagines the online shopping experience for sustainable fashion. We built a platform that combines a beautiful editorial aesthetic with powerful commerce features, including 3D product visualization, virtual try-on, and a personalized recommendation engine powered by machine learning.',
    category: 'E-Commerce',
    tags: ['Next.js', 'Three.js', 'Stripe', 'Sanity CMS'],
    imageUrl: '',
    images: [],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    date: '2025-09-20',
    client: 'Verdant Inc.',
    role: 'Full-Stack Developer',
    duration: '6 months',
  },
  {
    id: 'proj-3',
    title: 'Prism Design System',
    slug: 'prism-design-system',
    description: 'A comprehensive design system and component library for a fintech startup.',
    longDescription:
      'Prism is a complete design system built for a fintech company serving millions of users. It includes a tokenized design foundation, over 100 accessible components, comprehensive documentation, and automated visual regression testing. The system ensures consistency across web and mobile platforms.',
    category: 'Design System',
    tags: ['React', 'Storybook', 'Figma', 'Testing'],
    imageUrl: '',
    images: [],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    date: '2025-06-10',
    client: 'FinTech Co.',
    role: 'Design Engineer',
    duration: '3 months',
  },
  {
    id: 'proj-4',
    title: 'Aether — Portfolio',
    slug: 'aether-portfolio',
    description: 'An award-winning portfolio site for a visual artist featuring generative WebGL backgrounds.',
    longDescription:
      'Aether is an experimental portfolio for a digital artist that pushes the boundaries of what a portfolio can be. Featuring generative WebGL backgrounds that respond to user interaction, smooth page transitions with shared element animations, and a carefully curated typographic hierarchy.',
    category: 'Portfolio',
    tags: ['Next.js', 'WebGL', 'Framer Motion', 'GSAP'],
    imageUrl: '',
    images: [],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    date: '2025-03-05',
    client: 'Artist Collaboration',
    role: 'Creative Developer',
    duration: '2 months',
  },
  {
    id: 'proj-5',
    title: 'Pulse — Health App',
    slug: 'pulse-health-app',
    description: 'A wellness tracking app with biometric integration and personalized health insights.',
    longDescription:
      'Pulse is a holistic health and wellness application that integrates with wearable devices to provide real-time biometric tracking, personalized workout recommendations, nutrition planning, and mindfulness exercises. The app features a calming, accessible design language.',
    category: 'Mobile App',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Health APIs'],
    imageUrl: '',
    images: [],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    date: '2024-12-01',
    client: 'Startup Health',
    role: 'Tech Lead',
    duration: '8 months',
  },
  {
    id: 'proj-6',
    title: 'Synth — Audio Platform',
    slug: 'synth-audio-platform',
    description: 'A collaborative music production platform with real-time multiplayer capabilities.',
    longDescription:
      'Synth is a browser-based music production platform that enables real-time collaboration between musicians. It features a full DAW interface with synthesizers, samplers, effects, and mixer — all running in the browser via WebAudio API and WebRTC for low-latency collaboration.',
    category: 'Web App',
    tags: ['WebAudio', 'WebRTC', 'React', 'Tone.js'],
    imageUrl: '',
    images: [],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    date: '2024-08-15',
    role: 'Co-Founder & Developer',
    duration: '12 months',
  },
];

export const defaultBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Building Fluid Interfaces: A Guide to Physics-Based Animation',
    slug: 'building-fluid-interfaces',
    excerpt: 'Learn how to create natural-feeling animations using spring physics and custom easing curves that elevate the user experience.',
    content: `## Introduction

Fluid interfaces feel alive. They respond to our touch with the same physicality we experience in the real world — buttons depress, cards lift, pages flow. This guide explores how to achieve that level of polish using spring physics and custom cubic-bezier curves.

## Why Physics Matters

Traditional easing functions like "ease-in-out" create mechanical, robotic motion. Real objects don't move at constant acceleration — they have mass, friction, and tension. Spring physics simulates these properties.

\`\`\`tsx
const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};
\`\`\`

## Implementing Staggered Reveals

One of the most effective patterns for premium feel is staggered entry animations. Each child element enters with a slight delay, creating a cascading effect.

\`\`\`tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
\`\`\`

## Custom Cubic-Bezier

For scroll-triggered animations, use custom curves:

\`\`\`css
.custom-ease {
  transition: all 0.8s cubic-bezier(0.32, 0.72, 0, 1);
}
\`\`\`

This creates a snappy acceleration with a gentle deceleration — the hallmark of premium motion design.`,
    category: 'Development',
    tags: ['Animation', 'Framer Motion', 'CSS', 'UX'],
    imageUrl: '',
    author: 'Sathya',
    published: true,
    date: '2025-11-20',
    readTime: '5 min read',
  },
  {
    id: 'blog-2',
    title: 'The Art of Double-Bezel Design in Modern UI',
    slug: 'art-of-double-bezel-design',
    excerpt: 'Exploring the nested architecture technique that gives premium interfaces their physical, machined quality.',
    content: `## The Double-Bezel Philosophy

Premium hardware design has long understood the power of nested enclosures. Think of a high-end watch — the crystal sits in a bezel, which sits on the case, which is attached to the strap. Each layer is distinct, and the transitions between them are precise.

## Translating to UI

In digital design, the double-bezel (or "Doppelrand") technique creates the same sense of depth and craftsmanship. Instead of placing a card flat on a background, we nest it inside an enclosure.

### The Structure

1. **Outer Shell**: A wrapper with subtle background, hairline border, generous padding, and large outer radius
2. **Inner Core**: The actual content with its own background, inner highlight, and slightly smaller radius

\`\`\`tsx
<div className="bg-white/5 p-[1.5px] rounded-[calc(1.5rem+1.5px)]">
  <div className="bg-[#0d0d0d] rounded-[1.5rem] p-6">
    {/* Content */}
  </div>
</div>
\`\`\`

## Why It Works

The technique creates visual tension between containment and release. The outer shell contains; the inner card breathes. This mirrors how our brains process physical objects and creates an unconscious sense of quality.`,
    category: 'Design',
    tags: ['UI Design', 'CSS', 'Frontend'],
    imageUrl: '',
    author: 'Sathya',
    published: true,
    date: '2025-10-05',
    readTime: '4 min read',
  },
  {
    id: 'blog-3',
    title: 'Performance Optimization in Next.js: Beyond the Basics',
    slug: 'nextjs-performance-optimization',
    excerpt: 'Advanced techniques for optimizing Next.js applications including caching strategies, partial prerendering, and bundle analysis.',
    content: `## Beyond Default Optimizations

Next.js provides excellent defaults, but reaching true performance excellence requires understanding the underlying mechanisms and making deliberate tradeoffs.

## Caching Strategies

The key to a fast Next.js app is intelligent caching:

- **Static rendering** for content that rarely changes
- **ISR (Incremental Static Regeneration)** for content that updates periodically
- **Dynamic rendering** for personalized content

## Partial Prerendering (PPR)

PPR allows you to combine static and dynamic content on the same page:

\`\`\`tsx
export default function Page() {
  return (
    <div>
      <Header /> {/* Static */}
      <Suspense fallback={<Skeleton />}>
        <DynamicContent /> {/* Dynamic */}
      </Suspense>
    </div>
  );
}
\`\`\`

## Image Optimization

Always use the Next.js Image component with proper sizing, priority loading for above-the-fold images, and WebP/AVIF formats.

## Bundle Analysis

Regularly analyze your bundle to identify opportunities. Focus on:
- Code splitting at route boundaries
- Dynamic imports for heavy components
- Tree-shaking unused exports`,
    category: 'Development',
    tags: ['Next.js', 'Performance', 'React', 'Caching'],
    imageUrl: '',
    author: 'Sathya',
    published: true,
    date: '2025-08-12',
    readTime: '7 min read',
  },
];

export const defaultMessages: ContactMessage[] = [];
