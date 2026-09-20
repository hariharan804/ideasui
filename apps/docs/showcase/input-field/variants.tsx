'use client';

import { InputField } from '@ideasui/react';

export function VisualVariants() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <InputField
        description="Standard outline visual border."
        label="Outline Variant"
        placeholder="Outline style"
        variant="outline"
      />

      <InputField
        description="Filled surface background."
        label="Filled Variant"
        placeholder="Filled style"
        variant="filled"
      />

      <InputField
        description="Elevated subtle shadow container."
        label="Shadow Variant"
        placeholder="Shadow style"
        variant="shadow"
      />

      <InputField
        description="Underline border styling."
        label="Flushed Variant"
        placeholder="Flushed style"
        variant="flushed"
      />

      <InputField
        description="Unstyled raw input."
        label="Unstyled Variant"
        placeholder="Unstyled style"
        variant="unstyled"
      />
    </div>
  );
}
