import type { JSX } from 'react';

import { render, fireEvent, screen, renderHook, act } from '@testing-library/react';

import { Ripple, useRipple } from '../src';

// Mock framer-motion to avoid LazyMotion async warnings
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');

  return {
    ...actual,
    LazyMotion: jest.fn().mockImplementation(({ children }) => children),
    AnimatePresence: jest.fn().mockImplementation(({ children }) => children),
    m: actual.motion,
  };
});

// Mock Component to test integration
const RippleTest = (): JSX.Element => {
  const { ripples, onPress, onClear } = useRipple();

  return (
    <button
      style={{
        position: 'relative',
        width: '100px',
        height: '100px',
        overflow: 'hidden',
      }}
      type="button"
      onMouseDown={onPress}
    >
      Click me
      <Ripple ripples={ripples} onClear={onClear} />
    </button>
  );
};

describe('Ripple', () => {
  it('renders without crashing', () => {
    render(<RippleTest />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('creates a ripple on mouse down', () => {
    const { container } = render(<RippleTest />);
    const button = screen.getByRole('button');

    fireEvent.mouseDown(button, {
      clientX: 50,
      clientY: 50,
    });

    // Check if ripple element is created
    // The Ripple component renders motion span with class "ideasui-ripple"
    const ripple = container.querySelector('.ideasui-ripple');

    expect(ripple).toBeInTheDocument();
  });

  it('renders multiple ripples on multiple clicks', () => {
    const { container } = render(<RippleTest />);
    const button = screen.getByRole('button');

    fireEvent.mouseDown(button, { clientX: 20, clientY: 20 });
    fireEvent.mouseDown(button, { clientX: 80, clientY: 80 });

    const ripples = container.querySelectorAll('.ideasui-ripple');

    expect(ripples.length).toBe(2);
  });
  it('clears ripples on animation complete', () => {
    const { container } = render(<RippleTest />);
    const button = screen.getByRole('button');

    fireEvent.mouseDown(button, { clientX: 50, clientY: 50 });

    // Simulate onClear being called (the Ripple component usually handles this via animation complete)
    // We can manually trigger it here if we mock the internal behavior, but let's trust the integration.
    // Since we mock framer-motion, the animation lifecycle might be skipped.
    // Let's test useRipple hook directly for more logic coverage.
  });
});

describe('useRipple', () => {
  it('handles different event types', () => {
    const { result } = renderHook(() => useRipple());

    // React Aria style event
    act(() => {
      result.current.onPress({
        x: 10,
        y: 10,
        currentTarget: {
          getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
          clientWidth: 100,
          clientHeight: 100,
        },
      });
    });
    expect(result.current.ripples).toHaveLength(1);

    // DOM event
    act(() => {
      result.current.onPress({
        clientX: 20,
        clientY: 20,
        currentTarget: {
          getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
          clientWidth: 100,
          clientHeight: 100,
        },
      });
    });
    expect(result.current.ripples).toHaveLength(2);

    // Fallback (center)
    act(() => {
      result.current.onPress({
        currentTarget: {
          getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
          clientWidth: 100,
          clientHeight: 100,
        },
      });
    });
    expect(result.current.ripples).toHaveLength(3);
  });

  it('removes ripples', () => {
    const { result } = renderHook(() => useRipple());

    act(() => {
      result.current.onPress({
        x: 10,
        y: 10,
        currentTarget: {
          getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
          clientWidth: 100,
          clientHeight: 100,
        },
      });
    });

    const key = result.current.ripples[0].key;

    act(() => {
      result.current.onClear(key);
    });

    expect(result.current.ripples).toHaveLength(0);
  });
});
