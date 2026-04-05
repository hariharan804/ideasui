import { renderHook } from '@testing-library/react';

import { useTimeout } from '../src/use-timeout';
const TIMER = 1000;

describe('useTimeout', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should call callback after delay', () => {
    const callback = vi.fn();

    renderHook(() => useTimeout(callback, TIMER));

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(TIMER);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should NOT call callback if delay is null', () => {
    const callback = vi.fn();

    renderHook(() => useTimeout(callback, null));

    vi.advanceTimersByTime(TIMER);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should cancel timeout on unmount', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useTimeout(callback, TIMER));

    unmount();
    vi.advanceTimersByTime(TIMER);
    expect(callback).not.toHaveBeenCalled();
  });
});
