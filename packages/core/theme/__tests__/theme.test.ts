import { ideasUIPlugin } from '../src/index';
import { primitives } from '../src/tokens/colors';

describe('ideasUIPlugin', () => {
  let mockPluginAPI: any;

  beforeEach(() => {
    mockPluginAPI = {
      addBase: jest.fn(),
      addUtilities: jest.fn(),
      addVariant: jest.fn(),
    };
  });

  it('should create plugin with default configuration', () => {
    const plugin = ideasUIPlugin();

    expect(plugin).toBeDefined();
    expect(typeof plugin.handler).toBe('function');
    expect(plugin.config).toBeDefined();
  });

  it('should generate correct CSS variables', () => {
    const plugin = ideasUIPlugin({ prefix: 'test' });

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
      const theme = call[0][":root, .light, [data-ideasui-theme='light']"] as Record<
        string,
        string
      >;

      return theme && theme['--ideasui-color-primary-500'] === '0.628 0.2577 29.23';
    });

    // Ideally we would check for the exact value, but checking it processed the theme is a good start
    // verifying that custom configuration is passed through
    expect(baseCall).toBeDefined();

    // Ideally we would check for the exact value, but checking it processed the theme is a good start
    // verifying that custom configuration is passed through
    expect(mockPluginAPI.addBase).toHaveBeenCalled();
  });

  it('should generate border tokens', () => {
    const plugin = ideasUIPlugin();

    plugin.handler(mockPluginAPI);

    const baseCall = mockPluginAPI.addBase.mock.calls.find((call: any) => {
      const theme = call[0][":root, .light, [data-ideasui-theme='light']"];

      return theme && theme['--ideasui-border-subtle'] !== undefined;
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
