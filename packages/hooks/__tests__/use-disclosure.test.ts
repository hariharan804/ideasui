import { renderHook, act } from '@testing-library/react';

import { useDisclosure } from '../src/use-disclosure';

describe('useDisclosure', () => {
  it('should initialize with default closed state', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);
  });

  it('should initialize with provided state', () => {
    const { result } = renderHook(() => useDisclosure(true));

    expect(result.current.isOpen).toBe(true);
  });

  it('should open when onOpen is called', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close when onClose is called', () => {
    const { result } = renderHook(() => useDisclosure(true));

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle state', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should set specific state with onOpenChange', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onOpenChange(true);
    });

    expect(result.current.isOpen).toBe(true);
  });
});
