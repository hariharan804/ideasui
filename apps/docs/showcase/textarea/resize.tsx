'use client';

import { Textarea } from '@ideasui/react';

export function Resize() {
  return (
    <div className="w-80 space-y-4">
      <Textarea
        autoResize={false}
        label="Resize: None"
        placeholder="Resize handle disabled"
        resize="none"
      />
      <Textarea
        autoResize={false}
        label="Resize: Vertical"
        placeholder="Drag bottom edge to resize vertically"
        resize="vertical"
      />
      <Textarea
        autoResize={false}
        label="Resize: Both"
        placeholder="Drag corner to resize in both directions"
        resize="both"
      />
    </div>
  );
}
