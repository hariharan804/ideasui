'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { Chip, ChipGroup } from '@ideasui/react';

export default function ChipSingleSelectDemo(): JSX.Element {
  const [selected, setSelected] = useState<string[]>(['md']);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <ChipGroup
        color="primary"
        label="Size selection"
        selectionMode="single"
        value={selected}
        variant="outline"
        onChange={setSelected}
      >
        <Chip value="sm">Small</Chip>
        <Chip value="md">Medium</Chip>
        <Chip value="lg">Large</Chip>
      </ChipGroup>
      <p className="text-content-secondary text-xs">Chosen size: {selected[0] ?? 'None'}</p>
    </div>
  );
}
