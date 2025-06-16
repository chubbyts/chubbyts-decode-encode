import type { Data } from '../index.js';
import type { TypeEncoder } from './index.js';

export const createJsonTypeEncoder = (prettyPrint = false): TypeEncoder => {
  return {
    encode: (data: Data): string => JSON.stringify(data, undefined, prettyPrint ? 4 : undefined),
    contentType: 'application/json',
  };
};
