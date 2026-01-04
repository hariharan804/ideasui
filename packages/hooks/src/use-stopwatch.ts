import {useState, useEffect, useCallback, useRef} from "react";

export interface UseStopwatchReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  lap: () => number[];
  laps: number[];
}

/**
 * Custom hook for stopwatch functionality
 *
 * @param autoStart - Whether to start automatically
 * @returns Stopwatch state and controls
 *
 * @example
 * ```tsx
 * const {time, start, pause, reset, lap} = useStopwatch()
 * ```
 */
export function useStopwatch(autoStart = false): UseStopwatchReturn {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [laps, setLaps] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const start = useCallback(() => {
    startTimeRef.current = Date.now() - elapsedRef.current;
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
    elapsedRef.current = 0;
  }, []);

  const lap = useCallback(() => {
    const currentTime = time;
    setLaps((prev) => [...prev, currentTime]);
    return [...laps, currentTime];
  }, [time, laps]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      elapsedRef.current = elapsed;
      setTime(elapsed);
    }, 10);

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    lap,
    laps,
  };
}