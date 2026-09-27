'use client';

import { Image } from '@ideasui/react';
import type { JSX } from 'react';

export default function ImageObjectFitDemo(): JSX.Element {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-4 p-4 sm:grid-cols-4">
      {(['cover', 'contain', 'fill', 'scale-down'] as const).map((fit) => (
        <div key={fit} className="flex flex-col gap-1.5">
          <span className="text-content-secondary text-xs font-semibold">{fit}</span>
          <div className="bg-surface-muted h-32 rounded-md p-1">
            <Image
              alt={`Object fit ${fit}`}
              objectFit={fit}
              radius="sm"
              src="https://picsum.photos/seed/fit/400/300"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
