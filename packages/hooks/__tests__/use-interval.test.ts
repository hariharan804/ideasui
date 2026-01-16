import { renderHook } from '@testing-library/react';

import { useInterval } from '../src/use-interval';

const INTERVAL_MS = 1000;
const LONG_WAIT_MS = 5000;

jest.useFakeTimers();

describe('useInterval', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should call callback at specified interval', () => {
    const callback = jest.fn();

    renderHook(() => useInterval(callback, INTERVAL_MS));

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(INTERVAL_MS);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(INTERVAL_MS);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should not call callback when delay is null', () => {
    const callback = jest.fn();

    renderHook(() => useInterval(callback, null));

    jest.advanceTimersByTime(LONG_WAIT_MS);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should update callback without restarting interval', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { rerender } = renderHook(({ cb }) => useInterval(cb, INTERVAL_MS), {
      initialProps: { cb: callback1 },
    });

    jest.advanceTimersByTime(INTERVAL_MS);
    expect(callback1).toHaveBeenCalledTimes(1);

    // Test dynamic update
    rerender({ cb: callback2 });

    jest.advanceTimersByTime(INTERVAL_MS);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should clear interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    const { unmount } = renderHook(() => useInterval(() => {}, INTERVAL_MS));

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('should clear interval on unmount and prevent further calls', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, INTERVAL_MS));

    unmount();
    jest.advanceTimersByTime(LONG_WAIT_MS);
    expect(callback).not.toHaveBeenCalled();
  });
});
