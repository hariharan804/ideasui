'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

function BellIcon(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="text-content-secondary size-7"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}

export default function BadgeDotDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 p-6">
      <Badge color="secondary" variant="dot">
        <BellIcon />
      </Badge>

      <Badge color="primary" variant="dot">
        <BellIcon />
      </Badge>

      <Badge color="success" variant="dot">
        <BellIcon />
      </Badge>
    </div>
  );
}
