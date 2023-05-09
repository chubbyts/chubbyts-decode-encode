import { stringify } from 'yaml';
import type { Data } from '..';
import type { TypeEncoder } from '.';

export const createYamlTypeEncoder = (): TypeEncoder => {
  return {
    encode: (data: Data): string => stringify(data, { indent: 4 }),
    contentType: 'application/x-yaml',
  };
};
