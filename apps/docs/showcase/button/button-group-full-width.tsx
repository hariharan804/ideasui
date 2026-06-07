'use client';

import { Button } from '@ideasui/react';

export default function ButtonGroupFullWidth() {
  return (
    <div className="w-[400px] max-w-full space-y-4">
      <Button.Group fullWidth color="primary" variant="solid">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Button.Group>

      <Button.Group fullWidth color="neutral" variant="outline">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Button.Group>
    </div>
  );
}
