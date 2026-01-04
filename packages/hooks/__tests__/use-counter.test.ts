import {renderHook, act} from "@testing-library/react";
import {useCounter} from "../src/use-counter";

describe("useCounter", () => {
  it("should initialize with default value", () => {
    const {result} = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("should initialize with provided value", () => {
    const {result} = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it("should increment by step", () => {
    const {result} = renderHook(() => useCounter(0, 2));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(2);
  });

  it("should decrement by step", () => {
    const {result} = renderHook(() => useCounter(5, 2));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(3);
  });

  it("should reset to initial value", () => {
    const {result} = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  it("should set specific value", () => {
    const {result} = renderHook(() => useCounter());

    act(() => {
      result.current.set(42);
    });

    expect(result.current.count).toBe(42);
  });
});