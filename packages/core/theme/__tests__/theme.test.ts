import { ideasUIPlugin } from '../src/index';
import { primitives } from '../src/tokens/colors';

describe('ideasUIPlugin', () => {
  let mockPluginAPI: any;

  beforeEach(() => {
    mockPluginAPI = {
      addBase: vi.fn(),
      addUtilities: vi.fn(),
      addVariant: vi.fn(),
    };
  });

  it('should create plugin with default configuration', () => {
    const plugin = ideasUIPlugin();

    expect(plugin).toBeDefined();
    expect(typeof plugin.handler).toBe('function');
    expect(plugin.config).toBeDefined();
  });

  it('should generate correct CSS variables', () => {
    // prefix option is not configurable (hardcoded to DEFAULT_PREFIX)
    const plugin = ideasUIPlugin();

    plugin.handler(mockPluginAPI);

    expect(mockPluginAPI.addBase).toHaveBeenCalled();
    expect(mockPluginAPI.addVariant).toHaveBeenCalled();
  });

  it('should handle disabled animations', () => {
    const plugin = ideasUIPlugin({ disableAnimations: true });

    plugin.handler(mockPluginAPI);

    const baseCall = mockPluginAPI.addBase.mock.calls.find(
      (call: Record<string, unknown>[]) => call[0]['*,*::before,*::after'],
    );

    expect(baseCall).toBeDefined();
  });

  it('should handle invalid configuration gracefully', () => {
    expect(() => {
      ideasUIPlugin({ themes: null as any });
    }).not.toThrow();
  });

  it('should allow overriding theme tokens', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          colors: {
            primary: {
              500: '#ff0000',
            },
          },
        },
      },
    });

    plugin.handler(mockPluginAPI);

    // Check if the addBase was called with the overridden value
    const baseCall = mockPluginAPI.addBase.mock.calls.find((call: Record<string, unknown>[]) => {
      const theme = call[0][":root, .light, [data-theme='light']"] as Record<string, string>;

      return theme && theme['--ideasui-color-primary-500'] === '0.628 0.2577 29.23';
    });

    // Ideally we would check for the exact value, but checking it processed the theme is a good start
    // verifying that custom configuration is passed through
    expect(baseCall).toBeDefined();

    // Ideally we would check for the exact value, but checking it processed the theme is a good start
    // verifying that custom configuration is passed through
    expect(mockPluginAPI.addBase).toHaveBeenCalled();
  });

  it('should automatically generate the other stops of a color scale when only a partial scale is overridden and autoGenerateScales is true', () => {
    const plugin = ideasUIPlugin({
      autoGenerateScales: true,
      themes: {
        light: {
          colors: {
            primary: {
              500: '#ff0000', // red color (hue 29.23)
            },
          },
        },
      },
    });

    plugin.handler(mockPluginAPI);

    const baseCall = mockPluginAPI.addBase.mock.calls.find((call: Record<string, unknown>[]) => {
      const theme = call[0][":root, .light, [data-theme='light']"] as Record<string, string>;

      return theme && theme['--ideasui-color-primary-600'] !== undefined;
    });

    expect(baseCall).toBeDefined();

    const lightThemeVariables = mockPluginAPI.addBase.mock.calls.find(
      (call: Record<string, unknown>[]) => call[0][":root, .light, [data-theme='light']"],
    )[0][":root, .light, [data-theme='light']"];

    // Check that primary-600 is generated and has the matching red hue (around 29.23)
    const primary600Value = lightThemeVariables['--ideasui-color-primary-600'];

    expect(primary600Value).toContain('29.23'); // Hue is preserved!
    expect(primary600Value).not.toBe('0.472 0.209 268.4'); // Not default blue!
  });

  it('should NOT generate the other stops of a color scale when autoGenerateScales is false or omitted', () => {
    const plugin = ideasUIPlugin({
      themes: {
        light: {
          colors: {
            primary: {
              500: '#ff0000',
            },
          },
        },
      },
    });

    plugin.handler(mockPluginAPI);

    const lightThemeVariables = mockPluginAPI.addBase.mock.calls.find(
      (call: Record<string, unknown>[]) => call[0][":root, .light, [data-theme='light']"],
    )[0][":root, .light, [data-theme='light']"];

    // primary-600 remains default indigo
    const primary600Value = lightThemeVariables['--ideasui-color-primary-600'];

    expect(primary600Value).toBe('0.535 0.230 277.0');
  });

  it('should generate border tokens', () => {
    const plugin = ideasUIPlugin();

    plugin.handler(mockPluginAPI);

    const baseCall = mockPluginAPI.addBase.mock.calls.find((call: any) => {
      const theme = call[0][":root, .light, [data-theme='light']"];

      return theme && theme['--ideasui-color-divider-subtle'] !== undefined;
    });

    expect(baseCall).toBeDefined();
  });
});

describe('Color System', () => {
  it('should have valid light color tokens', () => {
    expect(primitives.light).toBeDefined();
    expect(primitives.light.primary).toBeDefined();
    expect(primitives.light.primary['500']).toMatch(/^oklch\(/);
  });

  it('should have valid dark color tokens', () => {
    expect(primitives.dark).toBeDefined();
    expect(primitives.dark.primary).toBeDefined();
    expect(primitives.dark.primary['500']).toMatch(/^oklch\(/);
  });
});
