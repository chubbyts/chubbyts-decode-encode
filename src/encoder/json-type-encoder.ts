import type { Data } from '../data.js';
import type { TypeEncoder } from './encoder.js';

export const createJsonTypeEncoder = (prettyPrint = false): TypeEncoder => {
  return {
    encode: (data: Data): string => JSON.stringify(data, undefined, prettyPrint ? 4 : undefined),
    contentType: 'application/json',
  };
};
