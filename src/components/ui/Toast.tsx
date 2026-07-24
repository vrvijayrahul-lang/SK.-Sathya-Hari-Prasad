'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, XCircle, X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'flex items-start gap-3 px-4 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl border text-sm animate-fade-up',
              t.type === 'success' && 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
              t.type === 'error' && 'bg-red-500/10 border-red-500/20 text-red-400',
              t.type === 'info' && 'bg-white/5 border-white/10 text-white/70'
            )}
          >
            {t.type === 'success' && <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />}
            {t.type === 'error' && <XCircle size={16} className="mt-0.5 flex-shrink-0" />}
            <p className="flex-1 text-xs font-medium">{t.message}</p>
            <button onClick={() => remove(t.id)} className="text-white/30 hover:text-white/60 transition-colors">
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  return useContext(ToastContext);
}