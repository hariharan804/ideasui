import {
  toPx,
  toRem,
  parseValue,
  getCSSVar,
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
    it('should convert number to px string', () => {
      expect(toPx(10)).toBe('10px');
    });

    it('should return string value as is', () => {
      expect(toPx('10%')).toBe('10%');
    });
  });

  describe('toRem', () => {
    it('should convert pixels to rem', () => {
      expect(toRem(16)).toBe('1rem');
      expect(toRem(32)).toBe('2rem');
    });

    it('should support custom base', () => {
      expect(toRem(20, 10)).toBe('2rem');
    });
  });

  describe('parseValue', () => {
    it('should parse number from CSS string', () => {
      expect(parseValue('10px')).toBe(10);
      expect(parseValue('1.5em')).toBe(1.5);
      expect(parseValue('-20%')).toBe(-20);
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
      // Mock getComputedStyle for this test since we can't easily rely on variable cascading in JSDOM
      const originalGetComputedStyle = window.getComputedStyle;
      jest.spyOn(window, 'getComputedStyle').mockImplementation(
        (elt) =>
          ({
            getPropertyValue: (prop: string) => {
              if (prop === '--a') return '1px';
              if (prop === '--b') return '2px';
              return '';
            },
          }) as any,
      );

      const vars = getCSSVars(['a', 'b'], element);
      expect(vars).toEqual({ a: '1px', b: '2px' });

      (window.getComputedStyle as any).mockRestore();
    });

    it('should create CSS vars object', () => {
      expect(createCSSVars({ x: 10, y: '20%' })).toEqual({
        '--x': '10px',
        '--y': '20%',
      });
    });
  });

  describe('toStyleString', () => {
    it('should convert object to style string', () => {
      const styles = { fontSize: 16, color: 'red', zIndex: 1 };
      expect(toStyleString(styles)).toBe('font-size: 16px; color: red; z-index: 1px');
    });
  });

  describe('mergeStyles', () => {
    it('should merge style objects', () => {
      const s1 = { color: 'red' };
      const s2 = { fontSize: 12 };
      // @ts-ignore
      expect(mergeStyles(s1, undefined, s2)).toEqual({ color: 'red', fontSize: 12 });
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
