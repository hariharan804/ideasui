'use client';

import { useState } from 'react';
import { Switch } from '@ideasui/react';

export function Controlled() {
  const [isSelected, setIsSelected] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-3 p-4">
      <Switch isSelected={isSelected} onChange={(checked) => setIsSelected(checked)}>
        Subscribe to email updates
      </Switch>
      <p className="text-content-muted text-xs">State: {isSelected ? 'ON' : 'OFF'}</p>
    </div>
  );
}
