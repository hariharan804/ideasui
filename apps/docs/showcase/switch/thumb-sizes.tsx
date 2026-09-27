'use client';

import { Switch } from '@ideasui/react';

export function ThumbSizes() {
  const thumbSizes = [
    {
      name: 'contained',
      label: 'Contained (Default)',
      desc: 'Thumb is contained inside the track bounds.',
    },
    {
      name: 'extended',
      label: 'Extended',
      desc: 'Thumb expands outside track bounds with elevated depth.',
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {thumbSizes.map((item) => (
        <div
          key={item.name}
          className="border-border bg-surface-subtle/40 flex flex-col gap-3 rounded-xl border p-4 shadow-2xs"
        >
          <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
            {item.label}
          </span>
          <p className="text-content-muted text-xs leading-normal">{item.desc}</p>
          <div className="flex items-center gap-6 pt-1">
            <Switch thumbSize={item.name}>Off</Switch>
            <Switch defaultSelected thumbSize={item.name}>
              On
            </Switch>
          </div>
        </div>
      ))}
    </div>
  );
}
