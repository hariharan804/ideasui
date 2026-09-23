'use client';

import { useState } from 'react';
import { Checkbox } from '@ideasui/react';

export function Indeterminate() {
  const options = ['Email Notifications', 'SMS Alerts', 'Push Notifications'];
  const [selected, setSelected] = useState<string[]>(['Email Notifications']);

  const allSelected = selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? [...options] : []);
  };

  const toggleOne = (opt: string, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, opt] : prev.filter((v) => v !== opt)));
  };

  return (
    <div className="flex flex-col gap-3">
      <Checkbox isIndeterminate={someSelected} isSelected={allSelected} onChange={toggleAll}>
        Select All Channels
      </Checkbox>

      <div className="ml-6 flex flex-col gap-2">
        {options.map((opt) => (
          <Checkbox
            key={opt}
            isSelected={selected.includes(opt)}
            onChange={(checked) => toggleOne(opt, checked)}
          >
            {opt}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
