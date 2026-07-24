'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="doppelrand-outer">
          <input
            id={id}
            ref={ref}
            className={cn(
              'doppelrand-inner w-full bg-[#0d0d0d] px-4 py-3 text-sm text-white/90 placeholder:text-white/20',
              'focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-500',
              error && 'ring-1 ring-red-500/30',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-xs font-medium text-white/50 mb-2 tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="doppelrand-outer">
          <textarea
            id={id}
            ref={ref}
            className={cn(
              'doppelrand-inner w-full bg-[#0d0d0d] px-4 py-3 text-sm text-white/90 placeholder:text-white/20 min-h-[120px] resize-y',
              'focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-500',
              error && 'ring-1 ring-red-500/30',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Input, Textarea };
