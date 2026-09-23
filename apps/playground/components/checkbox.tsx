'use client';

import type { JSX } from 'react';

import { Checkbox } from '@ideasui/checkbox';

export default function CheckboxPreview(): JSX.Element {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Checkbox Component</h1>
        <p className="text-content-secondary mb-8">
          Interactive examples of the Checkbox component with different variants and states.
        </p>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Checkbox variant="solid">Solid</Checkbox>
          <Checkbox variant="outline">Outline</Checkbox>
          <Checkbox variant="ghost">Ghost</Checkbox>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Colors</h2>
        <div className="flex flex-wrap gap-4">
          <Checkbox color="primary">Primary</Checkbox>
          <Checkbox color="secondary">Secondary</Checkbox>
          <Checkbox color="success">Success</Checkbox>
          <Checkbox color="warning">Warning</Checkbox>
          <Checkbox color="danger">Danger</Checkbox>
          <Checkbox color="info">Info</Checkbox>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Checkbox size="sm">Small</Checkbox>
          <Checkbox size="md">Medium</Checkbox>
          <Checkbox size="lg">Large</Checkbox>
        </div>
      </div>

      {/* Combined Examples */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Checkbox color="primary" size="lg" variant="solid">
            Primary Large
          </Checkbox>
          <Checkbox color="success" size="md" variant="outline">
            Success Outline
          </Checkbox>
          <Checkbox color="danger" size="sm" variant="ghost">
            Danger Ghost
          </Checkbox>
        </div>
      </div>
    </div>
  );
}
