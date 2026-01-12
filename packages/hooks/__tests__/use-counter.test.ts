import { renderHook, act } from '@testing-library/react';

import { useCounter } from '../src/use-counter';

const INITIAL_TEN = 10;
const STEP_TWO = 2;
const START_FIVE = 5;
const TARGET_THREE = 3;
const TARGET_FORTY_TWO = 42;

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useCounter(INITIAL_TEN));

    expect(result.current.count).toBe(INITIAL_TEN);
  });

  it('should increment by step', () => {
    const { result } = renderHook(() => useCounter(0, STEP_TWO));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(STEP_TWO);
  });

  it('should decrement by step', () => {
    const { result } = renderHook(() => useCounter(START_FIVE, STEP_TWO));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(TARGET_THREE);
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(INITIAL_TEN));

    act(() => {
      result.current.increment();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(INITIAL_TEN);
  });

  it('should set specific value', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.set(TARGET_FORTY_TWO);
    });

    expect(result.current.count).toBe(TARGET_FORTY_TWO);
  });
});
