import { parse } from 'yaml';
import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/dist/throwable-to-error';
import type { Data } from '../index.js';
import { DecodeError } from './index.js';
import type { TypeDecoder } from './index.js';

export const createYamlTypeDecoder = (): TypeDecoder => {
  return {
    decode: (encodedData: string): Data => {
      try {
        return parse(encodedData);
      } catch (e) {
        const error = throwableToError(e);

        throw new DecodeError(error.message, error.stack);
      }
    },
    contentType: 'application/x-yaml',
  };
};
