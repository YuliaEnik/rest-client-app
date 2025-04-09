'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleChangeAction = useCallback(
    (value: string) => {
      const newUrl = updateUrl({ method: value });
      router.replace(newUrl);
    },
    [router]
  );

  return (
    <SelectElement
      className={className}
      options={METHODS_OPTIONS}
      initialValue={currentMethod.toUpperCase()}
      handleChangeAction={handleChangeAction}
    />
  );
}
