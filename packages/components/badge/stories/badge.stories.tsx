import type { Meta, StoryObj } from '@storybook/react-vite';
import type { JSX } from 'react';
import type { BadgeSize } from '../src';

import { useState } from 'react';

import { Badge, BadgeAnchor } from '../src';

function AvatarPlaceholder({ name }: { readonly name: string }): JSX.Element {
  return (
    <span
      aria-label={name}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'oklch(var(--ideasui-color-surface-muted))',
        color: 'oklch(var(--ideasui-color-content-primary))',
        fontWeight: 600,
        fontSize: 14,
      }}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()}
    </span>
  );
}

function getSizeContent(size: BadgeSize): string {
  if (size === 'sm') {
    return '9';
  }
  if (size === 'md') {
    return '99';
  }

  return '999';
}

function InvisibleDemo(): JSX.Element {
  const [invisible, setInvisible] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Badge color="danger" isInvisible={invisible}>
          5
        </Badge>
        <Badge color="success" isInvisible={!invisible}>
          Active
        </Badge>
      </div>
      <button
        className="text-primary w-fit text-sm underline"
        type="button"
        onClick={() => setInvisible((value) => !value)}
      >
        Toggle visibility
      </button>
    </div>
  );
}

function NotificationCounterDemo(): JSX.Element {
  const [count, setCount] = useState(5);

  return (
    <div className="flex flex-col gap-4">
      <span aria-atomic="true" aria-live="polite" className="sr-only">
        {count > 0 ? `${count} unread notifications` : 'No unread notifications'}
      </span>
      <div className="flex items-center gap-6">
        <BadgeAnchor
          badge={
            <Badge color="danger" isInvisible={count === 0} max={99}>
              {count}
            </Badge>
          }
        >
          <AvatarPlaceholder name="Bell" />
        </BadgeAnchor>
        <span className="text-content-secondary text-sm">{count} unread</span>
      </div>
      <div className="flex gap-2">
        <button
          className="text-primary text-sm underline"
          type="button"
          onClick={() => setCount((c) => c + 1)}
        >
          Add notification
        </button>
        <button
          className="text-danger text-sm underline"
          type="button"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
        >
          Clear one
        </button>
      </div>
    </div>
  );
}

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ── Default ─────────────────────────────────────────────────────
export const Default: Story = {
  render: () => <Badge color="danger">3</Badge>,
};

// ── All Variants ────────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <Badge key={variant} color="primary" variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
};

// ── All Color Schemes ───────────────────────────────────────────
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'soft', 'outline'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2">
          {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
            <Badge key={color} color={color} variant={variant}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes ───────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Badge key={size} color="danger" size={size}>
          {getSizeContent(size)}
        </Badge>
      ))}
    </div>
  ),
};

// ── Max Count ───────────────────────────────────────────────────
export const MaxCount: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge color="danger" max={9}>
        5
      </Badge>
      <Badge color="danger" max={9}>
        12
      </Badge>
      <Badge color="danger" max={99}>
        120
      </Badge>
      <Badge color="danger" max={999}>
        1500
      </Badge>
    </div>
  ),
};

// ── Dot Mode ────────────────────────────────────────────────────
export const DotMode: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['primary', 'success', 'warning', 'danger', 'neutral'] as const).map((color) => (
        <Badge key={color} isDot color={color} size="md" />
      ))}
    </div>
  ),
};

// ── Invisible ───────────────────────────────────────────────────
export const Invisible: Story = {
  render: () => <InvisibleDemo />,
};

// ── Anchored — All Placements ───────────────────────────────────
export const AnchoredPlacements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10 p-8">
      {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map((placement) => (
        <BadgeAnchor
          key={placement}
          badge={
            <Badge color="danger" size="sm">
              3
            </Badge>
          }
          placement={placement}
        >
          <AvatarPlaceholder name="Jane Doe" />
        </BadgeAnchor>
      ))}
    </div>
  ),
};

// ── Anchored — Dot Indicator ────────────────────────────────────
export const AnchoredDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-6">
      <BadgeAnchor badge={<Badge isDot color="success" size="md" />} placement="bottom-right">
        <AvatarPlaceholder name="Online User" />
      </BadgeAnchor>
      <BadgeAnchor badge={<Badge isDot color="warning" size="md" />} placement="bottom-right">
        <AvatarPlaceholder name="Away User" />
      </BadgeAnchor>
      <BadgeAnchor badge={<Badge isDot color="neutral" size="md" />} placement="bottom-right">
        <AvatarPlaceholder name="Offline User" />
      </BadgeAnchor>
    </div>
  ),
};

// ── Notification Counter Pattern ────────────────────────────────
export const NotificationCounter: Story = {
  render: () => <NotificationCounterDemo />,
};

// ── Status Labels ───────────────────────────────────────────────
export const StatusLabels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge color="success" variant="soft">
        Active
      </Badge>
      <Badge color="warning" variant="soft">
        Pending
      </Badge>
      <Badge color="danger" variant="soft">
        Rejected
      </Badge>
      <Badge color="neutral" variant="soft">
        Draft
      </Badge>
      <Badge color="primary" variant="soft">
        In Review
      </Badge>
      <Badge color="success" variant="outline">
        Verified
      </Badge>
      <Badge color="danger" variant="solid">
        Critical
      </Badge>
    </div>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    isDot: false,
    isInvisible: false,
    max: undefined,
    children: '5',
  },
  render: (args) => <Badge {...args} />,
};
