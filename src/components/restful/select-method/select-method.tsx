'use client';

import { SelectElement } from '@/components/restful/select';
import { RESTFUL_METHODS } from '@/constants/constants';
import { METHODS, Option } from '@/types/types';

const METHODS_OPTIONS: Option[] = RESTFUL_METHODS.map((method) => ({
  value: method,
  label: method,
}));

export function SelectMethod({
  currentMethod,
  className,
}: {
  currentMethod: METHODS;
  className?: string;
}) {
  return (
    <SelectElement
      className={className}
      options={METHODS_OPTIONS}
      initialValue={currentMethod.toUpperCase()}
      handleChangeAction={(value) => console.log(value)}
    />
  );
}
