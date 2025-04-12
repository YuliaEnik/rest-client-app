'use client';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import useLocalStorage from '@/hooks/local_storage';
import { Variable } from '@/types/types';

const VariableList = dynamic(
  () => import('@/components/variable/variable_list')
);
const AddButton = dynamic(() => import('@/components/variable/add_var_button'));

const VariablesPage = () => {
  const [localStorageVariables] = useLocalStorage<Variable[]>('variables', []);
  const [variables, setVariables] = useState<Variable[]>(localStorageVariables);

  useEffect(() => {
    setVariables(localStorageVariables);
  }, [localStorageVariables]);

  return (
    <section className="flex flex-col items-center gap-4 p-4">
      <div className="flex flex-col items-center gap-4 border border-gray-300 rounded-lg primary-color-component-bg p-4 w-full md:w-1/2 lg:w-1/4">
        <h2 className="text-2xl font-semibold text-center">Variables</h2>
        <div className="flex flex-col items-center gap-4 w-full">
          <Suspense fallback={<div>Loading Variables...</div>}>
            <AddButton setVariables={setVariables} />
            <VariableList variables={variables} setVariables={setVariables} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default VariablesPage;
