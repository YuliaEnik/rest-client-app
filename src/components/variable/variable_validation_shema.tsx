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
