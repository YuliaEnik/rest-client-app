'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { CodeEditor } from '@/components/restful/code-editor';
import { HttpSnippet } from '@/components/restful/http-snippet/http-snippet';
import { RequestBody } from '@/components/restful/request-body';
import { RequestHeaders } from '@/components/restful/request-headers';
import { RequestUrl } from '@/components/restful/request-url/request-url';
import { SelectMethod } from '@/components/restful/select-method';
import { VariablesList } from '@/components/restful/variables-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LOCAL_STORAGE_KEYS } from '@/constants/constants';
import useLocalStorage from '@/hooks/local_storage';
import { prettify } from '@/lib/utils';
import { History, METHODS, RestfulResponse } from '@/types/types';
import { sendRequest } from '@/utils/request';
import { parseParams, parseUrl } from '@/utils/request-url';

interface Props {
  method: string;
  url: string[];
  headers: Record<string, string | string[] | undefined>;
}

export default function RestfulView({ method, url, headers }: Props) {
  const { apiUrl, requestBody } = parseParams(url);
  const [data, setData] = useState<RestfulResponse>({ data: '', code: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [history, saveToHistory] = useLocalStorage<History[]>(
    LOCAL_STORAGE_KEYS.HISTORY,
    []
  );

  const t = useTranslations('restfulPage');

  const codeColor = useMemo(() => {
    if (!data.code) return '';
    if (Math.floor(data.code / 100) < 3) return 'text-green-500';
    if (Math.floor(data.code / 100) >= 4) return 'text-red-500';
  }, [data.code]);

  const handleClick = useCallback(() => {
    setTimeout(async () => {
      setData({ data: '', code: 0 });
      setIsLoading(true);
      const response = await sendRequest(
        pathname.slice(1),
        searchParams.toString()
      );
      if (response.code < 300) {
        const historyItem: History = {
          executedAt: new Date().getTime(),
          restfulUrl: `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`,
          apiUrl: parseUrl(pathname).apiUrl,
        };
        saveToHistory([...history, historyItem]);
      }
      setData(response);
      setIsLoading(false);
    });
  }, [history, pathname, saveToHistory, searchParams]);

  return (
    <div className={'w-full'}>
      <div
        className={
          'flex flex-1 flex-col gap-[15px] max-w-[1200px] p-[20px] primary-color-bg rounded-lg'
        }
      >
        <div
          className={
            'flex gap-[15px] flex-col items-center sm:flex-row py-[10px]'
          }
        >
          <SelectMethod
            className={'primary-color-component-bg'}
            currentMethod={method.toUpperCase() as METHODS}
          />
          <RequestUrl url={apiUrl} />
          <Button
            disabled={isLoading}
            type={'button'}
            onClick={handleClick}
            variant={'outline'}
            className={'bg-lime-300 mt-[10px] sm:mt-0'}
          >
            {t('send')}
          </Button>
        </div>
        <Separator className={'primary-color-component-bg'} />
        <RequestHeaders headers={headers} />
        <Separator className={'primary-color-component-bg'} />
        <Tabs defaultValue={'snippet'}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="snippet">{t('snippet')}</TabsTrigger>
            <TabsTrigger value="variables">{t('variablesList')}</TabsTrigger>
          </TabsList>
          <TabsContent value="snippet">
            <HttpSnippet />
          </TabsContent>
          <TabsContent value="variables" className={'h-[196px]'}>
            <VariablesList />
          </TabsContent>
        </Tabs>
        <Separator className={'primary-color-component-bg'} />
        <RequestBody body={requestBody} />
        <Separator className={'primary-color-component-bg'} />
        <div className={'flex flex-col gap-[10px]'}>
          <h3>{t('response')}</h3>
          <div className={`flex gap-[5px] min-h-[16px] ${codeColor}`}>
            {!!data.code && (
              <>
                {t('status')} <span>{data.code}</span>
              </>
            )}
          </div>
          <CodeEditor value={prettify(data.data)} readOnly={true} />
        </div>
      </div>
    </div>
  );
}
