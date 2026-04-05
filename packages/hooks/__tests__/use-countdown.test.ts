import { renderHook, act } from '@testing-library/react';

import { useCountdown } from '../src/use-countdown';

const INITIAL_TIME = 60;
const SHORT_COUNTDOWN = 3;
const ONE_SECOND = 1000;
const TWO_SECONDS = 2000;
const THREE_SECONDS = 3000;
const FIVE_SECONDS = 5;
const REMAINING_TIME_TWO = 2;
const REMAINING_TIME_THREE = 3;
const REMAINING_TIME_SEVEN = 7;
const RESET_TIME = 10;

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it('should initialize with provided time', () => {
    const { result } = renderHook(() => useCountdown(INITIAL_TIME));

    expect(result.current.timeLeft).toBe(INITIAL_TIME);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isFinished).toBe(false);
  });

  it('should start countdown', () => {
    const { result } = renderHook(() => useCountdown(SHORT_COUNTDOWN));

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      vi.advanceTimersByTime(ONE_SECOND);
    });

    expect(result.current.timeLeft).toBe(REMAINING_TIME_TWO);
  });

  it('should pause countdown', () => {
    const { result } = renderHook(() => useCountdown(FIVE_SECONDS));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(TWO_SECONDS);
    });

    expect(result.current.timeLeft).toBe(REMAINING_TIME_THREE);

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);

    act(() => {
      vi.advanceTimersByTime(TWO_SECONDS);
    });

    expect(result.current.timeLeft).toBe(REMAINING_TIME_THREE); // Should not change
  });

  it('should reset countdown', () => {
    const { result } = renderHook(() => useCountdown(RESET_TIME));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(THREE_SECONDS);
    });

    expect(result.current.timeLeft).toBe(REMAINING_TIME_SEVEN);

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeLeft).toBe(RESET_TIME);
    expect(result.current.isRunning).toBe(false);
  });

  it('should call onFinish when countdown reaches 0', () => {
    const onFinish = vi.fn();
    const { result } = renderHook(() => useCountdown(REMAINING_TIME_TWO, onFinish));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(TWO_SECONDS);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isFinished).toBe(true);
    expect(result.current.isRunning).toBe(false);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});
