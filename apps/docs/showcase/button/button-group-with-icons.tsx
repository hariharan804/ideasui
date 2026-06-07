'use client';

import { Button } from '@ideasui/react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

export default function ButtonGroupWithIcons() {
  return (
    <Button.Group isIconOnly color="neutral" variant="outline">
      <Button aria-label="Align Left">
        <AlignLeft className="size-4" />
      </Button>
      <Button aria-label="Align Center">
        <AlignCenter className="size-4" />
      </Button>
      <Button aria-label="Align Right">
        <AlignRight className="size-4" />
      </Button>
      <Button aria-label="Justify">
        <AlignJustify className="size-4" />
      </Button>
    </Button.Group>
  );
}
