'use client';

import { InputField } from '@ideasui/react';

export function Sizes() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <InputField label="Small Size (sm)" placeholder="Small input..." size="sm" />
      <InputField label="Medium Size (md)" placeholder="Medium input..." size="md" />
      <InputField label="Large Size (lg)" placeholder="Large input..." size="lg" />
    </div>
  );
}
