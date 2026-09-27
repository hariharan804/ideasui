'use client';

import { Image, ImageFallback } from '@ideasui/react';
import type { JSX } from 'react';

export default function ImageErrorFallbackDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-content-secondary text-xs">Default broken icon</span>
        <Image
          alt="Broken image"
          aspectRatio="square"
          radius="md"
          src="/invalid-image-path.jpg"
          style={{ width: 120 }}
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-content-secondary text-xs">Custom fallback child</span>
        <Image
          alt="Broken image with custom fallback"
          aspectRatio="square"
          radius="md"
          src="/invalid-image-path.jpg"
          style={{ width: 120 }}
        >
          <ImageFallback>
            <span className="text-content-secondary px-2 text-center text-xs">Unavailable</span>
          </ImageFallback>
        </Image>
      </div>
    </div>
  );
}
