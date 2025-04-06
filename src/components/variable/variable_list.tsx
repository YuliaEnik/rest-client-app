import { VariableItem } from '@/components';
import { Variable } from '@/types/types';

const fetchVariables = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/variables`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch variables');
  }
  return res.json();
};

const VariableList = async () => {
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

export default VariableList;
