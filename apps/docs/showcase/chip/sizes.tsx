'use client';

import type { JSX } from 'react';
import { Chip } from '@ideasui/react';

export default function ChipSizesDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Chip color="primary" size="sm">
        Small (sm)
      </Chip>
      <Chip color="primary" size="md">
        Medium (md)
      </Chip>
      <Chip color="primary" size="lg">
        Large (lg)
      </Chip>
    </div>
  );
}
