'use client';

import type { JSX } from 'react';
import { Avatar } from '@ideasui/react';

export default function AvatarInitialsDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <Avatar color="neutral" name="Jane Doe" />
      <Avatar color="primary" name="John Smith" />
      <Avatar color="success" name="Alice Brown" />
      <Avatar color="warning" name="Carol White" />
      <Avatar color="danger" name="Dave Miller" />
    </div>
  );
}
