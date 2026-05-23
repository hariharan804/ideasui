'use client';

import { Button } from '@ideasui/react';

export default function ButtonGroupVertical() {
  return (
    <div className="flex gap-6">
      <Button.Group isVertical color="primary" variant="solid">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </Button.Group>

      <Button.Group isVertical color="neutral" variant="outline">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </Button.Group>
    </div>
  );
}
