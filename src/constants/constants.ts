import { Option } from '@/types/types';

export const RESTFUL_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
] as const;

export const LANGUAGES: Option[] = [
  { value: 'fetch', label: 'JavaScript (Fetch API)' },
  { value: 'xhr', label: 'JavaScript (XHR)' },
  { value: 'curl', label: 'curl' },
  { value: 'nodejs', label: 'NodeJS' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c#', label: 'C#' },
  { value: 'go', label: 'Go' },
];
