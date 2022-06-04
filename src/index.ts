export type Data = { [key: string]: Data } | Array<Data> | string | number | boolean | null;

export const isNull = (value: unknown): value is null => value === null;
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isArray = (value: unknown): value is Array<Data> => Array.isArray(value);
export const isObject = (value: unknown): value is { [key: string]: Data } =>
  value !== null && typeof value === 'object' && value.constructor.name == 'Object';
