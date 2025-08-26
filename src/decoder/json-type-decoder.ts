import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/dist/throwable-to-error';
import type { Data } from '../data.js';
import type { TypeDecoder } from './decoder.js';
import { DecodeError } from './decoder.js';

export const createJsonTypeDecoder = (): TypeDecoder => {
  return {
    decode: (encodedData: string): Data => {
      try {
        return JSON.parse(encodedData);
      } catch (e) {
        const error = throwableToError(e);

        throw new DecodeError(error.message, error.stack);
      }
    },
    contentType: 'application/json',
  };
};
