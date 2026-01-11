import { useState, useCallback } from 'react';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface UseDateRangeReturn {
  range: DateRange;
  setStart: (date: Date | null) => void;
  setEnd: (date: Date | null) => void;
  setRange: (range: DateRange) => void;
  clear: () => void;
  isValid: boolean;
  duration: number | null;
}

/**
 * Custom hook for managing date ranges
 *
 * @param initialRange - Initial date range
 * @returns Date range state and controls
 *
 * @example
 * ```tsx
 * const {range, setStart, setEnd, isValid} = useDateRange()
 * ```
 */
export function useDateRange(
  initialRange: DateRange = { start: null, end: null },
): UseDateRangeReturn {
  const [range, setRange] = useState<DateRange>(initialRange);

  const setStart = useCallback((date: Date | null) => {
    setRange((prev) => ({ ...prev, start: date }));
  }, []);

  const setEnd = useCallback((date: Date | null) => {
    setRange((prev) => ({ ...prev, end: date }));
  }, []);

  const clear = useCallback(() => {
    setRange({ start: null, end: null });
  }, []);

  const isValid = range.start !== null && range.end !== null && range.start <= range.end;

  const duration =
    isValid && range.start && range.end ? range.end.getTime() - range.start.getTime() : null;

  return {
    range,
    setStart,
    setEnd,
    setRange,
    clear,
    isValid,
    duration,
  };
}
