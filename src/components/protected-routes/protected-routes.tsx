'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/auth-context';

import { Loader } from '../shared/loader';

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
    setIsChecking(false);
  }, [user, loading, router]);

  if (loading || isChecking) {
    return <Loader />;
  }
  if (!user) return null;

  return <>{children}</>;
}
