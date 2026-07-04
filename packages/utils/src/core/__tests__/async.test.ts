import { debounce, throttle } from '../async';

describe('async', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('debounce', () => {
    it('should delay the function execution', () => {
      const function_ = vi.fn();
      const debounced = debounce(function_, 100);

      debounced();
      expect(function_).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(function_).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(function_).toHaveBeenCalledTimes(1);
    });

    it('should cancel the pending execution', () => {
      const function_ = vi.fn();
      const debounced = debounce(function_, 100);

      debounced();
      debounced.cancel();

      vi.advanceTimersByTime(200);
      expect(function_).not.toHaveBeenCalled();
    });

    it('should reset the timer on subsequent calls', () => {
      const function_ = vi.fn();
      const debounced = debounce(function_, 100);

      debounced();
      vi.advanceTimersByTime(50);
      debounced(); // Call again

      vi.advanceTimersByTime(50);
      expect(function_).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(function_).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('should execute the function immediately', () => {
      const function_ = vi.fn();
      const throttled = throttle(function_, 100);

      throttled();
      expect(function_).toHaveBeenCalledTimes(1);
    });

    it('should ignore calls within the limit', () => {
      const function_ = vi.fn();
      const throttled = throttle(function_, 100);

      throttled();
      throttled();
      throttled();

      expect(function_).toHaveBeenCalledTimes(1);
    });

    it('should execute again after the limit', () => {
      const function_ = vi.fn();
      const throttled = throttle(function_, 100);

      throttled();
      vi.advanceTimersByTime(100);
      throttled();

      expect(function_).toHaveBeenCalledTimes(2);
    });
  });
});
