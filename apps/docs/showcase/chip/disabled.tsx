'use client';

import type { JSX } from 'react';
import { Chip } from '@ideasui/react';

export default function ChipDisabledDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Chip isDisabled color="primary">
        Disabled Static
      </Chip>
      <Chip isDisabled color="primary" mode="selectable">
        Disabled Selectable
      </Chip>
      <Chip isDisabled color="danger" mode="dismissible" onDismiss={() => {}}>
        Disabled Dismissible
      </Chip>
    </div>
  );
}
