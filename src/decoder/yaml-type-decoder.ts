import { DecodeError, TypeDecoder } from '.';
import { Data } from '..';
import { parse } from 'yaml';
import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/dist/throwable-to-error';

export const createYamlTypeDecoder = (): TypeDecoder => {
  const decode = (encodedData: string): Data => {
    try {
      return parse(encodedData);
    } catch (e) {
      const error = throwableToError(e);

      const decodeError = new DecodeError(error.message);
      decodeError.stack = error.stack;

      throw decodeError;
    }
  };

  const contentType = 'application/x-yaml';

  return {
    decode,
    contentType,
  };
};
