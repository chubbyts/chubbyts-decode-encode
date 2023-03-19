import { TypeDecoder } from '.';
import { Data, isArray, isObject } from '..';
import { parse } from 'qs';

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

  const integer = parseInt(value, 10);

  if (!isNaN(integer) && integer.toString() === value) {
    return integer;
  }

  const float = parseFloat(value);

  if (!isNaN(float) && float.toString() === value) {
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
