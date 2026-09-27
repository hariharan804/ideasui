'use client';

import { Image } from '@ideasui/react';
import type { JSX } from 'react';

export default function ImageAspectRatiosDemo(): JSX.Element {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {(['square', 'video', '4/3', '3/2'] as const).map((ratio) => (
        <div key={ratio} className="flex flex-col gap-1.5">
          <span className="text-content-secondary text-xs font-semibold uppercase">{ratio}</span>
          <Image
            alt={`Aspect ratio ${ratio}`}
            aspectRatio={ratio}
            radius="md"
            src={`https://picsum.photos/seed/ratio-${ratio.replace('/', '-')}/800/600`}
          />
        </div>
      ))}
    </div>
  );
}
