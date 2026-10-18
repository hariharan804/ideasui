'use client';

import type { JSX } from 'react';
import { Divider } from '@ideasui/react';

export default function DividerVerticalDemo(): JSX.Element {
  return (
    <div className="text-content-primary flex h-10 items-center gap-4 px-4 py-2 text-sm">
      <span>Dashboard</span>
      <Divider orientation="vertical" />
      <span>Analytics</span>
      <Divider orientation="vertical" />
      <span>Settings</span>
    </div>
  );
}
