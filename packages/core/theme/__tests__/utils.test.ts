import {
  flattenThemeObject,
  escapeSelector,
  kebabCase,
  mapKeys,
  omit,
  rgbToOklch,
  parseColorValue,
  isNumericShade,
} from '../src/system/utils';

// Basic tests for theme utils
describe('Theme Utils', () => {
  describe('flattenThemeObject', () => {
    it('should flatten nested object keys', () => {
      const theme = {
        colors: {
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
          },
          red: '#ff0000',
        },
        spacing: {
          4: '1rem',
        },
      };

      const flattened = flattenThemeObject(theme);

      expect(flattened['colors-primary-50']).toBe('#f0f9ff');
      expect(flattened['colors-red']).toBe('#ff0000');
      expect(flattened['spacing-4']).toBe('1rem');
    });
  });

  describe('escapeSelector', () => {
    it('should escape special characters', () => {
      expect(escapeSelector('.class')).toBe('\\.class');
      expect(escapeSelector('foo@bar')).toBe('foo\\@bar');
    });

    it('should use CSS.escape if available', () => {
      const originalEscape = global.CSS?.escape;

      global.CSS = { escape: jest.fn((str) => `escaped-${str}`) } as any;

      expect(escapeSelector('foo')).toBe('escaped-foo');

      if (originalEscape) {
        global.CSS.escape = originalEscape;
      } else {
        // @ts-ignore
        delete global.CSS;
      }
    });
  });

  describe('kebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(kebabCase('camelCase')).toBe('camel-case');
      expect(kebabCase('PascalCase')).toBe('pascal-case');
      expect(kebabCase('lower')).toBe('lower');
    });
  });

  describe('mapKeys', () => {
    it('should map object keys', () => {
      const obj = { a: 1, b: 2 };
      const result = mapKeys(obj, (val, key) => key.toUpperCase());

      expect(result).toEqual({ A: 1, B: 2 });
    });
  });

  describe('omit', () => {
    it('should omit specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['b']);

      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe('rgbToOklch', () => {
    it('should convert rgb to oklch', () => {
      // White
      const [l, c, h] = rgbToOklch(255, 255, 255);

      expect(l).toBeCloseTo(1, 1);
      expect(c).toBeLessThan(0.01);

      // Black
      const [l2, c2, h2] = rgbToOklch(0, 0, 0);

      expect(l2).toBeCloseTo(0, 1);
    });
  });

  describe('parseColorValue', () => {
    it('should parse hex to oklch', () => {
      const result = parseColorValue('#ffffff');

      expect(result?.cssFn).toBe('oklch');
      expect(result?.components[0]).toBeCloseTo(1, 1);
    });

    it('should parse rgb to oklch', () => {
      const result = parseColorValue('rgb(255, 255, 255)');

      expect(result?.cssFn).toBe('oklch');
    });

    it('should return null for invalid color', () => {
      const result = parseColorValue('invalid');

      expect(result).toBeNull();
    });

    it('should pass through oklch', () => {
      const result = parseColorValue('oklch(0.5 0.5 100)');

      expect(result?.cssFn).toBe('oklch');
      expect(result?.components).toEqual(['0.5', '0.5', '100']);
    });
  });

  describe('isNumericShade', () => {
    it('should return true for numeric shades', () => {
      expect(isNumericShade('50')).toBe(true);
      expect(isNumericShade('500')).toBe(true);
      expect(isNumericShade('950')).toBe(true);
    });

    it('should return false for non-numeric shades', () => {
      expect(isNumericShade('DEFAULT')).toBe(false);
      expect(isNumericShade('on')).toBe(false);
      expect(isNumericShade('123')).toBe(false);
    });
  });
});
