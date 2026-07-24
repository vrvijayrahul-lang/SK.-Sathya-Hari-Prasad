'use client';

import { usePathname } from 'next/navigation';
import { SquaresFour, Cloud, CloudSlash } from '@phosphor-icons/react';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';

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
  const { firestoreConnected, synced } = useCMS();
  const title = Object.entries(pageTitles).find(([path]) =>
    pathname?.startsWith(path)
  )?.[1] ?? 'Dashboard';

  const isEditProject = pathname?.match(/^\/admin\/projects\/(?!new)[^/]+$/);
  const isEditBlog = pathname?.match(/^\/admin\/blog\/(?!new)[^/]+$/);
  const displayTitle = isEditProject ? 'Edit Project' : isEditBlog ? 'Edit Post' : title;

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.04] z-30 flex items-center justify-between px-6 md:px-8">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold text-white">{displayTitle}</h1>
        {synced && (
          <span
            className={`flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full border ${
              firestoreConnected
                ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
                : 'text-amber-400 border-amber-500/20 bg-amber-500/5'
            }`}
          >
            {firestoreConnected ? (
              <><Cloud size={10} weight="fill" /> Cloud Sync</>
            ) : (
              <><CloudSlash size={10} /> Local Only</>
            )}
          </span>
        )}
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