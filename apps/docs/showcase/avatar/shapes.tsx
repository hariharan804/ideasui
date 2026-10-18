'use client';

import type { JSX } from 'react';
import { Avatar } from '@ideasui/react';

export default function AvatarShapesDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <Avatar
        alt="Jane Doe"
        color="primary"
        name="Jane Doe"
        shape="circle"
        size="lg"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
      />
      <Avatar
        alt="Jane Doe"
        color="primary"
        name="Jane Doe"
        shape="square"
        size="lg"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
      />
    </div>
  );
}
