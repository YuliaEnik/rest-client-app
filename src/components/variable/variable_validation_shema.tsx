import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('varNamerequired')
    .min(2, 'varNameMin')
    .matches(/^(?:[A-Z]+(?:[A-Z]+)*|[A-Z]+_[A-Z]+)$/, 'varNameMatch'),
  value: Yup.string().required('varValuerequired').min(1, 'varValueMin'),
});
