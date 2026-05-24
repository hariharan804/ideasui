'use client';

import { Button } from '@ideasui/react';
import { Undo, Redo } from 'lucide-react';

export default function ButtonGroupDisabled() {
  return (
    <div className="flex flex-col items-start gap-8">
      {/* Individual override - typical use case */}
      <div className="flex flex-col gap-2">
        <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
          Individual Button Disabled
        </span>
        <Button.Group color="neutral" variant="outline">
          <Button isDisabled>
            <Button.Icon placement="start">
              <Undo className="size-4" />
            </Button.Icon>
            Undo
          </Button>
          <Button>
            <Button.Icon placement="start">
              <Redo className="size-4" />
            </Button.Icon>
            Redo
          </Button>
        </Button.Group>
        <span className="text-content-tertiary text-xs">(No previous history to undo)</span>
      </div>

      {/* Entire group disabled - typical use case */}
      <div className="flex flex-col gap-2">
        <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
          Entire Group Disabled
        </span>
        <Button.Group isDisabled color="primary" variant="solid">
          <Button>Save draft</Button>
          <Button>Publish</Button>
        </Button.Group>
        <span className="text-content-tertiary text-xs">(Waiting for form edits...)</span>
      </div>
    </div>
  );
}
