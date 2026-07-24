'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CMSProvider } from '@/context/CMSContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CMSProvider>{children}</CMSProvider>
    </AuthProvider>
  );
}