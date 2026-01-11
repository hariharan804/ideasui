import { ideasUIPlugin } from '../src/index';
import { lightColorTokens, darkColorTokens } from '../src/tokens/colors';
import { lightLayout } from '../src/tokens/layout';
import type { ThemeConfig } from '../src/system/types';

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
    expect(mockPluginAPI.addUtilities).toHaveBeenCalled();
    expect(mockPluginAPI.addVariant).toHaveBeenCalled();
  });

  it('should handle disabled animations', () => {
    const plugin = ideasUIPlugin({ disableAnimations: true });
    plugin.handler(mockPluginAPI);

    const baseCall = mockPluginAPI.addBase.mock.calls.find(
      (call: any) => call[0]['*,*::before,*::after'],
    );
    expect(baseCall).toBeDefined();
  });

  it('should handle invalid configuration gracefully', () => {
    expect(() => {
      ideasUIPlugin({ themes: null as any });
    }).not.toThrow();
  });
});

describe('Color System', () => {
  it('should have valid light color tokens', () => {
    expect(lightColorTokens).toBeDefined();
    expect(lightColorTokens.primary).toBeDefined();
    expect(lightColorTokens.primary['500']).toMatch(/^oklch\(/);
  });

  it('should have valid dark color tokens', () => {
    expect(darkColorTokens).toBeDefined();
    expect(darkColorTokens.primary).toBeDefined();
    expect(darkColorTokens.primary['500']).toMatch(/^oklch\(/);
  });
});

describe('Layout System', () => {
  it('should have valid layout tokens', () => {
    expect(lightLayout).toBeDefined();
    expect(lightLayout.radiusMedium).toBeDefined();
    expect(lightLayout.radiusMedium).toContain('rem');
  });
});
