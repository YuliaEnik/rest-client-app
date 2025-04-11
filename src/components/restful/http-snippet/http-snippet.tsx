'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import codegen from 'postman-code-generators';
import sdk from 'postman-collection';

import { CodeEditor } from '@/components/restful/code-editor';
import { SelectLanguage } from '@/components/restful/select-language';
import { CODEMIRROR_LANGUAGES, LANGUAGES } from '@/constants/constants';
import { generateHeadersForSnippet } from '@/utils/request-headers';
import { parseUrl } from '@/utils/request-url';

const SNIPPET_MESSAGE =
  'Please provide at least api url to generate request snippet';

export function HttpSnippet() {
  const [value, setValue] = useState<string>(LANGUAGES[0].value);
  const [snippet, setSnippet] = useState(SNIPPET_MESSAGE);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const { method, apiUrl, requestBody } = parseUrl(pathname);
    if (!apiUrl) {
      setSnippet(SNIPPET_MESSAGE);
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
  }, [pathname, searchParams, value]);

  return (
    <div className={'flex flex-col gap-[10px]'}>
      <div className={'flex gap-[5px] items-center'}>
        <h3>Code </h3>
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
  );
}
