'use client';

import { Folder, Article, Envelope, Eye } from '@phosphor-icons/react';
import type { DashboardStats } from '@/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

const cards = [
  { label: 'Total Projects', key: 'totalProjects' as const, icon: Folder, color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20' },
  { label: 'Blog Posts', key: 'totalBlogPosts' as const, icon: Article, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20' },
  { label: 'Published', key: 'publishedPosts' as const, icon: Eye, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
  { label: 'Messages', key: 'totalMessages' as const, icon: Envelope, color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = stats[card.key];
        return (
          <div key={card.key} className={`${card.bgColor} ${card.borderColor} border rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`w-9 h-9 rounded-xl ${card.bgColor} ${card.borderColor} border flex items-center justify-center`}>
                <Icon size={16} className={card.color} />
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-white/40 mt-1">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}
