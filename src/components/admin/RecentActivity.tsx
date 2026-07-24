'use client';

import { Clock, Folder, Article, Envelope } from '@phosphor-icons/react';
import { useCMS } from '@/context/CMSContext';
import { formatDateShort } from '@/lib/utils';

export function RecentActivity() {
  const { projects, blogPosts, messages } = useCMS();

  const activities: { icon: typeof Folder; label: string; date: string; color: string; bgColor: string }[] = [];

  projects.slice(0, 3).forEach((p) =>
    activities.push({
      icon: Folder,
      label: `Project: "${p.title}" created`,
      date: p.date,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    })
  );

  blogPosts.slice(0, 3).forEach((p) =>
    activities.push({
      icon: Article,
      label: `Post: "${p.title}" ${p.published ? 'published' : 'saved'}`,
      date: p.date,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    })
  );

  messages.slice(0, 3).forEach((m) =>
    activities.push({
      icon: Envelope,
      label: `Message from ${m.name}`,
      date: m.date,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
    })
  );

  activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recent = activities.slice(0, 6);

  return (
    <div className="doppelrand-outer">
      <div className="doppelrand-inner p-6">
        <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
          <Clock size={14} className="text-purple-400" />
          Recent Activity
        </h3>

        {recent.length === 0 ? (
          <p className="text-sm text-white/30 text-center py-8">No activity yet</p>
        ) : (
          <div className="space-y-0 divide-y divide-white/[0.04]">
            {recent.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 py-3">
                  <span className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={14} className={item.color} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/70 truncate">{item.label}</p>
                    <p className="text-xs text-white/30 mt-0.5">{formatDateShort(item.date)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
