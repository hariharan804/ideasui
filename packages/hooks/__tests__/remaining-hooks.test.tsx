import type { JSX } from 'react';

import { renderHook, act, waitFor, render } from '@testing-library/react';

import {
  useAsync,
  useFocusTrap,
  useThrottle,
  useUpdateEffect,
  useIsomorphicLayoutEffect,
} from '../src/remaining-hooks';

describe('remaining hooks', () => {
  describe('useIsomorphicLayoutEffect', () => {
    it('should be defined', () => {
      expect(useIsomorphicLayoutEffect).toBeDefined();
    });
  });

  describe('useAsync', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

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

    it('should ignore result if unmounted', async () => {
      const promise = new Promise<string>((resolve) => setTimeout(() => resolve('data'), 100));
      const { result, unmount } = renderHook(() => useAsync(() => promise));

      expect(result.current.loading).toBe(true);

      unmount();

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      // Should not throw or update state (which would warn)
    });

    it('should ignore error if unmounted', async () => {
      const promise = new Promise<string>((_, reject) =>
        setTimeout(() => reject(new Error('fail')), 100),
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { result, unmount } = renderHook(() => useAsync(() => promise));

      unmount();

      await act(async () => {
        jest.advanceTimersByTime(100);
      });
    });
  });

  describe('useFocusTrap', () => {
    const TestComponent = ({ enabled = true }: { enabled?: boolean }): JSX.Element => {
      const ref = useFocusTrap<HTMLDivElement>(enabled);

      return (
        <div ref={ref} data-testid="trap">
          <input data-testid="first" />
          <input data-testid="second" />
          <button data-testid="last">Submit</button>
        </div>
      );
    };

    it('should trap focus', () => {
      const { getByTestId } = render(<TestComponent />);
      const first = getByTestId('first');
      const last = getByTestId('last');
      const trap = getByTestId('trap');

      first.focus();
      expect(document.activeElement).toBe(first);

      // Shift+Tab on first element -> should go to last
      // Note: JSDOM doesn't handle tab focus movement automatically, strict implementation verification needs mocking logic
      // but we can verify our event listener serves preventDefault and attempts focus

      const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const lastFocusSpy = jest.spyOn(last, 'focus');

      trap.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();

      // Tab on last element -> should go to first
      last.focus();
      const event2 = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: false, bubbles: true });
      const preventDefaultSpy2 = jest.spyOn(event2, 'preventDefault');

      trap.dispatchEvent(event2);
      expect(preventDefaultSpy2).toHaveBeenCalled();
    });

    it('should not trap focus when disabled', () => {
      const { getByTestId } = render(<TestComponent enabled={false} />);
      const first = getByTestId('first');
      const trap = getByTestId('trap');

      first.focus();

      const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      trap.dispatchEvent(event);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should ignore non-tab keys', () => {
      const { getByTestId } = render(<TestComponent />);
      const first = getByTestId('first');
      const trap = getByTestId('trap');

      first.focus();

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      trap.dispatchEvent(event);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should safely handle missing ref', () => {
      const { result } = renderHook(() => useFocusTrap(true));

      // Do not attach ref
      expect(result.current.current).toBeNull();
      // Effect logic usually runs but returns early if ref.current is null
      // We can't strictly trigger the event listener because it's attached to ref.current (which is null)
      // Wait, useFocusTrap implementation:
      // useEffect(() => { if (!enabled || !ref.current) return; ...
      // So if ref.current is null, it returns. This branch is hit.
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
      const DELAY = 1000;
      const { result, rerender } = renderHook(({ value }) => useThrottle(value, DELAY), {
        initialProps: { value: 'initial' },
      });

      expect(result.current).toBe('initial');

      rerender({ value: 'updated' });
      expect(result.current).toBe('initial');

      act(() => {
        jest.advanceTimersByTime(DELAY);
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
