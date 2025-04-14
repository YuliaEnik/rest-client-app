'use client';

import { Suspense } from 'react';
import Link from 'next/link';

import { useAuth } from '@/context/auth-context';

import { AuthButtons } from './auth-btn';
import { HeaderLogo } from './header-logo';
import { LanguageSelect } from './select-lang';

export function Header({ locale: _locale }: { locale: string }) {
  const { user, loading } = useAuth();

  return (
    <header className="flex flex-0 w-full justify-between flex-wrap px-5 py-3 gap-4 items-center">
      <HeaderLogo />
      <Link href="/signin" passHref>
        signin
      </Link>
      <Link href="/signup" passHref>
        signup
      </Link>
      <AuthButtons user={user} loading={loading} />
      <Suspense>
        <LanguageSelect />
      </Suspense>
    </header>
  );
}
