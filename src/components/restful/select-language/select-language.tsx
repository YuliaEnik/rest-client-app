'use client';

import { SelectElement } from '@/components/shared/select';
import { LANGUAGES } from '@/constants/constants';

export function SelectLanguage() {
  return (
    <SelectElement
      options={LANGUAGES}
      initialValue={LANGUAGES[0].value}
      handleChangeAction={(value) => console.log(value)}
      className={'w-[200px]'}
    />
  );
}
