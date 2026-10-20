'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { Chip } from '@ideasui/react';

export default function ChipDismissibleDemo(): JSX.Element {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Next.js']);

  const removeTag = (tag: string) => {
    setTags((current) => current.filter((item) => item !== tag));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            color="primary"
            mode="dismissible"
            variant="soft"
            onDismiss={() => removeTag(tag)}
          >
            {tag}
          </Chip>
        ))}
      </div>
      {tags.length === 0 && (
        <button
          className="text-primary text-xs underline"
          type="button"
          onClick={() => setTags(['React', 'TypeScript', 'Tailwind', 'Next.js'])}
        >
          Reset tags
        </button>
      )}
    </div>
  );
}
