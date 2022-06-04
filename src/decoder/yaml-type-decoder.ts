import { TypeDecoder } from '.';
import { Data } from '..';
import { parse } from 'yaml';

export const createYamlTypeDecoder = (): TypeDecoder => {
  const decode = (encodedData: string): Data => {
    return parse(encodedData);
  };

  const contentType = 'application/x-yaml';

  return {
    decode,
    contentType,
  };
};
