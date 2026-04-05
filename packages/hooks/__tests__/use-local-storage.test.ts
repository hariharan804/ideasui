import { renderHook, act } from '@testing-library/react';

import { useLocalStorage } from '../src/use-local-storage';

// Remove top-level mock definition which conflicts with prototype spying
// The test environment (jsdom) already provides localStorage on window.
// We should spy on Storage.prototype methods directly.

describe('useLocalStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset storage to clean state if needed, though jsdom storage persists
    window.localStorage.clear();
  });

  it('should initialize with default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
  });

  it('should initialize with stored value when localStorage has data', () => {
    window.localStorage.setItem('test-key', JSON.stringify('stored'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('stored');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should remove value from localStorage', () => {
    window.localStorage.setItem('test-key', JSON.stringify('stored'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[2](); // removeValue
    });

    expect(result.current[0]).toBe('default');
    expect(window.localStorage.getItem('test-key')).toBeNull();
  });

  it('should handle localStorage setItem error', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Write Error');
    });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    act(() => {
      result.current[1]('new');
    });

    expect(result.current[0]).toBe('new');
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error setting localStorage'),
      expect.any(Error),
    );

    setItemSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('should handle localStorage removeItem error', () => {
    // @ts-ignore
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('Remove Error');
    });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    act(() => {
      result.current[2](); // removeValue
    });

    expect(result.current[0]).toBe('initial');
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error removing localStorage'),
      expect.any(Error),
    );

    removeItemSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('should handle localStorage getItem error', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Read Error');
    });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    expect(result.current[0]).toBe('initial');
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error reading localStorage'),
      expect.any(Error),
    );

    getItemSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('should handle function-based updates', () => {
    const FIRST_INCREMENT = 1;
    const SECOND_INCREMENT = 10;
    const EXPECTED_FINAL_VALUE = 11;
    const { result } = renderHook(() => useLocalStorage('counter', 0));

    act(() => {
      result.current[1]((prev) => prev + FIRST_INCREMENT);
    });

    expect(result.current[0]).toBe(FIRST_INCREMENT);
    expect(window.localStorage.getItem('counter')).toBe(JSON.stringify(FIRST_INCREMENT));

    act(() => {
      result.current[1]((prev) => prev + SECOND_INCREMENT);
    });

    expect(result.current[0]).toBe(EXPECTED_FINAL_VALUE);
    expect(window.localStorage.getItem('counter')).toBe(JSON.stringify(EXPECTED_FINAL_VALUE));
  });
});
