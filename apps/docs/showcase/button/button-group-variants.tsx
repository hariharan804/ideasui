'use client';

import { Button } from '@ideasui/react';

export default function ButtonGroupVariants() {
  return (
    <div className="flex flex-col gap-8">
      {/* Solid Variant */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Solid</p>
        <Button.Group color="primary" variant="solid">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>

      {/* Outline Variant */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Outline</p>
        <Button.Group color="neutral" variant="outline">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>

      {/* Muted Variant (IdeasUI Specific) */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Muted</p>
        <Button.Group color="primary" variant="muted">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>

      {/* Ghost Variant */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Ghost</p>
        <Button.Group color="neutral" variant="ghost">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>

      {/* Elevated Variant (IdeasUI Specific) */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Elevated</p>
        <Button.Group color="neutral" variant="elevated">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>
    </div>
  );
}
