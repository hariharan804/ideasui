'use client';

import type { JSX } from 'react';
import { Divider } from '@ideasui/react';

export default function DividerThicknessDemo(): JSX.Element {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 p-4">
      <div>
        <p className="text-content-secondary mb-2 text-xs">sm (1px)</p>
        <Divider color="primary" thickness="sm" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs">md (2px)</p>
        <Divider color="primary" thickness="md" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs">lg (4px)</p>
        <Divider color="primary" thickness="lg" />
      </div>
    </div>
  );
}
