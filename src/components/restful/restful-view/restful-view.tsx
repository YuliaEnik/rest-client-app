import { CodeEditor } from '@/components/restful/code-editor';
import { RequestBody } from '@/components/restful/request-body';
import { RequestHeaders } from '@/components/restful/request-headers';
import { SelectLanguage } from '@/components/restful/select-language';
import { SelectMethod } from '@/components/restful/select-method';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { prettify } from '@/lib/utils';
import { METHODS } from '@/types/types';

interface Props {
  method: string;
  url: string[];
  headers: Record<string, string | string[] | undefined>;
}

export function RestfulView({ method, url, headers }: Props) {
  console.log(method, url, headers);
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
            currentMethod={method as METHODS}
          />
          <Input
            className={'primary-color-component-bg'}
            type={'url'}
            placeholder={'API URL'}
          />
          <Button variant={'outline'} className={'bg-lime-300'} type={'button'}>
            Send
          </Button>
        </div>
        <Separator className={'primary-color-component-bg my-4'} />
        <RequestHeaders headers={headers} />
        <Separator className={'primary-color-component-bg my-4'} />
        <div className={'flex flex-col gap-[10px]'}>
          <div className={'flex gap-[5px] items-center'}>
            <h3>Code </h3>
            <SelectLanguage className={'primary-color-component-bg'} />
          </div>
          <textarea
            className={'border border-(--color-primary-dark) p-[5px]'}
            defaultValue={'request code'}
          ></textarea>
        </div>
        <Separator className={'primary-color-component-bg my-4'} />
        <RequestBody body={''} />
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
