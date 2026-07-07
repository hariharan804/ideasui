import type { Meta, StoryObj } from '@storybook/react-vite';

import { File, User, Plus, Settings, ChevronRight, Search } from 'lucide-react';

import { Button } from '../src';

import { variantOptions, colorOptions, sizeOptions, radiusOptions } from './common';

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
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
      description: 'The visual style of the button.',
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'The semantic color theme.',
    },
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'The size of the button.',
    },
    radius: {
      control: 'select',
      options: radiusOptions,
      description: 'The border radius of the button.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state.',
    },
    isIconOnly: {
      control: 'boolean',
      description: 'Whether the button should be optimized for a single icon.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take up the full width of its container.',
    },
    disableAnimation: {
      control: 'boolean',
      description: 'Whether to disable press and hover animations.',
    },
    loadingPosition: {
      control: 'select',
      options: ['start', 'end', 'center'],
      description: 'The position of the loading indicator.',
    },
    loadingIndicator: {
      control: 'text',
      description: 'Custom text or element for the loading indicator.',
    },
    shortcut: {
      control: 'text',
      description: 'The shortcut keys to display.',
    },
  },
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'default',
    children: 'Button',
    isLoading: false,
    isDisabled: false,
    isIconOnly: false,
    loadingPosition: 'start',
    elevation: 'none',
    // loadingIndicator: '',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/* -----------------------------------------------------------------------------------------------
 * Basic Stories
 * ---------------------------------------------------------------------------------------------*/

export const Default: Story = {
  args: {
    disableAnimation: false,
    isLoading: false,
  },
  render: (arguments_) => <Button data-testid="button" {...arguments_} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Processing...',
  },
  render: (arguments_) => <Button data-testid="button-loading" {...arguments_} />,
};

/* -----------------------------------------------------------------------------------------------
 * Style Reference Stories
 * ---------------------------------------------------------------------------------------------*/

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (arguments_) => (
    <div className="storybook-button-variants flex flex-wrap gap-4">
      <Button {...arguments_} variant="solid">
        Solid
      </Button>
      <Button {...arguments_} variant="outline">
        Outline
      </Button>
      <Button {...arguments_} variant="ghost">
        Ghost
      </Button>
      <Button {...arguments_} variant="muted">
        Soft
      </Button>
      <Button {...arguments_} variant="elevated">
        Elevated
      </Button>
      <Button {...arguments_} variant="text">
        Text
      </Button>
      <Button {...arguments_} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: (arguments_) => (
    <div className="storybook-button-colors grid grid-cols-3 gap-4">
      <Button {...arguments_} color="primary">
        Primary
      </Button>
      <Button {...arguments_} color="secondary">
        Secondary
      </Button>
      <Button {...arguments_} color="tertiary">
        Tertiary
      </Button>
      <Button {...arguments_} color="success">
        Success
      </Button>
      <Button {...arguments_} color="warning">
        Warning
      </Button>
      <Button {...arguments_} color="error">
        Danger
      </Button>
      <Button {...arguments_} color="info">
        Info
      </Button>
      <Button {...arguments_} color="neutral">
        Neutral
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (arguments_) => (
    <div className="storybook-button-sizes flex items-center gap-4">
      <Button {...arguments_} size="xs">
        XS
      </Button>
      <Button {...arguments_} size="sm">
        Small
      </Button>
      <Button {...arguments_} size="md">
        Medium
      </Button>
      <Button {...arguments_} size="lg">
        Large
      </Button>
      <Button {...arguments_} size="xl">
        XL
      </Button>
    </div>
  ),
};

export const Radius: Story = {
  parameters: { controls: { disable: true } },
  render: (arguments_) => (
    <div className="storybook-button-radius flex flex-wrap gap-4">
      <Button {...arguments_} radius="none">
        None
      </Button>
      <Button {...arguments_} radius="default">
        Default
      </Button>
      <Button {...arguments_} radius="sm">
        SM
      </Button>
      <Button {...arguments_} radius="md">
        MD
      </Button>
      <Button {...arguments_} radius="lg">
        LG
      </Button>
      <Button {...arguments_} radius="xl">
        XL
      </Button>
      <Button {...arguments_} radius="2xl">
        2XL
      </Button>
      <Button {...arguments_} radius="3xl">
        3XL
      </Button>
      <Button {...arguments_} radius="full">
        Full
      </Button>
    </div>
  ),
};

/* -----------------------------------------------------------------------------------------------
 * Composition Stories
 * ---------------------------------------------------------------------------------------------*/

export const WithIcons: Story = {
  render: (arguments_) => (
    <Button data-testid="button-with-icons" {...arguments_}>
      <Button.Icon placement="start">
        <File className="size-4" />
      </Button.Icon>
      <Button.Label>File</Button.Label>
    </Button>
  ),
};

export const IconButton: Story = {
  render: (arguments_) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...arguments_} isIconOnly aria-label="Settings">
        <Settings className="size-5" />
      </Button>
      <Button {...arguments_} isIconOnly aria-label="Edit" color="secondary" variant="outline">
        <Plus className="size-5" />
      </Button>
      <Button {...arguments_} isIconOnly aria-label="Favorite" color="error" variant="ghost">
        <User className="size-5" />
      </Button>
    </div>
  ),
};

export const CompoundUsage: Story = {
  render: (arguments_) => (
    <Button {...arguments_}>
      <Button.Icon>
        <User className="size-5" />
      </Button.Icon>
      <Button.Label>Profile</Button.Label>
      <Button.Spinner />
    </Button>
  ),
};

export const CustomComposition: Story = {
  render: (arguments_) => (
    <div className="flex flex-wrap gap-6">
      <Button {...arguments_} startIcon={<Plus className="size-4" />}>
        Create New
      </Button>
      <Button {...arguments_} endIcon={<ChevronRight className="size-4" />}>
        Continue
      </Button>
      <Button {...arguments_} isIconOnly aria-label="Settings" color="primary" size="md">
        <Settings className="size-5" />
      </Button>
    </div>
  ),
};
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Button isLoading loadingPosition="start">
          Start (Default)
        </Button>
        <Button isLoading loadingPosition="end">
          End Position
        </Button>
        <Button isLoading loadingPosition="center">
          Center Position
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button isLoading loadingIndicator="Loading..." loadingPosition="center">
          Custom Text
        </Button>
        <Button
          isLoading
          loadingIndicator={
            <div className="flex items-center gap-1">
              <span className="size-1 animate-bounce rounded-full bg-current" />
              <span className="size-1 animate-bounce rounded-full bg-current [animation-delay:0.2s]" />
              <span className="size-1 animate-bounce rounded-full bg-current [animation-delay:0.4s]" />
            </div>
          }
          loadingPosition="center"
          variant="outline"
        >
          Custom Indicator
        </Button>
      </div>
    </div>
  ),
};

export const WithShortcut: Story = {
  render: (arguments_) => (
    <div className="flex flex-col gap-4">
      <Button {...arguments_} className="w-64 justify-between" variant="solid">
        <div className="flex items-center gap-2">
          <Search className="size-4" />
          <span>Quick Search</span>
        </div>
        <Button.Shortcut>⌘K</Button.Shortcut>
      </Button>

      <Button {...arguments_} className="w-64 justify-between" color="primary" variant="outline">
        <div className="flex items-center gap-2">
          <Plus className="size-4" />
          <span>New Document</span>
        </div>
        <Button.Shortcut>⌘N</Button.Shortcut>
      </Button>

      <Button {...arguments_} className="w-64 justify-between" variant="muted">
        <div className="flex items-center gap-2">
          <Settings className="size-4" />
          <span>Open Settings</span>
        </div>
        <Button.Shortcut>⌘,</Button.Shortcut>
      </Button>
    </div>
  ),
};
