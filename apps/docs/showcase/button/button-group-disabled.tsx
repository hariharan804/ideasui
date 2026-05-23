'use client';

import { Button } from '@ideasui/react';

export default function ButtonGroupDisabled() {
  return (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <p className="text-content-tertiary text-sm">All buttons disabled via Group</p>
        <Button.Group isDisabled color="primary" variant="solid">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-content-tertiary text-sm">Group disabled, but one button overrides</p>
        <Button.Group isDisabled color="neutral" variant="outline">
          <Button>First</Button>
          <Button>Second</Button>
          <Button isDisabled={false}>Third (enabled)</Button>
        </Button.Group>
      </div>
    </div>
  );
}
