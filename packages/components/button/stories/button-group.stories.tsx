import type { Meta, StoryObj } from '@storybook/react-vite';

import { Save, X, Trash2 } from 'lucide-react';

import { Button } from '../src';

import { variantOptions, colorOptions, sizeOptions, groupRadiusOptions } from './common';

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
      options: variantOptions,
      description: 'The visual style shared by all buttons in the group.',
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'The semantic color theme shared by all buttons in the group.',
    },
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'The size shared by all buttons in the group.',
    },
    radius: {
      control: 'select',
      options: groupRadiusOptions,
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
    divider: {
      control: 'select',
      options: ['full', 'middle', 'none'],
      description: 'The type of divider to display between the buttons.',
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
    disableAnimation: false,
    divider: 'full',
  },
};

export default meta;

type Story = StoryObj<typeof Button.Group>;

/* -----------------------------------------------------------------------------------------------
 * Basic Stories
 * ---------------------------------------------------------------------------------------------*/

export const Attached: Story = {
  render: (arguments_) => (
    <Button.Group {...arguments_}>
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
  render: (arguments_) => (
    <Button.Group {...arguments_}>
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
  render: (arguments_) => (
    <Button.Group {...arguments_}>
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
  render: (arguments_) => (
    <Button.Group {...arguments_}>
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
  render: (arguments_) => (
    <Button.Group {...arguments_}>
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
  render: (arguments_) => (
    <Button.Group {...arguments_} radius="xl">
      <Button color="primary" startIcon={<Save className="size-4" />}>
        Save
      </Button>
      <Button startIcon={<X className="size-4" />} variant="outline">
        Cancel
      </Button>
      <Button aria-label="Delete" color="danger" variant="outline">
        <Trash2 className="size-4" />
      </Button>
    </Button.Group>
  ),
};

/* -----------------------------------------------------------------------------------------------
 * Divider Variations
 * ---------------------------------------------------------------------------------------------*/

export const Dividers: Story = {
  args: {
    divider: 'middle',
  },

  render: (arguments_) => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm font-medium">Full Divider (default)</span>
        <Button.Group {...arguments_} divider="full">
          <Button>Action 1</Button>
          <Button>Action 2</Button>
          <Button>Action 3</Button>
        </Button.Group>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm font-medium">Middle Inset Divider</span>
        <Button.Group {...arguments_} divider="middle">
          <Button>Action 1</Button>
          <Button>Action 2</Button>
          <Button>Action 3</Button>
        </Button.Group>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm font-medium">No Divider</span>
        <Button.Group {...arguments_} divider="none">
          <Button>Action 1</Button>
          <Button>Action 2</Button>
          <Button>Action 3</Button>
        </Button.Group>
      </div>
    </div>
  ),
};
