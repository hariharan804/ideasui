'use client';

import { InputField } from '@ideasui/react';

export function States() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <InputField
        isRequired
        description="Required input field."
        label="Required Field"
        placeholder="Mandatory input"
      />

      <InputField
        isDisabled
        description="Disabled input state."
        label="Disabled Field"
        placeholder="Cannot type here"
      />

      <InputField
        isReadOnly
        defaultValue="read.only@example.com"
        description="Read-only value state."
        label="Read Only Field"
      />

      <InputField
        isInvalid
        errorMessage="Please enter a valid email address."
        label="Invalid State"
        placeholder="invalid-email"
      />
    </div>
  );
}
