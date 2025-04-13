'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { VariableItem } from '@/components';
import { Variable } from '@/types/types';

interface VariableListProps {
  variables: Variable[];
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
}

const VariableList: React.FC<VariableListProps> = ({
  variables = [],
  setVariables,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('variablesPage');

  useEffect(() => {
    if (variables) setIsLoading(false);
  }, [variables]);

  if (isLoading) {
    return <div>{t('loadSavedVars')}</div>;
  }

  if (variables.length === 0) {
    return <div>{t('emptySavedVars')}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-center">{t('varList')}</h3>
      {variables.map((variable) => (
        <VariableItem
          key={variable.id}
          variable={variable}
          variables={variables}
          setVariables={setVariables}
        />
      ))}
    </div>
  );
};

export default VariableList;
