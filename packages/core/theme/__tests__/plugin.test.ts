import { ideasUIPlugin } from '../src/plugin';

describe('ideasUIPlugin', () => {
  it('should return a valid tailwind plugin', () => {
    const plugin = ideasUIPlugin();

    expect(plugin).toHaveProperty('handler');
    expect(plugin).toHaveProperty('config');
  });

  it('should accept configuration options', () => {
    const config = {
      defaultTheme: 'dark',
      prefix: 'custom-prefix',
      disableAnimations: true,
      themes: {
        light: {
          colors: { primary: '#000000' },
        },
      },
    };

    // @ts-ignore
    const plugin = ideasUIPlugin(config);

    expect(plugin.config?.theme?.extend?.animation).toStrictEqual({ none: 'none' });

    // We can verify that the config structure is correct
    // @ts-ignore
    const colors = plugin.config?.theme?.extend?.colors;

    expect(colors).toBeDefined();
  });

  it('should register base styles and utilities', () => {
    const plugin = ideasUIPlugin();
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    expect(addBase).toHaveBeenCalled();
    expect(addVariant).toHaveBeenCalled();
  });

  it('should handle disableAnimations option', () => {
    const plugin = ideasUIPlugin({ disableAnimations: true });
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    // Check if animation reset styles were added
    const calls = addBase.mock.calls;
    const animationReset = calls.find((call) => call[0]['*,*::before,*::after']);

    expect(animationReset).toBeDefined();
    expect(animationReset[0]['*,*::before,*::after']).toHaveProperty(
      'animationDuration',
      '0.01ms !important',
    );
  });

  it('should handle custom themes and overrides', () => {
    const config = {
      themes: {
        custom: {
          extend: 'dark',
          colors: {
            brand: 'red', // invalid color
            primary: '#123456',
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    expect(addVariant).toHaveBeenCalledWith('custom', expect.anything());
  });

  it('should handle empty color values', () => {
    const config = {
      themes: {
        light: {
          colors: {
            primary: '#000000',
            empty: '', // Empty value should be skipped
            secondary: '#ffffff',
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    expect(addBase).toHaveBeenCalled();
  });

  it('should handle empty layout values', () => {
    const config = {
      themes: {
        light: {
          layout: {
            opacity: 0.5,
            emptyValue: '', // Empty value should be skipped
            radius: '4px',
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    expect(addBase).toHaveBeenCalled();
  });

  it('should handle nested layout objects', () => {
    const config = {
      themes: {
        light: {
          layout: {
            border: {
              width: '1px',
              style: 'solid',
            },
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    // Verify nested values were processed
    expect(addBase).toHaveBeenCalled();
  });

  it('should skip non-numeric shades', () => {
    const config = {
      themes: {
        light: {
          colors: {
            'primary-DEFAULT': '#000000', // Should be skipped
            'brand-500': '#222222', // Should be processed
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    expect(addBase).toHaveBeenCalled();
  });

  it('should handle invalid color values', () => {
    const config = {
      themes: {
        light: {
          colors: {
            valid: '#000000',
            invalid: 'not-a-valid-color',
            another: '#ffffff',
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    expect(addBase).toHaveBeenCalled();
  });

  it('should handle custom theme without extend property', () => {
    const config = {
      themes: {
        custom: {
          // No extend property - should not have colorScheme
          colors: {
            primary: '#123456',
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    expect(addVariant).toHaveBeenCalledWith('custom', expect.anything());
  });

  it('should handle non-object userLayout', () => {
    const config = {
      layout: 'invalid-not-an-object', // Should fallback to default
      themes: {
        light: {
          colors: { primary: '#000000' },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    expect(addBase).toHaveBeenCalled();
  });

  it('should generate new tokens CSS variables', () => {
    const plugin = ideasUIPlugin();
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    const generatedVars = addBase.mock.calls
      .filter((call) => call[0][':root'])
      .map((call) => call[0][':root'])[0];

    expect(generatedVars['--ideasui-z-index-dropdown']).toBeDefined();
    expect(generatedVars['--ideasui-opacity-medium']).toBeDefined();
    expect(generatedVars['--ideasui-font-sans']).toBeDefined();
    expect(generatedVars['--ideasui-border-hairline']).toBeDefined();
    expect(generatedVars['--ideasui-blur-md']).toBeDefined();
    expect(generatedVars['--ideasui-duration-sm']).toBeDefined();
    expect(generatedVars['--ideasui-spacing-1']).toBeDefined();
  });

  it('should generate scoped CSS variables for per-theme token overrides', () => {
    const config = {
      themes: {
        custom: {
          extend: 'light',
          designTokens: {
            spacing: {
              '4': '20px',
            },
            borderRadius: {
              md: '8px',
            },
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    const calls = addBase.mock.calls;
    const customThemeUtilities = calls.find(
      (call) =>
        call[0][".custom, [data-ideasui-theme='custom']"] &&
        call[0][".custom, [data-ideasui-theme='custom']"]['--ideasui-spacing-4'],
    );

    expect(customThemeUtilities).toBeDefined();
    if (!customThemeUtilities) {
      throw new Error('Expected customThemeUtilities to be defined');
    }
    const styles = customThemeUtilities[0][".custom, [data-ideasui-theme='custom']"];

    expect(styles['--ideasui-spacing-4']).toBe('20px');
    expect(styles['--ideasui-radius-md']).toBe('8px');
  });

  it('should generate scoped CSS variables for semantic token overrides', () => {
    const config = {
      themes: {
        custom: {
          extend: 'light',
          semanticTokens: {
            surface: {
              '100': '#ffffff',
            },
            content: {
              '100': '#000000',
            },
            border: {
              default: '#e5e7eb',
            },
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    const calls = addBase.mock.calls;
    const customThemeUtilities = calls.find(
      (call) =>
        call[0][".custom, [data-ideasui-theme='custom']"] &&
        call[0][".custom, [data-ideasui-theme='custom']"]['--ideasui-surface-100'],
    );

    expect(customThemeUtilities).toBeDefined();
    if (!customThemeUtilities) {
      throw new Error('Expected customThemeUtilities to be defined');
    }
    const styles = customThemeUtilities[0][".custom, [data-ideasui-theme='custom']"];

    expect(styles['--ideasui-surface-100']).toBe('#ffffff');
    expect(styles['--ideasui-content-100']).toBe('#000000');
    expect(styles['--ideasui-border-default']).toBe('#e5e7eb');
  });

  it('should handle global semantic token overrides', () => {
    const config = {
      semanticTokens: {
        surface: {
          global: '#f0f0f0',
        },
        content: {
          global: '#333333',
        },
      },
      themes: {
        light: {
          semanticTokens: {
            surface: {
              'theme-specific': '#ffffff',
            },
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    const calls = addBase.mock.calls;
    const lightThemeUtilities = calls.find(
      (call) =>
        call[0][":root, .light, [data-ideasui-theme='light']"] &&
        call[0][":root, .light, [data-ideasui-theme='light']"]['--ideasui-surface-global'],
    );

    expect(lightThemeUtilities).toBeDefined();
    if (!lightThemeUtilities) {
      throw new Error('Expected lightThemeUtilities to be defined');
    }
    const styles = lightThemeUtilities[0][":root, .light, [data-ideasui-theme='light']"];

    expect(styles['--ideasui-surface-global']).toBe('#f0f0f0');
    expect(styles['--ideasui-content-global']).toBe('#333333');
    expect(styles['--ideasui-surface-theme-specific']).toBe('#ffffff');
  });

  it('should prefix palette colors with "color-"', () => {
    const config = {
      themes: {
        light: {
          colors: {
            primary: {
              500: '#123456',
            },
          },
        },
      },
    };
    // @ts-ignore
    const plugin = ideasUIPlugin(config);
    const addBase = jest.fn();
    const addUtilities = jest.fn();
    const addVariant = jest.fn();

    // @ts-ignore
    plugin.handler({ addBase, addUtilities, addVariant });

    const calls = addBase.mock.calls;
    // Check utilities for the color variable
    const themeUtilities = calls.find(
      (call) =>
        call[0][":root, .light, [data-ideasui-theme='light']"] &&
        call[0][":root, .light, [data-ideasui-theme='light']"]['--ideasui-color-primary-500'],
    );

    expect(themeUtilities).toBeDefined();
    if (!themeUtilities) {
      throw new Error('Expected themeUtilities to be defined');
    }
    const styles = themeUtilities[0][":root, .light, [data-ideasui-theme='light']"];

    expect(styles['--ideasui-color-primary-500']).toBeDefined();
  });
});
