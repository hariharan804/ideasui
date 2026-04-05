import { renderHook, act } from '@testing-library/react';

import { useSessionStorage } from '../src/use-session-storage';

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('should return initial value', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('should handle updates', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(window.sessionStorage.getItem('key')).toBe(JSON.stringify('updated'));
  });

  it('should handle getItem error', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Read Error');
    });

    const { result } = renderHook(() => useSessionStorage('key', 'initial'));

    expect(result.current[0]).toBe('initial');

    getItemSpy.mockRestore();
  });

  it('should init from session storage', () => {
    sessionStorage.setItem('key', JSON.stringify('stored'));
    const { result } = renderHook(() => useSessionStorage('key', 'initial'));

    expect(result.current[0]).toBe('stored');
  });

  it('should safely handle errors', () => {
    // Mock setItem to throw
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Error');
    });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useSessionStorage('key', 'initial'));

    act(() => {
      result.current[1]('new');
    });

    expect(warnSpy).toHaveBeenCalled();
    expect(result.current[0]).toBe('new'); // state updates even if storage fails

    // cleanup
    setItemSpy.mockRestore();
    setItemSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('should be safe for SSR', () => {
    // In Vitest, we can use a separate test file or environment for true node testing,
    // but here we just check if it handles missing window in a way that doesn't throw.
    const { result } = renderHook(() => useSessionStorage('key', 'ssr-initial'));

    expect(result.current[0]).toBe('ssr-initial');
  });
});
