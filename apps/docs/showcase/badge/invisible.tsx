'use client';

import type { JSX } from 'react';
import { useState } from 'react';
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

export default function BadgeInvisibleDemo(): JSX.Element {
  const [showUnread, setShowUnread] = useState(true);

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-6">
      <Badge badgeContent={4} color="secondary" invisible={!showUnread}>
        <MailIcon />
      </Badge>

      <div className="text-content-primary inline-flex items-center gap-3 text-sm font-medium">
        <button
          aria-checked={showUnread}
          aria-label="Show unread count"
          className={`focus-visible:ring-primary relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:outline-none ${
            showUnread ? 'bg-primary' : 'bg-surface-muted'
          }`}
          role="switch"
          type="button"
          onClick={() => setShowUnread((previous) => !previous)}
        >
          <span
            className={`bg-surface mt-0.5 inline-block size-5 transform rounded-full shadow transition duration-200 ease-in-out ${
              showUnread ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
        <span>Show unread count</span>
      </div>
    </div>
  );
}
