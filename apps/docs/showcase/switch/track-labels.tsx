'use client';

import { Switch } from '@ideasui/react';

export function TrackLabels() {
  return (
    <div className="flex items-center gap-4 p-4">
      <Switch defaultSelected offLabel="OFF" onLabel="ON">
        Enable Feature
      </Switch>
    </div>
  );
}
