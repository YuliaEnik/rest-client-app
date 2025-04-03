import { PlusIcon } from 'lucide-react';

import { CodeEditor } from '@/components/restful/code-editor';
import { RequestBody } from '@/components/restful/request-body';
import { SelectLanguage } from '@/components/restful/select-language';
import { SelectMethod } from '@/components/restful/select-method';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
      <form
        className={
          'flex flex-1 flex-col gap-[15px] max-w-[1200px] p-[10px] border border-(--color-primary-dark) inset-shadow-[0_0_2px_var(--color-primary-light)]'
        }
      >
        <div className={'flex gap-[5px]'}>
          <SelectMethod currentMethod={method.toUpperCase() as METHODS} />
          <Input type={'url'} placeholder={'API URL'} />
        </div>
        <div className={'flex flex-col gap-[10px]'}>
          <div className={'flex gap-[10px] items-center'}>
            <h3>Headers</h3>
            <Button type={'button'} variant={'outline'}>
              <PlusIcon /> Add headers
            </Button>
          </div>
        </div>
        <div className={'flex flex-col gap-[10px]'}>
          <div className={'flex gap-[5px] items-center'}>
            <h3>Code: </h3>
            <SelectLanguage />
          </div>
          <textarea
            className={'border border-(--color-primary-dark) p-[5px]'}
            defaultValue={'request code'}
          ></textarea>
        </div>
        <RequestBody body={''} />
        <div className={'flex flex-col gap-[10px]'}>
          <h3>Response</h3>
          <div className={'flex gap-[5px]'}>
            Status: <span>status code</span>
          </div>
          <CodeEditor value={prettify('{}')} readOnly={true} />
        </div>
      </form>
    </div>
  );
}
