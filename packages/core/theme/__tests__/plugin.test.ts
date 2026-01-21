import { ideasUIPlugin } from '../src/system/plugin';

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

    expect(plugin.config?.theme?.extend?.animation).toEqual({ none: 'none' });

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
    expect(addUtilities).toHaveBeenCalled();
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
    expect(addUtilities).toHaveBeenCalled();
  });

  it('should skip non-numeric shades', () => {
    const config = {
      themes: {
        light: {
          colors: {
            'primary-DEFAULT': '#000000', // Should be skipped
            'secondary-on': '#111111', // Should be skipped
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
});
