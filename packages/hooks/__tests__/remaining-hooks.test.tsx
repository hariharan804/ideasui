import { renderHook, act, waitFor, render, fireEvent } from '@testing-library/react';

import { useAsync, useFocusTrap, useThrottle, useUpdateEffect } from '../src/remaining-hooks';

describe('remaining hooks', () => {
  describe('useAsync', () => {
    it('should execute async function', async () => {
      const asyncFn = jest.fn().mockResolvedValue('success');
      const { result } = renderHook(() => useAsync(asyncFn));

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeNull();

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.data).toBe('success');
    });

    it('should handle error', async () => {
      const error = new Error('fail');
      const asyncFn = jest.fn().mockRejectedValue(error);
      const { result } = renderHook(() => useAsync(asyncFn));

      expect(result.current.loading).toBe(true);

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toBe(error);
    });
  });

  describe('useFocusTrap', () => {
    it('should trap focus', () => {
      const TestComponent = () => {
        const ref = useFocusTrap<HTMLDivElement>(true);

        return (
          <div ref={ref} data-testid="trap">
            <input data-testid="first" />
            <input data-testid="second" />
            <button data-testid="last">Submit</button>
          </div>
        );
      };

      const { getByTestId } = render(<TestComponent />);
      const first = getByTestId('first');
      const last = getByTestId('last');

      first.focus();
      expect(document.activeElement).toBe(first);

      // Shift+Tab on first element -> should go to last
      fireEvent.keyDown(first, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(last);

      // Tab on last element -> should go to first
      fireEvent.keyDown(last, { key: 'Tab', shiftKey: false });
      expect(document.activeElement).toBe(first);
    });
  });

  describe('useThrottle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    it('should throttle value', () => {
      const { result, rerender } = renderHook(({ value }) => useThrottle(value, 1000), {
        initialProps: { value: 'initial' },
      });

      expect(result.current).toBe('initial');

      rerender({ value: 'updated' });
      expect(result.current).toBe('initial');

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current).toBe('updated');
    });
  });

  describe('useUpdateEffect', () => {
    it('should run only on updates', () => {
      const effect = jest.fn();
      const { rerender } = renderHook(({ dep }) => useUpdateEffect(effect, [dep]), {
        initialProps: { dep: 1 },
      });

      expect(effect).not.toHaveBeenCalled();

      rerender({ dep: 2 });
      expect(effect).toHaveBeenCalledTimes(1);
    });
  });
});
