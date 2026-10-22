'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

export default function BadgeVariantsDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Badge color="primary" variant="solid">
        Solid
      </Badge>
      <Badge color="primary" variant="soft">
        Soft
      </Badge>
      <Badge color="primary" variant="outline">
        Outline
      </Badge>
      <Badge color="primary" variant="ghost">
        Ghost
      </Badge>
    </div>
  );
}
