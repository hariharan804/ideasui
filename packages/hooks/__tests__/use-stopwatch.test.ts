import { renderHook, act } from '@testing-library/react';

import { useStopwatch } from '../src/use-stopwatch';

describe('useStopwatch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(0);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useStopwatch());

    expect(result.current.time).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('should start and track time', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe(1000);
  });

  it('should pause', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.time).toBe(1000);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe(1000);
  });

  it('should reset', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.time).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.laps).toHaveLength(0);
  });

  it('should record laps', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.lap();
    });

    expect(result.current.laps).toHaveLength(1);
    expect(result.current.laps[0]).toBeGreaterThan(0);
  });

  it('should auto start', () => {
    const { result } = renderHook(() => useStopwatch(true));

    expect(result.current.isRunning).toBe(true);
  });
});
