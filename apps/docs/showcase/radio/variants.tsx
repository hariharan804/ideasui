'use client';

import { Radio } from '@ideasui/react';

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <Radio defaultSelected variant="solid">
        Solid (Default)
      </Radio>
      <Radio defaultSelected variant="outline">
        Outline
      </Radio>
      <Radio defaultSelected variant="subtle">
        Subtle
      </Radio>
    </div>
  );
}
