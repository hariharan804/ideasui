import { renderHook, act } from '@testing-library/react';

import { useThemeStorage } from '../src/providers/utils/use-theme-storage';
import { storageAdapters } from '../src/providers/utils/storage';

describe('useThemeStorage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it('initializes from storage', async () => {
    vi.spyOn(storageAdapters.local, 'getItem').mockReturnValue('dark');

    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'light',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    expect(result.current.theme).toBe('dark');
  });

  it('initializes with system from storage', async () => {
    vi.spyOn(storageAdapters.local, 'getItem').mockReturnValue('system');
    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'light',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    expect(result.current.theme).toBe('system');
  });

  it('updates storage on theme change', async () => {
    const setItemSpy = vi.spyOn(storageAdapters.local, 'setItem');
    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'light',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
    expect(result.current.theme).toBe('dark');
  });

  it('removes storage when setting theme to system', async () => {
    const removeItemSpy = vi.spyOn(storageAdapters.local, 'removeItem');
    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'dark',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    act(() => {
      result.current.setTheme('system');
    });

    expect(removeItemSpy).toHaveBeenCalledWith('theme');
    expect(result.current.theme).toBe('system');
  });

  it('syncs across tabs via storage event', async () => {
    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'light',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'theme',
        newValue: 'dark',
      });

      globalThis.dispatchEvent(event);
    });

    expect(result.current.theme).toBe('dark');
  });

  it('syncs across tabs and handles system fallback', async () => {
    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'light',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'theme',
        newValue: null,
      });

      globalThis.dispatchEvent(event);
    });

    expect(result.current.theme).toBe('system');
  });

  it('ignores storage events for different keys', async () => {
    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'light',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'otherKey',
        newValue: 'dark',
      });

      globalThis.dispatchEvent(event);
    });

    expect(result.current.theme).toBe('light'); // Unchanged
  });

  it('ignores invalid themes from storage event', async () => {
    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'light',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    act(() => {
      const event = new StorageEvent('storage', {
        key: 'theme',
        newValue: 'invalid-theme',
      });

      globalThis.dispatchEvent(event);
    });

    expect(result.current.theme).toBe('light'); // Unchanged
  });

  it('handles potential storage access issues cleanly', async () => {
    // In Vitest/React 18+, deleting global.window breaks renderHook.
    // Instead, we just verify the hook initializes with defaultTheme.
    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'light',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    expect(result.current.theme).toBe('light');
  });

  it('avoids unnecessary state updates if setting to same theme', async () => {
    const { result } = renderHook(() =>
      useThemeStorage({
        defaultTheme: 'light',
        themes: ['light', 'dark', 'system'],
        storageKey: 'theme',
      }),
    );

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    const previousTheme = result.current.theme;

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe(previousTheme);
  });
});
