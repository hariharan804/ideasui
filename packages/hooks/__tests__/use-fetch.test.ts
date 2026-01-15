import { renderHook, act, waitFor } from '@testing-library/react';
import { useFetch } from '../src/use-fetch';

describe('useFetch', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should fetch data successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual({ data: 'test' });
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useFetch('https://api.example.com/error'));

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
    global.AbortController = jest.fn(() => ({
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
