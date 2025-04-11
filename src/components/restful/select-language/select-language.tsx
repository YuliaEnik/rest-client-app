'use client';

import { SelectElement } from '@/components/shared/select';
import { LANGUAGES } from '@/constants/constants';

export function SelectLanguage({
  className,
  setLanguageAction,
}: {
  className?: string;
  setLanguageAction: (value: string) => void;
}) {
  return (
    <SelectElement
      options={LANGUAGES}
      initialValue={LANGUAGES[0].value}
      handleChangeAction={setLanguageAction}
      className={`${className} w-[200px]`}
    />
  );
}
