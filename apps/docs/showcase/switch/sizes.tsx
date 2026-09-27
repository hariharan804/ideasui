'use client';

import { Switch } from '@ideasui/react';

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <Switch defaultSelected size="sm">
        Small (sm)
      </Switch>
      <Switch defaultSelected size="md">
        Medium (md)
      </Switch>
      <Switch defaultSelected size="lg">
        Large (lg)
      </Switch>
    </div>
  );
}
