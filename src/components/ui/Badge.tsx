'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'green' | 'blue' | 'amber';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const base = 'inline-flex items-center justify-center font-medium leading-none';

  const variants = {
    default: 'bg-white/5 text-white/70 border border-white/10',
    accent: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], 'rounded-full', className)}>
      {children}
    </span>
  );
}
