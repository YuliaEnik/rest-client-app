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

  return (
    <section>
      {' '}
      <h2> RESTful </h2>
      <RestfulView method={method} url={url} headers={headers} />
    </section>
  );
}
