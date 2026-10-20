'use client';

import type { JSX } from 'react';
import { Chip, ChipAvatar } from '@ideasui/react';

export default function ChipAvatarDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Chip size="md" startContent={<ChipAvatar name="Jane Doe" />}>
        Jane Doe
      </Chip>
      <Chip
        color="primary"
        size="lg"
        startContent={
          <ChipAvatar
            name="Sarah Connor"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
          />
        }
      >
        Sarah Connor
      </Chip>
      <Chip
        color="neutral"
        mode="dismissible"
        startContent={<ChipAvatar name="Alex Smith" />}
        onDismiss={() => {}}
      >
        Alex Smith
      </Chip>
    </div>
  );
}
