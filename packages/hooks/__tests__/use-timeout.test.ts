import { renderHook } from '@testing-library/react';
import { useTimeout } from '../src/use-timeout';

describe('useTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should call callback after delay', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should NOT call callback if delay is null', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, null));

    jest.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should cancel timeout on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    unmount();
    jest.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });
});
