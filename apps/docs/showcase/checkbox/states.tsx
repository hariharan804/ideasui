'use client';

import { Checkbox } from '@ideasui/react';

export function States() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultSelected>Checked</Checkbox>
      <Checkbox isIndeterminate isSelected>
        Indeterminate
      </Checkbox>
      <Checkbox isDisabled>Disabled Unchecked</Checkbox>
      <Checkbox defaultSelected isDisabled>
        Disabled Checked
      </Checkbox>
      <Checkbox defaultSelected isReadOnly>
        Read-Only
      </Checkbox>
      <Checkbox isInvalid>Invalid State</Checkbox>
    </div>
  );
}
