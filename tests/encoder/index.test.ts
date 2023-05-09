import { describe, expect, test } from '@jest/globals';
import { useObjectMock } from '@chubbyts/chubbyts-function-mock/dist/object-mock';
import type { TypeEncoder } from '../../src/encoder';
import { createEncoder } from '../../src/encoder';
import data from '../data';

describe('createEncoder', () => {
  test('without type encoders', async () => {
    const encoder = createEncoder([]);

    expect(encoder.contentTypes).toMatchInlineSnapshot('[]');

    try {
      encoder.encode(data, 'application/json');
      fail('Expected error');
    } catch (e) {
      expect(e).toMatchInlineSnapshot(
        '[Error: Unsupported contentType "application/json", supported contentTypes are "".]',
      );
    }
  });

  test('without matching type encoders', async () => {
    const [xmlTypeEncoder, xmlTypeEncoderMocks] = useObjectMock<TypeEncoder>([
      { name: 'contentType', value: 'application/xml' },
    ]);

    const [yamlTypeEncoder, yamlTypeEncoderMocks] = useObjectMock<TypeEncoder>([
      { name: 'contentType', value: 'application/x-yaml' },
    ]);

    const encoder = createEncoder([xmlTypeEncoder, yamlTypeEncoder]);

    expect(encoder.contentTypes).toMatchInlineSnapshot(`
      [
        "application/xml",
        "application/x-yaml",
      ]
    `);

    try {
      encoder.encode(data, 'application/json');
      fail('Expected error');
    } catch (e) {
      expect(e).toMatchInlineSnapshot(
        '[Error: Unsupported contentType "application/json", supported contentTypes are "application/xml", "application/x-yaml".]',
      );
    }

    expect(xmlTypeEncoderMocks.length).toBe(0);
    expect(yamlTypeEncoderMocks.length).toBe(0);
  });

  test('with type encoders', async () => {
    const [jsonTypeEncoder, jsonTypeEncoderMocks] = useObjectMock<TypeEncoder>([
      { name: 'contentType', value: 'application/json' },
      { name: 'encode', parameters: [data], return: 'test' },
    ]);

    const encoder = createEncoder([jsonTypeEncoder]);

    expect(encoder.contentTypes).toMatchInlineSnapshot(`
      [
        "application/json",
      ]
    `);

    expect(encoder.encode(data, 'application/json')).toBe('test');

    expect(jsonTypeEncoderMocks.length).toBe(0);
  });
});
