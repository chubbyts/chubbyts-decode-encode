export type Data = { [key: string]: Data } | Array<Data> | string | number | boolean | null;

export const isNull = (value: unknown): value is null => value === null;
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isArray = (value: unknown): value is Array<Data> => Array.isArray(value);
export const isObject = (value: unknown): value is { [key: string]: Data } => {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  // prototype based check: constructor based checks crash on null prototype objects (Object.create(null))
  // and can be shadowed by an attacker controlled own "constructor" property (e.g. {"constructor": 1})
  const prototype: unknown = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
};
