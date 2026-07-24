'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Don't wrap login page in the admin shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050505]">
        <AdminSidebar />
        <AdminHeader />
        <div className="pl-64 pt-16">
          <div className="p-6 md:p-8 max-w-7xl">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}