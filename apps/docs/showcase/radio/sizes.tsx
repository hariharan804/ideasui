'use client';

import { Radio } from '@ideasui/react';

export function Sizes() {
  return (
    <div className="flex flex-col gap-4">
      <Radio defaultSelected size="sm">
        Small (sm)
      </Radio>
      <Radio defaultSelected size="md">
        Medium (md)
      </Radio>
      <Radio defaultSelected size="lg">
        Large (lg)
      </Radio>
    </div>
  );
}
