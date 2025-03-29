'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectProps {
  options: Option[];
  initialValue: string;
  className?: string;
  handleChangeAction: (value: string) => void;
}

export interface Option {
  label: string;
  value: string;
}

export function SelectElement({
  options,
  initialValue,
  handleChangeAction,
  className = 'w-[110px]',
}: SelectProps) {
  return (
    <Select onValueChange={handleChangeAction} defaultValue={initialValue}>
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
