'use client';

import { Checkbox } from '@ideasui/react';

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox defaultSelected variant="solid">
        Solid
      </Checkbox>
      <Checkbox defaultSelected variant="outline">
        Outline
      </Checkbox>
      <Checkbox defaultSelected variant="subtle">
        Subtle
      </Checkbox>
    </div>
  );
}
