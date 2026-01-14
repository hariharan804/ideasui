import type { JSX, ReactNode } from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import { Ripple, useRipple } from '../src';

// Mock framer-motion to avoid LazyMotion async warnings
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');

  return {
    ...actual,
    LazyMotion: ({ children }: { children: ReactNode }) => children,
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
});
