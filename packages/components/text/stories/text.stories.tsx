import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../src';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text is a theme-aware typography primitive supporting polymorphic elements, semantic variants, OKLCH content colors, line clamping, and React Aria slot inheritance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'body',
        'label',
        'caption',
        'overline',
        'code',
        'lead',
        'helper',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'muted',
        'inverse',
        'success',
        'warning',
        'danger',
        'info',
      ],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'justify'],
    },
    truncate: {
      control: 'boolean',
    },
    lineClamp: {
      control: 'number',
    },
    as: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Basic: Story = {
  args: {
    children: 'Empowering developers with IdeasUI typography.',
    variant: 'body',
    size: 'md',
    weight: 'regular',
    color: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <Text variant="h1">Heading 1 — Primary section header</Text>
      <Text variant="lead">Lead — Catchy introductory copy statement.</Text>
      <Text variant="body">Body — Standard paragraph text for general reading.</Text>
      <Text variant="label">Label — Strong label text for form inputs and controls.</Text>
      <Text variant="helper">Helper — Form supporting guidance or error text.</Text>
      <Text variant="caption">Caption — Small secondary text for metadata and hints.</Text>
      <Text variant="overline">Overline — Uppercase header accent badge.</Text>
      <Text variant="code">const ideasui = &quot;typography&quot;;</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text color="primary">Primary — Main body text color</Text>
      <Text color="secondary">Secondary — Muted supporting text color</Text>
      <Text color="tertiary">Tertiary — Subtle metadata color</Text>
      <Text color="muted">Muted — Low emphasis text color</Text>
      <div className="bg-surface-overlay rounded-md p-2">
        <Text color="inverse">Inverse — Contrast text on dark surface</Text>
      </div>
      <Text color="success">Success — Positively confirmed operation</Text>
      <Text color="warning">Warning — Action caution alert</Text>
      <Text color="danger">Danger — Error failure state</Text>
      <Text color="info">Info — Informational banner notice</Text>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text size="xs">xs — Extra small text (12px)</Text>
      <Text size="sm">sm — Small text (14px)</Text>
      <Text size="md">md — Medium default text (16px)</Text>
      <Text size="lg">lg — Large text (18px)</Text>
      <Text size="xl">xl — Extra large text (20px)</Text>
      <Text size="2xl">2xl — 2X Large text (24px)</Text>
    </div>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Text as="div" variant="h2" weight="bold">
        Heading variant rendered as &lt;div&gt;
      </Text>
      <Text as="a" className="cursor-pointer underline underline-offset-4" color="primary">
        Text component rendered as semantic link (&lt;a&gt;)
      </Text>
      <Text as="pre" className="p-3" variant="code">
        {`// Text rendered as <pre>
const theme = "oklch";`}
      </Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="border-border max-w-lg space-y-3 rounded-xl border p-4">
      <Text align="start">Start aligned text (left in LTR, right in RTL)</Text>
      <Text align="center">Center aligned typography statement</Text>
      <Text align="end">End aligned text (right in LTR, left in RTL)</Text>
    </div>
  ),
};

export const Slots: Story = {
  render: () => (
    <div className="border-border space-y-2 rounded-xl border p-4">
      <Text as="h3" color="primary" size="lg" weight="semibold">
        Card Title
      </Text>
      <Text color="secondary" size="sm" slot="description">
        This description specifies slot="description" for accessibility and CSS targeting.
      </Text>
    </div>
  ),
};

export const TruncateAndClamp: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <Text className="mb-1" weight="semibold">
          Single Line Truncate (`truncate`):
        </Text>
        <Text truncate color="secondary">
          This is a very long single-line text string that will truncate gracefully with an ellipsis
          when overflowing its container boundary.
        </Text>
      </div>

      <div>
        <Text className="mb-1" weight="semibold">
          Multi-Line Clamp (`lineClamp={1}`):
        </Text>
        <Text color="secondary" lineClamp={1}>
          IdeasUI provides first-class support for multi-line clamping. This paragraph is clamped
          strictly to one line of text before truncating gracefully with a trailing ellipsis.
        </Text>
      </div>

      <div>
        <Text className="mb-1" weight="semibold">
          Multi-Line Clamp (`lineClamp={2}`):
        </Text>
        <Text color="secondary" lineClamp={2}>
          IdeasUI provides first-class support for multi-line clamping. This paragraph is clamped
          strictly to two lines of text before truncating gracefully with a trailing ellipsis
          regardless of dynamic container resizing.
        </Text>
      </div>

      <div>
        <Text className="mb-1" weight="semibold">
          Multi-Line Clamp (`lineClamp={3}`):
        </Text>
        <Text color="secondary" lineClamp={3}>
          IdeasUI typography provides first-class support for multi-line clamping. This paragraph is
          clamped strictly to three lines of text before truncating gracefully with a trailing
          ellipsis regardless of dynamic container resizing.
        </Text>
      </div>
    </div>
  ),
};

export const CompositionHierarchy: Story = {
  render: () => (
    <div className="border-border bg-surface max-w-sm space-y-3 rounded-2xl border p-5 shadow-xs">
      <Text color="muted" variant="overline">
        Getting Started
      </Text>
      <Text color="primary" variant="h3">
        IdeasUI Typography
      </Text>
      <Text color="secondary" variant="body">
        Build high-performance, accessible React applications with theme-aware OKLCH design tokens
        and zero-config styling.
      </Text>
      <div className="flex items-center justify-between pt-2">
        <Text color="primary" variant="label">
          Package Version
        </Text>
        <Text variant="code">v0.0.5</Text>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Interactive playground text component.',
    variant: 'body',
    size: 'md',
    weight: 'regular',
    color: 'primary',
    align: 'start',
    truncate: false,
  },
};
