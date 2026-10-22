'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { Badge } from '@ideasui/react';

export default function BadgeInvisibleDemo(): JSX.Element {
  const [isInvisible, setIsInvisible] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-4">
        <Badge color="danger" isInvisible={isInvisible}>
          5
        </Badge>
        <Badge color="success" isInvisible={!isInvisible}>
          Active
        </Badge>
      </div>
      <button
        className="text-primary hover:text-primary/80 text-sm font-medium underline"
        type="button"
        onClick={() => setIsInvisible((v) => !v)}
      >
        Toggle Visibility
      </button>
    </div>
  );
}
