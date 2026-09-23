'use client';

import { Checkbox } from '@ideasui/react';

export function Radius() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox defaultSelected radius="none">
        Square (none)
      </Checkbox>
      <Checkbox defaultSelected radius="sm">
        Small (sm)
      </Checkbox>
      <Checkbox defaultSelected radius="md">
        Medium (md)
      </Checkbox>
      <Checkbox defaultSelected radius="lg">
        Large (lg)
      </Checkbox>
      <Checkbox defaultSelected radius="full">
        Circular (full)
      </Checkbox>
    </div>
  );
}
