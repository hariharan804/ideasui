/* eslint-disable no-magic-numbers */
import { renderHook, act } from '@testing-library/react';

import { useDatePicker } from '../src/use-date-picker';

describe('useDatePicker', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 0, 15)); // Jan 15 2023 is a Sunday
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should initialize with date', () => {
    const date = new Date(2023, 5, 1);
    const { result } = renderHook(() => useDatePicker(date));

    expect(result.current.selectedDate).toBe(date);
  });

  it('should check if date is selected', () => {
    const date = new Date(2023, 5, 1);
    const { result } = renderHook(() => useDatePicker(date));

    expect(result.current.isSelected(new Date(2023, 5, 1))).toBe(true);
    expect(result.current.isSelected(new Date(2023, 5, 2))).toBe(false);
  });

  it('should navigate months', () => {
    const { result } = renderHook(() => useDatePicker());

    // Starts at current system time (Jan 2023)
    expect(result.current.currentMonth).toBe(0);
    expect(result.current.currentYear).toBe(2023);

    act(() => {
      result.current.goToNextMonth();
    });
    expect(result.current.currentMonth).toBe(1);

    act(() => {
      result.current.goToPrevMonth();
    });
    expect(result.current.currentMonth).toBe(0);

    act(() => {
      result.current.goToPrevMonth(); // Dec 2022
    });
    expect(result.current.currentMonth).toBe(11);
    expect(result.current.currentYear).toBe(2022);
  });

  it('should check today and weekend', () => {
    const { result } = renderHook(() => useDatePicker());

    // Today is Jan 15 2023 (Sunday)
    expect(result.current.isToday(new Date(2023, 0, 15))).toBe(true);
    expect(result.current.isWeekend(new Date(2023, 0, 15))).toBe(true); // Sunday
    expect(result.current.isWeekend(new Date(2023, 0, 16))).toBe(false); // Monday
  });

  it('should get month days', () => {
    const { result } = renderHook(() => useDatePicker());
    const days = result.current.getMonthDays(2023, 0); // Jan 2023 has 31 days

    expect(days).toHaveLength(31);
    expect(days[0].getDate()).toBe(1);
    expect(days[30].getDate()).toBe(31);
  });
});
