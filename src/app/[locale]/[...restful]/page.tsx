import { redirect } from 'next/navigation';
import { METHODS } from 'node:http';

import { RestfulView } from '@/components/restful/restful-view';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ restful: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [method, ...url] = (await params).restful;
  const headers = await searchParams;

  if (!METHODS.includes(method.toUpperCase())) redirect('/GET');

  return (
    <section
      className={'flex justify-center primary-color-component-bg w-full'}
    >
      <div
        className={
          'flex-1 flex flex-col gap-[15px] items-center p-[15px] max-w-[1200px]'
        }
      >
        <h2 className={'self-start'}>RESTful</h2>
        <RestfulView method={method} url={url} headers={headers} />
      </div>
    </section>
  );
}
