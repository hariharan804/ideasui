import { renderHook, act } from '@testing-library/react';

import { useStopwatch } from '../src/use-stopwatch';

const TIMER = 1000;

describe('useStopwatch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
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
      vi.advanceTimersByTime(TIMER);
    });

    expect(result.current.time).toBe(TIMER);
  });

  it('should pause', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(TIMER);
    });

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.time).toBe(TIMER);

    act(() => {
      vi.advanceTimersByTime(TIMER);
    });

    expect(result.current.time).toBe(TIMER);
  });

  it('should reset', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(TIMER);
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
      vi.advanceTimersByTime(TIMER);
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
