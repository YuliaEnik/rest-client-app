'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { signInWithEmail } from '@/lib/auth';
import { SignInFormData, useValidationSchemas } from '@/lib/validation-auth';

export default function SignInPage() {
  const t = useTranslations('auth');
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { signInSchema } = useValidationSchemas();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signInWithEmail(data);
      router.push('/');
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error.message || t('errors.auth_failed'),
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (user) {
    //router.push('/');
    return null;
  }

  return (
    <div className="flex flex-col h-full gap-5 items-center justify-center p-4">
      <h1 className="text-3xl my-5">{t('signInTitle')}</h1>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
        noValidate
      >
        <div className="h-20">
          <label htmlFor="email" className="block mb-1">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="h-20 relative">
          <label htmlFor="password" className="block mb-1">
            {t('password')}
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            className="absolute right-4 top-10"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full text-xl bg-lime-300 text-black rounded hover:bg-lime-400"
        >
          {t('signIn')}
        </Button>
      </form>

      <div className="flex flex-wrap max-w-md w-full gap-2 italic justify-end text-sm">
        {t('signIn_description_part1')}
        <Link
          href="/signup"
          passHref
          className="text-blue-600 text-underline cursor-pointer hover:text-lime-300"
        >
          {t('signIn_description_part2')}
        </Link>
      </div>
    </div>
  );
}
