'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

export default function BadgeMaxCountDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Badge color="danger" max={9}>
        5
      </Badge>
      <Badge color="danger" max={9}>
        12
      </Badge>
      <Badge color="danger" max={99}>
        120
      </Badge>
      <Badge color="danger" max={999}>
        1500
      </Badge>
    </div>
  );
}
