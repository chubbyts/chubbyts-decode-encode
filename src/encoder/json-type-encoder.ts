import type { Data } from '..';
import type { TypeEncoder } from '.';

export const createJsonTypeEncoder = (prettyPrint = false): TypeEncoder => {
  return {
    encode: (data: Data): string => JSON.stringify(data, undefined, prettyPrint ? 4 : undefined),
    contentType: 'application/json',
  };
};
