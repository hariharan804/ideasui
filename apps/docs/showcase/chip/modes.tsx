'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { Chip } from '@ideasui/react';

export default function ChipModesDemo(): JSX.Element {
  const [selected, setSelected] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Chip color="neutral" mode="static">
        Static Mode
      </Chip>
      <Chip color="primary" isSelected={selected} mode="selectable" onChange={setSelected}>
        {selected ? 'Selected (Click me)' : 'Unselected (Click me)'}
      </Chip>
      {!dismissed && (
        <Chip color="danger" mode="dismissible" onDismiss={() => setDismissed(true)}>
          Dismissible (Click X or press Delete)
        </Chip>
      )}
      {dismissed && (
        <button
          className="text-primary text-xs underline"
          type="button"
          onClick={() => setDismissed(false)}
        >
          Reset dismissible chip
        </button>
      )}
    </div>
  );
}
