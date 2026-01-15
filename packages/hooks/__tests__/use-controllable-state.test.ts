import { renderHook, act } from '@testing-library/react';

import { useControllableState } from '../src/use-controllable-state';

describe('useControllableState', () => {
  it('should be uncontrolled if value is undefined', () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 'default' }));

    expect(result.current[0]).toBe('default');

    act(() => {
      result.current[1]('new');
    });
    expect(result.current[0]).toBe('new');
  });

  it('should be controlled if value is defined', () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, onChange }),
      { initialProps: { value: 'controlled' } },
    );

    expect(result.current[0]).toBe('controlled');

    act(() => {
      result.current[1]('new');
    });

    // Value should not change internally
    expect(result.current[0]).toBe('controlled');
    expect(onChange).toHaveBeenCalledWith('new');

    // But should update if prop updates
    rerender({ value: 'new' });
    expect(result.current[0]).toBe('new');
  });

  it('should handle undefined default value', () => {
    const { result } = renderHook(() => useControllableState({}));

    expect(result.current[0]).toBeUndefined();
  });
});
