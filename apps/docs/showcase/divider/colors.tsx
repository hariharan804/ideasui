'use client';

import type { JSX } from 'react';
import { Divider } from '@ideasui/react';

export default function DividerColorsDemo(): JSX.Element {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 p-4">
      <Divider color="default" label="default" />
      <Divider color="primary" label="primary" />
      <Divider color="neutral" label="neutral" />
      <Divider color="success" label="success" />
      <Divider color="warning" label="warning" />
      <Divider color="danger" label="danger" />
    </div>
  );
}
