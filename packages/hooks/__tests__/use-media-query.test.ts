import { renderHook, act } from '@testing-library/react';

import { useMediaQuery } from '../src/use-media-query';

describe('useMediaQuery', () => {
  let matchMediaMock: jest.Mock;
  const matches = new Map<string, boolean>();
  const listeners = new Map<string, Set<(event: MediaQueryListEvent) => void>>();

  beforeAll(() => {
    matchMediaMock = jest.fn((query: string) => ({
      matches: matches.get(query) || false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn((type, listener) => {
        if (type === 'change') {
          if (!listeners.has(query)) {
            listeners.set(query, new Set());
          }
          listeners.get(query)?.add(listener);
        }
      }),
      removeEventListener: jest.fn((type, listener) => {
        if (type === 'change') {
          listeners.get(query)?.delete(listener);
        }
      }),
      dispatchEvent: jest.fn(),
    }));
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    matches.clear();
    listeners.clear();
  });

  it('should return false if no match', () => {
    matches.set('(min-width: 768px)', false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(false);
  });

  it('should return true if match', () => {
    matches.set('(min-width: 1024px)', true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(result.current).toBe(true);
  });

  it('should update on change', () => {
    matches.set('(max-width: 600px)', false);
    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));

    expect(result.current).toBe(false);

    act(() => {
      const listenersSet = listeners.get('(max-width: 600px)');

      listenersSet?.forEach((listener) =>
        listener({
          matches: true,
          media: '(max-width: 600px)',
        } as MediaQueryListEvent),
      );
    });

    expect(result.current).toBe(true);
  });
});
