'use client';

import type { JSX } from 'react';
import { Divider } from '@ideasui/react';

export default function DividerLayoutDemo(): JSX.Element {
  return (
    <div className="bg-surface-subtle border-border flex w-full max-w-md flex-col gap-6 rounded-xl border p-4">
      <div>
        <p className="text-content-secondary mb-2 text-xs font-medium">Full Width (Default)</p>
        <Divider variant="full" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs font-medium">
          Inset Start (Indented from start)
        </p>
        <Divider variant="inset" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs font-medium">
          Inset End (Indented from end)
        </p>
        <Divider variant="inset-end" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs font-medium">
          Middle (Indented from both ends)
        </p>
        <Divider variant="middle" />
      </div>
    </div>
  );
}
