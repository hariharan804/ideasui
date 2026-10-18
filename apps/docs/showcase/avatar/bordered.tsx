'use client';

import type { JSX } from 'react';
import { Avatar } from '@ideasui/react';

export default function AvatarBorderedDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <Avatar
        isBordered
        color="primary"
        name="Primary"
        size="lg"
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
      />
      <Avatar
        isBordered
        color="success"
        name="Success"
        size="lg"
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      />
      <Avatar
        isBordered
        color="warning"
        name="Warning"
        size="lg"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
      />
      <Avatar
        isBordered
        color="danger"
        name="Danger"
        size="lg"
        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150"
      />
    </div>
  );
}
