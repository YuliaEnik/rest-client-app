import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export const useValidationSchemas = () => {
  const t = useTranslations('auth.errors');

  return {
    signUpSchema: yup.object({
      displayName: yup.string().required(t('displayName_required')),
      email: yup
        .string()
        .email(t('email_invalid'))
        .required(t('email_required')),
      password: yup
        .string()
        .required(t('password_required'))
        .min(8, t('password_min'))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&<>])[A-Za-z\d@#$!%*?&]/,
          t('password')
        ),
    }),

    signInSchema: yup.object({
      email: yup
        .string()
        .email(t('email_invalid'))
        .required(t('email_required')),
      password: yup.string().required(t('password_required')),
    }),
  };
};

export type SignUpFormData = yup.InferType<
  ReturnType<typeof useValidationSchemas>['signUpSchema']
>;
export type SignInFormData = yup.InferType<
  ReturnType<typeof useValidationSchemas>['signInSchema']
>;
