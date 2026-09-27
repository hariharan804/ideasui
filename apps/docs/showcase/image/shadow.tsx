'use client';

import { Image } from '@ideasui/react';
import type { JSX } from 'react';

export default function ImageShadowDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
        <div key={shadow} className="flex flex-col items-center gap-2">
          <span className="text-content-secondary text-xs">{shadow}</span>
          <Image
            alt={`Shadow ${shadow}`}
            radius="md"
            shadow={shadow}
            src="https://picsum.photos/seed/shadow/400/300"
            style={{ width: 140, height: 100 }}
          />
        </div>
      ))}
    </div>
  );
}
