import { TypeDecoder } from '.';
import { Data } from '..';

export const createJsonTypeDecoder = (): TypeDecoder => {
  const decode = (encodedData: string): Data => {
    return JSON.parse(encodedData);
  };

  const contentType = 'application/json';

  return {
    decode,
    contentType,
  };
};
