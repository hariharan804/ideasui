'use client';

import type { JSX } from 'react';
import { Avatar } from '@ideasui/react';

export default function AvatarDefaultDemo(): JSX.Element {
  return (
    <div className="flex items-center gap-4 p-4">
      <Avatar
        alt="Jane Doe"
        name="Jane Doe"
        size="lg"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
      />
    </div>
  );
}
