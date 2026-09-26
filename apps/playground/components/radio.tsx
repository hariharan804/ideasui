'use client';

import type { JSX } from 'react';

import { Radio } from '@ideasui/radio';

export default function RadioPreview(): JSX.Element {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Radio Component</h1>
        <p className="text-content-secondary mb-8">
          Interactive examples of the Radio component with different variants and states.
        </p>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Radio variant="solid">Solid</Radio>
          <Radio variant="outline">Outline</Radio>
          <Radio variant="ghost">Ghost</Radio>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Colors</h2>
        <div className="flex flex-wrap gap-4">
          <Radio color="primary">Primary</Radio>
          <Radio color="secondary">Secondary</Radio>
          <Radio color="success">Success</Radio>
          <Radio color="warning">Warning</Radio>
          <Radio color="danger">Danger</Radio>
          <Radio color="info">Info</Radio>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Radio size="sm">Small</Radio>
          <Radio size="md">Medium</Radio>
          <Radio size="lg">Large</Radio>
        </div>
      </div>

      {/* Combined Examples */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Radio color="primary" size="lg" variant="solid">
            Primary Large
          </Radio>
          <Radio color="success" size="md" variant="outline">
            Success Outline
          </Radio>
          <Radio color="danger" size="sm" variant="ghost">
            Danger Ghost
          </Radio>
        </div>
      </div>
    </div>
  );
}
