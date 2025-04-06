'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from 'lucide-react';

import useLocalStorage from '@/hooks/local_storage';
import { Variable } from '@/types/types';

import { Button } from '../ui/button';

import { CreateVariable } from './create_variable';
import { addVariables } from './variable_actions';

const AddButton = () => {
  const [showInputBlock, setShowInputBlock] = useState(false);
  // const [variables, setVariables] = useState<Variable[]>([]);
  const [storageVariables, setStorageVariables] = useLocalStorage<Variable[]>(
    'variables',
    []
  );
  const router = useRouter();
  useEffect(() => {
    const loadVariables = async () => {
      if (storageVariables.length > 0) {
        try {
          await addVariables(storageVariables);
          setStorageVariables([]);
          router.refresh();
        } catch (error) {
          console.error('Failed to add variables:', error);
        }
      }
    };
    loadVariables();
  });
  const toggleInputBlock = () => {
    setShowInputBlock((prev) => !prev);
  };

  return (
    <>
      <Button
        className="w-full"
        type="button"
        variant="outline"
        onClick={toggleInputBlock}
      >
        <PlusIcon />
        New variable
      </Button>
      {showInputBlock && <CreateVariable showCreateBlock={toggleInputBlock} />}
    </>
  );
};

export default AddButton;
