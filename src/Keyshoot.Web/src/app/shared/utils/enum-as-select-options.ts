export interface SelectOption {
  value: unknown;
  displayValue: string;
}

export function enumAsSelectOptions<T extends Object>(enumObj: T) {
  return Object.entries(enumObj)
    .filter(([, value]) => typeof value === 'number')
    .map(([displayValue, value]) => ({ value, displayValue } as SelectOption));
}
