'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
      <div
        className={cn(
          'doppelrand-outer relative w-full max-w-lg max-h-[85vh] overflow-y-auto animate-fade-up',
          className
        )}
      >
        <div className="doppelrand-inner p-6">
          {title && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
