'use client';
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (variables) setIsLoading(false);
  }, [variables]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (variables.length === 0) {
    return <div>No variables saved.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-center">Saved Variables:</h3>
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
