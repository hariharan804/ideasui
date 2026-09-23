'use client';

import { Textarea } from '@ideasui/react';

export function AutoResize() {
  return (
    <div className="w-80 space-y-4">
      <Textarea
        autoResize
        defaultValue="Type multiple lines of text here. Notice how the textarea expands smoothly up to 6 lines, and then enables scrollbars automatically."
        description="Dynamic auto-sizing between 2 and 6 rows."
        label="Auto-Resizing Textarea"
        maxRows={6}
        minRows={2}
      />
    </div>
  );
}
