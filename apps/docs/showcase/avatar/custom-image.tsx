'use client';

import type { JSX } from 'react';
import { Avatar, AvatarImage } from '@ideasui/react';

const BotSvg = (): JSX.Element => (
  <svg aria-hidden="true" fill="currentColor" height="75%" viewBox="0 0 24 24" width="75%">
    <rect height="8" rx="2" width="10" x="7" y="2" />
    <circle cx="9.5" cy="6" fill="white" r="1" />
    <circle cx="14.5" cy="6" fill="white" r="1" />
    <rect height="9" rx="3" width="16" x="4" y="12" />
    <rect height="2" width="2" x="11" y="1" />
  </svg>
);

export default function AvatarCustomImageDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <Avatar color="primary" name="Bot" size="lg">
        <AvatarImage>
          <BotSvg />
        </AvatarImage>
      </Avatar>
      <Avatar color="neutral" name="Bot 2" size="lg">
        <AvatarImage>
          <BotSvg />
        </AvatarImage>
      </Avatar>
    </div>
  );
}
