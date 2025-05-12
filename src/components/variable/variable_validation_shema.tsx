import * as Yup from 'yup';

import { Variable } from '@/types/types';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('varNamerequired')
    .min(2, 'varNameMin')
    .matches(/^(?:[A-Z]+|[A-Z]+_[A-Z]+|[a-z][a-zA-Z]*)$/, 'varNameMatch')
    .test('not-existing', 'varNameExist', async (value) => {
      if (value) {
        const exists = await checkValueExists(value);
        return !exists;
      }
      return true;
    }),
  value: Yup.string().required('varValuerequired').min(1, 'varValueMin'),
});

const checkValueExists = async (value: string) => {
  const variablesJson = localStorage.getItem('variables');
  if (variablesJson) {
    const variables: Variable[] = JSON.parse(variablesJson);
    const existingValues = variables.map((varItem) => varItem.name);
    return existingValues.includes(value);
  }
  return false;
};
