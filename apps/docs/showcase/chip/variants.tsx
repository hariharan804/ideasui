'use client';

import type { JSX } from 'react';
import { Chip } from '@ideasui/react';

export default function ChipVariantsDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Chip color="primary" variant="solid">
        Solid
      </Chip>
      <Chip color="primary" variant="soft">
        Soft
      </Chip>
      <Chip color="primary" variant="outline">
        Outline
      </Chip>
      <Chip color="primary" variant="ghost">
        Ghost
      </Chip>
    </div>
  );
}
