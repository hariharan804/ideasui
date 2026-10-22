'use client';

import type { JSX } from 'react';
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

export default function BadgeAnchoredDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 p-6">
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
  );
}
