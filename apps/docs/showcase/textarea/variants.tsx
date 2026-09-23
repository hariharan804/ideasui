'use client';

import { Textarea } from '@ideasui/react';

export function Variants() {
  return (
    <div className="w-80 space-y-4">
      <Textarea label="Outline (Default)" placeholder="Outline textarea" variant="outline" />
      <Textarea label="Filled" placeholder="Filled textarea" variant="filled" />
      <Textarea label="Flushed" placeholder="Flushed textarea" variant="flushed" />
      <Textarea label="Shadow" placeholder="Shadow textarea" variant="shadow" />
    </div>
  );
}
