import { Suspense } from 'react';

import { HeaderLogo } from './header-logo';
import { LanguageSelect } from './select-lang';

export function Header({ locale: _locale }: { locale: string }) {
  return (
    <header className="flex flex-0 w-full justify-between flex-wrap px-5 py-3 gap-4 items-center">
      <HeaderLogo />
      <Suspense>
        <LanguageSelect />
      </Suspense>
    </header>
  );
}
