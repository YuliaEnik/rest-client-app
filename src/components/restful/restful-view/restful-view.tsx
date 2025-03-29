import { PlusIcon, WandSparklesIcon } from 'lucide-react';

import { SelectLanguage } from '@/components/restful/select-language';
import { SelectMethod } from '@/components/restful/select-method';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
          'flex flex-1 flex-col gap-5 max-w-300 p-4 border border-(--color-primary-dark) inset-shadow-[0_0_2px_var(--color-primary-light)]'
        }
      >
        <div className={'flex gap-2'}>
          <SelectMethod currentMethod={method as METHODS} />
          <Input type={'url'} placeholder={'API URL'} />
        </div>
        <div className={'flex flex-col gap-10'}>
          <div className={'flex gap-2 items-center'}>
            <h3>Headers</h3>
            <Button type={'button'} variant={'outline'}>
              <PlusIcon /> Add headers
            </Button>
          </div>
        </div>
        <div className={'flex flex-col gap-2'}>
          <div className={'flex gap-2 items-center'}>
            <h3>Code: </h3>
            <SelectLanguage />
          </div>
          <textarea
            className={'border border-(--color-primary-dark) p-2'}
            defaultValue={'request code'}
          ></textarea>
        </div>
        <div className={'flex flex-col gap-2'}>
          <div className={'flex items-center justify-between'}>
            <h3>Body:</h3>
            <Button type={'button'} variant={'outline'}>
              <WandSparklesIcon /> Prettify
            </Button>
          </div>
          <textarea
            className={'border border-(--color-primary-dark)'}
            defaultValue={'here will be code editor'}
          ></textarea>
        </div>
        <div className={'flex flex-col gap-2'}>
          <h3>Response</h3>
          <div className={'flex'}>
            Status: <span>status code</span>
          </div>
          <textarea
            className={'border border-(--color-primary-dark)'}
            defaultValue={'here will be response'}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
