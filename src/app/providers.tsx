'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CMSProvider } from '@/context/CMSContext';
import { ToastProvider } from '@/components/ui/Toast';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <CMSProvider>{children}</CMSProvider>
      </ToastProvider>
    </AuthProvider>
  );
}