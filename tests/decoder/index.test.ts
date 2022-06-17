import { describe, expect, test } from '@jest/globals';
import { Data } from '../../src';
import { createDecoder, TypeDecoder } from '../../src/decoder';

describe('createDecoder', () => {
  test('without type decoders', async () => {
    const decoder = createDecoder([]);

    expect(decoder.contentTypes).toMatchInlineSnapshot(`Array []`);

    try {
      decoder.decode('', 'application/json');
      fail('Expected error');
    } catch (e) {
      expect(e).toMatchInlineSnapshot(
        `[Error: Unsupported contentType "application/json", supported contentTypes are "".]`,
      );
    }
  });

  test('without matching type decoders', async () => {
    const decode = jest.fn((givenString: string): Data => {
      expect(givenString).toBe('test');

      return {};
    });

    const xmlTypeDecoder: TypeDecoder = {
      decode,
      contentType: 'application/xml',
    };

    const yamlTypeDecoder: TypeDecoder = {
      decode,
      contentType: 'application/x-yaml',
    };

    const decoder = createDecoder([xmlTypeDecoder, yamlTypeDecoder]);

    expect(decoder.contentTypes).toMatchInlineSnapshot(`
      Array [
        "application/xml",
        "application/x-yaml",
      ]
    `);

    try {
      decoder.decode('', 'application/json');
      fail('Expected error');
    } catch (e) {
      expect(e).toMatchInlineSnapshot(
        `[Error: Unsupported contentType "application/json", supported contentTypes are "application/xml", "application/x-yaml".]`,
      );
    }

    expect(decode).toHaveBeenCalledTimes(0);
  });

  test('with type decoders', async () => {
    const decode = jest.fn((givenString: string): Data => {
      expect(givenString).toBe('test');

      return {};
    });

    const typeDecoder: TypeDecoder = {
      decode,
      contentType: 'application/json',
    };

    const decoder = createDecoder([typeDecoder]);

    expect(decoder.contentTypes).toMatchInlineSnapshot(`
      Array [
        "application/json",
      ]
    `);

    expect(decoder.decode('test', 'application/json')).toEqual({});
    expect(decode).toHaveBeenCalledTimes(1);
  });
});
