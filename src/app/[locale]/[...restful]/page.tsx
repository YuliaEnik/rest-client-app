import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { ProtectedRoutes } from '@/components/protected-routes';
import { Loader } from '@/components/shared/loader';
import { RESTFUL_METHODS } from '@/constants/constants';

const RestfulView = dynamic(
  () => import('@/components/restful/restful-view/restful-view')
);

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ restful: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [method, ...url] = (await params).restful;
  const headers = await searchParams;

  if (
    !(RESTFUL_METHODS as ReadonlyArray<string>).includes(method.toUpperCase())
  ) {
    notFound();
  }

  return (
    <ProtectedRoutes>
      <section
        className={'flex justify-center primary-color-component-bg w-full'}
      >
        <div
          className={
            'flex-1 flex flex-col gap-[15px] items-center p-[15px] max-w-[1200px]'
          }
        >
          <h2 className={'self-start'}>RESTful</h2>
          <Suspense fallback={<Loader />}>
            <RestfulView method={method} url={url} headers={headers} />
          </Suspense>
        </div>
      </section>
    </ProtectedRoutes>
  );
}
