'use client';

import { useCMS } from '@/context/CMSContext';
import { StatsCards } from '@/components/admin/StatsCards';
import { AnalyticsChart } from '@/components/admin/AnalyticsChart';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { Envelope, Folder, Article, ArrowUpRight } from '@phosphor-icons/react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { getStats, messages, projects, blogPosts } = useCMS();
  const stats = getStats();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <p className="text-sm text-white/40">Welcome back</p>
        <h2 className="text-2xl font-bold text-white mt-1">Dashboard Overview</h2>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/admin/projects/new"
          className="doppelrand-outer group transition-all duration-700 hover:scale-[1.02]"
        >
          <div className="doppelrand-inner p-6 flex items-center gap-4">
            <span className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Folder size={18} className="text-purple-400" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                New Project
              </p>
              <p className="text-xs text-white/30 mt-0.5">{projects.length} total projects</p>
            </div>
            <ArrowUpRight size={14} className="text-white/20 group-hover:text-purple-400 transition-colors" />
          </div>
        </Link>

        <Link
          href="/admin/blog/new"
          className="doppelrand-outer group transition-all duration-700 hover:scale-[1.02]"
        >
          <div className="doppelrand-inner p-6 flex items-center gap-4">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Article size={18} className="text-emerald-400" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                New Blog Post
              </p>
              <p className="text-xs text-white/30 mt-0.5">{blogPosts.length} total posts</p>
            </div>
            <ArrowUpRight size={14} className="text-white/20 group-hover:text-emerald-400 transition-colors" />
          </div>
        </Link>

        <Link
          href="/admin/messages"
          className="doppelrand-outer group transition-all duration-700 hover:scale-[1.02]"
        >
          <div className="doppelrand-inner p-6 flex items-center gap-4">
            <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Envelope size={18} className="text-amber-400" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">
                Messages
              </p>
              <p className="text-xs text-white/30 mt-0.5">
                {stats.unreadMessages > 0 ? (
                  <span className="text-amber-400">{stats.unreadMessages} unread</span>
                ) : (
                  'No unread messages'
                )}
              </p>
            </div>
            <ArrowUpRight size={14} className="text-white/20 group-hover:text-amber-400 transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
}
