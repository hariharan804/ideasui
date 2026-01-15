import { renderHook, act } from '@testing-library/react';

import { useHover } from '../src/use-hover';

describe('useHover', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useHover());
    const [isHovered, bind] = result.current;

    expect(isHovered).toBe(false);
    expect(bind).toHaveProperty('onMouseEnter');
    expect(bind).toHaveProperty('onMouseLeave');
    expect(bind).toHaveProperty('ref');
  });

  it('should update state on mouse enter', () => {
    const { result } = renderHook(() => useHover());

    act(() => {
      result.current[1].onMouseEnter();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should update state on mouse leave', () => {
    const { result } = renderHook(() => useHover());

    act(() => {
      result.current[1].onMouseEnter();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1].onMouseLeave();
    });
    expect(result.current[0]).toBe(false);
  });
});
