'use client';

import { Textarea } from '@ideasui/react';

export function Compound() {
  return (
    <div className="w-80">
      <Textarea variant="outline">
        <Textarea.Label>Custom Review</Textarea.Label>
        <Textarea.Input
          showCharacterCount
          maxLength={300}
          minRows={4}
          placeholder="Describe your detailed thoughts..."
        />
        <Textarea.Description>
          Submissions are subject to community guidelines.
        </Textarea.Description>
      </Textarea>
    </div>
  );
}
