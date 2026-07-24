'use client';

import { usePathname } from 'next/navigation';
import { SquaresFour } from '@phosphor-icons/react';
import Link from 'next/link';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/projects': 'Projects',
  '/admin/projects/new': 'New Project',
  '/admin/blog': 'Blog Posts',
  '/admin/blog/new': 'New Post',
  '/admin/messages': 'Messages',
  '/admin/settings': 'Settings',
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = Object.entries(pageTitles).find(([path]) =>
    pathname?.startsWith(path)
  )?.[1] ?? 'Dashboard';

  // Check if we're on an edit page
  const isEditProject = pathname?.match(/^\/admin\/projects\/(?!new)[^/]+$/);
  const isEditBlog = pathname?.match(/^\/admin\/blog\/(?!new)[^/]+$/);
  const displayTitle = isEditProject ? 'Edit Project' : isEditBlog ? 'Edit Post' : title;

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.04] z-30 flex items-center justify-between px-6 md:px-8">
      <div>
        <h1 className="text-sm font-semibold text-white">{displayTitle}</h1>
      </div>
      <Link
        href="/"
        className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors duration-300"
      >
        <SquaresFour size={12} />
        View Site
      </Link>
    </header>
  );
}
