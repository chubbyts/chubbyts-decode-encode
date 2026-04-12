import { stringify } from 'qs';
import type { Data } from '../data.js';
import { isArray, isNull, isObject } from '../data.js';
import type { TypeEncoder } from './encoder.js';

const encodeValue = (value: Data): Data => {
  if (isObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([subKey, subValue]) => [subKey, encodeValue(subValue)]));
  }

  if (isArray(value)) {
    return value.map(encodeValue);
  }

  if (isNull(value)) {
    return 'null';
  }

  return value;
};

export const createUrlEncodedTypeEncoder = (): TypeEncoder => {
  return {
    encode: (data: Data): string => stringify(encodeValue(data), { encodeValuesOnly: true }),
    contentType: 'application/x-www-form-urlencoded',
  };
};
