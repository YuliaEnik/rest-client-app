'use client';
import { useEffect, useState } from 'react';
import { Edit2, PlusIcon, Save, SquareX, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Variable {
  id: string;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const storedVariables = localStorage.getItem('variables');
    if (storedVariables) {
      const parsedVariables: Variable[] = JSON.parse(storedVariables);
      setVariables(parsedVariables);
      if (parsedVariables.length > 0) {
        const lastId = parsedVariables[parsedVariables.length - 1].id;
        const lastIdNumber = Number(lastId.slice(1));
        setNextId(lastIdNumber + 1);
      } else {
        setNextId(1);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('variables', JSON.stringify(variables));
  }, [variables]);

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

    const newVariable: Variable = {
      id: editingIndex === null ? `#${nextId}` : `${editingId}`,
      name: variableName,
      value: variableValue,
    };

    if (editingIndex !== null) {
      setVariables((prev) => {
        const updatedVariables = [...prev];
        updatedVariables[editingIndex] = newVariable;
        return updatedVariables;
      });
    } else {
      setVariables((prev) => [...prev, newVariable]);
      if (editingIndex === null) {
        setNextId((prevId) => prevId + 1);
      }
    }

    resetInputFields();
    setShowInputBlock(false);
  };

  const handleEdit = (index: number) => {
    const variableToEdit = variables[index];
    setVariableName(variableToEdit.name);
    setVariableValue(variableToEdit.value);
    setEditingId(variableToEdit.id);
    setEditingIndex(index);
  };

  const handleSave = () => {
    handleAdd();
    setEditingIndex(null);
    setEditingId(null);
  };

  const handleDelete = (index: number) => {
    setVariables((prev) => prev.filter((_, i) => i !== index));
    if (variables.length === 0) {
      setNextId(1);
    }
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
          <PlusIcon />
          New variable
        </Button>
        {showInputBlock && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
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
                className="max-w-[100px]"
                type="button"
                variant="outline"
                onClick={handleAdd}
              >
                <PlusIcon />
              </Button>
              <Button className="max-w-[100px]" type="button" variant="outline">
                <SquareX />
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}
        {variables.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3>Saved Variables:</h3>
            {variables.map((variable, index) => (
              <div key={index} className="flex flex-col gap-4">
                {editingIndex === index ? (
                  <div className="flex gap-2 w-full">
                    <p>{variable.id}</p>
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
                      className="max-w-[100px]"
                      type="button"
                      variant="outline"
                      onClick={handleSave}
                    >
                      <Save />
                    </Button>
                    <Button
                      className="max-w-[100px]"
                      type="button"
                      variant="outline"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2 w-full">
                    <p>{variable.id}</p>
                    <Input value={variable.name} disabled />
                    <Input value={variable.value} disabled />
                    <Button
                      className="max-w-[100px]"
                      type="button"
                      variant="outline"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit2 />
                    </Button>
                    <Button
                      className="max-w-[100px]"
                      type="button"
                      variant="outline"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 />
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
