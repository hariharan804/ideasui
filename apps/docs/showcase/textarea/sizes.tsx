'use client';

import { Textarea } from '@ideasui/react';

export function Sizes() {
  return (
    <div className="w-80 space-y-4">
      <Textarea label="Small (sm)" placeholder="Small textarea" size="sm" />
      <Textarea label="Medium (md - Default)" placeholder="Medium textarea" size="md" />
      <Textarea label="Large (lg)" placeholder="Large textarea" size="lg" />
    </div>
  );
}
