import { TypeEncoder } from '.';
import { Data, isArray, isObject } from '..';

const getValueAsString = (value: null | boolean | number | string): string => {
  if (null === value) {
    return 'null';
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  return value;
};

const getKeyValue = (path: string, key: string, value: Data) => {
  const subPath = '' !== path ? path + '[' + key + ']' : key;

  if (isObject(value) || isArray(value)) {
    const queryPart = buildQuery(value, subPath);

    return queryPart !== '' ? queryPart + '&' : '';
  }

  return subPath + '=' + encodeURIComponent(getValueAsString(value)) + '&';
};

const buildQuery = (data: Data, path: string = ''): string => {
  let query = '';

  if (isObject(data)) {
    Object.keys(data).forEach((key: string) => {
      query += getKeyValue(path, key, data[key]);
    });
  } else if (isArray(data)) {
    data.forEach((value, i) => {
      query += getKeyValue(path, i.toString(), value);
    });
  }

  return query.substring(0, query.length - 1);
};

export const createUrlEncodedTypeEncoder = (): TypeEncoder => {
  const encode = (data: Data): string => {
    return buildQuery(JSON.parse(JSON.stringify(data)));
  };

  const contentType = 'application/x-www-form-urlencoded';

  return {
    encode,
    contentType,
  };
};
