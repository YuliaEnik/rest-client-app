'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { SelectElement } from '@/components/shared/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Option } from '@/types/types';

type Language = 'en' | 'ru' | 'be';

export function LanguageSelect() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale() as Language;
  const router = useRouter();
  const pathname = usePathname();
  const [_, startTransition] = useTransition();

  const LanguageOptions: Option[] = [
    { value: 'en', label: t('english') },
    { value: 'ru', label: t('russian') },
    { value: 'be', label: t('belarusian') },
  ];

  const handleLanguageChange = (language: Language) => {
    startTransition(() => {
      router.replace({ pathname }, { locale: language });
    });
  };

  return (
    <SelectElement
      options={LanguageOptions}
      initialValue={locale}
      shortLabel={locale.toUpperCase()}
      handleChangeAction={handleLanguageChange}
      className="w-15 bg-amber-200 text-sm p-2 gap-1"
    />
  );
}
