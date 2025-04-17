'use client';

import Link from 'next/link';
import { User } from 'firebase/auth';

type UserGreetingProps = {
  user: User;
  t: (key: string) => string;
};

export const UserGreeting = ({ user, t }: UserGreetingProps) => {
  return (
    <>
      <p className="w-full text-center text-3xl">
        {t('welcome')}
        <span className="text-amber-600 font-medium">{user.displayName}</span>!
      </p>
      <div className="w-full flex justify-around gap-4">
        <Link
          href="/restful"
          className="h-10 w-30 flex justify-center items-center bg-primary-light border rounded-lg shadow-xs hover:bg-lime-200 transition-colors"
        >
          {t('links.restclient')}
        </Link>
        <Link
          href="/history"
          className="h-10 w-30 flex bg-primary-light justify-center items-center rounded-lg border shadow-xs hover:bg-lime-200 transition-colors"
        >
          {t('links.history')}
        </Link>
        <Link
          href="/variables"
          className="h-10 w-30 flex bg-primary-light justify-center items-center rounded-lg border shadow-xs hover:bg-lime-200 transition-colors"
        >
          {t('links.variables')}
        </Link>
      </div>
    </>
  );
};
