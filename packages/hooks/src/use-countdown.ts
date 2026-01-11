import { useState, useEffect, useCallback } from 'react';

export interface UseCountdownReturn {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  isFinished: boolean;
}

/**
 * Custom hook for countdown timer
 *
 * @param initialTime - Initial time in seconds
 * @param onFinish - Callback when countdown reaches 0
 * @returns Countdown state and controls
 *
 * @example
 * ```tsx
 * const {timeLeft, start, pause, reset} = useCountdown(60)
 * ```
 */
export function useCountdown(initialTime: number, onFinish?: () => void): UseCountdownReturn {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onFinish?.();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onFinish]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    isFinished: timeLeft === 0,
  };
}
