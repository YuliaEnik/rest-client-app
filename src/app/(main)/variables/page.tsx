import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { RefreshOnFocus } from '@/components/variable/refresh';

const VariableList = dynamic(
  () => import('@/components/variable/variable_list'),
  {
    ssr: true,
  }
);
const AddButton = dynamic(
  () => import('@/components/variable/add_var_button'),
  {
    ssr: true,
  }
);

const VariablesPage = async () => {
  let date = new Date();
  return (
    <section className="flex flex-col items-center gap-4  p-4">
      <div className="flex flex-col items-center gap-4 border border-gray-300 rounded-lg primary-color-component-bg p-4 w-full md:w-1/2 lg:w-1/4">
        <h2>Variables</h2>
        <div className="flex flex-col items-center gap-4 w-full">
          <Suspense fallback={<div>Loading Variables...</div>}>
            <AddButton />
            <VariableList />
          </Suspense>
        </div>
      </div>
      <div>
        <p>This page was rendered at {date.toString()}</p>
        <RefreshOnFocus />
      </div>
    </section>
  );
};

export default VariablesPage;
