import { renderHook, act, waitFor } from '@testing-library/react';

import { useFetch } from '../src/use-fetch';
const FETCH_URL = 'https://api.example.com/data';

describe('useFetch', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation();
  });

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should fetch data successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
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
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as unknown as Response);

    const { result } = renderHook(() =>
      useFetch(FETCH_URL, {
        method: 'POST',
        body: { foo: 'bar' },
      }),
    );

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
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

    // Mock fetch to be pending prevents state updates (setData/setError/setLoading)
    // from happening after the test finishes, avoiding 'act' warnings.
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useFetch(FETCH_URL));

    // Immediately trigger another fetch while first is pending/mounting
    act(() => {
      result.current.refetch();
    });

    expect(abortSpy).toHaveBeenCalled();
    abortSpy.mockRestore();
  });

  it('should handle errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
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
    const abortSpy = jest.fn();

    // @ts-ignore
    jest.spyOn(global, 'AbortController').mockImplementation(() => ({
      abort: abortSpy,
      signal: {},
    }));

    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // pending

    const { result, unmount } = renderHook(() => useFetch('url'));

    act(() => {
      result.current.abort();
    });

    expect(abortSpy).toHaveBeenCalled();

    unmount();
    expect(abortSpy).toHaveBeenCalledTimes(2); // Cleanup calls abort too
  });
});
