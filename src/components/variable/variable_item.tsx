'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertCircle, Edit2, Save, SendHorizontal, Trash2 } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  handleDelete,
  handleUpdate,
  validationSchema,
} from './variable_actions';

interface VariableItemProps {
  variable: { id: string; name: string; value: string };
  key: string;
}

export const VariableItem: React.FC<VariableItemProps> = ({
  variable,
  key,
}) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const toggleEdit = () => {
    setIsEditing(true);
  };

  const deleteVar = () => {
    handleDelete(variable.id);
    router.refresh();
  };

  const onSubmit = (data: any) => {
    handleUpdate(variable.id, data.name, data.value);
    router.refresh();
    setIsEditing(false);
    setValue('name', '');
    setValue('value', '');
  };

  return (
    <div key={key} className="flex items-center gap-2 w-full">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <SendHorizontal />
            <Input
              placeholder="Name"
              {...register('name')}
              defaultValue={variable.name}
              className="bg-white"
            />
            <Input
              placeholder="Value"
              {...register('value')}
              defaultValue={variable.value}
              className="bg-white"
            />
            <Button
              className="max-w-[100px] bg-amber-200 hover:bg-primary-light"
              type="submit"
              variant="outline"
            >
              <Save />
            </Button>
            <Button
              className="max-w-[100px] bg-secondary-rose hover:bg-red-400"
              type="button"
              variant="outline"
              onClick={deleteVar}
            >
              <Trash2 />
            </Button>
          </div>
          <div className="flex flex-col gap-1">
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
          </div>
        </form>
      ) : (
        <>
          <SendHorizontal />
          <Input value={variable.name} disabled className="bg-white" />
          <Input value={variable.value} disabled className="bg-white" />
          <Button
            className="max-w-[100px] bg-amber-200 hover:bg-primary-light"
            type="button"
            variant="outline"
            onClick={toggleEdit}
          >
            <Edit2 />
          </Button>
          <Button
            className="max-w-[100px] bg-secondary-rose hover:bg-red-400"
            type="button"
            variant="outline"
            onClick={deleteVar}
          >
            <Trash2 />
          </Button>
        </>
      )}
    </div>
  );
};
