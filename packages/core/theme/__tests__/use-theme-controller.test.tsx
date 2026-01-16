import { renderHook, act } from '@testing-library/react';

import { useThemeController } from '../src/system/providers/use-theme-controller';
import { themeStore } from '../src/system/providers/utils/store';
import { storageAdapters } from '../src/system/providers/utils/storage';

// Mock storage
const mockStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

storageAdapters.local = mockStorage;

describe('useThemeController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store
    themeStore.set({
      theme: 'system',
      resolved: 'light',
      themes: ['light', 'dark'],
      systemThemes: { light: 'light', dark: 'dark' },
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should initialize with default theme', () => {
    // Mock no stored theme
    mockStorage.getItem.mockReturnValue(null);

    renderHook(() => useThemeController());

    // Should default to system -> resolved to light (mocked matchMedia matches: false)
    const state = themeStore.get();

    expect(state.theme).toBe('light');
  });

  it('should load stored theme', () => {
    mockStorage.getItem.mockReturnValue('dark');

    renderHook(() => useThemeController());

    const state = themeStore.get();

    expect(state.theme).toBe('dark');
  });

  it('should update DOM attribute', () => {
    mockStorage.getItem.mockReturnValue('dark');
    renderHook(() => useThemeController({ attribute: 'data-theme' }));

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should handle class attribute', () => {
    mockStorage.getItem.mockReturnValue('dark');
    renderHook(() => useThemeController({ attribute: 'class' }));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('scrolls system theme updates', () => {
    mockStorage.getItem.mockReturnValue(null); // system

    const matchMediaMock = window.matchMedia as jest.Mock;
    const listeners: Record<string, Function> = {};
    let matchesDark = false;

    matchMediaMock.mockImplementation(() => ({
      matches: matchesDark,
      addEventListener: jest.fn((event, cb) => {
        listeners[event] = cb;
      }),
      removeEventListener: jest.fn(),
    }));

    renderHook(() =>
      useThemeController({
        systemThemes: { light: 'light', dark: 'dark' },
        defaultTheme: 'system',
      }),
    );

    expect(themeStore.get().resolved).toBe('light');

    // Simulate system change to dark
    matchesDark = true;

    // Trigger the listener manually if we captured it
    act(() => {
      if (listeners['change']) {
        listeners['change']();
      }
    });

    expect(themeStore.get().resolved).toBe('dark');
  });

  it('syncs across tabs via storage event', () => {
    renderHook(() => useThemeController({ storageKey: 'theme-key' }));

    // Simulate another tab setting theme to 'light'
    const event = new StorageEvent('storage', {
      key: 'theme-key',
      newValue: 'light',
    });

    window.dispatchEvent(event);

    expect(themeStore.get().theme).toBe('light');
  });

  it('cleans up listeners on unmount', () => {
    const removeEventListener = jest.fn();
    const removeMediaListener = jest.fn();

    jest.spyOn(window, 'removeEventListener').mockImplementation(removeEventListener);
    (window.matchMedia as jest.Mock).mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: removeMediaListener,
    });

    const { unmount } = renderHook(() => useThemeController());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('storage', expect.any(Function));
    expect(removeMediaListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('resolves system theme correctly on init', () => {
    mockStorage.getItem.mockReturnValue('system');
    (window.matchMedia as jest.Mock).mockReturnValue({
      matches: true, // prefers dark
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });

    renderHook(() => useThemeController());

    expect(themeStore.get().theme).toBe('system');
    expect(themeStore.get().resolved).toBe('dark');
  });
});
