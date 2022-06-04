import { TypeEncoder } from '.';
import { Data } from '..';

export const createJsonTypeEncoder = (prettyPrint: boolean = false): TypeEncoder => {
  const encode = (data: Data): string => JSON.stringify(data, undefined, prettyPrint ? 4 : undefined);
  const contentType = 'application/json';

  return {
    encode,
    contentType,
  };
};
