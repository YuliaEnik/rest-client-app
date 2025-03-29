import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectProps {
  options: Option[];
  initialOption: Option;
  onChange: (value: string) => void;
}

export interface Option {
  label: string;
  value: string;
}

export function SelectElement({
  options,
  initialOption,
  onChange,
}: SelectProps) {
  return (
    <Select onValueChange={onChange} defaultValue={initialOption.label}>
      <SelectTrigger className={'w-[110px]'}>
        <SelectValue defaultValue={initialOption.value} />
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
