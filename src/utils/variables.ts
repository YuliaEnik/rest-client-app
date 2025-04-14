import { NormalizedVariables, Variable } from '@/types/types';

export const REGEXP_UNWRAPPED = new RegExp(/\{\{(\S+)}}/g);
export const REGEXP_WRAPPED = new RegExp(/"(\{\{\S+}})"/g);

export function insertVariables(target: string, variables: Variable[]) {
  const normalizedVariables: NormalizedVariables = variables.reduce(
    (obj, variable) => {
      obj[variable.name] = variable;
      return obj;
    },
    {} as NormalizedVariables
  );
  return target.replaceAll(REGEXP_UNWRAPPED, (match, p1) => {
    return normalizedVariables[p1]
      ? `"${normalizedVariables[p1].value}"`
      : match;
  });
}

export function wrapVariable(target: string) {
  return target.replaceAll(REGEXP_UNWRAPPED, (match) => `"${match}"`);
}

export function unwrapVariable(target: string) {
  return target.replaceAll(REGEXP_WRAPPED, (_, p1) => p1);
}

export function isAllVariablesInserted(value: string) {
  return !REGEXP_UNWRAPPED.test(value);
}
