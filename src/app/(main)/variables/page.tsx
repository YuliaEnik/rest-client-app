'use client';
import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Variable {
  name: string;
  value: string;
}

export default function VariablesPage() {
  const [showInputBlock, setShowInputBlock] = useState(false);
  const [variableName, setVariableName] = useState('');
  const [variableValue, setVariableValue] = useState('');
  const [variables, setVariables] = useState<Variable[]>([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddVariableClick = () => {
    setShowInputBlock(true);
    setError('');
    resetInputFields();
  };

  const resetInputFields = () => {
    setVariableName('');
    setVariableValue('');
    setEditingIndex(null);
  };

  const handleAdd = () => {
    if (!variableName || !variableValue) {
      setError('Both fields are required.');
      return;
    }

    if (editingIndex !== null) {
      setVariables((prev) => {
        const updatedVariables = [...prev];
        updatedVariables[editingIndex] = {
          name: variableName,
          value: variableValue,
        };
        return updatedVariables;
      });
    } else {
      setVariables((prev) => [
        ...prev,
        { name: variableName, value: variableValue },
      ]);
    }

    resetInputFields();
    setShowInputBlock(false);
  };

  const handleEdit = (index: number) => {
    const variableToEdit = variables[index];
    setVariableName(variableToEdit.name);
    setVariableValue(variableToEdit.value);
    setEditingIndex(index);
  };

  const handleSave = () => {
    handleAdd();
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    setVariables((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="flex flex-col items-center">
      <h2>Variables</h2>
      <div className="flex flex-col gap-4">
        <Button
          className="max-w-[150px]"
          type="button"
          variant="outline"
          onClick={handleAddVariableClick}
        >
          <PlusIcon /> Add variable
        </Button>

        {showInputBlock && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                placeholder="Name"
                value={variableName}
                onChange={(e) => setVariableName(e.target.value)}
              />
              <Input
                placeholder="Value"
                value={variableValue}
                onChange={(e) => setVariableValue(e.target.value)}
              />
              <Button
                className="max-w-[100px] self-end"
                type="button"
                variant="outline"
                onClick={handleAdd}
              >
                {editingIndex !== null ? 'Update' : 'Add'}
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}
        {variables.length > 0 && (
          <div className="mt-4">
            <h3>Added Variables:</h3>
            {variables.map((variable, index) => (
              <div key={index} className="flex items-center gap-4">
                {editingIndex === index ? (
                  <div className="grid grid-cols-2 w-full">
                    <div className="grid grid-cols-2">
                      <Input
                        value={variableName}
                        onChange={(e) => setVariableName(e.target.value)}
                      />
                      <Input
                        value={variableValue}
                        onChange={(e) => setVariableValue(e.target.value)}
                      />
                    </div>
                    <Button
                      className="ml-2"
                      type="button"
                      variant="outline"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 w-full">
                    <div className="grid grid-cols-2">
                      <p> {variable.name}:</p>
                      <p> {variable.value}</p>{' '}
                    </div>
                    <Button
                      className="ml-2"
                      type="button"
                      variant="outline"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="ml-2"
                      type="button"
                      variant="outline"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
