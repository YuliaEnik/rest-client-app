import * as yup from 'yup';

export const schema = yup.object({
  API_URL: yup.string().url(),
});
