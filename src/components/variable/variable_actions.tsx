import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Variable name is required')
    .min(2, 'Variable name must be at least 2 characters')
    .matches(
      /^(?:[A-Z]+(?:[A-Z]+)*|[A-Z]+_[A-Z]+)$/,
      'Variable name must be uppercase, camelCase, or uppercase with one underscore'
    ),
  value: Yup.string()
    .required('Variable value is required')
    .min(1, 'Variable value must be at least 1 character'),
});

export const addVariables = async (
  variables: { id: string; name: string; value: string }[]
) => {
  try {
    const response = await fetch('/api/variables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to add variables: ${errorMessage}`);
    }

    const responseData = await response.json();
    localStorage.setItem('variables', JSON.stringify(responseData));

    return responseData;
  } catch (error) {
    console.error('Error adding variables:', error);
    throw error;
  }
};

export const handleDelete = async (id: string) => {
  console.log(id);
  const res = await fetch(`http://localhost:3000/api/variables`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });

  const responseData = await res.json();
  localStorage.setItem('variables', JSON.stringify(responseData));

  if (!res.ok) {
    console.error('Failed to delete variable');
  } else {
  }
};

export const handleUpdate = async (id: string, name: string, value: string) => {
  const res = await fetch(`http://localhost:3000/api/variables`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      name: name,
      value: value,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error('Failed to update variable:', error.message);
  } else {
    const responseData = await res.json();
    localStorage.setItem('variables', JSON.stringify(responseData));
  }
};
