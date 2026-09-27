'use client';

import { Switch } from '@ideasui/react';

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-6 p-4">
      <Switch defaultSelected variant="solid">
        Solid
      </Switch>
      <Switch defaultSelected variant="outline">
        Outline
      </Switch>
      <Switch defaultSelected variant="soft">
        Soft
      </Switch>
      <Switch defaultSelected variant="contrast">
        Contrast
      </Switch>
    </div>
  );
}
