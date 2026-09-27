'use client';

import { Switch } from '@ideasui/react';

export function ThumbShapes() {
  const thumbShapes = [
    { name: 'full', label: 'Full (Circle)' },
    { name: 'square', label: 'Square' },
    { name: 'pill', label: 'Pill (Wide Capsule)' },
    { name: 'rectangle', label: 'Rectangle (Wide Box)' },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {thumbShapes.map((item) => (
        <div
          key={item.name}
          className="border-border bg-surface-subtle/40 flex flex-col gap-3 rounded-xl border p-4 shadow-2xs"
        >
          <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
            {item.label}
          </span>
          <div className="flex items-center gap-6">
            <Switch thumbShape={item.name}>Off</Switch>
            <Switch defaultSelected thumbShape={item.name}>
              On
            </Switch>
          </div>
        </div>
      ))}
    </div>
  );
}
