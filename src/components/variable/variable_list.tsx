import { VariableItem } from '@/components';
import { Variable } from '@/types/types';

const fetchVariables = async () => {
  const res = await fetch('http://localhost:3000/api/variables', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch variables');
  }
  return res.json();
};

export const VariableList = async () => {
  const variables: Variable[] = await fetchVariables();
  return (
    <>
      {variables.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3>Saved Variables:</h3>
          {variables.map((variable) => (
            <VariableItem key={variable.id} variable={variable} />
          ))}
        </div>
      )}
    </>
  );
};
