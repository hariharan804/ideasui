'use client';

import type { JSX } from 'react';
import { Chip } from '@ideasui/react';

export default function ChipDefaultDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Chip>React</Chip>
      <Chip color="primary">Next.js</Chip>
      <Chip color="success">Tailwind CSS</Chip>
    </div>
  );
}
