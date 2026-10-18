'use client';

import type { JSX } from 'react';
import { Avatar, AvatarGroup } from '@ideasui/react';

export default function AvatarGroupDemo(): JSX.Element {
  return (
    <div className="flex flex-col gap-6 p-4">
      <AvatarGroup isBordered max={4}>
        <Avatar
          alt="User 1"
          name="User 1"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
        />
        <Avatar
          alt="User 2"
          name="User 2"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
        />
        <Avatar
          alt="User 3"
          name="User 3"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
        />
        <Avatar
          alt="User 4"
          name="User 4"
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150"
        />
        <Avatar name="Carol White" />
        <Avatar name="David Smith" />
        <Avatar name="Eva Green" />
      </AvatarGroup>
    </div>
  );
}
