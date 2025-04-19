'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { RESTFUL_METHODS } from '@/constants/constants';
import { useAuth } from '@/context/auth-context';

import { Loader } from '../shared/loader';

const authRoutes = [
  ...RESTFUL_METHODS.map((route) => `/${route}`),
  '/',
  '/variables',
  '/history',
];

const noAuthRoutes = ['/signin', '/signup'];

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (loading) return;

    const basePath = `/${pathname.split('/')[2] || ''}`;

    const isAuthRoute = authRoutes.includes(basePath);
    const isNoAuthRoute = noAuthRoutes.includes(basePath);

    if (user && isNoAuthRoute) {
      router.replace('/');
      return;
    }

    if (!user && isAuthRoute) {
      router.replace('/');
      return;
    }

    setShouldRender(true);
  }, [user, loading, pathname, router]);

  if (loading || !shouldRender) {
    return <Loader />;
  }

  return <>{children}</>;
}
