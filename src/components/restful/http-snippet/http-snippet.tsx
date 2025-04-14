'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import codegen from 'postman-code-generators';
import sdk from 'postman-collection';

import { CodeEditor } from '@/components/restful/code-editor';
import { SelectLanguage } from '@/components/restful/select-language';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CODEMIRROR_LANGUAGES, LANGUAGES } from '@/constants/constants';
import { generateHeadersForSnippet } from '@/utils/request-headers';
import { parseUrl } from '@/utils/request-url';

export function HttpSnippet() {
  const t = useTranslations('restfulPage');
  const [value, setValue] = useState<string>(LANGUAGES[0].value);
  const [snippet, setSnippet] = useState(t('snippetMessage'));
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const { method, apiUrl, requestBody } = parseUrl(pathname);
    if (!apiUrl) {
      setSnippet(t('snippetMessage'));
      return;
    }
    const [language, variant] = value.split('/');
    const headers = generateHeadersForSnippet(searchParams).map(
      (header) => new sdk.Header(header)
    );
    const body = new sdk.RequestBody({ mode: 'raw', raw: requestBody });
    const request = new sdk.Request({
      body,
      header: headers,
      method,
      url: apiUrl,
    });
    const options = {};
    codegen.convert(
      language,
      variant,
      request,
      options,
      function (error: string, snippet: string) {
        if (error) setSnippet(error);
        setSnippet(snippet);
      }
    );
  }, [pathname, searchParams, t, value]);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-b border-gray-50"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className={'p-0 pb-[5px]'}>
          {t('snippet')}
        </AccordionTrigger>
        <AccordionContent>
          <div className={'flex flex-col gap-[10px] pt-[10px]'}>
            <div className={'flex gap-[5px] items-center'}>
              <SelectLanguage
                setLanguageAction={setValue}
                className={'primary-color-component-bg'}
              />
            </div>
            <CodeEditor
              value={snippet}
              lang={CODEMIRROR_LANGUAGES[value]}
              readOnly={true}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
