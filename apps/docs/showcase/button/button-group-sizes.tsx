'use client';

import { Button } from '@ideasui/react';

export default function ButtonGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-2">
        <p className="text-content-tertiary text-sm">Small</p>
        <Button.Group size="sm" variant="outline">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-content-tertiary text-sm">Medium (default)</p>
        <Button.Group size="md" variant="outline">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-content-tertiary text-sm">Large</p>
        <Button.Group size="lg" variant="outline">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>
    </div>
  );
}
