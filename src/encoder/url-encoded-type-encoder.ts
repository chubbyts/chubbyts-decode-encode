import { stringify } from 'qs';
import type { Data } from '..';
import { isArray, isBoolean, isNull, isNumber, isObject } from '..';
import type { TypeEncoder } from '.';

type EncodedData = { [key: string]: Data } | Array<Data> | string;

const encodeValue = (value: Data): EncodedData => {
  if (isObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([subKey, subValue]) => [subKey, encodeValue(subValue)]));
  }

  if (isArray(value)) {
    return value.map(encodeValue);
  }

  if (isNumber(value)) {
    return value.toString();
  }

  if (isBoolean(value)) {
    return value ? 'true' : 'false';
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
