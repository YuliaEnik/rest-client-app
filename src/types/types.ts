import { RESTFUL_METHODS } from '@/constants/constants';

export interface Option {
  label: string;
  value: string;
  shortLabel?: string;
}

export type METHODS = (typeof RESTFUL_METHODS)[number];

export interface IDeveloper {
  id: string;
  name: string;
  photo: string;
  gitHub: string;
  description: string;
  tasks: string[];
}
