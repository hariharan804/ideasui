'use client';

import type { JSX } from 'react';
import { Chip } from '@ideasui/react';

export default function ChipColorsDemo(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Chip color="primary" variant="soft">
          Primary
        </Chip>
        <Chip color="neutral" variant="soft">
          Neutral
        </Chip>
        <Chip color="success" variant="soft">
          Success
        </Chip>
        <Chip color="warning" variant="soft">
          Warning
        </Chip>
        <Chip color="danger" variant="soft">
          Danger
        </Chip>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Chip color="primary" variant="solid">
          Primary
        </Chip>
        <Chip color="neutral" variant="solid">
          Neutral
        </Chip>
        <Chip color="success" variant="solid">
          Success
        </Chip>
        <Chip color="warning" variant="solid">
          Warning
        </Chip>
        <Chip color="danger" variant="solid">
          Danger
        </Chip>
      </div>
    </div>
  );
}
