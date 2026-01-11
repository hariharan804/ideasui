import { renderHook, act } from '@testing-library/react';
import { useDateRange } from '../src/use-date-range';

describe('useDateRange', () => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-01-31');

  it('should initialize with empty range', () => {
    const { result } = renderHook(() => useDateRange());

    expect(result.current.range.start).toBeNull();
    expect(result.current.range.end).toBeNull();
    expect(result.current.isValid).toBe(false);
    expect(result.current.duration).toBeNull();
  });

  it('should initialize with provided range', () => {
    const initialRange = { start: startDate, end: endDate };
    const { result } = renderHook(() => useDateRange(initialRange));

    expect(result.current.range.start).toBe(startDate);
    expect(result.current.range.end).toBe(endDate);
    expect(result.current.isValid).toBe(true);
  });

  it('should set start date', () => {
    const { result } = renderHook(() => useDateRange());

    act(() => {
      result.current.setStart(startDate);
    });

    expect(result.current.range.start).toBe(startDate);
    expect(result.current.range.end).toBeNull();
  });

  it('should set end date', () => {
    const { result } = renderHook(() => useDateRange());

    act(() => {
      result.current.setEnd(endDate);
    });

    expect(result.current.range.start).toBeNull();
    expect(result.current.range.end).toBe(endDate);
  });

  it('should validate range correctly', () => {
    const { result } = renderHook(() => useDateRange());

    // Invalid: only start date
    act(() => {
      result.current.setStart(startDate);
    });
    expect(result.current.isValid).toBe(false);

    // Valid: both dates
    act(() => {
      result.current.setEnd(endDate);
    });
    expect(result.current.isValid).toBe(true);

    // Invalid: end before start
    act(() => {
      result.current.setEnd(new Date('2023-12-01'));
    });
    expect(result.current.isValid).toBe(false);
  });

  it('should calculate duration', () => {
    const { result } = renderHook(() => useDateRange());

    act(() => {
      result.current.setStart(startDate);
      result.current.setEnd(endDate);
    });

    const expectedDuration = endDate.getTime() - startDate.getTime();
    expect(result.current.duration).toBe(expectedDuration);
  });

  it('should clear range', () => {
    const initialRange = { start: startDate, end: endDate };
    const { result } = renderHook(() => useDateRange(initialRange));

    act(() => {
      result.current.clear();
    });

    expect(result.current.range.start).toBeNull();
    expect(result.current.range.end).toBeNull();
    expect(result.current.isValid).toBe(false);
  });
});
