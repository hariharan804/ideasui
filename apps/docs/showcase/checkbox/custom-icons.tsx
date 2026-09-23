'use client';

import { Checkbox } from '@ideasui/react';
import { Check, X, Minus } from 'lucide-react';

export function CustomIcons() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox defaultSelected checkedIcon={<Check className="h-3.5 w-3.5" />}>
        Custom Checked Icon (Lucide Check)
      </Checkbox>

      <Checkbox uncheckedIcon={<X className="h-3.5 w-3.5" />}>
        Custom Unchecked Icon (Lucide X)
      </Checkbox>

      <Checkbox isIndeterminate indeterminateIcon={<Minus className="h-3.5 w-3.5" />}>
        Custom Indeterminate Icon (Lucide Minus)
      </Checkbox>
    </div>
  );
}
