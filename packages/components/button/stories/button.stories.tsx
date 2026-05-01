import type { Meta, StoryObj } from '@storybook/react-vite';

import { File, User, Plus, Settings, ChevronRight } from 'lucide-react';

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
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'soft', 'link', 'text', 'elevated'],
      description: 'The visual style of the button.',
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
      description: 'The semantic color theme.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button.',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
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
  },
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'md',
    children: 'Button',
    isLoading: false,
    isDisabled: false,
    isIconOnly: false,
    loadingPosition: 'start',
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
  render: (args) => <Button data-testid="button" {...args} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Processing...',
  },
  render: (args) => <Button data-testid="button-loading" {...args} />,
};

/* -----------------------------------------------------------------------------------------------
 * Style Reference Stories
 * ---------------------------------------------------------------------------------------------*/

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="storybook-button-variants flex flex-wrap gap-4">
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="soft">
        Soft
      </Button>
      <Button {...args} variant="elevated">
        Elevated
      </Button>
      <Button {...args} variant="text">
        Text
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="storybook-button-colors grid grid-cols-3 gap-4">
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="tertiary">
        Tertiary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="danger">
        Danger
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="neutral">
        Neutral
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="storybook-button-sizes flex items-center gap-4">
      <Button {...args} size="xs">
        XS
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="xl">
        XL
      </Button>
    </div>
  ),
};

export const Radius: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="storybook-button-radius flex flex-wrap gap-4">
      <Button {...args} radius="none">
        None
      </Button>
      <Button {...args} radius="sm">
        SM
      </Button>
      <Button {...args} radius="md">
        MD
      </Button>
      <Button {...args} radius="lg">
        LG
      </Button>
      <Button {...args} radius="xl">
        XL
      </Button>
      <Button {...args} radius="full">
        Full
      </Button>
    </div>
  ),
};

/* -----------------------------------------------------------------------------------------------
 * Composition Stories
 * ---------------------------------------------------------------------------------------------*/

export const WithIcons: Story = {
  render: (args) => (
    <Button data-testid="button-with-icons" {...args}>
      <Button.Icon placement="start">
        <File className="size-4" />
      </Button.Icon>
      <Button.Label>File</Button.Label>
    </Button>
  ),
};

export const IconButton: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} isIconOnly aria-label="Settings">
        <Settings className="size-5" />
      </Button>
      <Button {...args} isIconOnly aria-label="Edit" color="secondary" variant="outline">
        <Plus className="size-5" />
      </Button>
      <Button {...args} isIconOnly aria-label="Favorite" color="danger" variant="ghost">
        <User className="size-5" />
      </Button>
    </div>
  ),
};

export const CompoundUsage: Story = {
  render: (args) => (
    <Button {...args}>
      <Button.Icon>
        <User className="size-5" />
      </Button.Icon>
      <Button.Label>Profile</Button.Label>
      <Button.Spinner />
    </Button>
  ),
};

export const CustomComposition: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-6">
      <Button {...args} startIcon={<Plus className="h-4 w-4" />}>
        Create New
      </Button>
      <Button {...args} endIcon={<ChevronRight className="h-4 w-4" />}>
        Continue
      </Button>
      <Button {...args} isIconOnly aria-label="Settings" color="primary" size="md">
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
