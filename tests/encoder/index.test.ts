import { describe, expect, test } from '@jest/globals';
import { Data } from '../../src';
import { createEncoder, TypeEncoder } from '../../src/encoder';
import data from '../data';

describe('createEncoder', () => {
  test('without type encoders', async () => {
    const encoder = createEncoder([]);

    expect(encoder.contentTypes).toMatchInlineSnapshot(`[]`);

    try {
      encoder.encode(data, 'application/json');
      fail('Expected error');
    } catch (e) {
      expect(e).toMatchInlineSnapshot(
        `[Error: Unsupported contentType "application/json", supported contentTypes are "".]`,
      );
    }
  });

  test('without matching type encoders', async () => {
    const encode = jest.fn((givenData: Data) => {
      expect(givenData).toBe(data);

      return 'test';
    });

    const xmlTypeEncoder: TypeEncoder = {
      encode,
      contentType: 'application/xml',
    };

    const yamlTypeEncoder: TypeEncoder = {
      encode,
      contentType: 'application/x-yaml',
    };

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
        `[Error: Unsupported contentType "application/json", supported contentTypes are "application/xml", "application/x-yaml".]`,
      );
    }

    expect(encode).toHaveBeenCalledTimes(0);
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
      [
        "application/json",
      ]
    `);

    expect(encoder.encode(data, 'application/json')).toBe('test');
    expect(encode).toHaveBeenCalledTimes(1);
  });
});
