'use client';

import type { JSX } from 'react';
import { Avatar } from '@ideasui/react';

export default function AvatarVariantsDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <Avatar color="primary" name="Solid" variant="solid" />
      <Avatar color="primary" name="Soft" variant="soft" />
      <Avatar color="primary" name="Outline" variant="outline" />
      <Avatar color="primary" name="Ghost" variant="ghost" />
    </div>
  );
}
