import { describe, expect, test } from 'vitest';
import { DecodeError } from '../../src/decoder/decoder.js';
import { createNdjsonTypeDecoder } from '../../src/decoder/ndjson-type-decoder.js';
import data from '../data.js';

describe('createNdjsonTypeDecoder', () => {
  test('data', () => {
    const decoder = createNdjsonTypeDecoder();

    expect(decoder.contentType).toBe('application/jsonl');

    expect(decoder.decode(`${JSON.stringify(data)}\n${JSON.stringify(data)}\n`)).toEqual([data, data]);
  });

  test('scalars, arrays and null without trailing line terminator', () => {
    const decoder = createNdjsonTypeDecoder();

    expect(decoder.decode('1\n"value"\ntrue\nnull\n[1,2]\n{"key":"value"}')).toEqual([
      1,
      'value',
      true,
      null,
      [1, 2],
      { key: 'value' },
    ]);
  });

  test('empty', () => {
    const decoder = createNdjsonTypeDecoder();

    expect(decoder.decode('')).toEqual([]);
  });

  test('crlf line endings and surrounding whitespace', () => {
    const decoder = createNdjsonTypeDecoder();

    expect(decoder.decode('{"a":1}\r\n {"b":2} \r\n')).toEqual([{ a: 1 }, { b: 2 }]);
  });

  test.each([
    ['\n', 1],
    ['\r\n', 1],
    ['{"a":1}\n\n{"b":2}\n', 2],
    ['{"a":1}\n\n', 2],
    ['{"a":1}\n\r\n', 2],
    ['{"a":1}\n   \n', 2],
    ['{"a":1}\n\t', 2],
  ])('empty line %j', (encodedData, line) => {
    const decoder = createNdjsonTypeDecoder();

    try {
      decoder.decode(encodedData);
      throw new Error('Expected error');
    } catch (e) {
      expect(e).toBeInstanceOf(DecodeError);
      expect((e as DecodeError).message).toBe(`Line ${line}: empty line`);
    }
  });

  test('ignore empty lines', () => {
    const decoder = createNdjsonTypeDecoder('application/x-ndjson', true);

    expect(decoder.decode('\n{"a":1}\r\n\r\n   \n\t\n{"b":2}\n\n')).toEqual([{ a: 1 }, { b: 2 }]);
  });

  test.each([
    ['﻿', 'BOM'],
    [' ', 'non-breaking space'],
    ['\v', 'vertical tab'],
    ['\f', 'form feed'],
    [' ', 'line separator'],
  ])('non json whitespace only line %j (%s) is not an empty line', (whitespace) => {
    const encodedData = `{"a":1}\n${whitespace}\n{"b":2}\n`;

    for (const decoder of [createNdjsonTypeDecoder(), createNdjsonTypeDecoder('application/jsonl', true)]) {
      try {
        decoder.decode(encodedData);
        throw new Error('Expected error');
      } catch (e) {
        expect(e).toBeInstanceOf(DecodeError);
        expect((e as DecodeError).message).toMatch(/^Line 2: /);
        expect((e as DecodeError).message).not.toBe('Line 2: empty line');
        expect((e as DecodeError).stack).toContain('SyntaxError');
      }
    }
  });

  test('pretty printed json is not ndjson', () => {
    const decoder = createNdjsonTypeDecoder();

    expect(() => decoder.decode('{\n"key":"value"\n}')).toThrow(DecodeError);
  });

  test('byte order mark', () => {
    const decoder = createNdjsonTypeDecoder();

    expect(() => decoder.decode('﻿{"a":1}\n')).toThrow(/^Line 1: /);
  });

  test('syntax error with line number', () => {
    const decoder = createNdjsonTypeDecoder();

    try {
      decoder.decode('{"a":1}\n{"b":2}\n{"c":');
      throw new Error('Expected error');
    } catch (e) {
      expect(e).toBeInstanceOf(DecodeError);
      expect((e as DecodeError).message).toMatch(/^Line 3: /);
      expect((e as DecodeError).stack).toContain('SyntaxError');
    }
  });

  test('with custom content type', () => {
    const decoder = createNdjsonTypeDecoder('application/x-ndjson');

    expect(decoder.contentType).toBe('application/x-ndjson');

    expect(decoder.decode('{"a":1}\n{"b":2}\n')).toEqual([{ a: 1 }, { b: 2 }]);
  });
});
