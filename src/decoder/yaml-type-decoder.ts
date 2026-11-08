import { parse } from 'yaml';
import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/throwable-to-error';
import type { Data } from '../data.js';
import { DecodeError } from './decoder.js';
import type { TypeDecoder } from './decoder.js';

export const createYamlTypeDecoder = (contentType = 'application/x-yaml'): TypeDecoder => {
  return {
    decode: (encodedData: string): Data => {
      try {
        return parse(encodedData);
      } catch (e) {
        const error = throwableToError(e);

        throw new DecodeError(error.message, error.stack);
      }
    },
    contentType,
  };
};
