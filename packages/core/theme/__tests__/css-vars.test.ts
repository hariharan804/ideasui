import { generateCSSVarsFromTokenOverrides as generateCSVariablesFromTokenOverrides } from '../src/plugin/css-vars';

// ─────────────────────────────────────────────────────────────────────────────
// generateCSSVarsFromTokenOverrides
// ─────────────────────────────────────────────────────────────────────────────

describe('generateCSSVarsFromTokenOverrides', () => {
  // ── Design token categories ──────────────────────────────────────────────

  it('generates --prefix-duration-{key} for duration tokens', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { duration: { fast: '100ms', slow: '500ms' } },
      'ui',
    );

    expect(result['--ui-duration-fast']).toBe('100ms');
    expect(result['--ui-duration-slow']).toBe('500ms');
  });

  it('generates --prefix-easing-{key} for easing tokens', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { easing: { standard: 'cubic-bezier(0.4,0,0.2,1)' } },
      'ui',
    );

    expect(result['--ui-easing-standard']).toBe('cubic-bezier(0.4,0,0.2,1)');
  });

  it('replaces "." with "_" in spacing keys', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { spacing: { '1.5': '0.375rem', '4': '1rem' } },
      'ui',
    );

    expect(result['--ui-spacing-1_5']).toBe('0.375rem');
    expect(result['--ui-spacing-4']).toBe('1rem');
  });

  it('extracts first element from fontSize tuple', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { fontSize: { base: ['1rem', { lineHeight: '1.5' }] } },
      'ui',
    );

    expect(result['--ui-font-size-base']).toBe('1rem');
  });

  it('generates --prefix-radius-{key} for borderRadius tokens', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { borderRadius: { md: '6px', full: '9999px' } },
      'ui',
    );

    expect(result['--ui-radius-md']).toBe('6px');
    expect(result['--ui-radius-full']).toBe('9999px');
  });

  it('generates --prefix-shadow-{key} for boxShadow tokens', () => {
    const shadowValue = '0 2px 4px rgb(0 0 0 / 0.06)';
    const result = generateCSVariablesFromTokenOverrides({ boxShadow: { sm: shadowValue } }, 'ui');

    expect(result['--ui-shadow-sm']).toBe(shadowValue);
  });

  it('shadow alias emits same CSS vars as boxShadow', () => {
    const shadowValue = '0 4px 12px rgb(0 0 0 / 0.10)';
    const byBoxShadow = generateCSVariablesFromTokenOverrides(
      { boxShadow: { lg: shadowValue } },
      'ui',
    );
    const byShadow = generateCSVariablesFromTokenOverrides({ shadow: { lg: shadowValue } }, 'ui');

    expect(byBoxShadow['--ui-shadow-lg']).toBe(shadowValue);
    expect(byShadow['--ui-shadow-lg']).toBe(shadowValue);
  });

  it('generates --prefix-z-index-{key} for zIndex tokens (stringified)', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { zIndex: { dropdown: 1000, modal: 1200 } },
      'ui',
    );

    expect(result['--ui-z-index-dropdown']).toBe('1000');
    expect(result['--ui-z-index-modal']).toBe('1200');
  });

  it('generates --prefix-opacity-{key} for opacity tokens', () => {
    const result = generateCSVariablesFromTokenOverrides({ opacity: { medium: 0.5 } }, 'ui');

    expect(result['--ui-opacity-medium']).toBe('0.5');
  });

  it('generates --prefix-tracking-{key} for letterSpacing tokens', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { letterSpacing: { wide: '0.025em' } },
      'ui',
    );

    expect(result['--ui-tracking-wide']).toBe('0.025em');
  });

  it('generates --prefix-font-{key} for fontFamily tokens', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { fontFamily: { sans: 'ui-sans-serif' } },
      'ui',
    );

    expect(result['--ui-font-sans']).toBe('ui-sans-serif');
  });

  it('generates --prefix-border-{key} for borderWidth tokens', () => {
    const result = generateCSVariablesFromTokenOverrides({ borderWidth: { 2: '2px' } }, 'ui');

    expect(result['--ui-border-2']).toBe('2px');
  });

  it('generates --prefix-blur-{key} for blur tokens', () => {
    const result = generateCSVariablesFromTokenOverrides({ blur: { sm: '4px', md: '8px' } }, 'ui');

    expect(result['--ui-blur-sm']).toBe('4px');
    expect(result['--ui-blur-md']).toBe('8px');
  });

  it('generates --prefix-font-weight-{key} for fontWeight tokens', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { fontWeight: { bold: '700', medium: '500' } },
      'ui',
    );

    expect(result['--ui-font-weight-bold']).toBe('700');
    expect(result['--ui-font-weight-medium']).toBe('500');
  });

  it('generates --prefix-animation-{key} for animation tokens', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { animation: { spin: 'spin 1s linear infinite' } },
      'ui',
    );

    expect(result['--ui-animation-spin']).toBe('spin 1s linear infinite');
  });

  it('generates --prefix-divider-{key} for dividerColors tokens', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { dividerColors: { primary: '#3b82f6' } },
      'ui',
    );

    expect(result['--ui-divider-primary']).toBe('#3b82f6');
  });

  // ── Components ─────────────────────────────────────────────────────────────

  it('converts component camelCase property to kebab-case CSS var', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { components: { button: { base: { backgroundColor: 'red', borderRadius: '8px' } } } },
      'ui',
    );

    expect(result['--ui-button-base-background-color']).toBe('red');
    expect(result['--ui-button-base-border-radius']).toBe('8px');
  });

  it('ignores array values in components', () => {
    const result = generateCSVariablesFromTokenOverrides(
      { components: { arrProp: ['a', 'b'] } },
      'ui',
    );

    expect(Object.keys(result).some((k) => k.includes('arr-prop'))).toBe(false);
  });

  it('does not exceed depth 4 for nested component objects', () => {
    const result = generateCSVariablesFromTokenOverrides(
      {
        components: {
          deep: { l1: { l2: { l3: { l4: { l5: { ignored: true } } } } } },
        },
      },
      'ui',
    );

    // l5 is beyond depth 4 — should not appear
    expect(Object.keys(result).some((k) => k.includes('l5'))).toBe(false);
  });

  // ── Flat semantic tokens ───────────────────────────────────────────────────

  it('emits flat string semantic token as --prefix-color-{key}', () => {
    const result = generateCSVariablesFromTokenOverrides(
      {
        primary: 'oklch(0.55 0.22 268)',
        'on-primary': 'oklch(0.98 0.02 240)',
        'primary-muted': 'oklch(0.90 0.05 268)',
      } as any,
      'ui',
    );

    expect(result['--ui-color-primary']).toBe('oklch(0.55 0.22 268)');
    expect(result['--ui-color-on-primary']).toBe('oklch(0.98 0.02 240)');
    expect(result['--ui-color-primary-muted']).toBe('oklch(0.90 0.05 268)');
  });

  it('emits flat surface/content/border tokens as --prefix-color-{key}', () => {
    const result = generateCSVariablesFromTokenOverrides(
      {
        surface: 'oklch(1 0 0)',
        'surface-muted': 'oklch(0.97 0 0)',
        'content-primary': 'oklch(0.1 0 0)',
        border: 'oklch(0.9 0 0)',
        scrim: 'oklch(0 0 0 / 0.45)',
      } as any,
      'ui',
    );

    expect(result['--ui-color-surface']).toBe('oklch(1 0 0)');
    expect(result['--ui-color-surface-muted']).toBe('oklch(0.97 0 0)');
    expect(result['--ui-color-content-primary']).toBe('oklch(0.1 0 0)');
    expect(result['--ui-color-border']).toBe('oklch(0.9 0 0)');
    expect(result['--ui-color-scrim']).toBe('oklch(0 0 0 / 0.45)');
  });

  it('does NOT emit grouped-key object values as flat color vars', () => {
    // 'surface', 'content', 'border' with object values should not bleed through
    const result = generateCSVariablesFromTokenOverrides({ surface: { bg: '#fff' } as any }, 'ui');

    // The string check ensures only string values get emitted via the flat path
    expect(result['--ui-color-surface']).toBeUndefined();
  });

  // ── Undefined / empty handling ─────────────────────────────────────────────

  it('skips undefined token values', () => {
    const result = generateCSVariablesFromTokenOverrides(
      {
        duration: { fast: undefined },
        spacing: { '4': undefined },
        boxShadow: { sm: undefined },
      } as any,
      'ui',
    );

    expect(result['--ui-duration-fast']).toBeUndefined();
    expect(result['--ui-spacing-4']).toBeUndefined();
    expect(result['--ui-shadow-sm']).toBeUndefined();
  });

  it('returns empty object for empty input', () => {
    const result = generateCSVariablesFromTokenOverrides({}, 'ui');

    expect(Object.keys(result)).toHaveLength(0);
  });
});
