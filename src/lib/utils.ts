import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { unwrapVariable, wrapVariable } from '@/utils/variables';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prettify(code: string) {
  try {
    const json = JSON.parse(wrapVariable(code));
    return unwrapVariable(JSON.stringify(json, null, 2));
  } catch {
    return code;
  }
}
