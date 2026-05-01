import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../src';

const meta: Meta<typeof Button.Group> = {
  title: 'Components/ButtonGroup',
  component: Button.Group,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component to group multiple buttons together with shared styles and layout.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'soft', 'link', 'text', 'elevated'],
      description: 'The visual style shared by all buttons in the group.',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'neutral',
        'danger',
        'success',
        'warning',
        'info',
      ],
      description: 'The semantic color theme shared by all buttons in the group.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size shared by all buttons in the group.',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'The border radius shared by all buttons in the group.',
    },
    isAttached: {
      control: 'boolean',
      description: 'Whether the buttons should be joined together without gaps.',
    },
    isVertical: {
      control: 'boolean',
      description: 'Whether the buttons should be stacked vertically.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether all buttons in the group should be disabled.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the group should take up the full width of its container.',
    },
    disableAnimation: {
      control: 'boolean',
      description: 'Whether all buttons in the group should have animations disabled.',
    },
    showDivider: {
      control: 'boolean',
      description: 'Whether to show a divider between the buttons.',
    },
  },
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'md',
    isAttached: true,
    isVertical: false,
    isDisabled: false,
    fullWidth: false,
    disableAnimation: true,
    showDivider: true,
  },
};

export default meta;

type Story = StoryObj<typeof Button.Group>;

export const Horizontal: Story = {
  args: {
    variant: 'outline',
    color: 'warning',
    radius: 'xl',
    isAttached: true,
    isVertical: true,
  },

  render: (args) => (
    <Button.Group {...args}>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
      <Button>Action 3</Button>
    </Button.Group>
  ),
};

export const Attached: Story = {
  args: {
    isAttached: true,
    fullWidth: true,
  },
  render: (args) => (
    <Button.Group {...args}>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
      <Button>Action 3</Button>
    </Button.Group>
  ),
};

export const AttachedOutline: Story = {
  args: {
    isAttached: true,
    variant: 'outline',
  },
  render: (args) => (
    <Button.Group {...args}>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
      <Button>Action 3</Button>
    </Button.Group>
  ),
};

export const Vertical: Story = {
  args: {
    isVertical: true,
  },
  render: (args) => (
    <Button.Group {...args}>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
      <Button>Action 3</Button>
    </Button.Group>
  ),
};

export const VerticalAttached: Story = {
  args: {
    isVertical: true,
    isAttached: true,
  },
  render: (args) => (
    <Button.Group {...args}>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
      <Button>Action 3</Button>
    </Button.Group>
  ),
};

export const MixedStyles: Story = {
  render: (args) => (
    <Button.Group {...args}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </Button.Group>
  ),
};
