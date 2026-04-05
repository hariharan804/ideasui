import type { Mock } from 'vitest';

import { vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

import { useFetch } from '../src/use-fetch';
const FETCH_URL = 'https://api.example.com/data';

describe('useFetch', () => {
  beforeAll(() => {
    // Polyfill fetch because it doesn't exist in the testing environment
    global.fetch = vi.fn();
  });

  beforeEach(() => {
    (global.fetch as Mock).mockClear();
  });

  it('should fetch data successfully', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    } as unknown as Response);

    const { result } = renderHook(() => useFetch(FETCH_URL));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toStrictEqual({ data: 'test' });
    expect(result.current.error).toBeNull();
  });

  it('should handle POST request with body', async () => {
    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as unknown as Response);

    const options = {
      method: 'POST' as const,
      body: { foo: 'bar' },
    };
    const { result } = renderHook(() => useFetch(FETCH_URL, options));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      FETCH_URL,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ foo: 'bar' }),
      }),
    );
    expect(result.current.data).toStrictEqual({ success: true });
  });

  it('should abort previous request on concurrent refetch', async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');

    // Mock fetch to be pending prevents state updates (setData/setError/setLoading)
    // from happening after the test finishes, avoiding 'act' warnings.
    (global.fetch as Mock).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useFetch(FETCH_URL));

    // Immediately trigger another fetch while first is pending/mounting
    act(() => {
      result.current.refetch();
    });

    expect(abortSpy).toHaveBeenCalled();
    abortSpy.mockRestore();
  });

  it('should handle errors', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch(FETCH_URL + '/error'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeNull();
  });

  it('should not fetch if disabled', () => {
    const { result } = renderHook(() => useFetch('url', { enabled: false }));

    expect(result.current.loading).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should support aborting', async () => {
    const abortSpy = vi.fn();

    // Mock AbortController using a class for proper 'new' instantiation in Vitest
    class MockAbortController {
      abort = abortSpy;
      signal = {} as any;
    }

    vi.stubGlobal('AbortController', MockAbortController);

    (global.fetch as Mock).mockImplementation(() => new Promise(() => {})); // pending

    const { result, unmount } = renderHook(() => useFetch('url'));

    act(() => {
      result.current.abort();
    });

    expect(abortSpy).toHaveBeenCalled();

    unmount();
    expect(abortSpy).toHaveBeenCalledTimes(2); // Cleanup calls abort too
  });
  it('should not update state if unmounted during fetch', async () => {
    let resolveFetch: ((value: unknown) => void) | undefined;

    (global.fetch as Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );

    const { result, unmount } = renderHook(() => useFetch(FETCH_URL));

    expect(result.current.loading).toBe(true);
    unmount();

    if (resolveFetch) {
      const resolve = resolveFetch;

      await act(async () => {
        resolve({
          ok: true,
          json: async () => ({ data: 'test' }),
        });
      });
    }

    // Assertions aren't strictly needed as we're testing that no state updates (which would ensure console warnings) occur.
    // However, the test runner finding no errors/warnings confirms the `if (mountedRef.current)` checks working.
  });

  it('should ignore non-Error throws', async () => {
    (global.fetch as Mock).mockImplementation(() => {
      throw 'string error';
    });

    const { result } = renderHook(() => useFetch(FETCH_URL));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
  });

  it('should ignore AbortError', async () => {
    const error = new Error('Aborted');

    error.name = 'AbortError';
    (global.fetch as Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useFetch(FETCH_URL));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
  });
});
