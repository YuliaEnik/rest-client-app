'use client';

import { useCallback } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PlusIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useVariables } from '@/hooks/use-variables';
import { RequestHeadersInterface } from '@/types/types';
import { generateHeaders, parseHeaders } from '@/utils/request-headers';

export function RequestHeaders({
  headers,
}: {
  headers: Record<string, string | string[] | undefined>;
}) {
  const pathname = usePathname();
  const { control, getValues } = useForm<RequestHeadersInterface>({
    defaultValues: {
      headers: parseHeaders(headers),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });
  const { insertVariables } = useVariables();

  const t = useTranslations('restfulPage');

  const appendHeader = useCallback(() => {
    append({ isChecked: true, headerKey: '', headerValue: '' });
  }, [append]);

  const updateHeaders = useCallback(() => {
    const headersWithVariables = getValues()
      .headers.map((header) => ({
        ...header,
        headerValue: insertVariables(header.headerValue),
      }))
      .filter((header) => header.headerValue.isAllInserted)
      .map((header) => ({ ...header, headerValue: header.headerValue.target }));
    const searchParams = generateHeaders(headersWithVariables);
    window.history.replaceState(
      null,
      '',
      `${pathname}?${searchParams.toString()}`
    );
  }, [getValues, insertVariables, pathname]);

  const removeField = useCallback(
    (index: number) => {
      remove(index);
      updateHeaders();
    },
    [remove, updateHeaders]
  );

  return (
    <div className={'flex flex-col gap-[10px]'}>
      <div className={'flex gap-[10px] items-center'}>
        <h3>{t('headers')}</h3>
        <Button type={'button'} variant={'outline'} onClick={appendHeader}>
          <PlusIcon /> {t('addHeader')}
        </Button>
      </div>
      <form
        onBlur={updateHeaders}
        className={
          'flex flex-col gap-[10px] max-h-[160px] overflow-y-scroll p-[5px]'
        }
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={
              'flex gap-[10px] items-center pb-[10px] not-last:border-b'
            }
          >
            <Controller
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  className={
                    'primary-color-component-bg data-[state=checked]:text-black'
                  }
                  defaultChecked={value}
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
              control={control}
              name={`headers.${index}.isChecked`}
            />
            <Controller
              render={({ field }) => (
                <Input
                  className={'primary-color-component-bg'}
                  placeholder={t('placeholderKey')}
                  {...field}
                />
              )}
              control={control}
              name={`headers.${index}.headerKey`}
            />
            <Controller
              render={({ field }) => (
                <Input
                  className={'primary-color-component-bg'}
                  placeholder={t('placeholderValue')}
                  {...field}
                />
              )}
              control={control}
              name={`headers.${index}.headerValue`}
            />
            <Button
              type={'button'}
              variant={'outline'}
              onClick={() => removeField(index)}
            >
              <TrashIcon />
            </Button>
          </div>
        ))}
      </form>
    </div>
  );
}
