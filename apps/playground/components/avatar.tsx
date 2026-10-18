'use client';

import type { JSX } from 'react';

import { Avatar } from '@ideasui/react';

export default function AvatarPreview(): JSX.Element {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Avatar Component</h1>
        <p className="text-content-secondary mb-8">
          Interactive examples of the Avatar component with different variants and states.
        </p>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Avatar variant="solid">Solid</Avatar>
          <Avatar variant="outline">Outline</Avatar>
          <Avatar variant="ghost">Ghost</Avatar>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Colors</h2>
        <div className="flex flex-wrap gap-4">
          <Avatar color="primary">Primary</Avatar>
          <Avatar color="secondary">Secondary</Avatar>
          <Avatar color="success">Success</Avatar>
          <Avatar color="warning">Warning</Avatar>
          <Avatar color="danger">Danger</Avatar>
          <Avatar color="info">Info</Avatar>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar size="sm">Small</Avatar>
          <Avatar size="md">Medium</Avatar>
          <Avatar size="lg">Large</Avatar>
        </div>
      </div>

      {/* Combined Examples */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Avatar color="primary" size="lg" variant="solid">
            Primary Large
          </Avatar>
          <Avatar color="success" size="md" variant="outline">
            Success Outline
          </Avatar>
          <Avatar color="danger" size="sm" variant="ghost">
            Danger Ghost
          </Avatar>
        </div>
      </div>
    </div>
  );
}
