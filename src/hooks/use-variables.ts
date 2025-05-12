import { LOCAL_STORAGE_KEYS } from '@/constants/constants';
import useLocalStorage from '@/hooks/local_storage';
import { NormalizedVariables, Variable } from '@/types/types';
import { REGEXP_UNWRAPPED } from '@/utils/variables';

export function useVariables() {
  const [variables] = useLocalStorage<Variable[]>(
    LOCAL_STORAGE_KEYS.VARIABLES,
    []
  );

  function insertVariables(target: string, withQuotes = false) {
    const normalizedVariables: NormalizedVariables = variables.reduce(
      (obj, variable) => {
        obj[variable.name] = variable;
        return obj;
      },
      {} as NormalizedVariables
    );
    const targetWithVariables = target.replaceAll(
      REGEXP_UNWRAPPED,
      (match, p1) => {
        return normalizedVariables[p1]
          ? withQuotes &&
            !hasQuotes(normalizedVariables[p1].value) &&
            !isNumber(normalizedVariables[p1].value)
            ? `"${normalizedVariables[p1].value}"`
            : normalizedVariables[p1].value
          : match;
      }
    );

    return {
      target: targetWithVariables,
      isAllInserted: isAllVariablesInserted(targetWithVariables),
    };
  }

  function isNumber(value: string) {
    return /\d+/g.test(value) && !!parseInt(value);
  }

  function hasQuotes(value: string) {
    return value.includes('"');
  }

  function isAllVariablesInserted(value: string) {
    return !REGEXP_UNWRAPPED.test(value);
  }

  return { variables, insertVariables };
}
