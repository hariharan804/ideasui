'use client';

import type { JSX } from 'react';
import { Badge } from '@ideasui/react';

export default function BadgeColorsDemo(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 p-4">
      {(['solid', 'soft', 'outline'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap items-center justify-center gap-3">
          {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
            <Badge key={color} color={color} variant={variant}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  );
}
