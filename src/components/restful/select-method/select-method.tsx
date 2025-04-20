'use client';

import { useCallback } from 'react';

import { SelectElement } from '@/components/shared/select';
import { RESTFUL_METHODS } from '@/constants/constants';
import { METHODS, Option } from '@/types/types';
import { updateUrl } from '@/utils/request-url';

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
  const handleChangeAction = useCallback((value: string) => {
    const newUrl = updateUrl({ method: value });
    window.history.replaceState(null, '', newUrl);
  }, []);

  return (
    <SelectElement
      className={className}
      options={METHODS_OPTIONS}
      initialValue={currentMethod.toUpperCase()}
      handleChangeAction={handleChangeAction}
    />
  );
}
