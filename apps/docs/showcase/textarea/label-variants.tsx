'use client';

import { Textarea } from '@ideasui/react';

export function LabelVariants() {
  return (
    <div className="w-80 space-y-4">
      <Textarea label="Standard (Default)" labelVariant="default" placeholder="Standard label" />
      <Textarea label="Inside Fixed" labelVariant="inside-fixed" placeholder="Inside fixed label" />
      <Textarea
        label="Inside Floating"
        labelVariant="inside-floating"
        placeholder="Inside floating label"
      />
      <Textarea label="Floating (Outlined)" labelVariant="floating" placeholder="Floating label" />
    </div>
  );
}
