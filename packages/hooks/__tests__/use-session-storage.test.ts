import { renderHook, act } from '@testing-library/react';

import { useSessionStorage } from '../src/use-session-storage';

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('should return initial value', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('should update session storage', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'initial'));

    act(() => {
      result.current[1]('new');
    });

    expect(result.current[0]).toBe('new');
    expect(sessionStorage.getItem('key')).toBe(JSON.stringify('new'));
  });

  it('should init from session storage', () => {
    sessionStorage.setItem('key', JSON.stringify('stored'));
    const { result } = renderHook(() => useSessionStorage('key', 'initial'));

    expect(result.current[0]).toBe('stored');
  });

  it('should safely handle errors', () => {
    // Mock setItem to throw
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Error');
    });
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useSessionStorage('key', 'initial'));

    act(() => {
      result.current[1]('new');
    });

    expect(warnSpy).toHaveBeenCalled();
    expect(result.current[0]).toBe('new'); // state updates even if storage fails

    // cleanup
    setItemSpy.mockRestore();
    warnSpy.mockRestore();
  });
});
