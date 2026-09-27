'use client';

import { Checkbox } from '@ideasui/react';

export function Colors() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox defaultSelected color="primary">
        Primary
      </Checkbox>
      <Checkbox defaultSelected color="neutral">
        Neutral
      </Checkbox>
      <Checkbox defaultSelected color="success">
        Success
      </Checkbox>
      <Checkbox defaultSelected color="warning">
        Warning
      </Checkbox>
      <Checkbox defaultSelected color="danger">
        Danger
      </Checkbox>
    </div>
  );
}
