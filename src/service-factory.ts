import type { Container } from '@chubbyts/chubbyts-dic-types/dist/container';
import { createAbstractFactory } from '@chubbyts/chubbyts-dic-config-factory/dist/dic-config-factory';
import type { Decoder, TypeDecoder } from './decoder/decoder.js';
import { createDecoder } from './decoder/decoder.js';
import { createJsonTypeDecoder } from './decoder/json-type-decoder.js';
import { createJsonxTypeDecoder } from './decoder/jsonx-type-decoder.js';
import { createUrlEncodedTypeDecoder } from './decoder/url-encoded-type-decoder.js';
import { createYamlTypeDecoder } from './decoder/yaml-type-decoder.js';
import type { Encoder, TypeEncoder } from './encoder/encoder.js';
import { createEncoder } from './encoder/encoder.js';
import { createJsonTypeEncoder } from './encoder/json-type-encoder.js';
import { createJsonxTypeEncoder } from './encoder/jsonx-type-encoder.js';
import { createUrlEncodedTypeEncoder } from './encoder/url-encoded-type-encoder.js';
import { createYamlTypeEncoder } from './encoder/yaml-type-encoder.js';

type Config = {
  debug?: boolean;
};

export const typeDecodersServiceFactory = createAbstractFactory((): Array<TypeDecoder> => {
  return [createJsonTypeDecoder(), createJsonxTypeDecoder(), createUrlEncodedTypeDecoder(), createYamlTypeDecoder()];
});

export const decoderServiceFactory = createAbstractFactory((container: Container, { resolveDependency }): Decoder => {
  return createDecoder(resolveDependency(container, 'typeDecoders', typeDecodersServiceFactory));
});

export const typeEncodersServiceFactory = createAbstractFactory((container: Container): Array<TypeEncoder> => {
  const { debug = false } = container.get<Config>('config');

  return [
    createJsonTypeEncoder(debug),
    createJsonxTypeEncoder(debug),
    createUrlEncodedTypeEncoder(),
    createYamlTypeEncoder(),
  ];
});

export const encoderServiceFactory = createAbstractFactory((container: Container, { resolveDependency }): Encoder => {
  return createEncoder(resolveDependency(container, 'typeEncoders', typeEncodersServiceFactory));
});
