'use client';

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  addDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './client';
import type { Project, BlogPost, SiteSettings, ContactMessage } from '@/types';

// ---- GENERIC HELPERS ----

function serializeDates<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v instanceof Timestamp) result[k] = v.toDate().toISOString();
    else result[k] = v;
  }
  return result as T;
}

/** Remove undefined values so Firestore doesn't reject them */
function clean<T extends Record<string, unknown>>(obj: T): T {
  const cleaned = {} as T;
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) (cleaned as Record<string, unknown>)[k] = v;
  }
  return cleaned;
}

// ---- PROJECTS ----

const projectsCol = collection(db, 'projects');

export async function fetchProjects(): Promise<Project[]> {
  const q = query(projectsCol, orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => serializeDates<Project>({ id: d.id, ...d.data() as Record<string, unknown> }));
}

export async function addProjectToFirestore(project: Project): Promise<void> {
  await setDoc(doc(projectsCol, project.id), clean({ ...project, createdAt: Timestamp.now() }) as Record<string, unknown>);
}

export async function updateProjectInFirestore(id: string, data: Partial<Project>): Promise<void> {
  await updateDoc(doc(projectsCol, id), clean({ ...data, updatedAt: Timestamp.now() }) as Record<string, unknown>);
}

export async function deleteProjectFromFirestore(id: string): Promise<void> {
  await deleteDoc(doc(projectsCol, id));
}

// ---- BLOG ----

const blogCol = collection(db, 'blog');

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const q = query(blogCol, orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => serializeDates<BlogPost>({ id: d.id, ...d.data() as Record<string, unknown> }));
}

export async function addBlogPostToFirestore(post: BlogPost): Promise<void> {
  await setDoc(doc(blogCol, post.id), clean({ ...post, createdAt: Timestamp.now() }) as Record<string, unknown>);
}

export async function updateBlogPostInFirestore(id: string, data: Partial<BlogPost>): Promise<void> {
  await updateDoc(doc(blogCol, id), clean({ ...data, updatedAt: Timestamp.now() }) as Record<string, unknown>);
}

export async function deleteBlogPostFromFirestore(id: string): Promise<void> {
  await deleteDoc(doc(blogCol, id));
}

// ---- MESSAGES ----

const messagesCol = collection(db, 'messages');

export async function fetchMessages(): Promise<ContactMessage[]> {
  const q = query(messagesCol, orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => serializeDates<ContactMessage>({ id: d.id, ...d.data() as Record<string, unknown> }));
}

export async function addMessageToFirestore(message: ContactMessage): Promise<void> {
  await setDoc(doc(messagesCol, message.id), clean(message as unknown as Record<string, unknown>));
}

export async function markMessageReadInFirestore(id: string): Promise<void> {
  await updateDoc(doc(messagesCol, id), { read: true });
}

export async function deleteMessageFromFirestore(id: string): Promise<void> {
  await deleteDoc(doc(messagesCol, id));
}

// ---- SETTINGS ----

const settingsDocRef = doc(db, 'settings', 'main');

export async function fetchSettings(): Promise<SiteSettings | null> {
  const snap = await getDoc(settingsDocRef);
  if (!snap.exists()) return null;
  return serializeDates<SiteSettings>({ ...snap.data() as Record<string, unknown> });
}

export async function saveSettingsToFirestore(settings: SiteSettings): Promise<void> {
  await setDoc(settingsDocRef, clean({ ...settings, updatedAt: Timestamp.now() }) as Record<string, unknown>);
}