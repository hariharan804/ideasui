import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonProps } from '../src';

import { useState } from 'react';
import { Heart, Download, File } from 'lucide-react';

import { Button } from '../src';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

const defaultProps: Partial<ButtonProps> = {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  radius: 'md',
  children: 'Button',
};

export const Default: Story = {
  args: {
    ...defaultProps,
    'data-testid': 'button',
  },
};

export const WithIcons: Story = {
  args: {
    ...defaultProps,
    startContent: <File className="h-4 w-4" />,
    endContent: <Download className="h-4 w-4" />,
    'data-testid': 'button-with-icons',
  },
};

export const Loading: Story = {
  args: {
    ...defaultProps,
    loading: true,
    'data-testid': 'button-loading',
  },
};

const StateControlled = (args: ButtonProps): React.JSX.Element => {
  const [pressedCount, setPressedCount] = useState(0);

  const handlePress = (): void => {
    setPressedCount((prev) => prev + 1);
  };
  const label = pressedCount ? 'Pressed ' + pressedCount : 'Press';

  return (
    <div className="flex gap-2">
      <Button {...args} aria-label={label} aria-pressed={pressedCount > 0} onClick={handlePress}>
        {label}
      </Button>
      <Button disabled={pressedCount === 0} variant="outline" onClick={() => setPressedCount(0)}>
        Reset
      </Button>
    </div>
  );
};

export const WithState: Story = {
  render: StateControlled,
  args: {
    ...defaultProps,
  },
};

export const Radius: Story = {
  render: () => (
    <div className="storybook-button-radius flex gap-4">
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="xl">Extra Large</Button>
      <Button radius="full">Full</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full">
      <div className="min-w-vw" />
      <Button fullWidth>Full Width Button</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="storybook-button-variants flex gap-4">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="storybook-button-colors flex flex-wrap gap-4">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button color="info">Info</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="storybook-button-sizes flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const IconButton: Story = {
  args: {
    ...defaultProps,
    radius: 'full',
    color: 'danger',
    children: <Heart className="h-5 w-5" />,
  },
};

export const CustomWithClassNames: Story = {
  args: {
    ...defaultProps,
    radius: 'full',
    className: 'bg-gradient-to-tr from-primary-500 to-primary-200 text-white shadow-lg',
  },
};
