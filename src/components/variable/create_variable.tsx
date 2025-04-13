'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertCircle, PlusIcon, SendHorizontal, SquareX } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LOCAL_STORAGE_KEYS } from '@/constants/constants';
import useLocalStorage from '@/hooks/local_storage';
import { CreateVariableProps, Variable } from '@/types/types';

import { validationSchema } from './variable_validation_shema';

export const CreateVariable: React.FC<CreateVariableProps> = ({
  showCreateBlock,
  setVariables,
}) => {
  const [localStorageVariables, setLocalStorageValue] = useLocalStorage<
    Variable[]
  >(LOCAL_STORAGE_KEYS.VARIABLES, []);
  const [nextId, setNextId] = useState(1);
  const t = useTranslations('variablesPage');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (localStorageVariables.length > 0) {
      const lastId = Number(
        localStorageVariables[localStorageVariables.length - 1].id.slice(1)
      );
      setNextId(lastId + 1);
    }
  }, [localStorageVariables]);

  const onSubmit = async (data: { name: string; value: string }) => {
    const newVariable: Variable = {
      id: `#${nextId}`,
      name: data.name,
      value: data.value,
    };

    const updatedVariables: Variable[] = [
      ...localStorageVariables,
      newVariable,
    ];
    setLocalStorageValue(updatedVariables);
    setVariables(updatedVariables);
    handleClose();
  };

  const resetInputFields = () => {
    setValue('name', '');
    setValue('value', '');
  };

  const handleClose = () => {
    resetInputFields();
    showCreateBlock(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex items-center gap-2 w-full">
        <SendHorizontal />
        <Input
          type="text"
          {...register('name')}
          placeholder="Variable Name"
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
          className="border border-gray-300 rounded p-2 bg-white"
        />
        <Input
          type="text"
          {...register('value')}
          placeholder="Variable Value"
          aria-invalid={!!errors.value}
          aria-describedby="value-error"
          className="border border-gray-300 rounded p-2 bg-white"
        />
        <Button
          type="submit"
          className="max-w-[100px] bg-amber-200 hover:bg-primary-light"
          variant="outline"
          disabled={isSubmitting}
        >
          <PlusIcon />
        </Button>
        <Button
          className="max-w-[100px] bg-secondary-rose hover:bg-red-400"
          type="button"
          variant="outline"
          onClick={handleClose}
        >
          <SquareX />
        </Button>
      </div>
      {errors.name && (
        <Alert variant="destructive" id="name-error">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t('error')}</AlertTitle>
          <AlertDescription>
            {errors.name.message && t(errors.name.message)}
          </AlertDescription>
        </Alert>
      )}
      {errors.value && (
        <Alert variant="destructive" id="value-error">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t('error')}</AlertTitle>
          <AlertDescription>
            {errors.value.message && t(errors.value.message)}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default CreateVariable;
