'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

export default function BadgeDefaultDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Badge color="primary">New</Badge>
      <Badge color="danger">5</Badge>
      <Badge color="success" variant="soft">
        Active
      </Badge>
    </div>
  );
}
