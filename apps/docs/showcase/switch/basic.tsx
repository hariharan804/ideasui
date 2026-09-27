'use client';

import { Switch } from '@ideasui/react';

export function Basic() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Switch defaultSelected>Enable notifications</Switch>
    </div>
  );
}
