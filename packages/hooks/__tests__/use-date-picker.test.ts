/* eslint-disable no-magic-numbers */
import { renderHook, act } from '@testing-library/react';

import { useDatePicker } from '../src/use-date-picker';

describe('useDatePicker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 0, 15)); // Default to Jan 15 2023
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should initialize with provided date', () => {
    const date = new Date(2023, 5, 1);
    const { result } = renderHook(() => useDatePicker(date));

    expect(result.current.selectedDate).toEqual(date);
  });

  it('should return false for isSelected if selectedDate is null', () => {
    const { result } = renderHook(() => useDatePicker());

    expect(result.current.isSelected(new Date())).toBe(false);
  });

  it('should check if date is selected', () => {
    const date = new Date(2023, 5, 1);
    const { result } = renderHook(() => useDatePicker(date));

    expect(result.current.isSelected(new Date(2023, 5, 1))).toBe(true);
    expect(result.current.isSelected(new Date(2023, 5, 2))).toBe(false);
  });

  it('should go to next month (year rollover)', () => {
    // Mock date to December
    jest.setSystemTime(new Date(2023, 11, 1)); // Dec 1 2023

    const { result } = renderHook(() => useDatePicker(new Date(2023, 11, 1)));

    act(() => {
      result.current.goToNextMonth();
    });

    expect(result.current.currentMonth).toBe(0); // Jan
    expect(result.current.currentYear).toBe(2024);
  });

  it('should go to prev month (year rollover)', () => {
    // Mock date to Jan
    jest.setSystemTime(new Date(2023, 0, 1)); // Jan 1 2023

    const { result } = renderHook(() => useDatePicker(new Date(2023, 0, 1)));

    act(() => {
      result.current.goToPrevMonth();
    });

    expect(result.current.currentMonth).toBe(11); // Dec
    expect(result.current.currentYear).toBe(2022);
  });

  it('should go to today', () => {
    jest.setSystemTime(new Date(2023, 5, 15));

    const { result } = renderHook(() => useDatePicker(new Date(2020, 0, 1))); // Start far away

    act(() => {
      result.current.goToToday();
    });

    expect(result.current.currentMonth).toBe(5);
    expect(result.current.currentYear).toBe(2023);
    // @ts-ignore
    expect(result.current.selectedDate.toDateString()).toBe(new Date(2023, 5, 15).toDateString());
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
