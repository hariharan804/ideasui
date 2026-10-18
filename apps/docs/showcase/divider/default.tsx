'use client';

import type { JSX } from 'react';
import { Divider } from '@ideasui/react';

export default function DividerDefaultDemo(): JSX.Element {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 p-4">
      <div className="space-y-1">
        <h4 className="text-content-primary text-sm font-medium">IdeasUI Components</h4>
        <p className="text-content-secondary text-xs">
          An open-source accessible React component system.
        </p>
      </div>
      <Divider />
      <div className="text-content-secondary flex h-5 items-center gap-1 text-xs">
        <span>Docs</span>
        <Divider orientation="vertical" />
        <span>Source</span>
        <Divider orientation="vertical" />
        <span>Changelog</span>
      </div>
    </div>
  );
}
