'use client';

import { Radio } from '@ideasui/react';

export function Colors() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Radio color="primary" defaultSelected={true}>
        Primary
      </Radio>
      <Radio color="neutral" defaultSelected={true}>
        Neutral
      </Radio>
      <Radio color="success" defaultSelected={true}>
        Success
      </Radio>
      <Radio color="warning" defaultSelected={true}>
        Warning
      </Radio>
      <Radio color="danger" defaultSelected={true}>
        Danger
      </Radio>
    </div>
  );
}
