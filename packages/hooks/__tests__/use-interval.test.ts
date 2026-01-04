import {renderHook} from "@testing-library/react";
import {useInterval} from "../src/use-interval";

jest.useFakeTimers();

describe("useInterval", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should call callback at specified interval", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should not call callback when delay is null", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, null));

    jest.advanceTimersByTime(5000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should update callback without restarting interval", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const {rerender} = renderHook(
      ({cb}) => useInterval(cb, 1000),
      {initialProps: {cb: callback1}}
    );

    jest.advanceTimersByTime(1000);
    expect(callback1).toHaveBeenCalledTimes(1);

    // Update callback
    rerender({cb: callback2});

    jest.advanceTimersByTime(1000);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it("should clear interval on unmount", () => {
    const callback = jest.fn();
    const {unmount} = renderHook(() => useInterval(callback, 1000));

    unmount();
    jest.advanceTimersByTime(5000);
    expect(callback).not.toHaveBeenCalled();
  });
});