'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertCircle, PlusIcon, SendHorizontal, SquareX } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { addVariables, validationSchema } from './variable_actions';

interface CreateVariableProps {
  showCreateBlock: (show: boolean) => void;
}

export const CreateVariable: React.FC<CreateVariableProps> = ({
  showCreateBlock,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [nextId, setNextId] = useState(1);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchVariables = async () => {
      const res = await fetch(`${apiUrl}/api/variables`, {
        cache: 'no-store',
      });
      const data = await res.json();
      setNextId(
        data.length > 0 ? Number(data[data.length - 1].id.slice(1)) + 1 : 1
      );
    };
    fetchVariables();
  }, [apiUrl, nextId]);

  const onSubmit = async (data: { name: string; value: string }) => {
    const newVariable = [
      {
        id: `#${nextId}`,
        name: data.name,
        value: data.value,
      },
    ];
    try {
      const data = await addVariables(newVariable);
      console.log('Variable added:', data);
      setValue('name', '');
      setValue('value', '');
      router.refresh();
    } catch (error) {
      console.error('Error adding variable:', error);
    }
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
          className="border border-gray-300 rounded p-2 bg-white"
        />
        <Input
          type="text"
          {...register('value')}
          placeholder="Variable Value"
          className="border border-gray-300 rounded p-2 bg-white"
        />
        <Button
          type="submit"
          className="max-w-[100px] bg-amber-200 hover:bg-primary-light"
          variant="outline"
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
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errors.name && errors.name.message}
          </AlertDescription>
        </Alert>
      )}
      {errors.value && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errors.value && errors.value.message}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default CreateVariable;
