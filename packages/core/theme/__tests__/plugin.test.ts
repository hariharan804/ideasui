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
});
