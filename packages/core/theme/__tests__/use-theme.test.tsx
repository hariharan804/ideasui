import { renderHook, act } from '@testing-library/react';

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

  it('should allow setting theme', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme('light');
    });

    expect(themeStore.get().theme).toBe('light');
  });

  it('should return correct isDark value', () => {
    act(() => {
      themeStore.set({
        theme: 'light',
        resolved: 'light',
      });
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(false);

    act(() => {
      themeStore.set({
        theme: 'dark',
        resolved: 'dark',
      });
    });

    expect(result.current.isDark).toBe(true);
  });

  it('should return available themes', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.themes).toEqual(['light', 'dark']);
  });

  it('should not update store when setting same theme', () => {
    const { result } = renderHook(() => useTheme());
    const setSpy = jest.spyOn(themeStore, 'set');

    // Current theme is 'dark' from beforeEach
    act(() => {
      result.current.setTheme('dark'); // Same as current
    });

    expect(setSpy).not.toHaveBeenCalled();
    setSpy.mockRestore();
  });
});
