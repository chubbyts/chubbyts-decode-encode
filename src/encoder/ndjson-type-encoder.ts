import type { Data } from '../data.js';
import { isArray } from '../data.js';
import type { TypeEncoder } from './encoder.js';
import { EncodeError } from './encoder.js';

export const createNdjsonTypeEncoder = (contentType = 'application/jsonl'): TypeEncoder => {
  return {
    encode: (data: Data): string => {
      if (!isArray(data)) {
        throw new EncodeError(`Unsupported value: ${JSON.stringify(data)}, expected an array`);
      }

      return data.map((item) => `${JSON.stringify(item)}\n`).join('');
    },
    contentType,
  };
};
