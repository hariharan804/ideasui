import { renderHook, act, fireEvent } from '@testing-library/react';
import { useWindowSize } from '../src/use-window-size';

describe('useWindowSize', () => {
  it('should return window size', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  it('should update on resize', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      // Change window size
      Object.assign(window, { innerWidth: 500, innerHeight: 500 });
      fireEvent(window, new Event('resize'));
    });

    expect(result.current).toEqual({
      width: 500,
      height: 500,
    });
  });
});
