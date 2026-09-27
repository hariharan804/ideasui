'use client';

import { Switch } from '@ideasui/react';

export function LabelPlacement() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <Switch defaultSelected labelPlacement="end">
        Label End (default)
      </Switch>
      <Switch defaultSelected labelPlacement="start">
        Label Start
      </Switch>
    </div>
  );
}
