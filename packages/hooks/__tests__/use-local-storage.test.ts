import {renderHook, act} from "@testing-library/react";
import {useLocalStorage} from "../src/use-local-storage";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useLocalStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default value when localStorage is empty", () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const {result} = renderHook(() => useLocalStorage("test-key", "default"));
    
    expect(result.current[0]).toBe("default");
    expect(localStorageMock.getItem).toHaveBeenCalledWith("test-key");
  });

  it("should initialize with stored value when localStorage has data", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify("stored"));
    
    const {result} = renderHook(() => useLocalStorage("test-key", "default"));
    
    expect(result.current[0]).toBe("stored");
  });

  it("should update localStorage when value changes", () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const {result} = renderHook(() => useLocalStorage("test-key", "default"));
    
    act(() => {
      result.current[1]("new-value");
    });
    
    expect(result.current[0]).toBe("new-value");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("test-key", JSON.stringify("new-value"));
  });

  it("should remove value from localStorage", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify("stored"));
    
    const {result} = renderHook(() => useLocalStorage("test-key", "default"));
    
    act(() => {
      result.current[2](); // removeValue
    });
    
    expect(result.current[0]).toBe("default");
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("test-key");
  });

  it("should handle localStorage errors gracefully", () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error("localStorage error");
    });
    
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    
    const {result} = renderHook(() => useLocalStorage("test-key", "default"));
    
    expect(result.current[0]).toBe("default");
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});