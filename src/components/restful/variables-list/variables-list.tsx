'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useVariables } from '@/hooks/use-variables';

export function VariablesList() {
  const { variables } = useVariables();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsLoading(false);
  }, []);

  const t = useTranslations('restfulPage');

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-b border-gray-50"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className={'p-0 pb-[5px]'}>
          <h3>{t('variablesList')}</h3>
        </AccordionTrigger>
        <AccordionContent className={'p-0'}>
          {!isLoading &&
            (variables && !!variables.length ? (
              <ul
                className={
                  'flex flex-col py-[10px] max-h-[100px] overflow-y-scroll box-s inset-shadow-[0_-1px_1px_1px_rgba(249,250,251,0.5)]'
                }
              >
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
