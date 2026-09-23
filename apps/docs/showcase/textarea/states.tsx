'use client';

import { Textarea } from '@ideasui/react';

export function States() {
  return (
    <div className="w-80 space-y-4">
      <Textarea isRequired label="Required" placeholder="Required field..." />
      <Textarea
        isInvalid
        errorMessage="Please enter a valid description (at least 20 characters)."
        label="Invalid"
        value="Too short"
      />
      <Textarea
        isDisabled
        label="Disabled"
        placeholder="Cannot interact with this field"
        value="Disabled input content"
      />
      <Textarea isReadOnly label="Read-Only" value="This text is read-only and cannot be edited." />
    </div>
  );
}
