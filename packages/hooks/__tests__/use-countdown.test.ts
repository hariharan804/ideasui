import {renderHook, act} from "@testing-library/react";
import {useCountdown} from "../src/use-countdown";

jest.useFakeTimers();

describe("useCountdown", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should initialize with provided time", () => {
    const {result} = renderHook(() => useCountdown(60));
    expect(result.current.timeLeft).toBe(60);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isFinished).toBe(false);
  });

  it("should start countdown", () => {
    const {result} = renderHook(() => useCountdown(3));

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(2);
  });

  it("should pause countdown", () => {
    const {result} = renderHook(() => useCountdown(5));

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.timeLeft).toBe(3);

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.timeLeft).toBe(3); // Should not change
  });

  it("should reset countdown", () => {
    const {result} = renderHook(() => useCountdown(10));

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.timeLeft).toBe(7);

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeLeft).toBe(10);
    expect(result.current.isRunning).toBe(false);
  });

  it("should call onFinish when countdown reaches 0", () => {
    const onFinish = jest.fn();
    const {result} = renderHook(() => useCountdown(2, onFinish));

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isFinished).toBe(true);
    expect(result.current.isRunning).toBe(false);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});
