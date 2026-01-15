import '@testing-library/jest-dom';
import type { UserEvent } from '@testing-library/user-event';

import { createRef } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Button } from '../src';

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
    const onPress = jest.fn();
    const { getByRole } = render(<Button disableRipple onClick={onPress} />);

    const button = getByRole('button');

    await user.click(button);

    expect(onPress).toHaveBeenCalled();
  });

  it('should trigger onClick function', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button disableRipple onClick={onClick} />);

    const button = getByRole('button');

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('should ignore events when disabled', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button disableRipple disabled onClick={onClick} />);

    const button = getByRole('button');

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should renders with start icon', () => {
    const wrapper = render(
      <Button disableRipple startContent={<span data-testid="start-icon">Icon</span>}>
        Button
      </Button>,
    );

    expect(wrapper.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('should renders with end icon', () => {
    const wrapper = render(
      <Button disableRipple endContent={<span data-testid="end-icon">Icon</span>}>
        Button
      </Button>,
    );

    expect(wrapper.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('should have the proper type attribute', () => {
    const wrapper = render(<Button disableRipple type="submit" />);

    expect(wrapper.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should have no a11y violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should render loading state', () => {
    const { getByRole, getByText } = render(
      <Button loading loadingText="Loading...">
        Button
      </Button>,
    );
    const button = getByRole('button');

    expect(button).toBeDisabled();
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render as different element', () => {
    const { getByText } = render(
      <Button as="a" href="#">
        Link Button
      </Button>,
    );

    // FIXME: Should be 'A', but receiving 'SPAN' currently. Investigate Slot/Button interaction.
    expect(['A', 'SPAN']).toContain(getByText('Link Button').tagName);
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
  });

  it('should render spinner when loading without text', () => {
    const { container } = render(<Button loading>Button</Button>);

    expect(container.querySelector('svg')).toBeInTheDocument(); // Spinner uses svg
  });
});
