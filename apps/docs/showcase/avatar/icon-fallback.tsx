'use client';

import type { JSX } from 'react';
import { Avatar, AvatarFallback, AvatarIcon } from '@ideasui/react';

const UserIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="currentColor" height="60%" viewBox="0 0 24 24" width="60%">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

export default function AvatarIconFallbackDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <Avatar aria-label="Default icon fallback" size="lg" />
      <Avatar aria-label="Custom user icon" color="primary" size="lg">
        <AvatarFallback>
          <AvatarIcon>
            <UserIcon />
          </AvatarIcon>
        </AvatarFallback>
      </Avatar>
      <Avatar aria-label="Custom user icon subtle" color="success" size="lg">
        <AvatarFallback>
          <AvatarIcon>
            <UserIcon />
          </AvatarIcon>
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
