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
