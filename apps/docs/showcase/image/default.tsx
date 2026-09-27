'use client';

import { Image } from '@ideasui/react';
import type { JSX } from 'react';

export default function ImageDefaultDemo(): JSX.Element {
  return (
    <div className="flex justify-center p-4">
      <Image
        alt="Mountain landscape"
        height={600}
        radius="lg"
        src="https://picsum.photos/seed/ideasui-default/800/600"
        style={{ width: 400, height: 260 }}
        width={800}
      />
    </div>
  );
}
