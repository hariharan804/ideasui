import { renderHook } from '@testing-library/react';

import { useTimeout } from '../src/use-timeout';
const TIMER = 1000;

describe('useTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should call callback after delay', () => {
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, TIMER));

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(TIMER);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should NOT call callback if delay is null', () => {
    const callback = jest.fn();

    renderHook(() => useTimeout(callback, null));

    jest.advanceTimersByTime(TIMER);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should cancel timeout on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimeout(callback, TIMER));

    unmount();
    jest.advanceTimersByTime(TIMER);
    expect(callback).not.toHaveBeenCalled();
  });
});
