'use client';

import { Option, SelectElement } from '@/components/restful/select/select';

const LANGUAGES: Option[] = [
  { value: 'fetch', label: 'JavaScript (Fetch API)' },
  { value: 'xhr', label: 'JavaScript (XHR)' },
  { value: 'curl', label: 'curl' },
  { value: 'nodejs', label: 'NodeJS' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c#', label: 'C#' },
  { value: 'go', label: 'Go' },
];

export function SelectLanguage() {
  return (
    <SelectElement
      options={LANGUAGES}
      initialOption={LANGUAGES[0]}
      handleChangeAction={(value) => console.log(value)}
      className={'w-[200px]'}
    />
  );
}
