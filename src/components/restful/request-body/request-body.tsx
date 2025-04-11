'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WandSparklesIcon } from 'lucide-react';

import { CodeEditor } from '@/components/restful/code-editor';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { prettify } from '@/lib/utils';
import { updateUrl } from '@/utils/request-url';

export function RequestBody({ body = '' }: { body: string }) {
  const [value, setValue] = useState(body);
  const [mode, setMode] = useState<'json' | 'text'>('json');
  const router = useRouter();

  const handleClick = useCallback(() => {
    setValue(prettify(value));
  }, [value]);

  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const handleBlur = useCallback(() => {
    const newUrl = updateUrl({ requestBody: value || '' });
    router.replace(newUrl);
  }, [router, value]);

  const handleSwitchChange = useCallback((checked: boolean) => {
    setMode(checked ? 'text' : 'json');
  }, []);

  return (
    <div className={'flex flex-col gap-2 min-h-[200px] relative'}>
      <div className={'flex items-center justify-between'}>
        <h3>Body</h3>
        <Button type={'button'} variant={'outline'} onClick={handleClick}>
          <WandSparklesIcon /> Prettify
        </Button>
      </div>
      <div className={'flex gap-[5px] absolute top-[47px] right-[10px] z-2'}>
        <Label htmlFor={'editor-mode'}>JSON</Label>
        <Switch onCheckedChange={handleSwitchChange} id={'editor-mode'} />
        <Label htmlFor={'editor-mode'}>Text</Label>
      </div>
      <CodeEditor
        readOnly={false}
        value={value}
        onChangeAction={handleChange}
        onBlurAction={handleBlur}
        lang={mode}
      />
    </div>
  );
}
