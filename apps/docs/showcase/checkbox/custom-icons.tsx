'use client';

import { Checkbox } from '@ideasui/react';
import { Bookmark, Check, Heart, Minus, X } from 'lucide-react';

export function CustomIcons() {
  return (
    <div className="flex flex-col gap-4">
      {/* Heart Toggle with variant="customIcon" (borderless icon-only toggle) */}
      <Checkbox
        defaultSelected
        checkedIcon={<Heart className="text-danger size-4 fill-current" />}
        color="danger"
        uncheckedIcon={<Heart className="text-content-muted size-4" />}
        variant="customIcon"
      >
        Favorite (Heart Toggle)
      </Checkbox>

      {/* Bookmark Toggle with variant="customIcon" */}
      <Checkbox
        defaultSelected
        checkedIcon={<Bookmark className="text-primary size-4 fill-current" />}
        color="primary"
        uncheckedIcon={<Bookmark className="text-content-muted size-4" />}
        variant="customIcon"
      >
        Bookmark (Save Toggle)
      </Checkbox>

      {/* Custom Checked & Unchecked Icons inside standard indicator */}
      <Checkbox
        defaultSelected
        checkedIcon={<Check className="size-3.5" />}
        uncheckedIcon={<X className="text-content-muted size-3.5" />}
      >
        {/* Custom Check / Uncheck Icons */}
      </Checkbox>

      {/* Custom Indeterminate Icon */}
      <Checkbox isIndeterminate indeterminateIcon={<Minus className="size-3.5" />}>
        Custom Indeterminate Icon
      </Checkbox>
    </div>
  );
}
