'use client';

import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';
import { UserRole } from '@/lib/slices/auth-slice';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    router.push('/restaurants');
    return null;
  }

  return <>{children}</>;
}
