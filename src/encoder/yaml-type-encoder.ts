import { TypeEncoder } from '.';
import { stringify } from 'yaml';
import { Data } from '..';

export const createYamlTypeEncoder = (): TypeEncoder => {
  return {
    encode: (data: Data): string => stringify(data, { indent: 4 }),
    contentType: 'application/x-yaml',
  };
};
