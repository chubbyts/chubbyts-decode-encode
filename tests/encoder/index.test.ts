import { describe, expect, test } from '@jest/globals';
import { Data } from '../../src';
import { createEncoder, TypeEncoder } from '../../src/encoder';
import data from '../data';

describe('createEncoder', () => {
  test('without type encoders', async () => {
    const encoder = createEncoder([]);

    expect(encoder.contentTypes).toMatchInlineSnapshot(`Array []`);

    try {
      encoder.encode(data, 'application/json');
      fail('Excpected error');
    } catch (e) {
      expect(e).toMatchInlineSnapshot(
        `[Error: Unsupported contentType "application/json", supported contentTypes are "".]`,
      );
    }
  });
  test('with type encoders', async () => {
    const encode = jest.fn((givenData: Data) => {
      expect(givenData).toBe(data);

      return 'test';
    });

    const typeEncoder: TypeEncoder = {
      encode,
      contentType: 'application/json',
    };

    const encoder = createEncoder([typeEncoder]);

    expect(encoder.contentTypes).toMatchInlineSnapshot(`
      Array [
        "application/json",
      ]
    `);

    expect(encoder.encode(data, 'application/json')).toBe('test');
    expect(encode).toHaveBeenCalledTimes(1);
  });
});
