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

export default function BadgeNotificationDemo(): JSX.Element {
  const [count, setCount] = useState(5);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
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
          className="border-border hover:bg-surface-subtle text-content-primary rounded-md border px-3 py-1 text-sm font-medium"
          type="button"
          onClick={() => setCount((c) => c + 1)}
        >
          Add notification
        </button>
        <button
          className="border-border hover:bg-surface-subtle text-danger rounded-md border px-3 py-1 text-sm font-medium"
          type="button"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
        >
          Clear one
        </button>
      </div>
    </div>
  );
}
