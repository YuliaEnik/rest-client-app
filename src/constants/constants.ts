import { lang, Option } from '@/types/types';

export const RESTFUL_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
] as const;

export const LANGUAGES: Option[] = [
  { value: 'javascript/Fetch', label: 'JavaScript (Fetch API)' },
  { value: 'javascript/XHR', label: 'JavaScript (XHR)' },
  { value: 'curl/cURL', label: 'cURL' },
  { value: 'nodejs/Native', label: 'NodeJS' },
  { value: 'python/http.client', label: 'Python' },
  { value: 'java/OkHttp', label: 'Java' },
  { value: 'csharp/HttpClient', label: 'C#' },
  { value: 'go/Native', label: 'Go' },
];

export const CODEMIRROR_LANGUAGES: Record<string, lang> = {
  'javascript/Fetch': 'javascript',
  'javascript/XHR': 'javascript',
  'curl/cURL': 'text',
  'nodejs/Native': 'javascript',
  'python/http.client': 'python',
  'java/OkHttp': 'java',
  'csharp/HttpClient': 'csharp',
  'go/Native': 'go',
};

export enum LOCAL_STORAGE_KEYS {
  'VARIABLES' = 'variables',
  'HISTORY' = 'requestsHistory',
}
