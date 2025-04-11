import { CodeEditor } from '@/components/restful/code-editor';
import { HttpSnippet } from '@/components/restful/http-snippet/http-snippet';
import { RequestBody } from '@/components/restful/request-body';
import { RequestHeaders } from '@/components/restful/request-headers';
import { RequestUrl } from '@/components/restful/request-url/request-url';
import { SelectMethod } from '@/components/restful/select-method';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { prettify } from '@/lib/utils';
import { METHODS } from '@/types/types';
import { parseParams } from '@/utils/request-url';

interface Props {
  method: string;
  url: string[];
  headers: Record<string, string | string[] | undefined>;
}

export function RestfulView({ method, url, headers }: Props) {
  const { apiUrl, requestBody } = parseParams(url);

  return (
    <div className={'w-full flex justify-center'}>
      <div
        className={
          'flex flex-1 flex-col gap-[15px] max-w-[1200px] p-[20px] primary-color-bg'
        }
      >
        <div className={'flex gap-[5px] flex-col items-center sm:flex-row'}>
          <SelectMethod
            className={'primary-color-component-bg'}
            currentMethod={method.toUpperCase() as METHODS}
          />
          <RequestUrl url={apiUrl} />
          <Button variant={'outline'} className={'bg-lime-300'} type={'button'}>
            Send
          </Button>
        </div>
        <Separator className={'primary-color-component-bg my-4'} />
        <RequestHeaders headers={headers} />
        <Separator className={'primary-color-component-bg my-4'} />
        <HttpSnippet />
        <Separator className={'primary-color-component-bg my-4'} />
        <RequestBody body={requestBody} />
        <Separator className={'primary-color-component-bg my-2'} />
        <div className={'flex flex-col gap-[10px]'}>
          <h3>Response</h3>
          <div className={'flex gap-[5px]'}>
            Status: <span>status code</span>
          </div>
          <CodeEditor value={prettify('{}')} readOnly={true} />
        </div>
      </div>
    </div>
  );
}
