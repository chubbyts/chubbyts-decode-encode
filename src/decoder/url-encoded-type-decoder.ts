import { parse } from 'qs';
import type { Data } from '../data.js';
import { isArray, isObject } from '../data.js';
import type { TypeDecoder } from './decoder.js';

type ParsedValue = { [key: string]: ParsedValue } | Array<ParsedValue> | string;

const decodeValue = (value: ParsedValue): Data => {
  if (isObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([subKey, subValue]) => [subKey, decodeValue(subValue)]));
  }

  if (isArray(value)) {
    return value.map(decodeValue);
  }

  if (value === 'null') {
    return null;
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  const float = parseFloat(value); // handles integers as well

  if (float.toString() === value) {
    return float;
  }

  return value;
};

export const createUrlEncodedTypeDecoder = (): TypeDecoder => {
  return {
    decode: (encodedData: string): Data => decodeValue(parse(encodedData, { depth: 100 }) as ParsedValue),
    contentType: 'application/x-www-form-urlencoded',
  };
};
