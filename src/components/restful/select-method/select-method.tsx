'use client';

import { Option, SelectElement } from '@/components/restful/select/select';

const RESTFUL_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
] as const;

const METHODS_OPTIONS: Option[] = RESTFUL_METHODS.map((method) => ({
  value: method,
  label: method,
}));

export type METHODS = (typeof RESTFUL_METHODS)[number];

export function SelectMethod({ currentMethod }: { currentMethod: METHODS }) {
  return (
    <SelectElement
      options={METHODS_OPTIONS}
      initialValue={currentMethod}
      handleChangeAction={(value) => console.log(value)}
    />
  );
}
