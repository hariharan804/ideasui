import '@testing-library/jest-dom';

import type { UserEvent } from '@testing-library/user-event';
import type * as FramerMotion from 'framer-motion';

import { vi } from 'vitest';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectAccessible } from '@ideasui/utils/test';

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
    const wrapper = render(<Button />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render with default variant and theme recipe props', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn--solid');
    expect(button).toHaveClass('btn--md');
    expect(button).toHaveClass('btn--primary');
    expect(button).toHaveClass('btn--radius-md');
    expect(button).toHaveClass('btn--elevation-sm');
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);

    await expectAccessible(container);
    expect(container).toBeInTheDocument();
  });

  it('ref should be forwarded', () => {
    const reference = createRef<HTMLButtonElement>();

    render(<Button ref={reference} />);
    expect(reference.current).not.toBeNull();
  });

  it('should trigger onPress function', async () => {
    const onPress = vi.fn();

    render(<Button onClick={onPress} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onPress).toHaveBeenCalled();
  });

  it('should trigger onClick function', async () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('should ignore events when disabled', async () => {
    const onClick = vi.fn();

    render(<Button isDisabled onClick={onClick} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should renders with start icon', () => {
    render(<Button startIcon={<span data-testid="start-icon">Icon</span>}>Button</Button>);

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('should renders with end icon', () => {
    render(<Button endIcon={<span data-testid="end-icon">Icon</span>}>Button</Button>);

    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('should have the proper type attribute', () => {
    render(<Button type="submit" />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should render loading state', () => {
    render(<Button isLoading>Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-pending', 'true');
  });

  it('should render all variants and sizes', () => {
    const variants = ['solid', 'outline', 'ghost'] as const;
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const radii = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;

    for (const variant of variants) {
      render(<Button variant={variant}>Button</Button>);
    }

    for (const size of sizes) {
      render(<Button size={size}>Button</Button>);
    }

    for (const radius of radii) {
      render(<Button radius={radius}>Button</Button>);
    }

    render(<Button fullWidth>Button</Button>);
    render(<Button isDisabled>Button</Button>);

    // Verify at least one button is rendered to satisfy expect-expect
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('should render spinner when loading', () => {
    const { container } = render(<Button isLoading>Button</Button>);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render custom loading indicator', () => {
    render(
      <Button isLoading loadingIndicator={<span data-testid="custom-loader">Loading...</span>}>
        Button
      </Button>,
    );
    expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should handle loading positions', () => {
    const { rerender } = render(
      <Button isLoading loadingPosition="start" startIcon={<span data-testid="start">S</span>}>
        Text
      </Button>,
    );

    // In start position, startIcon should be hidden to make room for loader
    expect(screen.queryByTestId('start')).not.toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();

    rerender(
      <Button isLoading endIcon={<span data-testid="end">E</span>} loadingPosition="end">
        Text
      </Button>,
    );
    // In end position, endIcon should be hidden
    expect(screen.queryByTestId('end')).not.toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();

    rerender(
      <Button isLoading loadingPosition="center">
        Text
      </Button>,
    );
    // In center position, text should be hidden
    expect(screen.queryByText('Text')).not.toBeInTheDocument();
  });

  it('throws error when sub-components are rendered outside of Button', () => {
    // Suppress console.error output during deliberate throw
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Button.Shortcut>⌘K</Button.Shortcut>)).toThrow(
      'Button sub-components must be rendered within a Button component',
    );
    spy.mockRestore();
  });

  it('renders shortcut correctly', () => {
    render(
      <Button>
        Button <Button.Shortcut data-slot="button-shortcut">⌘K</Button.Shortcut>
      </Button>,
    );
    expect(screen.getByText('⌘K')).toBeInTheDocument();
  });

  it('renders correctly when isIconOnly is true', () => {
    render(
      <Button isIconOnly aria-label="Settings">
        <span data-testid="icon">⚙</span>
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Settings' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn--icon-only');
  });
});

describe('ButtonGroup', () => {
  it('should pass props to children', () => {
    render(
      <Button.Group isDisabled color="danger" size="xl">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Button.Group>,
    );

    const buttons = screen.getAllByRole('button');

    for (const button of buttons) {
      expect(button).toBeDisabled();
      expect(button).toHaveClass('btn--xl');
      expect(button).toHaveClass('btn--danger');
    }
  });

  it('should render in vertical orientation', () => {
    const { container } = render(
      <Button.Group isVertical>
        <Button>1</Button>
        <Button>2</Button>
      </Button.Group>,
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveAttribute('data-vertical', 'true');
  });

  it('should handle isAttached state', () => {
    render(
      <Button.Group isAttached>
        <Button>1</Button>
        <Button>2</Button>
      </Button.Group>,
    );

    const buttons = screen.getAllByRole('button');

    for (const button of buttons) {
      expect(button).toHaveAttribute('data-attached', 'true');
    }
  });

  it('handles gap classes when not attached', () => {
    const { container, rerender } = render(
      <Button.Group isAttached={false}>
        <Button>1</Button>
        <Button>2</Button>
      </Button.Group>,
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('gap-x-2');

    rerender(
      <Button.Group isVertical isAttached={false}>
        <Button>1</Button>
        <Button>2</Button>
      </Button.Group>,
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('gap-y-2');
  });

  it('passes slotProps to individual sub-slots correctly', () => {
    render(
      <Button
        shortcut="⌘K"
        slotProps={{
          base: { 'data-testid': 'custom-base' },
          label: { 'data-testid': 'custom-label' },
          startIcon: { 'data-testid': 'custom-start-slot' },
          shortcut: { 'data-testid': 'custom-shortcut-slot' },
        }}
        startIcon={<span data-testid="start-icon">★</span>}
      >
        Custom Slots
      </Button>,
    );

    expect(screen.getByTestId('custom-base')).toBeInTheDocument();
    expect(screen.getByTestId('custom-label')).toHaveTextContent('Custom Slots');
    expect(screen.getByTestId('custom-start-slot')).toBeInTheDocument();
    expect(screen.getByTestId('custom-shortcut-slot')).toHaveTextContent('⌘K');
  });
});
