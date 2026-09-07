import { ideasUIPlugin } from '../src/index';

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
            primary: '#ff0000',
          },
        },
      },
    });

    plugin.handler(mockPluginAPI);

    const baseCall = mockPluginAPI.addBase.mock.calls.find((call: Record<string, unknown>[]) => {
      const theme = call[0][":root, .light, [data-theme='light']"] as Record<string, string>;

      return theme && theme['--ideasui-color-primary'] === '0.628 0.2577 29.23';
    });

    expect(baseCall).toBeDefined();
    expect(mockPluginAPI.addBase).toHaveBeenCalled();
  });
});
