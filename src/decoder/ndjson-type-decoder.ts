import { throwableToError } from '@chubbyts/chubbyts-throwable-to-error/throwable-to-error';
import type { Data } from '../data.js';
import type { TypeDecoder } from './decoder.js';
import { DecodeError } from './decoder.js';

// only json whitespace (RFC 8259), "\n" is the line separator, String.prototype.trim() would also strip a BOM, nbsp, ...
const EMPTY_LINE = /^[ \t\r]*$/;

const decodeLine = (line: string, index: number): Data => {
  try {
    return JSON.parse(line);
  } catch (e) {
    const error = throwableToError(e);

    throw new DecodeError(`Line ${index + 1}: ${error.message}`, error.stack);
  }
};

export const createNdjsonTypeDecoder = (contentType = 'application/jsonl', ignoreEmptyLines = false): TypeDecoder => {
  return {
    decode: (encodedData: string): Data => {
      const lines = encodedData.split('\n');

      // the line terminator after the last line does not start another line
      return (lines.at(-1) === '' ? lines.slice(0, -1) : lines).flatMap((line, index): Array<Data> => {
        if (EMPTY_LINE.test(line)) {
          if (ignoreEmptyLines) {
            return [];
          }

          throw new DecodeError(`Line ${index + 1}: empty line`);
        }

        return [decodeLine(line, index)];
      });
    },
    contentType,
  };
};
