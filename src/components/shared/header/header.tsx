'use client';
import React from 'react';

import { HeaderLogo } from './headerLogo/header-logo';
import { LanguageSelect } from './selectLang/select-laguage';

export const Header: React.FC = () => {
  const [language, setLanguage] = React.useState<'en' | 'ru' | 'br'>('en');
  return (
    <header className="flex w-full justify-between flex-wrap px-5 py-4 gap-4">
      <HeaderLogo />
      <LanguageSelect
        value={language}
        onChange={setLanguage}
        className="w-20 bg-amber-200"
      />
    </header>
  );
};
