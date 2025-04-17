'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useVariables } from '@/hooks/use-variables';

export function VariablesList() {
  const { variables } = useVariables();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsLoading(false);
  }, []);

  const t = useTranslations('restfulPage');

  return (
    <>
      {!isLoading &&
        (variables && !!variables.length ? (
          <ul className={'flex flex-col py-[10px] h-[196px] overflow-y-scroll'}>
            {variables.map((variable) => (
              <li
                className={
                  'grid grid-cols-2 gap-[10px] border-b border-gray-50'
                }
                key={variable.id}
              >
                <span className={'p-[10px] border-r border-gray-50'}>
                  {variable.name}
                </span>
                <span className={'p-[10px]'}>{variable.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className={'flex gap-[15px]'}>
            <span>{t('noVariables')}</span>
            <Link className={'no-underline'} href={'/variables'}>
              {t('createVariables')}
            </Link>
          </div>
        ))}
    </>
  );
}
