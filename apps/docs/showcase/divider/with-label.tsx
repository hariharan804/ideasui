'use client';

import type { JSX } from 'react';
import { Divider } from '@ideasui/react';

export default function DividerWithLabelDemo(): JSX.Element {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 p-4">
      <Divider label="OR" />
      <Divider label="Personal Information" labelPlacement="start" />
      <Divider label="See more" labelPlacement="end" />
    </div>
  );
}
