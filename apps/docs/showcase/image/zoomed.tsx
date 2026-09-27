'use client';

import { Image } from '@ideasui/react';
import type { JSX } from 'react';

export default function ImageZoomedDemo(): JSX.Element {
  return (
    <div className="flex justify-center p-4">
      <Image
        isZoomed
        alt="Hover to zoom"
        aspectRatio="video"
        radius="lg"
        shadow="md"
        src="https://picsum.photos/seed/zoom/800/600"
        style={{ width: 400 }}
      />
    </div>
  );
}
