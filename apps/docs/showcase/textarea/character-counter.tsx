'use client';

import { Textarea } from '@ideasui/react';

export function CharacterCounter() {
  return (
    <div className="w-80 space-y-4">
      <Textarea
        showCharacterCount
        defaultValue="Crafting delightful user experiences with IdeasUI."
        description="Write a concise product summary."
        label="Product Summary"
        maxLength={140}
      />
    </div>
  );
}
