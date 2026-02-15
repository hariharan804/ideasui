import type { ReactNode, ReactElement } from 'react';

import { renderHook, act } from '@testing-library/react';

import { ThemeProvider } from '../src/system/providers/theme-provider';
import { useTheme } from '../src/system/providers/use-theme';

// Helper wrapper component
function wrapper({ children }: { children: ReactNode }): ReactElement {
  return (
    <ThemeProvider defaultTheme="dark" themes={['light', 'dark']}>
      {children}
    </ThemeProvider>
  );
}

describe('useTheme', () => {
  it('should return current theme from context', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
  });

  it('should allow setting theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');
    expect(result.current.resolvedTheme).toBe('light');
  });

  it('should return correct isDark value', () => {
    // Use light theme to start
    function lightWrapper({ children }: { children: ReactNode }): ReactElement {
      return (
        <ThemeProvider defaultTheme="light" themes={['light', 'dark']}>
          {children}
        </ThemeProvider>
      );
    }

    const { result } = renderHook(() => useTheme(), { wrapper: lightWrapper });

    // Initially light
    expect(result.current.isDark).toBe(false);

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.isDark).toBe(true);
  });

  it('should return available themes', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.themes).toContain('light');
    expect(result.current.themes).toContain('dark');
  });

  it('should not update when setting same theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    const initialTheme = result.current.theme;

    act(() => {
      result.current.setTheme(initialTheme); // Same as current
    });

    expect(result.current.theme).toBe(initialTheme);
  });

  it('should throw error when used outside ThemeProvider', () => {
    // Don't use wrapper
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useThemeContext must be used within ThemeProvider');
  });
});
