'use client';

import { Button } from '@ideasui/react';

export default function ButtonGroupVariants() {
  return (
    <div className="flex flex-col gap-8">
      {/* Solid Variant */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Solid</p>
        <Button.Group color="primary" divider="middle" variant="solid">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>

      {/* Outline Variant */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Outline</p>
        <Button.Group color="neutral" divider="middle" variant="outline">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>

      {/* Soft Variant (IdeasUI Specific) */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Soft</p>
        <Button.Group color="primary" divider="middle" variant="soft">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>

      {/* Ghost Variant */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Ghost</p>
        <Button.Group color="neutral" divider="middle" variant="ghost">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>

      {/* Elevated Variant (IdeasUI Specific) */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Elevated</p>
        <Button.Group color="neutral" divider="middle" variant="elevated">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>

      {/* Surface Variant */}
      <div className="flex flex-col gap-2">
        <p className="text-content-tertiary text-sm font-medium">Surface</p>
        <Button.Group color="primary" divider="middle" variant="surface">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </Button.Group>
      </div>
    </div>
  );
}
