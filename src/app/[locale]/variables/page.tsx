'use client';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { LOCAL_STORAGE_KEYS } from '@/constants/constants';
import useLocalStorage from '@/hooks/local_storage';
import { Variable } from '@/types/types';

const VariableList = dynamic(
  () => import('@/components/variable/variable_list')
);
const AddButton = dynamic(() => import('@/components/variable/add_var_button'));

const VariablesPage = () => {
  const [localStorageVariables] = useLocalStorage<Variable[]>(
    LOCAL_STORAGE_KEYS.VARIABLES,
    []
  );
  const [variables, setVariables] = useState<Variable[]>(localStorageVariables);
  const t = useTranslations('variablesPage');

  useEffect(() => {
    setVariables(localStorageVariables);
  }, [localStorageVariables]);

  return (
    <section className="flex flex-col items-center gap-4 p-4">
      <div className="flex flex-col items-center gap-4 border border-gray-300 rounded-lg primary-color-component-bg p-4 w-full md:w-1/2 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-center">{t('title')}</h2>
        <div className="flex flex-col items-center gap-4 w-full">
          <Suspense fallback={<div>{t('loadingPage')}</div>}>
            <AddButton setVariables={setVariables} />
            <VariableList variables={variables} setVariables={setVariables} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default VariablesPage;
