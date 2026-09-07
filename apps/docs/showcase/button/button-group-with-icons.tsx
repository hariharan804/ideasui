'use client';

import { Button } from '@ideasui/react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

export default function ButtonGroupWithIcons() {
  return (
    <Button.Group color="neutral" variant="outline">
      <Button isIconOnly aria-label="Align Left">
        <AlignLeft className="size-4" />
      </Button>
      <Button isIconOnly aria-label="Align Center">
        <AlignCenter className="size-4" />
      </Button>
      <Button isIconOnly aria-label="Align Right">
        <AlignRight className="size-4" />
      </Button>
      <Button isIconOnly aria-label="Justify">
        <AlignJustify className="size-4" />
      </Button>
    </Button.Group>
  );
}
