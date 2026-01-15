import { renderHook, act } from '@testing-library/react';
import { useNow } from '../src/use-now';

describe('useNow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 0, 1, 10, 0, 0));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return current date', () => {
    const { result } = renderHook(() => useNow());
    expect(result.current).toEqual(new Date(2023, 0, 1, 10, 0, 0));
  });

  it('should update periodically', () => {
    const { result } = renderHook(() => useNow(1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.getTime()).toBeGreaterThan(new Date(2023, 0, 1, 10, 0, 0).getTime());
  });
});
