import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prettify(code: string) {
  try {
    const json = JSON.parse(code);
    return JSON.stringify(json, null, 2);
  } catch {
    return code;
  }
}
