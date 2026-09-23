'use client';

import { Checkbox } from '@ideasui/react';

export function Colors() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox defaultSelected colorScheme="primary">
        Primary
      </Checkbox>
      <Checkbox defaultSelected colorScheme="neutral">
        Neutral
      </Checkbox>
      <Checkbox defaultSelected colorScheme="success">
        Success
      </Checkbox>
      <Checkbox defaultSelected colorScheme="warning">
        Warning
      </Checkbox>
      <Checkbox defaultSelected colorScheme="danger">
        Danger
      </Checkbox>
    </div>
  );
}
