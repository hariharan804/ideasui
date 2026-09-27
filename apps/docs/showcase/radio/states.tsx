'use client';

import { Radio } from '@ideasui/react';

export function States() {
  return (
    <div className="flex flex-col gap-4">
      <Radio>Unchecked</Radio>
      <Radio defaultSelected>Checked</Radio>
      <Radio isDisabled>Disabled unchecked</Radio>
      <Radio defaultSelected isDisabled>
        Disabled checked
      </Radio>
      <Radio isInvalid>Invalid</Radio>
      <Radio defaultSelected isReadOnly>
        Read-only
      </Radio>
    </div>
  );
}
