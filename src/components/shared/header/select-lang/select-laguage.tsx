'use client';

import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Language = 'en' | 'ru' | 'br';

interface LanguageSelectProps {
  value?: Language;
  onChange?: (language: Language) => void;
  className?: string;
}

export const LanguageSelect = React.forwardRef<
  HTMLButtonElement,
  LanguageSelectProps
>(({ value = 'en', onChange, className }, ref) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        ref={ref}
        className={cn(
          'outline-none ring-0 focus:ring-0 focus:outline-none active:outline-none, active:ring-0, focus-visible:outline-none, focus-visible:ring-0 h-12 px-4 text-base',
          className
        )}
      >
        <SelectValue placeholder="Select language">
          {value.toUpperCase()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem value="en">
          <div className="flex items-center gap-1">
            <span>English (EN)</span>
          </div>
        </SelectItem>
        <SelectItem value="ru">
          <div className="flex items-center gap-1">
            <span>Русский (RU)</span>
          </div>
        </SelectItem>
        <SelectItem value="br">
          <div className="flex items-center gap-1">
            <span>Беларуски (BE)</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
});

LanguageSelect.displayName = 'LanguageSelect';
