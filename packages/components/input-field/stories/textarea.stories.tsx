import type { Meta, StoryObj } from '@storybook/react-vite';

import { MessageSquare, Sparkles } from 'lucide-react';

import { Textarea } from '../src';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible, multi-line Textarea component supporting auto-resize, character counting, surface variants, floating labels, and compound patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed', 'unstyled', 'shadow'],
      description: 'The visual variant style.',
    },
    labelVariant: {
      control: 'select',
      options: ['default', 'inside-fixed', 'inside-floating', 'floating'],
      description: 'The label positioning and behavior variant.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The component size.',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'CSS resize behavior.',
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether the textarea auto-resizes to fit text content.',
    },
    minRows: {
      control: 'number',
      description: 'Minimum number of visible text rows.',
    },
    maxRows: {
      control: 'number',
      description: 'Maximum number of visible text rows before scrolling.',
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Whether to show the character counter.',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum allowed character count.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled.',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only.',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the textarea is required.',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the textarea is in an invalid/error state.',
    },
  },
  args: {
    variant: 'outline',
    labelVariant: 'default',
    size: 'md',
    resize: 'none',
    autoResize: true,
    minRows: 3,
    placeholder: 'Enter your message...',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us a little bit about yourself...',
    description: 'This will be displayed on your public profile.',
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

export const AutoResize: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea
        autoResize
        defaultValue="Type multiple lines here to see the height adapt dynamically to content smoothly without scrollbars."
        label="Auto-Resizing (minRows: 3, maxRows: 6)"
        maxRows={6}
        minRows={3}
      />
    </div>
  ),
};

export const CharacterCounter: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea
        showCharacterCount
        defaultValue="Hello world!"
        description="Write a concise executive summary."
        label="Summary"
        maxLength={150}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea label="Outline (Default)" placeholder="Outline textarea" variant="outline" />
      <Textarea label="Filled" placeholder="Filled textarea" variant="filled" />
      <Textarea label="Flushed" placeholder="Flushed textarea" variant="flushed" />
      <Textarea label="Shadow" placeholder="Shadow textarea" variant="shadow" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea label="Small" placeholder="Small textarea" size="sm" />
      <Textarea label="Medium (Default)" placeholder="Medium textarea" size="md" />
      <Textarea label="Large" placeholder="Large textarea" size="lg" />
    </div>
  ),
};

export const LabelVariants: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea label="Standard (Default)" labelVariant="default" placeholder="Default label" />
      <Textarea label="Inside Fixed" labelVariant="inside-fixed" placeholder="Inside fixed label" />
      <Textarea
        label="Inside Floating"
        labelVariant="inside-floating"
        placeholder="Inside floating label"
      />
      <Textarea label="Floating (Outlined)" labelVariant="floating" placeholder="Floating label" />
    </div>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea
        endContent={<Sparkles className="text-secondary size-4" />}
        label="Prompt with AI"
        placeholder="Ask AI anything..."
        startContent={<MessageSquare className="text-content-muted size-4" />}
      />
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea
        autoResize={false}
        label="Resize: None"
        placeholder="Resize disabled"
        resize="none"
      />
      <Textarea
        autoResize={false}
        label="Resize: Vertical"
        placeholder="Resize vertically only"
        resize="vertical"
      />
      <Textarea
        autoResize={false}
        label="Resize: Both"
        placeholder="Resize horizontal & vertical"
        resize="both"
      />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Textarea
        isInvalid
        errorMessage="Please provide at least 20 characters."
        label="Project Overview"
        placeholder="Write something..."
        value="Too short"
      />
      <Textarea
        isDisabled
        label="Disabled"
        placeholder="Cannot edit"
        value="Disabled content state"
      />
      <Textarea
        isReadOnly
        label="Read Only"
        placeholder="Read only"
        value="You cannot edit this content."
      />
    </div>
  ),
};

export const CompoundPattern: Story = {
  render: () => (
    <div className="w-80">
      <Textarea variant="outline">
        <Textarea.Label>Compound Feedback</Textarea.Label>
        <Textarea.Input
          showCharacterCount
          maxLength={300}
          minRows={4}
          placeholder="Share your experience with our platform..."
        />
        <Textarea.Description>We read all feedback directly.</Textarea.Description>
      </Textarea>
    </div>
  ),
};
