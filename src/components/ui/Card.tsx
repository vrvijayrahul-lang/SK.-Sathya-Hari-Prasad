'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  outerClassName?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, outerClassName, hover, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'doppelrand-outer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]',
        hover && 'hover:scale-[1.02] cursor-pointer',
        outerClassName
      )}
      onClick={onClick}
    >
      <div className={cn('doppelrand-inner p-6 md:p-8', className)}>
        {children}
      </div>
    </div>
  );
}
