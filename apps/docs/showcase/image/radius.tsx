'use client';

import { Image } from '@ideasui/react';
import type { JSX } from 'react';

export default function ImageRadiusDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-end justify-center gap-4 p-4">
      {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
        <div key={radius} className="flex flex-col items-center gap-1.5">
          <span className="text-content-secondary text-xs">{radius}</span>
          <Image
            alt={`Radius ${radius}`}
            aspectRatio="square"
            radius={radius}
            src="https://picsum.photos/seed/radius/200/200"
            style={{ width: 72 }}
          />
        </div>
      ))}
    </div>
  );
}
