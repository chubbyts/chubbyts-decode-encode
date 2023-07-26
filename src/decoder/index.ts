import type { Data } from '../index';

export class DecodeError extends Error {
  public constructor(message: string, stack?: string) {
    super(message);
    this.stack = stack;
  }
}

export type TypeDecoder = { decode: (encodedData: string) => Data; contentType: string };

export type Decoder = {
  decode: (encodedData: string, contentType: string, context?: Record<string, unknown>) => Data;
  contentTypes: Array<string>;
};

export const createDecoder = (decoderTypes: Array<TypeDecoder>): Decoder => {
  const decoderTypeMap: Map<string, TypeDecoder> = new Map(
    decoderTypes.map((DecoderType) => [DecoderType.contentType, DecoderType]),
  );

  const contentTypes = Array.from(decoderTypeMap.keys());

  return {
    decode: (encodedData: string, contentType: string): Data => {
      if (decoderTypeMap.has(contentType)) {
        return (decoderTypeMap.get(contentType) as TypeDecoder).decode(encodedData);
      }

      throw new Error(
        `Unsupported contentType "${contentType}", supported contentTypes are "${contentTypes.join('", "')}".`,
      );
    },
    contentTypes,
  };
};
