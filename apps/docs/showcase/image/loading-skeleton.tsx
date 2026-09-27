'use client';

import { Image } from '@ideasui/react';
import type { JSX } from 'react';

import { useState } from 'react';

export default function ImageLoadingSkeletonDemo(): JSX.Element {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
      <Image
        alt="Async loaded image"
        aspectRatio="video"
        isLoading={loading}
        radius="md"
        src={loading ? undefined : 'https://picsum.photos/seed/skeleton/800/600'}
        style={{ width: '100%' }}
      />
      <button
        className="text-primary cursor-pointer text-sm font-medium underline"
        type="button"
        onClick={() => setLoading((v) => !v)}
      >
        {loading ? 'Simulate load complete' : 'Reset to loading state'}
      </button>
    </div>
  );
}
