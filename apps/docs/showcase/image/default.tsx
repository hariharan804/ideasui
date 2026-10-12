'use client';

import { Image } from '@ideasui/react';
import type { JSX } from 'react';

export default function ImageDefaultDemo(): JSX.Element {
  return (
    <div className="flex justify-center p-4">
      <Image
        alt="IdeasUI Open Graph Image"
        height={630}
        radius="lg"
        shadow="md"
        src="/IdeasUI-og-image.png"
        style={{ width: 480, height: 252 }}
        width={1200}
      />
    </div>
  );
}
