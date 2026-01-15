import { renderHook, fireEvent } from '@testing-library/react';

import { useClickOutside } from '../src/use-click-outside';

describe('useClickOutside', () => {
  it('should call handler when clicking outside', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler));
    const element = document.createElement('div');

    // Simulate attaching ref
    (result.current as React.MutableRefObject<HTMLDivElement>).current = element;
    document.body.appendChild(element);

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(element);
  });

  it('should not call handler when clicking inside', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler));
    const element = document.createElement('div');

    (result.current as React.MutableRefObject<HTMLDivElement>).current = element;
    document.body.appendChild(element);

    fireEvent.mouseDown(element);
    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(element);
  });

  it('should not call handler when disabled', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler, false));
    const element = document.createElement('div');

    (result.current as React.MutableRefObject<HTMLDivElement>).current = element;
    document.body.appendChild(element);

    fireEvent.mouseDown(document.body);
    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(element);
  });
});
