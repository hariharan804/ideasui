import type { Meta, StoryObj } from '@storybook/react-vite';

import { Save, X, Trash2 } from 'lucide-react';

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
      options: ['solid', 'outline', 'ghost', 'muted', 'link', 'text', 'elevated', 'glaze'],
      description: 'The visual style shared by all buttons in the group.',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'neutral',
        'error',
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

/* -----------------------------------------------------------------------------------------------
 * Basic Stories
 * ---------------------------------------------------------------------------------------------*/

export const Attached: Story = {
  render: (args) => (
    <Button.Group {...args}>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
      <Button>Action 3</Button>
    </Button.Group>
  ),
};

export const Spaced: Story = {
  args: {
    isAttached: false,
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
    isAttached: false,
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

/* -----------------------------------------------------------------------------------------------
 * Style Variations
 * ---------------------------------------------------------------------------------------------*/

export const AttachedOutline: Story = {
  args: {
    variant: 'outline',
    color: 'primary',
  },
  render: (args) => (
    <Button.Group {...args}>
      <Button>Feed</Button>
      <Button>Messages</Button>
      <Button>Notifications</Button>
    </Button.Group>
  ),
};

export const MixedStyles: Story = {
  args: {
    isAttached: true,
  },
  render: (args) => (
    <Button.Group {...args} radius="xl">
      <Button color="primary" startIcon={<Save className="size-4" />}>
        Save
      </Button>
      <Button startIcon={<X className="size-4" />} variant="outline">
        Cancel
      </Button>
      <Button color="error" variant="outline">
        <Trash2 className="size-4" />
      </Button>
    </Button.Group>
  ),
};

export const GlazeGroup: Story = {
  args: {
    variant: 'glaze',
    color: 'primary',
    radius: 'full',
  },
  render: (args) => (
    <div className="relative overflow-hidden rounded-2xl bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center p-12">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative">
        <Button.Group {...args}>
          <Button>Explore</Button>
          <Button>Trending</Button>
          <Button>Popular</Button>
        </Button.Group>
      </div>
    </div>
  ),
};
