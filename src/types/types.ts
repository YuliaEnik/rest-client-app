import { RESTFUL_METHODS } from '@/constants/constants';
export interface Option {
  label: string;
  value: string;
  shortLabel?: string;
}

export type METHODS = (typeof RESTFUL_METHODS)[number];

export type lang =
  | 'javascript'
  | 'python'
  | 'text'
  | 'java'
  | 'csharp'
  | 'go'
  | 'json';

export interface IDeveloper {
  id: string;
  name: string;
  photo: string;
  gitHub: string;
  description: string;
  tasks: string[];
}

export interface RequestHeader {
  isChecked: boolean;
  headerKey: string;
  headerValue: string;
}

export interface RequestHeadersInterface {
  headers: RequestHeader[];
}

export interface EncodedParams {
  apiUrl: string;
  requestBody: string;
}

export interface UrlParams {
  method: string;
  apiUrl: string;
  requestBody: string;
}

export interface RestfulResponse {
  data: string;
  code: number;
}

export interface Variable {
  id: string;
  name: string;
  value: string;
}

export interface AddButtonProps {
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
}

export interface CreateVariableProps {
  showCreateBlock: (show: boolean) => void;
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
}

export interface VariableItemProps {
  variable: { id: string; name: string; value: string };
  variables: Variable[];
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>;
}

export interface History {
  executedAt: number;
  apiUrl: string;
  restfulUrl: string;
}
