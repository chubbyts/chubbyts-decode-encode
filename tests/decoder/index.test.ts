import { describe, expect, test } from '@jest/globals';
import { useObjectMock } from '@chubbyts/chubbyts-function-mock/dist/object-mock';
import type { TypeDecoder } from '../../src/decoder';
import { createDecoder } from '../../src/decoder';

describe('createDecoder', () => {
  test('without type decoders', async () => {
    const decoder = createDecoder([]);

    expect(decoder.contentTypes).toMatchInlineSnapshot('[]');

    try {
      decoder.decode('', 'application/json');
      fail('Expected error');
    } catch (e) {
      expect(e).toMatchInlineSnapshot(
        '[Error: Unsupported contentType "application/json", supported contentTypes are "".]',
      );
    }
  });

  test('without matching type decoders', async () => {
    const [xmlTypeDecoder, xmlTypeDecoderMocks] = useObjectMock<TypeDecoder>([
      { name: 'contentType', value: 'application/xml' },
    ]);

    const [yamlTypeDecoder, yamlTypeDecoderMocks] = useObjectMock<TypeDecoder>([
      { name: 'contentType', value: 'application/x-yaml' },
    ]);

    const decoder = createDecoder([xmlTypeDecoder, yamlTypeDecoder]);

    expect(decoder.contentTypes).toMatchInlineSnapshot(`
      [
        "application/xml",
        "application/x-yaml",
      ]
    `);

    try {
      decoder.decode('', 'application/json');
      fail('Expected error');
    } catch (e) {
      expect(e).toMatchInlineSnapshot(
        '[Error: Unsupported contentType "application/json", supported contentTypes are "application/xml", "application/x-yaml".]',
      );
    }

    expect(xmlTypeDecoderMocks.length).toBe(0);
    expect(yamlTypeDecoderMocks.length).toBe(0);
  });

  test('with type decoders', async () => {
    const [jsonTypeDecoder, jsonTypeDecoderMocks] = useObjectMock<TypeDecoder>([
      { name: 'contentType', value: 'application/json' },
      { name: 'decode', parameters: ['test'], return: {} },
    ]);

    const decoder = createDecoder([jsonTypeDecoder]);

    expect(decoder.contentTypes).toMatchInlineSnapshot(`
      [
        "application/json",
      ]
    `);

    expect(decoder.decode('test', 'application/json')).toEqual({});

    expect(jsonTypeDecoderMocks.length).toBe(0);
  });
});
