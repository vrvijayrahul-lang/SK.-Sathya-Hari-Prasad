'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] focus-ring disabled:opacity-40 disabled:pointer-events-none';

    const variants = {
      primary:
        'bg-white text-black hover:bg-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]',
      secondary:
        'bg-white/5 text-white/90 hover:bg-white/10 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
      ghost:
        'bg-transparent text-white/70 hover:text-white hover:bg-white/5',
      danger:
        'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], icon && 'p-2', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
