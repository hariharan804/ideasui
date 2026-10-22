'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

export default function BadgeDotDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4">
      <Badge isDot color="primary" size="sm" />
      <Badge isDot color="success" size="md" />
      <Badge isDot color="warning" size="md" />
      <Badge isDot color="danger" size="lg" />
      <Badge isDot color="neutral" size="md" />
    </div>
  );
}
