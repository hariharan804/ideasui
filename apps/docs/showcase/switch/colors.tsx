'use client';

import { Switch } from '@ideasui/react';

export function Colors() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <Switch defaultSelected color="primary">
        Primary
      </Switch>
      <Switch defaultSelected color="neutral">
        Neutral
      </Switch>
      <Switch defaultSelected color="success">
        Success
      </Switch>
      <Switch defaultSelected color="warning">
        Warning
      </Switch>
      <Switch defaultSelected color="danger">
        Danger
      </Switch>
    </div>
  );
}
