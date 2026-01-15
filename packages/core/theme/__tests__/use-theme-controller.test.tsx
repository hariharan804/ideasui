import { renderHook } from '@testing-library/react';

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
});
