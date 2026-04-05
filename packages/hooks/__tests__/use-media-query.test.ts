import { renderHook, act } from '@testing-library/react';

import { useMediaQuery } from '../src/use-media-query';

describe('useMediaQuery', () => {
  let matchMediaMock: vi.Mock;
  const matches = new Map<string, boolean>();
  const listeners = new Map<string, Set<(event: MediaQueryListEvent) => void>>();
  const CHANGE_EVENT = 'change';

  beforeAll(() => {
    matchMediaMock = vi.fn((query: string) => ({
      matches: matches.get(query) || false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn((type, listener) => {
        if (type === CHANGE_EVENT) {
          if (!listeners.has(query)) {
            listeners.set(query, new Set());
          }
          listeners.get(query)?.add(listener);
        }
      }),
      removeEventListener: vi.fn((type, listener) => {
        if (type === CHANGE_EVENT) {
          listeners.get(query)?.delete(listener);
        }
      }),
      dispatchEvent: vi.fn(),
    }));
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    matches.clear();
    listeners.clear();
  });

  const QUERY = '(min-width: 768px)';

  it('should return false if no match', () => {
    matches.set(QUERY, false);
    const { result } = renderHook(() => useMediaQuery(QUERY));

    expect(result.current).toBe(false);
  });

  it('should return true if match', () => {
    matches.set('(min-width: 1024px)', true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(result.current).toBe(true);
  });

  it('should update on change', () => {
    const MOBILE_QUERY = '(max-width: 600px)';

    matches.set(MOBILE_QUERY, false);
    const { result } = renderHook(() => useMediaQuery(MOBILE_QUERY));

    expect(result.current).toBe(false);

    act(() => {
      const listenersSet = listeners.get(MOBILE_QUERY);

      listenersSet?.forEach((listener) =>
        listener({
          matches: true,
          media: MOBILE_QUERY,
        } as MediaQueryListEvent),
      );
    });

    expect(result.current).toBe(true);
  });
  it('should clean up listener on unmount', () => {
    // Manually create the mock to spy on removeEventListener
    const removeEventListenerSpy = vi.fn();

    matchMediaMock.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerSpy,
      dispatchEvent: vi.fn(),
    }));

    const { unmount } = renderHook(() => useMediaQuery(QUERY));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
