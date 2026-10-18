'use client';

import type { JSX } from 'react';
import { Avatar } from '@ideasui/react';

export default function AvatarSizesDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-end gap-4 p-4">
      <Avatar color="primary" name="XS" size="xs" />
      <Avatar color="primary" name="SM" size="sm" />
      <Avatar color="primary" name="MD" size="md" />
      <Avatar color="primary" name="LG" size="lg" />
      <Avatar color="primary" name="XL" size="xl" />
    </div>
  );
}
