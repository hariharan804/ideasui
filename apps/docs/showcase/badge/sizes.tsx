'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

export default function BadgeSizesDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Badge color="danger" size="sm">
        9
      </Badge>
      <Badge color="danger" size="md">
        99
      </Badge>
      <Badge color="danger" size="lg">
        999
      </Badge>
    </div>
  );
}
