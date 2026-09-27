'use client';

import { Switch } from '@ideasui/react';

export function States() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <Switch>Unchecked</Switch>
      <Switch defaultSelected>Checked</Switch>
      <Switch isDisabled>Disabled Unchecked</Switch>
      <Switch defaultSelected isDisabled>
        Disabled Checked
      </Switch>
      <Switch defaultSelected isReadOnly>
        Read-Only
      </Switch>
      <Switch isInvalid>Invalid State</Switch>
    </div>
  );
}
