'use client';

import { Checkbox } from '@ideasui/react';

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox defaultSelected size="sm">
        Small (sm)
      </Checkbox>
      <Checkbox defaultSelected size="md">
        Medium (md)
      </Checkbox>
      <Checkbox defaultSelected size="lg">
        Large (lg)
      </Checkbox>
    </div>
  );
}
