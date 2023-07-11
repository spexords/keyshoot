import { SelectOption } from "../components/select/select-option.interface";

export function enumAsSelectOptions<T extends Object, V>(enumObj: T) {
  return Object.entries(enumObj)
    .filter(([, value]) => typeof value === 'number')
    .map(([displayValue, value]) => ({ value, displayValue } as SelectOption));
}
