import { stringify } from 'yaml';
import type { Data } from '../index';
import type { TypeEncoder } from './index';

export const createYamlTypeEncoder = (): TypeEncoder => {
  return {
    encode: (data: Data): string => stringify(data, { indent: 4 }),
    contentType: 'application/x-yaml',
  };
};
