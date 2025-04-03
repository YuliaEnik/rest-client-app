'use client';

import { useCallback } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RequestHeadersInterface } from '@/types/types';
import { parseHeaders } from '@/utils/request-headers';

export function RequestHeaders({
  headers,
}: {
  headers: Record<string, string | string[] | undefined>;
}) {
  const { control } = useForm<RequestHeadersInterface>({
    defaultValues: {
      headers: parseHeaders(headers),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  const appendHeader = useCallback(() => {
    append({ isChecked: true, headerKey: '', headerValue: '' });
  }, [append]);

  const removeField = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  return (
    <div className={'flex flex-col gap-[10px]'}>
      <div className={'flex gap-[10px] items-center'}>
        <h3>Headers</h3>
        <Button type={'button'} variant={'outline'} onClick={appendHeader}>
          <PlusIcon /> Add headers
        </Button>
      </div>
      <div
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
                  placeholder={'key'}
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
                  placeholder={'value'}
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
      </div>
    </div>
  );
}
