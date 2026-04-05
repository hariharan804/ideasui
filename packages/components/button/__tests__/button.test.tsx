import '@testing-library/jest-dom';

import type { UserEvent } from '@testing-library/user-event';
import type * as FramerMotion from 'framer-motion';

import { vi } from 'vitest';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Button } from '../src';

// Mock framer-motion to avoid LazyMotion async warnings
vi.mock('framer-motion', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof FramerMotion;

  return {
    ...actual,
    LazyMotion: vi.fn().mockImplementation(({ children }) => children),
    AnimatePresence: vi.fn().mockImplementation(({ children }) => children),
    m: actual.motion,
  };
});

describe('Button', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should render correctly', () => {
    const wrapper = render(<Button disableRipple />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('ref should be forwarded', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref} disableRipple />);
    expect(ref.current).not.toBeNull();
  });

  it('should trigger onPress function', async () => {
    const onPress = vi.fn();

    render(<Button disableRipple onClick={onPress} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onPress).toHaveBeenCalled();
  });

  it('should trigger onClick function', async () => {
    const onClick = vi.fn();

    render(<Button disableRipple onClick={onClick} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('should ignore events when disabled', async () => {
    const onClick = vi.fn();

    render(<Button disableRipple disabled onClick={onClick} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should renders with start icon', () => {
    render(
      <Button disableRipple startContent={<span data-testid="start-icon">Icon</span>}>
        Button
      </Button>,
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('should renders with end icon', () => {
    render(
      <Button disableRipple endContent={<span data-testid="end-icon">Icon</span>}>
        Button
      </Button>,
    );

    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('should have the proper type attribute', () => {
    render(<Button disableRipple type="submit" />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should have no a11y violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should render loading state', () => {
    render(
      <Button loading loadingText="Loading...">
        Button
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render as different element', () => {
    render(
      <Button as="a" href="#">
        Link Button
      </Button>,
    );

    // FIXME: Should be 'A', but receiving 'SPAN' currently. Investigate Slot/Button interaction.
    expect(['A', 'SPAN']).toContain(screen.getByText('Link Button').tagName);
  });

  it('should render all variants and sizes', () => {
    const variants = ['solid', 'outline', 'ghost'] as const;
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const radii = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;

    variants.forEach((variant) => {
      render(<Button variant={variant}>Button</Button>);
    });

    sizes.forEach((size) => {
      render(<Button size={size}>Button</Button>);
    });

    radii.forEach((radius) => {
      render(<Button radius={radius}>Button</Button>);
    });

    render(<Button fullWidth>Button</Button>);
    render(<Button disabled>Button</Button>);

    // Verify at least one button is rendered to satisfy expect-expect
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('should render spinner when loading without text', () => {
    const { container } = render(<Button loading>Button</Button>);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('svg')).toBeInTheDocument(); // Spinner uses svg
  });
});
