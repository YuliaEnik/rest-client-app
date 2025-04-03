'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Option } from '@/types/types';

interface SelectProps<T extends string> {
  options: Option[];
  initialValue: T;
  className?: string;
  handleChangeAction: (value: T) => void;
}

export function SelectElement<T extends string>({
  options,
  initialValue,
  handleChangeAction,
  className = 'w-[110px]',
}: SelectProps<T>) {
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
