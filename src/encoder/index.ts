import { Data } from '..';

export class EncodeError extends Error {}

export type TypeEncoder = { encode: (data: Data) => string; contentType: string };

export type Encoder = { encode: (data: Data, contentType: string) => string; contentTypes: Array<string> };

export const createEncoder = (encoderTypes: Array<TypeEncoder>): Encoder => {
  const encoderTypeMap: Map<string, TypeEncoder> = new Map(
    encoderTypes.map((encoderType) => [encoderType.contentType, encoderType]),
  );

  const contentTypes = Array.from(encoderTypeMap.keys());

  return {
    encode: (data: Data, contentType: string): string => {
      if (encoderTypeMap.has(contentType)) {
        return (encoderTypeMap.get(contentType) as TypeEncoder).encode(data);
      }

      throw new Error(
        `Unsupported contentType "${contentType}", supported contentTypes are "${contentTypes.join('", "')}".`,
      );
    },
    contentTypes,
  };
};
