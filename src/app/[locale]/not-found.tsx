import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-8">{t('description')}</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-lime-300  rounded-lg hover:bg-lime-500"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
