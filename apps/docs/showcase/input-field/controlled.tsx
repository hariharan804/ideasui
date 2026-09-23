'use client';

import { useState } from 'react';
import { InputField, Button } from '@ideasui/react';
import { Mail, RotateCcw } from 'lucide-react';

export function Controlled() {
  const [value, setValue] = useState('user@example.com');

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputField
        description="Value is managed via React state."
        label="Controlled Input"
        placeholder="Enter email..."
        startContent={<Mail className="h-4 w-4" />}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <div className="bg-surface-subtle flex flex-wrap items-center justify-between gap-3 rounded-md p-3">
        <div className="text-xs">
          <span className="text-content-muted">Current Value: </span>
          <span className="text-content-primary font-mono font-medium">
            {value.length > 0 ? value : '(empty)'}
          </span>
        </div>

        <Button
          size="sm"
          startIcon={<RotateCcw className="h-3.5 w-3.5" />}
          variant="soft"
          onPress={() => setValue('')}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
