'use client';

import * as React from 'react';

import { SelectElement } from '@/components/shared/select';
import { Option } from '@/types/types';

type Language = 'en' | 'ru' | 'be';

const LanguageOptions: Option[] = [
  { value: 'en', label: 'English (EN)' },
  { value: 'ru', label: 'Русский (RU)' },
  { value: 'be', label: 'Беларуски (BE)' },
];

interface LanguageSelectProps {
  value?: Language;
  onChangeAction: (language: Language) => void;
  className?: string;
}

export function LanguageSelect({
  value = 'en',
  onChangeAction,
  className,
}: LanguageSelectProps) {
  return (
    <SelectElement
      options={LanguageOptions}
      initialValue={value}
      shortLabel={value?.toUpperCase()}
      handleChangeAction={onChangeAction}
      className={className}
    />
  );
}

LanguageSelect.displayName = 'LanguageSelect';
