import { renderHook, act } from '@testing-library/react';

import { useToggle } from '../src/use-toggle';

describe('useToggle', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it('should toggle value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1](); // toggle
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](); // toggle again
    });

    expect(result.current[0]).toBe(false);
  });

  it('should set specific value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[2](true); // setValue
    });

    expect(result.current[0]).toBe(true);
  });
});
