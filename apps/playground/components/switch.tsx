'use client';

import type { JSX } from 'react';

import { Switch } from '@ideasui/switch';

export default function SwitchPreview(): JSX.Element {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Switch Component</h1>
        <p className="text-content-secondary mb-8">
          Interactive examples of the Switch component with different variants and states.
        </p>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Switch variant="solid">Solid</Switch>
          <Switch variant="outline">Outline</Switch>
          <Switch variant="ghost">Ghost</Switch>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Colors</h2>
        <div className="flex flex-wrap gap-4">
          <Switch color="primary">Primary</Switch>
          <Switch color="secondary">Secondary</Switch>
          <Switch color="success">Success</Switch>
          <Switch color="warning">Warning</Switch>
          <Switch color="danger">Danger</Switch>
          <Switch color="info">Info</Switch>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Switch size="sm">Small</Switch>
          <Switch size="md">Medium</Switch>
          <Switch size="lg">Large</Switch>
        </div>
      </div>

      {/* Combined Examples */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Switch color="primary" size="lg" variant="solid">
            Primary Large
          </Switch>
          <Switch color="success" size="md" variant="outline">
            Success Outline
          </Switch>
          <Switch color="danger" size="sm" variant="ghost">
            Danger Ghost
          </Switch>
        </div>
      </div>
    </div>
  );
}
