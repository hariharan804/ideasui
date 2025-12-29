import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";

import { {{camelCase name}} } from "../{{kebabCase name}}";

describe("{{camelCase name}}", () => {
  it("should initialize correctly", () => {
    const { result } = renderHook(() => {{camelCase name}}({}));

    // Add assertions here
    expect(result.current).toBeDefined();
  });

  it("should handle state updates", () => {
    const { result } = renderHook(() => {{camelCase name}}({}));

    act(() => {
      // Test state updates here
    });

    // Add assertions for state changes
  });

  it("should cleanup on unmount", () => {
    const { unmount } = renderHook(() => {{camelCase name}}({}));

    expect(() => unmount()).not.toThrow();
  });
});