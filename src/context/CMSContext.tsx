'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Project, BlogPost, SiteSettings, ContactMessage, DashboardStats } from '@/types';
import { generateId, slugify, getReadTime } from '@/lib/utils';
import { defaultProjects, defaultBlogPosts, defaultSettings } from './defaultData';
import { useToast } from '@/components/ui/Toast';
import {
  fetchProjects,
  addProjectToFirestore,
  updateProjectInFirestore,
  deleteProjectFromFirestore,
  fetchBlogPosts,
  addBlogPostToFirestore,
  updateBlogPostInFirestore,
  deleteBlogPostFromFirestore,
  fetchMessages,
  addMessageToFirestore,
  markMessageReadInFirestore,
  deleteMessageFromFirestore,
  fetchSettings,
  saveSettingsToFirestore,
} from '@/lib/firebase/firestore';

interface CMSContextType {
  projects: Project[];
  blogPosts: BlogPost[];
  settings: SiteSettings;
  messages: ContactMessage[];
  synced: boolean;
  firestoreConnected: boolean;

  addProject: (project: Omit<Project, 'id' | 'slug' | 'date'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
  getProjectBySlug: (slug: string) => Project | undefined;

  addBlogPost: (post: Omit<BlogPost, 'id' | 'slug' | 'date' | 'readTime'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  getBlogPost: (id: string) => BlogPost | undefined;
  getBlogPostBySlug: (slug: string) => BlogPost | undefined;

  updateSettings: (settings: Partial<SiteSettings>) => void;

  addMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  getStats: () => DashboardStats;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

function persist(key: string, data: unknown) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* ignore */ }
}

function getLocal<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function useCMSStore() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [synced, setSynced] = useState(false);
  const [firestoreConnected, setFirestoreConnected] = useState(false);

  // ---- Load data on mount ----
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [fsProjects, fsPosts, fsMessages, fsSettings] = await Promise.all([
          fetchProjects().catch(() => null),
          fetchBlogPosts().catch(() => null),
          fetchMessages().catch(() => null),
          fetchSettings().catch(() => null),
        ]);

        if (cancelled) return;

        // Check if ANY Firestore call returned data (not null)
        const anyConnected = fsProjects !== null || fsPosts !== null || fsMessages !== null || fsSettings !== null;
        setFirestoreConnected(anyConnected);

        if (fsProjects && fsProjects.length > 0) {
          setProjects(fsProjects);
          persist('cms_projects', fsProjects);
        } else {
          const local = getLocal<Project[]>('cms_projects');
          setProjects(local ?? defaultProjects);
          if (!local && anyConnected) persist('cms_projects', defaultProjects);
        }

        if (fsPosts && fsPosts.length > 0) {
          setBlogPosts(fsPosts);
          persist('cms_blog', fsPosts);
        } else {
          const local = getLocal<BlogPost[]>('cms_blog');
          setBlogPosts(local ?? defaultBlogPosts);
          if (!local && anyConnected) persist('cms_blog', defaultBlogPosts);
        }

        if (fsSettings) {
          setSettings(fsSettings);
          persist('cms_settings', fsSettings);
        } else {
          const local = getLocal<SiteSettings>('cms_settings');
          if (local) setSettings(local);
        }

        if (fsMessages && fsMessages.length > 0) {
          setMessages(fsMessages);
          persist('cms_messages', fsMessages);
        } else {
          const local = getLocal<ContactMessage[]>('cms_messages');
          if (local) setMessages(local);
        }

        if (!anyConnected) {
          toast('Running in local-only mode — data won\'t sync across devices', 'info');
        }
      } catch {
        if (!cancelled) {
          setFirestoreConnected(false);
          const localP = getLocal<Project[]>('cms_projects');
          const localB = getLocal<BlogPost[]>('cms_blog');
          const localS = getLocal<SiteSettings>('cms_settings');
          const localM = getLocal<ContactMessage[]>('cms_messages');
          if (localP) setProjects(localP);
          if (localB) setBlogPosts(localB);
          if (localS) setSettings(localS);
          if (localM) setMessages(localM);
        }
      }
      if (!cancelled) setSynced(true);
    }
    load();
    return () => { cancelled = true; };
  }, [toast]);

  // ---- Projects ----
  const addProject = useCallback((project: Omit<Project, 'id' | 'slug' | 'date'>) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      id: generateId(),
      slug: slugify(project.title),
      date: now,
    };
    setProjects(prev => {
      const updated = [newProject, ...prev];
      persist('cms_projects', updated);
      return updated;
    });
    addProjectToFirestore(newProject)
      .then(() => toast('Project synced to cloud', 'success'))
      .catch(() => toast('Project saved locally — cloud sync failed', 'error'));
  }, [toast]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, ...updates } : p));
      persist('cms_projects', updated);
      return updated;
    });
    updateProjectInFirestore(id, updates)
      .then(() => toast('Project updated in cloud', 'success'))
      .catch(() => toast('Project updated locally — cloud sync failed', 'error'));
  }, [toast]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== id);
      persist('cms_projects', updated);
      return updated;
    });
    deleteProjectFromFirestore(id)
      .then(() => toast('Project removed from cloud', 'success'))
      .catch(() => toast('Project removed locally — cloud sync failed', 'error'));
  }, [toast]);

  const getProject = useCallback((id: string) => projects.find(p => p.id === id), [projects]);
  const getProjectBySlug = useCallback((slug: string) => projects.find(p => p.slug === slug), [projects]);

  // ---- Blog ----
  const addBlogPost = useCallback((post: Omit<BlogPost, 'id' | 'slug' | 'date' | 'readTime'>) => {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...post,
      id: generateId(),
      slug: slugify(post.title),
      date: now,
      readTime: getReadTime(post.content),
    };
    setBlogPosts(prev => {
      const updated = [newPost, ...prev];
      persist('cms_blog', updated);
      return updated;
    });
    addBlogPostToFirestore(newPost)
      .then(() => toast('Blog post synced to cloud', 'success'))
      .catch(() => toast('Blog saved locally — cloud sync failed', 'error'));
  }, [toast]);

  const updateBlogPost = useCallback((id: string, updates: Partial<BlogPost>) => {
    setBlogPosts(prev => {
      const updated = prev.map(p => {
        if (p.id !== id) return p;
        const merged = { ...p, ...updates };
        if (updates.content) merged.readTime = getReadTime(updates.content);
        return merged;
      });
      persist('cms_blog', updated);
      return updated;
    });
    updateBlogPostInFirestore(id, updates)
      .then(() => toast('Blog post updated in cloud', 'success'))
      .catch(() => toast('Blog updated locally — cloud sync failed', 'error'));
  }, [toast]);

  const deleteBlogPost = useCallback((id: string) => {
    setBlogPosts(prev => {
      const updated = prev.filter(p => p.id !== id);
      persist('cms_blog', updated);
      return updated;
    });
    deleteBlogPostFromFirestore(id)
      .then(() => toast('Blog post removed from cloud', 'success'))
      .catch(() => toast('Blog removed locally — cloud sync failed', 'error'));
  }, [toast]);

  const getBlogPost = useCallback((id: string) => blogPosts.find(p => p.id === id), [blogPosts]);
  const getBlogPostBySlug = useCallback((slug: string) => blogPosts.find(p => p.slug === slug), [blogPosts]);

  // ---- Settings ----
  const updateSettings = useCallback((updates: Partial<SiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...updates };
      persist('cms_settings', updated);
      return updated;
    });
    const newSettings = { ...settings, ...updates };
    saveSettingsToFirestore(newSettings)
      .then(() => toast('Settings synced to cloud', 'success'))
      .catch(() => toast('Settings saved locally — cloud sync failed', 'error'));
  }, [settings, toast]);

  // ---- Messages ----
  const addMessage = useCallback((msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: generateId(),
      date: new Date().toISOString(),
      read: false,
    };
    setMessages(prev => {
      const updated = [newMsg, ...prev];
      persist('cms_messages', updated);
      return updated;
    });
    addMessageToFirestore(newMsg)
      .catch(() => { /* silently fail — messages aren't admin-initiated */ });
  }, []);

  const markMessageRead = useCallback((id: string) => {
    setMessages(prev => {
      const updated = prev.map(m => (m.id === id ? { ...m, read: true } : m));
      persist('cms_messages', updated);
      return updated;
    });
    markMessageReadInFirestore(id).catch(() => {});
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages(prev => {
      const updated = prev.filter(m => m.id !== id);
      persist('cms_messages', updated);
      return updated;
    });
    deleteMessageFromFirestore(id).catch(() => {});
  }, []);

  // ---- Stats ----
  const getStats = useCallback((): DashboardStats => ({
    totalProjects: projects.length,
    totalBlogPosts: blogPosts.length,
    totalMessages: messages.length,
    unreadMessages: messages.filter(m => !m.read).length,
    publishedPosts: blogPosts.filter(p => p.published).length,
    featuredProjects: projects.filter(p => p.featured).length,
  }), [projects, blogPosts, messages]);

  return {
    projects, blogPosts, settings, messages, synced, firestoreConnected,
    addProject, updateProject, deleteProject, getProject, getProjectBySlug,
    addBlogPost, updateBlogPost, deleteBlogPost, getBlogPost, getBlogPostBySlug,
    updateSettings, addMessage, markMessageRead, deleteMessage, getStats,
  };
}

export function CMSProvider({ children }: { children: ReactNode }) {
  return <CMSContext.Provider value={useCMSStore()}>{children}</CMSContext.Provider>;
}

export function useCMS(): CMSContextType {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}