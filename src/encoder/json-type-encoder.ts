import { TypeEncoder } from '.';
import { Data } from '..';

export const createJsonTypeEncoder = (prettyPrint: boolean = false): TypeEncoder => {
  return {
    encode: (data: Data): string => JSON.stringify(data, undefined, prettyPrint ? 4 : undefined),
    contentType: 'application/json',
  };
};
