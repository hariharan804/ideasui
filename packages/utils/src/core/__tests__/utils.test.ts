/* eslint-disable no-magic-numbers */
import { getUniqueID, clamp, isNumeric, toNumber, range, omit, pick } from '../utils';

describe('utils', () => {
  describe('getUniqueID', () => {
    it('should generate a unique ID with default prefix', () => {
      const id = getUniqueID();

      expect(id).toMatch(/^ideasui\d+-\w{9}$/);
    });

    it('should generate a unique ID with custom prefix', () => {
      const id = getUniqueID('custom');

      expect(id).toMatch(/^custom\d+-\w{9}$/);
    });

    it('should generate unique IDs', () => {
      const id1 = getUniqueID();
      const id2 = getUniqueID();

      expect(id1).not.toBe(id2);
    });
  });

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should clamp value to min if less than min', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should clamp value to max if greater than max', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('isNumeric', () => {
    it('should return true for numbers', () => {
      expect(isNumeric(123)).toBe(true);
      expect(isNumeric(0)).toBe(true);
      expect(isNumeric(-123)).toBe(true);
      expect(isNumeric(1.23)).toBe(true);
    });

    it('should return true for numeric strings', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('0')).toBe(true);
      expect(isNumeric('-123')).toBe(true);
      expect(isNumeric('1.23')).toBe(true);
    });

    it('should return false for non-numeric values', () => {
      expect(isNumeric('abc')).toBe(false);
      expect(isNumeric(null)).toBe(false);
      expect(isNumeric(undefined)).toBe(false);
      expect(isNumeric({})).toBe(false);
      expect(isNumeric([])).toBe(false);
      expect(isNumeric(NaN)).toBe(false);
      expect(isNumeric(Infinity)).toBe(false);
    });

    it('should return false for empty string or whitespace', () => {
      expect(isNumeric('')).toBe(false);
      expect(isNumeric(' ')).toBe(false);
    });
  });

  describe('toNumber', () => {
    it('should convert numeric value to number', () => {
      expect(toNumber(123)).toBe(123);
      expect(toNumber('123')).toBe(123);
    });

    it('should return fallback if value is not numeric', () => {
      expect(toNumber('abc', 0)).toBe(0);
      expect(toNumber(null, 10)).toBe(10);
    });

    it('should use default fallback of 0', () => {
      expect(toNumber('abc')).toBe(0);
    });
  });

  describe('range', () => {
    it('should create range from 0 to end', () => {
      expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('should create range from start to end', () => {
      expect(range(2, 5)).toEqual([2, 3, 4]);
    });

    it('should create range with step', () => {
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    });
  });

  describe('omit', () => {
    it('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['b']);

      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should return new object', () => {
      const obj = { a: 1, b: 2 };
      const result = omit(obj, ['b']);

      expect(result).not.toBe(obj);
    });
  });

  describe('pick', () => {
    it('should pick specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = pick(obj, ['a', 'c']);

      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should ignore keys that do not exist', () => {
      const obj = { a: 1, b: 2 };
      // @ts-ignore
      const result = pick(obj, ['a', 'c']);

      expect(result).toEqual({ a: 1 });
    });
  });
});
