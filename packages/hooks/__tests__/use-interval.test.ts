import { renderHook } from '@testing-library/react';

import { useInterval } from '../src/use-interval';

const INTERVAL_MS = 1000;
const LONG_WAIT_MS = 5000;

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it('should call callback at specified interval', () => {
    const callback = vi.fn();

    renderHook(() => useInterval(callback, INTERVAL_MS));

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(INTERVAL_MS);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(INTERVAL_MS);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should not call callback when delay is null', () => {
    const callback = vi.fn();

    renderHook(() => useInterval(callback, null));

    vi.advanceTimersByTime(LONG_WAIT_MS);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should update callback without restarting interval', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { rerender } = renderHook(({ cb }) => useInterval(cb, INTERVAL_MS), {
      initialProps: { cb: callback1 },
    });

    vi.advanceTimersByTime(INTERVAL_MS);
    expect(callback1).toHaveBeenCalledTimes(1);

    // Test dynamic update
    rerender({ cb: callback2 });

    vi.advanceTimersByTime(INTERVAL_MS);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should clear interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const { unmount } = renderHook(() => useInterval(() => {}, INTERVAL_MS));

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('should clear interval on unmount and prevent further calls', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useInterval(callback, INTERVAL_MS));

    unmount();
    vi.advanceTimersByTime(LONG_WAIT_MS);
    expect(callback).not.toHaveBeenCalled();
  });
});
