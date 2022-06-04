import { TypeEncoder } from '.';
import { stringify } from 'yaml';
import { Data } from '..';

export const createYamlTypeEncoder = (): TypeEncoder => {
  const encode = (data: Data): string => stringify(JSON.parse(JSON.stringify(data)), { indent: 4 });
  const contentType = 'application/x-yaml';

  return {
    encode,
    contentType,
  };
};
