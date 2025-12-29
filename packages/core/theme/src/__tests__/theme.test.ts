import { ideasUIPlugin } from '../index';
import { colorTokens, darkColorTokens } from '../tokens/colors';
import type { ThemeConfig } from '../system/types';

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

  it('should handle custom themes', () => {
    const config: ThemeConfig = {
      themes: {
        custom: {
          colors: {
            primary: {
              50: '#f0f9ff',
              500: '#3b82f6',
              950: '#1e3a8a'
            }
          }
        }
      },
      defaultTheme: 'light'
    };

    const plugin = ideasUIPlugin(config);
    expect(plugin).toBeDefined();
  });

  it('should generate correct CSS variables', () => {
    const plugin = ideasUIPlugin({ prefix: 'test' });
    plugin.handler(mockPluginAPI);

    expect(mockPluginAPI.addBase).toHaveBeenCalled();
    expect(mockPluginAPI.addUtilities).toHaveBeenCalled();
    expect(mockPluginAPI.addVariant).toHaveBeenCalled();
  });

  it('should handle disabled animations', () => {
    const plugin = ideasUIPlugin({ disableAnimations: true });
    plugin.handler(mockPluginAPI);

    const baseCall = mockPluginAPI.addBase.mock.calls.find((call: any) => 
      call[0]['*, *::before, *::after']
    );
    expect(baseCall).toBeDefined();
  });

  it('should throw error for invalid configuration', () => {
    expect(() => {
      ideasUIPlugin({ themes: null as any });
    }).toThrow('Invalid themes configuration');
  });
});

describe('Color System', () => {
  it('should have valid color tokens', () => {
    expect(colorTokens).toBeDefined();
    expect(colorTokens.primary).toBeDefined();
    expect(colorTokens.primary['500']).toMatch(/^oklch\(/);
  });

  it('should have dark color tokens', () => {
    expect(darkColorTokens).toBeDefined();
    expect(darkColorTokens.primary).toBeDefined();
    expect(darkColorTokens.primary['500']).toMatch(/^oklch\(/);
  });

  it('should have consistent color scales', () => {
    const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    
    Object.keys(colorTokens).forEach(colorName => {
      const colorScale = colorTokens[colorName as keyof typeof colorTokens];
      shades.forEach(shade => {
        expect(colorScale[shade as keyof typeof colorScale]).toBeDefined();
      });
    });
  });
});