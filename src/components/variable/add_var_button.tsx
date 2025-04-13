'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PlusIcon } from 'lucide-react';

import { AddButtonProps } from '@/types/types';

import { Button } from '../ui/button';

import { CreateVariable } from './create_variable';

const AddButton: React.FC<AddButtonProps> = ({ setVariables }) => {
  const [showInputBlock, setShowInputBlock] = useState(false);
  const t = useTranslations('variablesPage');

  const toggleInputBlock = () => {
    setShowInputBlock((prev) => !prev);
  };

  return (
    <>
      <Button
        className="w-full bg-amber-200 hover:bg-primary-light transition-colors"
        type="button"
        variant="outline"
        onClick={toggleInputBlock}
        aria-expanded={showInputBlock}
        aria-controls="variable-input-block"
      >
        <PlusIcon />
        {t('addButton')}
      </Button>
      {showInputBlock && (
        <div id="variable-input-block" className="mt-2">
          <CreateVariable
            showCreateBlock={toggleInputBlock}
            setVariables={setVariables}
          />
        </div>
      )}
    </>
  );
};

export default AddButton;
