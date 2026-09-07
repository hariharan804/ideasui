import { vi } from 'vitest';

import { ideasUIPlugin } from '../src/plugin';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

type MockHandler = {
  addBase: ReturnType<typeof vi.fn>;
  addVariant: ReturnType<typeof vi.fn>;
};

function runHandler(plugin: ReturnType<typeof ideasUIPlugin>): MockHandler {
  const addBase = vi.fn();
  const addVariant = vi.fn();

  // @ts-expect-error — internal handler API
  plugin.handler({ addBase, addVariant });

  return { addBase, addVariant };
}

/** Collect every CSS var object passed to addBase into a flat map */
function flatBaseVariables(
  addBase: ReturnType<typeof vi.fn>,
): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};

  for (const [styles] of addBase.mock.calls) {
    for (const [selector, variables] of Object.entries(styles as Record<string, unknown>)) {
      result[selector] = { ...result[selector], ...(variables as Record<string, string>) };
    }
  }

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Plugin shape
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — plugin shape', () => {
  it('returns an object with handler and config', () => {
    const plugin = ideasUIPlugin();

    expect(plugin).toHaveProperty('handler');
    expect(plugin).toHaveProperty('config');
  });

  it('config.theme.extend.colors is defined', () => {
    const plugin = ideasUIPlugin();
    const colors = plugin.config?.theme?.extend?.colors;

    expect(colors).toBeDefined();
    expect(typeof colors).toBe('object');
  });

  it('exposes Tailwind color references for primary semantic token', () => {
    const plugin = ideasUIPlugin();
    const colors = plugin.config?.theme?.extend?.colors as Record<string, string>;

    expect(colors['primary']).toMatch(/--ideasui-color-primary/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Default token CSS variables
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — default design token CSS variables', () => {
  it('emits custom color overrides when themes config is provided', () => {
    const { addBase } = runHandler(
      ideasUIPlugin({
        themes: {
          light: {
            colors: {
              primary: '0.575 0.214 277.1',
            },
          },
        },
      }),
    );
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";
    const lightVariables = variables[lightSelector];

    expect(lightVariables).toBeDefined();
    expect(lightVariables['--ideasui-color-primary']).toBeDefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// disableAnimations
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — disableAnimations', () => {
  it('adds animation reset to * when disableAnimations: true', () => {
    const { addBase } = runHandler(ideasUIPlugin({ disableAnimations: true }));
    const variables = flatBaseVariables(addBase);
    const reset = variables['*,*::before,*::after'];

    expect(reset).toBeDefined();
    expect(reset['animationDuration']).toBe('0.01ms !important');
    expect(reset['animationIterationCount']).toBe('1 !important');
    expect(reset['transitionDuration']).toBe('0.01ms !important');
  });

  it('does NOT add animation reset when disableAnimations is omitted', () => {
    const { addBase } = runHandler(ideasUIPlugin());
    const variables = flatBaseVariables(addBase);

    expect(variables['*,*::before,*::after']).toBeUndefined();
  });

  it('disableAnimations collapses animation config to { none }', () => {
    const plugin = ideasUIPlugin({ disableAnimations: true });

    expect(plugin.config?.theme?.extend?.animation).toStrictEqual({ none: 'none' });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Theme variants
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — theme variants', () => {
  it('registers light and dark variants by default', () => {
    const { addVariant } = runHandler(ideasUIPlugin());
    const names = addVariant.mock.calls.map(([name]) => name);

    expect(names).toContain('light');
    expect(names).toContain('dark');
  });

  it('registers a custom theme variant', () => {
    const { addVariant } = runHandler(ideasUIPlugin({ themes: { ocean: { colors: {} } } }));
    const names = addVariant.mock.calls.map(([name]) => name);

    expect(names).toContain('ocean');
  });

  it('registers data-theme selector for custom theme', () => {
    const { addVariant } = runHandler(ideasUIPlugin({ themes: { ocean: { colors: {} } } }));
    const oceanCall = addVariant.mock.calls.find(([name]) => name === 'ocean');

    expect(oceanCall).toBeDefined();
    // addVariant receives the selector definition as a string array
    if (!oceanCall) {
      throw new Error('oceanCall must be defined');
    }
    const selectorDef = oceanCall[1] as string[];

    expect(selectorDef.some((s: string) => s.includes("data-theme='ocean'"))).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Color scale CSS variable scoping
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — color overrides', () => {
  it('scopes custom color to the correct theme selector', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          colors: {
            primary: '#3b82f6',
          },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-color-primary']).toBeDefined();
  });

  it('does NOT leak per-theme color override to the dark selector', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          colors: { primary: '#3b82f6' },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";
    const darkSelector = ".dark, [data-theme='dark']";

    expect(variables[lightSelector]['--ideasui-color-primary']).not.toBe(
      variables[darkSelector]['--ideasui-color-primary'],
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Flat semantic token overrides (new flat API)
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — flat semanticTokens overrides', () => {
  it('emits flat semantic token as --ideasui-color-{key}', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          semanticTokens: {
            primary: 'oklch(0.42 0.18 125)',
            'on-primary': 'oklch(0.98 0.02 240)',
            'primary-muted': 'oklch(0.90 0.05 125)',
          },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-color-primary']).toBe('oklch(0.42 0.18 125)');
    expect(variables[lightSelector]['--ideasui-color-on-primary']).toBe('oklch(0.98 0.02 240)');
    expect(variables[lightSelector]['--ideasui-color-primary-muted']).toBe('oklch(0.90 0.05 125)');
  });

  it('emits scrim flat token as --ideasui-color-scrim', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          semanticTokens: { scrim: 'oklch(0 0 0 / 0.45)' },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-color-scrim']).toBe('oklch(0 0 0 / 0.45)');
  });

  it('emits flat surface tokens as --ideasui-color-{key}', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          semanticTokens: {
            surface: 'oklch(1 0 0)',
            'surface-muted': 'oklch(0.97 0 0)',
            'surface-floating': 'oklch(1 0 0)',
          },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-color-surface']).toBe('oklch(1 0 0)');
    expect(variables[lightSelector]['--ideasui-color-surface-muted']).toBe('oklch(0.97 0 0)');
    expect(variables[lightSelector]['--ideasui-color-surface-floating']).toBe('oklch(1 0 0)');
  });

  it('emits flat content tokens as --ideasui-color-{key}', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          semanticTokens: {
            'content-primary': 'oklch(0.1 0 0)',
            'content-secondary': 'oklch(0.3 0 0)',
            'content-disabled': 'oklch(0.7 0 0)',
          },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-color-content-primary']).toBe('oklch(0.1 0 0)');
    expect(variables[lightSelector]['--ideasui-color-content-secondary']).toBe('oklch(0.3 0 0)');
    expect(variables[lightSelector]['--ideasui-color-content-disabled']).toBe('oklch(0.7 0 0)');
  });

  it('emits flat border tokens as --ideasui-color-{key}', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          semanticTokens: {
            border: 'oklch(0.9 0 0)',
            'border-focus': 'oklch(0.55 0.22 268)',
            'border-danger': 'oklch(0.55 0.20 25)',
          },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    // border, border-focus, and border-danger are flat tokens → --ideasui-color-{key}
    expect(variables[lightSelector]['--ideasui-color-border']).toBe('oklch(0.9 0 0)');
    expect(variables[lightSelector]['--ideasui-color-border-focus']).toBe('oklch(0.55 0.22 268)');
    expect(variables[lightSelector]['--ideasui-color-border-danger']).toBe('oklch(0.55 0.20 25)');
  });

  it('scopes flat semantic override to the correct theme selector only', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          semanticTokens: { primary: 'oklch(0.42 0.18 125)' },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";
    const darkSelector = ".dark, [data-theme='dark']";

    // The custom override only appears on the light selector
    expect(variables[lightSelector]['--ideasui-color-primary']).toBe('oklch(0.42 0.18 125)');
    // Dark selector should not receive the light-specific override
    expect(variables[darkSelector]?.['--ideasui-color-primary']).toBeUndefined();
  });

  it('global semanticTokens apply to all themes', () => {
    const plugin = ideasUIPlugin({
      semanticTokens: {
        scrim: 'oklch(0 0 0 / 0.5)',
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";
    const darkSelector = ".dark, [data-theme='dark']";

    expect(variables[lightSelector]['--ideasui-color-scrim']).toBe('oklch(0 0 0 / 0.5)');
    expect(variables[darkSelector]['--ideasui-color-scrim']).toBe('oklch(0 0 0 / 0.5)');
  });

  it('emits grouped semantic token sub-objects as prefixed CSS custom properties', () => {
    const plugin = ideasUIPlugin({
      semanticTokens: {
        content: {
          brand: 'var(--ideasui-color-primary)',
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-color-content-brand']).toBe(
      'var(--ideasui-color-primary)',
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Design token overrides — designTokens
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — designTokens overrides', () => {
  it('scopes spacing override to the correct theme selector', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          designTokens: { spacing: { 4: '20px' } },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-spacing-4']).toBe('20px');
  });

  it('scopes borderRadius override to the correct theme selector', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          designTokens: { borderRadius: { md: '12px' } },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-radius-md']).toBe('12px');
  });

  it('shadow alias emits same CSS vars as boxShadow', () => {
    const shadowValue = '0 4px 12px rgb(0 0 0 / 0.12)';
    const pluginA = ideasUIPlugin({
      themes: { light: { designTokens: { boxShadow: { custom: shadowValue } } } },
    });
    const pluginB = ideasUIPlugin({
      themes: { light: { designTokens: { shadow: { custom: shadowValue } } } },
    });

    const { addBase: addBaseA } = runHandler(pluginA);
    const { addBase: addBaseB } = runHandler(pluginB);
    const lightSelector = ":root, .light, [data-theme='light']";

    const variableA = flatBaseVariables(addBaseA)[lightSelector]['--ideasui-shadow-custom'];
    const variableB = flatBaseVariables(addBaseB)[lightSelector]['--ideasui-shadow-custom'];

    expect(variableA).toBe(shadowValue);
    expect(variableB).toBe(shadowValue);
    expect(variableA).toBe(variableB);
  });

  it('global designTokens apply across both themes', () => {
    const plugin = ideasUIPlugin({
      designTokens: { spacing: { section: '3rem' } },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";
    const darkSelector = ".dark, [data-theme='dark']";

    expect(variables[lightSelector]['--ideasui-spacing-section']).toBe('3rem');
    expect(variables[darkSelector]['--ideasui-spacing-section']).toBe('3rem');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Component overrides
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — component overrides', () => {
  it('converts camelCase CSS property to kebab-case CSS var', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          components: {
            button: {
              base: {
                backgroundColor: 'red',
                borderRadius: '8px',
              },
            },
          },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-button-base-background-color']).toBe('red');
    expect(variables[lightSelector]['--ideasui-button-base-border-radius']).toBe('8px');
  });

  it('handles multiple component nesting levels', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          components: {
            card: {
              header: { fontSize: '14px' },
              footer: { color: '#555' },
            },
          },
        },
      },
    });
    const { addBase } = runHandler(plugin);
    const variables = flatBaseVariables(addBase);
    const lightSelector = ":root, .light, [data-theme='light']";

    expect(variables[lightSelector]['--ideasui-card-header-font-size']).toBe('14px');
    expect(variables[lightSelector]['--ideasui-card-footer-color']).toBe('#555');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Default theme selection
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — defaultTheme', () => {
  it('default theme light styles on :root when defaultTheme=light', () => {
    const { addBase } = runHandler(ideasUIPlugin({ defaultTheme: 'light' }));
    const variables = flatBaseVariables(addBase);

    expect(variables[":root, .light, [data-theme='light']"]).toBeDefined();
  });

  it('default theme dark styles include :root when defaultTheme=dark', () => {
    const { addBase } = runHandler(ideasUIPlugin({ defaultTheme: 'dark' }));
    const variables = flatBaseVariables(addBase);

    expect(variables[":root, .dark, [data-theme='dark']"]).toBeDefined();
  });

  it('non-default theme does not include :root', () => {
    const { addBase } = runHandler(ideasUIPlugin({ defaultTheme: 'dark' }));
    const variables = flatBaseVariables(addBase);
    const lightSelector = ".light, [data-theme='light']";

    expect(variables[lightSelector]).toBeDefined();
    // The non-default light selector must NOT start with :root
    expect(Object.keys(variables)).not.toContain(":root, .light, [data-theme='light']");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Tailwind color palette references
// ─────────────────────────────────────────────────────────────────────────────

describe('ideasUIPlugin — Tailwind color references', () => {
  it('registers CSS var references for semantic colors', () => {
    const colors = ideasUIPlugin().config?.theme?.extend?.colors as Record<string, string>;

    // Semantic colors are registered in the palette referencing their CSS vars
    expect(colors['primary']).toMatch(/--ideasui-color-primary/);
    expect(colors['surface']).toMatch(/--ideasui-color-surface/);
    expect(colors['on-surface']).toMatch(/--ideasui-color-on-surface/);
    expect(colors['content-primary']).toMatch(/--ideasui-color-content-primary/);
    expect(colors['border-base']).toMatch(/--ideasui-color-border-base/);
  });
});
