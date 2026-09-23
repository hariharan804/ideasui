'use client';

import { useState } from 'react';
import { Textarea, Button } from '@ideasui/react';

export function Controlled() {
  const [value, setValue] = useState('Controlled initial message');

  return (
    <div className="w-80 space-y-4">
      <Textarea
        label="Controlled Textarea"
        placeholder="Type here..."
        value={value}
        onValueChange={setValue}
      />
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onPress={() => setValue('')}>
          Clear
        </Button>
        <Button
          color="secondary"
          size="sm"
          variant="soft"
          onPress={() => setValue('Prefilled note added at ' + new Date().toLocaleTimeString())}
        >
          Insert Template
        </Button>
      </div>
      <p className="text-content-secondary text-xs">
        Current length: <span className="font-semibold">{value.length}</span> characters
      </p>
    </div>
  );
}
