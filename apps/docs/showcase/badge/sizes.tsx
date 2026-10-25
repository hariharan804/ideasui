'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

function MailIcon(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="text-content-secondary size-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

export default function BadgeSizesDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-6">
      <Badge badgeContent={4} color="primary" size="sm">
        <MailIcon />
      </Badge>
      <Badge badgeContent={4} color="primary" size="md">
        <MailIcon />
      </Badge>
      <Badge badgeContent={4} color="primary" size="lg">
        <MailIcon />
      </Badge>
    </div>
  );
}
