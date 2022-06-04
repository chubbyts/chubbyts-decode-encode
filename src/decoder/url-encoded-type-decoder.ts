import { TypeDecoder } from '.';
import { Data } from '..';
import { set } from 'object-path';

const optimizeValue = (value: string) => {
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
  const decode = (encodedData: string): Data => {
    let data = {};

    encodedData.split('&').forEach((keyValue) => {
      const [rawKey, rawValue] = keyValue.split('=');
      const key = rawKey.replace(/\[[^\]]+\]/gm, (match) => `.${(match.match(/[^\[\]]+/) as RegExpMatchArray)[0]}`);
      const value = optimizeValue(decodeURIComponent(rawValue));
      set(data, key, value);
    });

    return data;
  };

  const contentType = 'application/x-www-form-urlencoded';

  return {
    decode,
    contentType,
  };
};
