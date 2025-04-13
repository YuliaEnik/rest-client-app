'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from '@/components/restful/request-url/schema';
import { Input } from '@/components/ui/input';
import { updateUrl } from '@/utils/request-url';

export function RequestUrl({ url }: { url: string }) {
  const router = useRouter();
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { API_URL: url },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const t = useTranslations('restfulPage');

  const handleBlur = useCallback(() => {
    if (isValid) {
      const newUrl = updateUrl({
        apiUrl: getValues('API_URL'),
      });
      router.replace(newUrl);
    }
  }, [getValues, isValid, router]);

  return (
    <div className={'flex flex-col flex-1 relative'}>
      <Input
        className={'primary-color-component-bg'}
        type={'text'}
        placeholder={'API URL'}
        {...register('API_URL', { onBlur: handleBlur })}
      />
      <span
        className={
          'absolute top-[40px] left-[10px] min-h-[14px] text-[14px] text-(--color-destructive)'
        }
      >
        {errors.API_URL?.message && t(errors.API_URL.message)}
      </span>
    </div>
  );
}
