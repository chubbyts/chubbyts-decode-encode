import { stringify } from 'yaml';
import type { Data } from '../data.js';
import type { TypeEncoder } from './encoder.js';

export const createYamlTypeEncoder = (): TypeEncoder => {
  return {
    encode: (data: Data): string => stringify(data, { indent: 4 }),
    contentType: 'application/x-yaml',
  };
};
