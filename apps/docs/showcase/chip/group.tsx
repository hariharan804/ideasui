'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { Chip, ChipGroup } from '@ideasui/react';

export default function ChipGroupDemo(): JSX.Element {
  const [selected, setSelected] = useState<string[]>(['react', 'tailwind']);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <ChipGroup
        color="primary"
        label="Select skills"
        selectionMode="multiple"
        value={selected}
        variant="soft"
        onChange={setSelected}
      >
        <Chip value="react">React</Chip>
        <Chip value="vue">Vue</Chip>
        <Chip value="tailwind">Tailwind</Chip>
        <Chip value="typescript">TypeScript</Chip>
        <Chip value="nextjs">Next.js</Chip>
      </ChipGroup>
      <p className="text-content-secondary text-xs">
        Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
      </p>
    </div>
  );
}
