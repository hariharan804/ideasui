'use client';

import type { JSX } from 'react';
import { Divider } from '@ideasui/react';

export default function DividerVariantsDemo(): JSX.Element {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 p-4">
      <div>
        <p className="text-content-secondary mb-2 text-xs font-medium">Solid (Default)</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs font-medium">Dashed</p>
        <Divider label="Dashed" variant="dashed" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs font-medium">Dotted</p>
        <Divider label="Dotted" variant="dotted" />
      </div>
    </div>
  );
}
