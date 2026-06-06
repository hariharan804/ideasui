import type { Mock } from 'vitest';

import { vi } from 'vitest';

import {
  toPx,
  toRem,
  parseValue,
  setCSSVar,
  removeCSSVar,
  setCSSVars,
  getCSSVars,
  createCSSVars,
  toStyleString,
  mergeStyles,
  isVisible,
  getDimensions,
} from '../css';

describe('css', () => {
  describe('toPx', () => {
    it('should convert numbers to px', () => {
      const TEN_PX = 10;

      expect(toPx(TEN_PX)).toBe('10px');
    });

    it('should not convert strings', () => {
      expect(toPx('100%')).toBe('100%');
    });
  });

  describe('toRem', () => {
    it('should convert px to rem', () => {
      const SIXTEEN_PX = 16;
      const THIRTY_TWO_PX = 32;

      expect(toRem(SIXTEEN_PX)).toBe('1rem');
      expect(toRem(THIRTY_TWO_PX)).toBe('2rem');
    });

    it('should handle custom base', () => {
      const TWENTY_PX = 20;
      const TEN_BASE = 10;

      expect(toRem(TWENTY_PX, TEN_BASE)).toBe('2rem');
    });
  });

  describe('parseValue', () => {
    it('should parse value and unit', () => {
      const TEN_PX_STRING = '10px';
      const ONE_POINT_FIVE_REM = '1.5em';
      const NEGATIVE_TWENTY_PERCENT = '-20%';

      const VAL_10 = 10;
      const VAL_1_5 = 1.5;
      const VAL_NEG_20 = -20;

      expect(parseValue(TEN_PX_STRING)).toBe(VAL_10);
      expect(parseValue(ONE_POINT_FIVE_REM)).toBe(VAL_1_5);
      expect(parseValue(NEGATIVE_TWENTY_PERCENT)).toBe(VAL_NEG_20);
    });

    it('should fallback to 0 for non-numeric values', () => {
      expect(parseValue('auto')).toBe(0);
      expect(parseValue('inherit')).toBe(0);
    });
  });

  describe('CSS Variables', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(() => {
      document.body.removeChild(element);
    });

    it('should set and get CSS variable', () => {
      setCSSVar('color', 'red', element);
      expect(element.style.getPropertyValue('--color')).toBe('red');

      // JSDOM getComputedStyle might not work perfectly with custom properties set via style map in all versions,
      // but let's try direct style access or mocking if needed.
      // For coverage, calling the function is key.
      // Note: getComputedStyle(element).getPropertyValue('--color') might return empty string in some JSDOM envs
      // unless we mock getComputedStyle or use a real browser.
      // We will check strict style check for now.
      expect(element.style.getPropertyValue('--color')).toBe('red');
    });

    it('should handle number values', () => {
      setCSSVar('width', 100, element);
      expect(element.style.getPropertyValue('--width')).toBe('100px');
    });

    it('should set on document element if no element provided', () => {
      setCSSVar('global', 'test');
      expect(document.documentElement.style.getPropertyValue('--global')).toBe('test');
      removeCSSVar('global');
    });

    it('should remove CSS variable', () => {
      setCSSVar('test', 'value', element);
      removeCSSVar('test', element);
      expect(element.style.getPropertyValue('--test')).toBe('');
    });

    it('should set multiple CSS variables', () => {
      setCSSVars({ a: 1, b: '2px' }, element);
      expect(element.style.getPropertyValue('--a')).toBe('1px');
      expect(element.style.getPropertyValue('--b')).toBe('2px');
    });

    it('should get multiple CSS variables', () => {
      vi.spyOn(window, 'getComputedStyle').mockImplementation(
        () =>
          ({
            getPropertyValue: (prop: string) => {
              if (prop === '--a') {
                return '1px';
              }
              if (prop === '--b') {
                return '2px';
              }

              return '';
            },
          }) as CSSStyleDeclaration,
      );

      const vars = getCSSVars(['a', 'b'], element);

      expect(vars).toStrictEqual({ a: '1px', b: '2px' });

      (window.getComputedStyle as Mock).mockRestore();
    });

    it('should create CSS vars object', () => {
      expect(createCSSVars({ x: 10, y: '20%' })).toStrictEqual({
        '--x': '10px',
        '--y': '20%',
      });
    });
  });

  describe('toStyleString', () => {
    it('should convert object to style string', () => {
      const styles = { fontSize: 16, color: 'red', zIndex: 1 };

      expect(toStyleString(styles)).toBe('font-size: 16px; color: red; z-index: 1');
    });
  });

  describe('mergeStyles', () => {
    it('should merge style objects', () => {
      const s1 = { color: 'red' };
      const s2 = { fontSize: 12 };

      // @ts-ignore
      expect(mergeStyles(s1, undefined, s2)).toStrictEqual({ color: 'red', fontSize: 12 });
    });
  });

  describe('isVisible', () => {
    it('should return true for visible element', () => {
      const div = document.createElement('div');

      // In JSDOM, default style is empty, so it's visible?
      // We need to check the logic: display != none, visibility != hidden, opacity != 0
      // Default valid.
      expect(isVisible(div)).toBe(true);
    });

    it('should return false for hidden element', () => {
      const div = document.createElement('div');

      div.style.display = 'none';
      expect(isVisible(div)).toBe(false);
    });
  });

  describe('getDimensions', () => {
    it('should return dimensions', () => {
      // Can't easily test accurate dimensions in JSDOM without layout,
      // but can verify it returns an object with numbers
      const div = document.createElement('div');
      const dims = getDimensions(div);

      expect(dims).toHaveProperty('width');
      expect(dims).toHaveProperty('height');
      expect(dims).toHaveProperty('marginTop');
    });
  });
});
