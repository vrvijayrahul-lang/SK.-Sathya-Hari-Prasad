'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Layout,
  Folder,
  Article,
  Envelope,
  GearSix,
  Command,
  SignOut,
  SquaresFour,
} from '@phosphor-icons/react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: Layout },
  { label: 'Projects', href: '/admin/projects', icon: Folder },
  { label: 'Blog Posts', href: '/admin/blog', icon: Article },
  { label: 'Messages', href: '/admin/messages', icon: Envelope },
  { label: 'Settings', href: '/admin/settings', icon: GearSix },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#080808] border-r border-white/[0.04] z-40 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/[0.04]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Command size={16} className="text-purple-400" />
          </span>
          <div>
            <p className="text-sm font-medium text-white/90">CMA</p>
            <p className="text-[10px] text-white/30 tracking-wide">Content Manager</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                active
                  ? 'bg-white/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
              }`}
            >
              <Icon size={18} weight={active ? 'fill' : 'regular'} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/[0.04] space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all duration-300"
        >
          <SquaresFour size={18} />
          View Site
        </Link>
      </div>
    </aside>
  );
}
