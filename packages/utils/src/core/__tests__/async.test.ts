import { debounce, throttle } from '../async';

describe('async', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('debounce', () => {
    it('should delay the function execution', () => {
      const func = jest.fn();
      const debounced = debounce(func, 100);

      debounced();
      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should cancel the pending execution', () => {
      const func = jest.fn();
      const debounced = debounce(func, 100);

      debounced();
      debounced.cancel();

      jest.advanceTimersByTime(200);
      expect(func).not.toHaveBeenCalled();
    });

    it('should reset the timer on subsequent calls', () => {
      const func = jest.fn();
      const debounced = debounce(func, 100);

      debounced();
      jest.advanceTimersByTime(50);
      debounced(); // Call again

      jest.advanceTimersByTime(50);
      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('should execute the function immediately', () => {
      const func = jest.fn();
      const throttled = throttle(func, 100);

      throttled();
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should ignore calls within the limit', () => {
      const func = jest.fn();
      const throttled = throttle(func, 100);

      throttled();
      throttled();
      throttled();

      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should execute again after the limit', () => {
      const func = jest.fn();
      const throttled = throttle(func, 100);

      throttled();
      jest.advanceTimersByTime(100);
      throttled();

      expect(func).toHaveBeenCalledTimes(2);
    });
  });
});
