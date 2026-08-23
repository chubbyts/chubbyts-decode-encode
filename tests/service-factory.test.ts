import { describe, expect, test } from 'vitest';
import { useObjectMock } from '@chubbyts/chubbyts-function-mock/dist/object-mock';
import type { Container } from '@chubbyts/chubbyts-dic-types/dist/container';
import type { ConfigFactory } from '@chubbyts/chubbyts-dic-config/dist/dic-config';
import { createContainerByConfigFactory } from '@chubbyts/chubbyts-dic-config/dist/dic-config';
import type { Decoder, TypeDecoder } from '../src/decoder/decoder';
import type { Encoder, TypeEncoder } from '../src/encoder/encoder';
import {
  decoderServiceFactory,
  encoderServiceFactory,
  typeDecodersServiceFactory,
  typeEncodersServiceFactory,
} from '../src/service-factory';

const createCustomTypeDecoder = (contentType: string): TypeDecoder => ({
  decode: (encodedData: string) => ({ custom: encodedData }),
  contentType,
});

const createCustomTypeEncoder = (contentType: string): TypeEncoder => ({
  encode: () => 'custom',
  contentType,
});

describe('service-factory', () => {
  describe('typeDecodersServiceFactory', () => {
    test('without name', () => {
      const [container, containerMocks] = useObjectMock<Container>([]);

      const typeDecoders = typeDecodersServiceFactory()(container);

      expect(typeDecoders.map((typeDecoder) => typeDecoder.contentType)).toEqual([
        'application/json',
        'application/jsonx+xml',
        'application/x-www-form-urlencoded',
        'application/x-yaml',
      ]);

      expect(typeDecoders[0].decode('{"key":"value"}')).toEqual({ key: 'value' });

      expect(containerMocks.length).toBe(0);
    });

    test('with name', () => {
      const [container, containerMocks] = useObjectMock<Container>([]);

      const typeDecoders = typeDecodersServiceFactory('api')(container);

      expect(typeDecoders.map((typeDecoder) => typeDecoder.contentType)).toEqual([
        'application/json',
        'application/jsonx+xml',
        'application/x-www-form-urlencoded',
        'application/x-yaml',
      ]);

      expect(containerMocks.length).toBe(0);
    });
  });

  describe('decoderServiceFactory', () => {
    test('without registered type decoders', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'has', parameters: ['typeDecoders'], return: false },
      ]);

      const decoder = decoderServiceFactory()(container);

      expect(decoder.contentTypes).toEqual([
        'application/json',
        'application/jsonx+xml',
        'application/x-www-form-urlencoded',
        'application/x-yaml',
      ]);

      expect(decoder.decode('{"key":"value"}', 'application/json')).toEqual({ key: 'value' });

      expect(containerMocks.length).toBe(0);
    });

    test('with registered type decoders', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'has', parameters: ['typeDecoders'], return: true },
        {
          name: 'get',
          parameters: ['typeDecoders'],
          return: [createCustomTypeDecoder('application/custom')],
        },
      ]);

      const decoder = decoderServiceFactory()(container);

      expect(decoder.contentTypes).toEqual(['application/custom']);
      expect(decoder.decode('data', 'application/custom')).toEqual({ custom: 'data' });

      expect(containerMocks.length).toBe(0);
    });

    test('with name, without registered type decoders', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'has', parameters: ['typeDecodersapi'], return: false },
      ]);

      const decoder = decoderServiceFactory('api')(container);

      expect(decoder.contentTypes).toEqual([
        'application/json',
        'application/jsonx+xml',
        'application/x-www-form-urlencoded',
        'application/x-yaml',
      ]);

      expect(containerMocks.length).toBe(0);
    });

    test('with name, with registered type decoders', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'has', parameters: ['typeDecodersapi'], return: true },
        {
          name: 'get',
          parameters: ['typeDecodersapi'],
          return: [createCustomTypeDecoder('application/custom')],
        },
      ]);

      const decoder = decoderServiceFactory('api')(container);

      expect(decoder.contentTypes).toEqual(['application/custom']);

      expect(containerMocks.length).toBe(0);
    });
  });

  describe('typeEncodersServiceFactory', () => {
    test('without debug', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'get', parameters: ['config'], return: {} },
      ]);

      const typeEncoders = typeEncodersServiceFactory()(container);

      expect(typeEncoders.map((typeEncoder) => typeEncoder.contentType)).toEqual([
        'application/json',
        'application/jsonx+xml',
        'application/x-www-form-urlencoded',
        'application/x-yaml',
      ]);

      expect(typeEncoders[0].encode({ key: 'value' })).toBe('{"key":"value"}');
      expect(typeEncoders[1].encode({ key: 'value' })).not.toContain('\n');

      expect(containerMocks.length).toBe(0);
    });

    test('with debug false', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'get', parameters: ['config'], return: { debug: false } },
      ]);

      const typeEncoders = typeEncodersServiceFactory()(container);

      expect(typeEncoders[0].encode({ key: 'value' })).toBe('{"key":"value"}');

      expect(containerMocks.length).toBe(0);
    });

    test('with debug true', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'get', parameters: ['config'], return: { debug: true } },
      ]);

      const typeEncoders = typeEncodersServiceFactory()(container);

      expect(typeEncoders[0].encode({ key: 'value' })).toBe('{\n    "key": "value"\n}');
      expect(typeEncoders[1].encode({ key: 'value' })).toContain('\n');

      expect(containerMocks.length).toBe(0);
    });

    test('with name', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'get', parameters: ['config'], return: { debug: true } },
      ]);

      const typeEncoders = typeEncodersServiceFactory('api')(container);

      expect(typeEncoders[0].encode({ key: 'value' })).toBe('{\n    "key": "value"\n}');

      expect(containerMocks.length).toBe(0);
    });
  });

  describe('encoderServiceFactory', () => {
    test('without registered type encoders', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'has', parameters: ['typeEncoders'], return: false },
        { name: 'get', parameters: ['config'], return: {} },
      ]);

      const encoder = encoderServiceFactory()(container);

      expect(encoder.contentTypes).toEqual([
        'application/json',
        'application/jsonx+xml',
        'application/x-www-form-urlencoded',
        'application/x-yaml',
      ]);

      expect(encoder.encode({ key: 'value' }, 'application/json')).toBe('{"key":"value"}');

      expect(containerMocks.length).toBe(0);
    });

    test('with registered type encoders', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'has', parameters: ['typeEncoders'], return: true },
        {
          name: 'get',
          parameters: ['typeEncoders'],
          return: [createCustomTypeEncoder('application/custom')],
        },
      ]);

      const encoder = encoderServiceFactory()(container);

      expect(encoder.contentTypes).toEqual(['application/custom']);
      expect(encoder.encode({ key: 'value' }, 'application/custom')).toBe('custom');

      expect(containerMocks.length).toBe(0);
    });

    test('with name, without registered type encoders', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'has', parameters: ['typeEncodersapi'], return: false },
        { name: 'get', parameters: ['config'], return: { debug: true } },
      ]);

      const encoder = encoderServiceFactory('api')(container);

      expect(encoder.encode({ key: 'value' }, 'application/json')).toBe('{\n    "key": "value"\n}');

      expect(containerMocks.length).toBe(0);
    });

    test('with name, with registered type encoders', () => {
      const [container, containerMocks] = useObjectMock<Container>([
        { name: 'has', parameters: ['typeEncodersapi'], return: true },
        {
          name: 'get',
          parameters: ['typeEncodersapi'],
          return: [createCustomTypeEncoder('application/custom')],
        },
      ]);

      const encoder = encoderServiceFactory('api')(container);

      expect(encoder.contentTypes).toEqual(['application/custom']);

      expect(containerMocks.length).toBe(0);
    });
  });

  describe('integration with chubbyts-dic-config', () => {
    test('without names', () => {
      const container = createContainerByConfigFactory({
        debug: true,
        dependencies: {
          factories: new Map<string, ConfigFactory>([
            ['decoder', decoderServiceFactory()],
            ['encoder', encoderServiceFactory()],
          ]),
        },
      })();

      const decoder = container.get<Decoder>('decoder');
      const encoder = container.get<Encoder>('encoder');

      expect(decoder.decode('{"key":"value"}', 'application/json')).toEqual({ key: 'value' });
      expect(encoder.encode({ key: 'value' }, 'application/json')).toBe('{\n    "key": "value"\n}');
    });

    test('with names and registered type decoders / encoders', () => {
      const container = createContainerByConfigFactory({
        debug: false,
        dependencies: {
          factories: new Map<string, ConfigFactory>([
            ['decoder', decoderServiceFactory()],
            ['encoder', encoderServiceFactory()],
            ['decoderapi', decoderServiceFactory('api')],
            ['encoderapi', encoderServiceFactory('api')],
            ['typeDecodersapi', (): Array<TypeDecoder> => [createCustomTypeDecoder('application/custom')]],
            ['typeEncodersapi', (): Array<TypeEncoder> => [createCustomTypeEncoder('application/custom')]],
          ]),
        },
      })();

      expect(container.get<Decoder>('decoder').contentTypes).toEqual([
        'application/json',
        'application/jsonx+xml',
        'application/x-www-form-urlencoded',
        'application/x-yaml',
      ]);
      expect(container.get<Decoder>('decoderapi').contentTypes).toEqual(['application/custom']);
      expect(container.get<Encoder>('encoderapi').contentTypes).toEqual(['application/custom']);
      expect(container.get<Encoder>('encoderapi').encode({ key: 'value' }, 'application/custom')).toBe('custom');
    });
  });
});
