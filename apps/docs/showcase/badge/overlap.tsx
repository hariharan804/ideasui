'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

export default function BadgeOverlapDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 p-6">
      {/* Rectangular overlap */}
      <Badge badgeContent={1} color="secondary" overlap="rectangular">
        <div className="bg-primary size-10 rounded-sm" />
      </Badge>

      <Badge color="secondary" overlap="rectangular" variant="dot">
        <div className="bg-primary size-10 rounded-sm" />
      </Badge>

      {/* Circular overlap */}
      <Badge badgeContent={1} color="secondary" overlap="circular">
        <div className="bg-primary size-10 rounded-full" />
      </Badge>

      <Badge color="secondary" overlap="circular" variant="dot">
        <div className="bg-primary size-10 rounded-full" />
      </Badge>
    </div>
  );
}
