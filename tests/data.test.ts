import { describe, expect, test } from 'vitest';
import { isArray, isBoolean, isNull, isNumber, isObject, isString } from '../src/data';

describe('data', () => {
  test('isNull', async () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull(null)).toBe(true);
    expect(isNull(true)).toBe(false);
    expect(isNull(1)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull({})).toBe(false);
  });

  test('isBoolean', async () => {
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
  });

  test('isNumber', async () => {
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(1)).toBe(true);
    expect(isNumber('')).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
  });

  test('isString', async () => {
    expect(isString(undefined)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString('')).toBe(true);
    expect(isString([])).toBe(false);
    expect(isString({})).toBe(false);
  });

  test('isArray', async () => {
    expect(isArray(undefined)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });

  test('isObject', async () => {
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject({})).toBe(true);
  });
});
