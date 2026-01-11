import { useState, useCallback } from 'react';

export interface UseDatePickerReturn {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  isSelected: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  isWeekend: (date: Date) => boolean;
  getMonthDays: (year: number, month: number) => Date[];
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
  goToToday: () => void;
  currentMonth: number;
  currentYear: number;
}

/**
 * Custom hook for date picker functionality
 *
 * @param initialDate - Initial selected date
 * @returns Date picker state and utilities
 *
 * @example
 * ```tsx
 * const {selectedDate, setSelectedDate, isSelected} = useDatePicker()
 * ```
 */
export function useDatePicker(initialDate?: Date): UseDatePickerReturn {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null);
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());

  const isSelected = useCallback(
    (date: Date) => {
      if (!selectedDate) {
        return false;
      }

      return date.toDateString() === selectedDate.toDateString();
    },
    [selectedDate],
  );

  const isToday = useCallback((date: Date) => {
    const today = new Date();

    return date.toDateString() === today.toDateString();
  }, []);

  const isWeekend = useCallback((date: Date) => {
    const day = date.getDay();

    return day === 0 || day === 6;
  }, []);

  const getMonthDays = useCallback((year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, []);

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  }, [currentMonth]);

  const goToPrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    const today = new Date();

    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    isSelected,
    isToday,
    isWeekend,
    getMonthDays,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    currentMonth,
    currentYear,
  };
}
