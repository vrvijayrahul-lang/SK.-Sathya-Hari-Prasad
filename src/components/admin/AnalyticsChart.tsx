'use client';

import { useMemo } from 'react';
import { ChartLine } from '@phosphor-icons/react';
import { useCMS } from '@/context/CMSContext';

export function AnalyticsChart() {
  const { projects, blogPosts } = useCMS();

  const monthlyData = useMemo(() => {
    const months: Record<string, { projects: number; posts: number }> = {};
    const allItems = [
      ...projects.map((p) => ({ date: p.date, type: 'projects' as const })),
      ...blogPosts.map((p) => ({ date: p.date, type: 'posts' as const })),
    ];

    allItems.forEach((item) => {
      const date = new Date(item.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!months[key]) months[key] = { projects: 0, posts: 0 };
      months[key][item.type]++;
    });

    return Object.entries(months)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6);
  }, [projects, blogPosts]);

  const maxVal = Math.max(
    ...monthlyData.map(([, d]) => Math.max(d.projects, d.posts)),
    1
  );

  return (
    <div className="doppelrand-outer">
      <div className="doppelrand-inner p-6">
        <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
          <ChartLine size={14} className="text-purple-400" />
          Content Activity
        </h3>

        {monthlyData.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-xs text-white/30">No content data yet</p>
          </div>
        ) : (
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map(([month, data]) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="flex flex-col items-center gap-0.5 w-full">
                  <div
                    className="w-full bg-purple-500/20 rounded-t-sm transition-all duration-500"
                    style={{ height: `${(data.projects / maxVal) * 100}%`, minHeight: data.projects > 0 ? 4 : 0 }}
                  />
                  <div
                    className="w-full bg-emerald-500/20 rounded-t-sm transition-all duration-500"
                    style={{ height: `${(data.posts / maxVal) * 100}%`, minHeight: data.posts > 0 ? 4 : 0 }}
                  />
                </div>
                <span className="text-[9px] text-white/30 font-medium mt-1">
                  {month.split('-')[1]}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-purple-500/40" />
            <span className="text-[10px] text-white/40">Projects</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-emerald-500/40" />
            <span className="text-[10px] text-white/40">Posts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
