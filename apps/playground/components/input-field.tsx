'use client';

import type { JSX } from 'react';

import { InputField } from '@ideasui/input-field';

export default function InputFieldPreview(): JSX.Element {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">InputField Component</h1>
        <p className="text-content-secondary mb-8">
          Interactive examples of the InputField component with different variants and states.
        </p>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <InputField variant="solid">Solid</InputField>
          <InputField variant="outline">Outline</InputField>
          <InputField variant="ghost">Ghost</InputField>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Colors</h2>
        <div className="flex flex-wrap gap-4">
          <InputField color="primary">Primary</InputField>
          <InputField color="secondary">Secondary</InputField>
          <InputField color="success">Success</InputField>
          <InputField color="warning">Warning</InputField>
          <InputField color="danger">Danger</InputField>
          <InputField color="info">Info</InputField>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <InputField size="sm">Small</InputField>
          <InputField size="md">Medium</InputField>
          <InputField size="lg">Large</InputField>
        </div>
      </div>

      {/* Combined Examples */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <InputField color="primary" size="lg" variant="solid">
            Primary Large
          </InputField>
          <InputField color="success" size="md" variant="outline">
            Success Outline
          </InputField>
          <InputField color="danger" size="sm" variant="ghost">
            Danger Ghost
          </InputField>
        </div>
      </div>
    </div>
  );
}
