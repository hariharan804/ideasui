import { renderHook } from '@testing-library/react';
import { useTheme } from '../src/system/providers/use-theme';
import { themeStore } from '../src/system/providers/utils/store';

describe('useTheme', () => {
  beforeEach(() => {
    themeStore.set({
      theme: 'dark',
      resolved: 'dark',
      themes: ['light', 'dark'],
      systemThemes: { light: 'light', dark: 'dark' },
    });
  });

  it('should return current theme from store', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
  });
});
