import type { JSX, MouseEvent as ReactMouseEvent } from 'react';

import { render, screen, renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
const MOCK_CLIENT_DIMENSION = 100;
const MOCK_BOUNDING_RECT = {
  left: 0,
  top: 0,
  width: MOCK_CLIENT_DIMENSION,
  height: MOCK_CLIENT_DIMENSION,
};

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

  it('creates a ripple on mouse down', async () => {
    const user = userEvent.setup();
    const { container } = render(<RippleTest />);
    const button = screen.getByRole('button');

    // userEvent doesn't support easy coordinate passing like fireEvent for ripples usually
    // but the implementation might rely on it. If we use click, it should work.
    // However, the test explicitly checked for .ideasui-ripple
    await user.click(button);

    // Check if ripple element is created
    // The Ripple component renders motion span with class "ideasui-ripple"
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const ripple = container.querySelector('.ideasui-ripple');

    expect(ripple).toBeInTheDocument();
  });

  it('renders multiple ripples on multiple clicks', async () => {
    const user = userEvent.setup();
    const { container } = render(<RippleTest />);
    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(button);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const ripples = container.querySelectorAll('.ideasui-ripple');

    expect(ripples).toHaveLength(2);
  });

  test.todo('clears ripples on animation complete');
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
          getBoundingClientRect: () => MOCK_BOUNDING_RECT,
          clientWidth: MOCK_CLIENT_DIMENSION,
          clientHeight: MOCK_CLIENT_DIMENSION,
        },
      } as unknown as ReactMouseEvent<HTMLElement, MouseEvent>);
    });
    const expectedRipples = 3;

    expect(result.current.ripples).toHaveLength(expectedRipples);
  });

  it('removes ripples', () => {
    const { result } = renderHook(() => useRipple());

    act(() => {
      result.current.onPress({
        x: 10,
        y: 10,
        currentTarget: {
          getBoundingClientRect: () => MOCK_BOUNDING_RECT,
          clientWidth: MOCK_CLIENT_DIMENSION,
          clientHeight: MOCK_CLIENT_DIMENSION,
        },
      } as unknown as ReactMouseEvent<HTMLElement, MouseEvent>);
    });

    const key = result.current.ripples[0].key;

    act(() => {
      result.current.onClear(key);
    });

    expect(result.current.ripples).toHaveLength(0);
  });
});
