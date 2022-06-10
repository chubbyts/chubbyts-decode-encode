import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/dist/throwable-to-error';
import { DecodeError, TypeDecoder } from '.';
import { Data } from '..';

export const createJsonTypeDecoder = (): TypeDecoder => {
  const decode = (encodedData: string): Data => {
    try {
      return JSON.parse(encodedData);
    } catch (e) {
      const error = throwableToError(e);

      const decodeError = new DecodeError(error.message);
      decodeError.stack = error.stack;

      throw decodeError;
    }
  };

  const contentType = 'application/json';

  return {
    decode,
    contentType,
  };
};
