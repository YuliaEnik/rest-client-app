'use client';
import React from 'react';

import { useStickyHeader } from '@/app/hooks/sticky-header';

import { HeaderLogo } from './headerLogo/header-logo';
import { LanguageSelect } from './selectLang/select-laguage';

export const Header: React.FC = () => {
  const sticky = useStickyHeader(1);
  const [language, setLanguage] = React.useState<'en' | 'ru' | 'br'>('en');
  return (
    <header
      className={`flex w-full justify-between flex-wrap px-5 py-3 gap-4 items-center ${sticky ? 'bg-white sticky top-0 z-50 shadow-md' : 'primary-color-component-bg'}`}
    >
      <HeaderLogo />
      <LanguageSelect
        value={language}
        onChange={setLanguage}
        className="w-18 bg-amber-200 text-sm p-2 gap-1"
      />
    </header>
  );
};
