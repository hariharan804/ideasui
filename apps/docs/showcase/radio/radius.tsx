'use client';

import { Radio } from '@ideasui/react';

export function Radius() {
  return (
    <div className="flex flex-col gap-4">
      <Radio defaultSelected radius="full">
        Full (Circular - Default)
      </Radio>
      <Radio defaultSelected radius="lg">
        Large
      </Radio>
      <Radio defaultSelected radius="md">
        Medium
      </Radio>
      <Radio defaultSelected radius="sm">
        Small
      </Radio>
      <Radio defaultSelected radius="none">
        None (Square)
      </Radio>
    </div>
  );
}
