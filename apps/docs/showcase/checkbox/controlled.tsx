'use client';

import { useState } from 'react';
import { Checkbox, Button } from '@ideasui/react';
import { RotateCcw } from 'lucide-react';

export function Controlled() {
  const [isSelected, setIsSelected] = useState<boolean>(true);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Checkbox isSelected={isSelected} onChange={(checked) => setIsSelected(checked)}>
        Subscribe to email updates
      </Checkbox>

      <div className="bg-surface-subtle flex flex-wrap items-center justify-between gap-3 rounded-md p-3">
        <div className="text-xs">
          <span className="text-content-muted">Current State: </span>
          <span className="text-content-primary font-mono font-medium">
            {isSelected ? 'Checked (true)' : 'Unchecked (false)'}
          </span>
        </div>

        <Button
          size="sm"
          startIcon={<RotateCcw className="h-3.5 w-3.5" />}
          variant="soft"
          onPress={() => setIsSelected((prev) => !prev)}
        >
          Toggle State
        </Button>
      </div>
    </div>
  );
}
