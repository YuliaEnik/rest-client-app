import { RESTFUL_METHODS } from '@/constants/constants';

export interface Option {
  label: string;
  value: string;
}

export type METHODS = (typeof RESTFUL_METHODS)[number];
