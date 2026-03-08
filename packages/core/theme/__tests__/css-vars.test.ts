import { generateCSSVarsFromTokenOverrides } from '../src/plugin/css-vars';

describe('css-vars generator', () => {
  describe('generateCSSVarsFromTokenOverrides', () => {
    it('generates variables for all token categories', () => {
      const tokens = {
        duration: { fast: '100ms' },
        easing: { ease: 'ease' },
        spacing: { '1.5': '0.375rem' },
        fontSize: { base: ['1rem', { lineHeight: '1.5' }] },
        borderRadius: { md: '0.375rem' },
        boxShadow: { sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
        zIndex: { 10: 10 },
        components: {
          button: { base: { backgroundColor: 'red', disabledColor: 'gray' } },
          deepNest: { level1: { level2: { level3: { level4: { level5: { ignored: true } } } } } },
          arrayProp: ['should', 'be', 'ignored'],
        },
        opacity: { 50: 0.5 },
        letterSpacing: { wide: '0.025em' },
        fontFamily: { sans: 'ui-sans-serif, system-ui, sans-serif' },
        borderWidth: { 2: '2px' },
        blur: { sm: '4px' },
        fontWeight: { bold: '700' },
        animation: { spin: 'spin 1s linear infinite' },
        borderColor: { red: 'red' },
        surface: { 100: '#fff' },
        content: { 100: '#000' },
        border: { 100: '#eee' },
      };

      // We explicitly bypass typing here to pass exactly what we want to test all branches
      const result = generateCSSVarsFromTokenOverrides(tokens as any, 'ui');

      expect(result['--ui-duration-fast']).toBe('100ms');
      expect(result['--ui-easing-ease']).toBe('ease');
      expect(result['--ui-spacing-1_5']).toBe('0.375rem');
      expect(result['--ui-font-size-base']).toBe('1rem');
      expect(result['--ui-radius-md']).toBe('0.375rem');
      expect(result['--ui-shadow-sm']).toBe('0 1px 2px 0 rgb(0 0 0 / 0.05)');
      expect(result['--ui-z-index-10']).toBe('10');

      // Components
      expect(result['--ui-button-base-background-color']).toBe('red');
      expect(result['--ui-button-base-disabled-color']).toBe('gray');

      expect(result['--ui-opacity-50']).toBe('0.5');
      expect(result['--ui-tracking-wide']).toBe('0.025em');
      expect(result['--ui-font-sans']).toBe('ui-sans-serif, system-ui, sans-serif');
      expect(result['--ui-border-2']).toBe('2px');
      expect(result['--ui-blur-sm']).toBe('4px');
      expect(result['--ui-font-weight-bold']).toBe('700');
      expect(result['--ui-animation-spin']).toBe('spin 1s linear infinite');
      expect(result['--ui-border-red']).toBe('red');
      expect(result['--ui-color-surface-100']).toBe('#fff');
      expect(result['--ui-color-content-100']).toBe('#000');
      expect(result['--ui-border-100']).toBe('#eee');
    });

    it('handles undefined values gracefully', () => {
      const tokens = {
        duration: { fast: undefined },
        easing: { ease: undefined },
        spacing: { '1.5': undefined },
        fontSize: { base: undefined },
        borderRadius: { md: undefined },
        boxShadow: { sm: undefined },
        zIndex: { 10: undefined },
        opacity: { 50: undefined },
        letterSpacing: { wide: undefined },
        fontFamily: { sans: undefined },
        borderWidth: { 2: undefined },
        blur: { sm: undefined },
        fontWeight: { bold: undefined },
        animation: { spin: undefined },
        borderColor: { red: undefined },
        surface: { 100: undefined },
        content: { 100: undefined },
        border: { 100: undefined },
      };

      const result = generateCSSVarsFromTokenOverrides(tokens as any, 'ui');

      expect(Object.keys(result)).toHaveLength(0);
    });

    it('returns empty object when no tokens provided', () => {
      const result = generateCSSVarsFromTokenOverrides({} as any, 'ui');

      expect(Object.keys(result)).toHaveLength(0);
    });
  });
});
