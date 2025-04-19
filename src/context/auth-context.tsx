'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';

import { RESTFUL_METHODS } from '@/constants/constants';
import { auth } from '@/lib/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isEmailVerified: boolean;
  authError: string | null;
  setAuthError: (error: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const authRoutes = [
  ...RESTFUL_METHODS.map((route) => `/${route}`),
  '/',
  '/variables',
  '/history',
];

const noAuthRoutes = ['/signin', '/signup'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      if (user && noAuthRoutes.includes(`/${pathname.split('/')[2]}`)) {
        router.push('/');
      }
      if (!user && authRoutes.includes(`/${pathname.split('/')[2]}`)) {
        router.push('/');
      }

      setAuthError(null);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const isEmailVerified = user?.emailVerified || false;

  const value = useMemo(
    () => ({
      user,
      loading,
      isEmailVerified,
      authError,
      setAuthError,
      signOut,
    }),
    [user, loading, isEmailVerified, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
