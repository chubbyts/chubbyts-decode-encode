import { describe, expect, test } from 'vitest';
import { EncodeError } from '../../src/encoder/encoder.js';
import { createNdjsonTypeEncoder } from '../../src/encoder/ndjson-type-encoder.js';
import data from '../data.js';

describe('createNdjsonTypeEncoder', () => {
  test('data', () => {
    const encoder = createNdjsonTypeEncoder();

    expect(encoder.contentType).toBe('application/jsonl');

    expect(encoder.encode([data, data])).toBe(`${JSON.stringify(data)}\n${JSON.stringify(data)}\n`);
  });

  test('scalars, arrays and null', () => {
    const encoder = createNdjsonTypeEncoder();

    expect(encoder.encode([1, 'value', true, null, [1, 2], { key: 'value' }])).toBe(
      '1\n"value"\ntrue\nnull\n[1,2]\n{"key":"value"}\n',
    );
  });

  test('newlines within strings are escaped', () => {
    const encoder = createNdjsonTypeEncoder();

    expect(encoder.encode([{ key: 'line1\nline2' }])).toBe('{"key":"line1\\nline2"}\n');
  });

  test('empty', () => {
    const encoder = createNdjsonTypeEncoder();

    expect(encoder.encode([])).toBe('');
  });

  test.each([
    [{ key: 'value' }, '{"key":"value"}'],
    ['value', '"value"'],
    [1, '1'],
    [true, 'true'],
    [null, 'null'],
  ])('unsupported value %j', (value, encodedValue) => {
    const encoder = createNdjsonTypeEncoder();

    try {
      encoder.encode(value);
      throw new Error('Expected error');
    } catch (e) {
      expect(e).toBeInstanceOf(EncodeError);
      expect((e as EncodeError).message).toBe(`Unsupported value: ${encodedValue}, expected an array`);
    }
  });

  test('with custom content type', () => {
    const encoder = createNdjsonTypeEncoder('application/x-ndjson');

    expect(encoder.contentType).toBe('application/x-ndjson');

    expect(encoder.encode([{ a: 1 }, { b: 2 }])).toBe('{"a":1}\n{"b":2}\n');
  });
});
