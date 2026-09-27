'use client';

import { Switch } from '@ideasui/react';

export function ThumbVariants() {
  const thumbVariants = [
    { name: 'solid', label: 'Solid' },
    { name: 'flat', label: 'Flat' },
    { name: 'gradient', label: 'Gradient' },
    { name: 'bordered', label: 'Bordered' },
    { name: 'contrast', label: 'Contrast' },
    { name: 'dark', label: 'Dark' },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {thumbVariants.map((item) => (
        <div
          key={item.name}
          className="border-border bg-surface-subtle/40 flex flex-col gap-3 rounded-xl border p-4 shadow-2xs"
        >
          <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
            {item.label} Thumb
          </span>
          <div className="flex items-center gap-6">
            <Switch thumbVariant={item.name}>Off</Switch>
            <Switch defaultSelected thumbVariant={item.name}>
              On
            </Switch>
          </div>
        </div>
      ))}
    </div>
  );
}
