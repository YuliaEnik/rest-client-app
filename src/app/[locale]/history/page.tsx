'use client';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { ProtectedRoutes } from '@/components/protected-routes';
import { LOCAL_STORAGE_KEYS } from '@/constants/constants';
import useLocalStorage from '@/hooks/local_storage';
import { History } from '@/types/types';

const HistoryList = dynamic(() => import('@/components/history/history_list'));

const HistoryPage = () => {
  const [localStorageHistory] = useLocalStorage<History[]>(
    LOCAL_STORAGE_KEYS.HISTORY,
    []
  );
  const [history, setHistory] = useState<History[]>(localStorageHistory);
  const t = useTranslations('historyPage');

  useEffect(() => {
    setHistory(localStorageHistory);
  }, [localStorageHistory]);

  return (
    <ProtectedRoutes>
      <section className="flex flex-col items-center gap-4 p-4">
        <div className="flex flex-col items-center gap-4 border border-gray-300 rounded-lg primary-color-component-bg p-4 w-full md:w-1/2 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-center">{t('title')}</h2>
          <div className="flex flex-col items-center gap-4 w-full">
            <Suspense fallback={<div>{t('loadingPage')}</div>}>
              <HistoryList requests={history} />
            </Suspense>
          </div>
        </div>
      </section>
    </ProtectedRoutes>
  );
};

export default HistoryPage;
