'use client';

import type { JSX } from 'react';

import { useState } from 'react';
import { Badge, BadgeAnchor } from '@ideasui/react';

function AvatarPlaceholder({ name }: { readonly name: string }): JSX.Element {
  return (
    <span
      aria-label={name}
      className="bg-surface-muted text-content-primary inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold"
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

export default function BadgePreview(): JSX.Element {
  const [isInvisible, setIsInvisible] = useState(false);
  const [count, setCount] = useState(5);

  return (
    <div className="space-y-10 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Badge Component</h1>
        <p className="text-content-secondary">
          Accessible, theme-aware compact indicator supporting standalone counts, status labels, dot
          indicators, and anchored overlays.
        </p>
      </div>

      {/* Visual Variants */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Badge color="primary" variant="solid">
            Solid
          </Badge>
          <Badge color="primary" variant="soft">
            Soft
          </Badge>
          <Badge color="primary" variant="outline">
            Outline
          </Badge>
          <Badge color="primary" variant="ghost">
            Ghost
          </Badge>
        </div>
      </div>

      {/* Semantic Color Schemes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Color Schemes</h2>
        <div className="space-y-3">
          {(['solid', 'soft', 'outline'] as const).map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-3">
              {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
                <Badge key={color} color={color} variant={variant}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Badge color="danger" size="sm">
            9
          </Badge>
          <Badge color="danger" size="md">
            99
          </Badge>
          <Badge color="danger" size="lg">
            999
          </Badge>
        </div>
      </div>

      {/* Max Count */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Max Count Display</h2>
        <div className="flex flex-wrap items-center gap-4">
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
      </div>

      {/* Dot Mode */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Dot Indicators</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Badge isDot color="primary" size="sm" />
          <Badge isDot color="success" size="md" />
          <Badge isDot color="warning" size="md" />
          <Badge isDot color="danger" size="lg" />
          <Badge isDot color="neutral" size="md" />
        </div>
      </div>

      {/* Invisible Mode */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Invisible Mode</h2>
        <div className="flex items-center gap-4">
          <Badge color="danger" isInvisible={isInvisible}>
            5
          </Badge>
          <Badge color="success" isInvisible={!isInvisible}>
            Active
          </Badge>
          <button
            className="text-primary hover:text-primary/80 text-sm font-medium underline"
            type="button"
            onClick={() => setIsInvisible((previous) => !previous)}
          >
            Toggle Invisible
          </button>
        </div>
      </div>

      {/* Anchored Overlays */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">BadgeAnchor Placements</h2>
        <div className="flex flex-wrap gap-8 p-4">
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

          <BadgeAnchor badge={<Badge isDot color="success" size="md" />} placement="bottom-right">
            <AvatarPlaceholder name="Online User" />
          </BadgeAnchor>
        </div>
      </div>

      {/* Interactive Notification Counter Pattern */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Notification Counter Pattern</h2>
        <div className="flex items-center gap-6">
          <span aria-atomic="true" aria-live="polite" className="sr-only">
            {count > 0 ? `${count} unread notifications` : 'No unread notifications'}
          </span>
          <BadgeAnchor
            badge={
              <Badge color="danger" isInvisible={count === 0} max={99}>
                {count}
              </Badge>
            }
          >
            <AvatarPlaceholder name="Notifications" />
          </BadgeAnchor>
          <span className="text-content-secondary text-sm">{count} unread</span>
          <div className="flex gap-2">
            <button
              className="border-border hover:bg-surface-subtle text-content-primary rounded-md border px-3 py-1 text-sm font-medium"
              type="button"
              onClick={() => setCount((c) => c + 1)}
            >
              Add
            </button>
            <button
              className="border-border hover:bg-surface-subtle text-danger rounded-md border px-3 py-1 text-sm font-medium"
              type="button"
              onClick={() => setCount((c) => Math.max(0, c - 1))}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
