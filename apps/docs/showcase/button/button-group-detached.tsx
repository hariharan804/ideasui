'use client';

import { Button } from '@ideasui/react';

export default function ButtonGroupDetached() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button.Group color="primary" isAttached={false} variant="solid">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Button.Group>

      <Button.Group color="neutral" isAttached={false} variant="outline">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Button.Group>
    </div>
  );
}
