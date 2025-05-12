import * as yup from 'yup';

export const schema = yup.object({
  API_URL: yup.mixed().test('testUrl', 'urlError', (value) => {
    if (value) {
      try {
        const url = new URL(value as string);
        return !!url;
      } catch {
        return false;
      }
    }
  }),
});
