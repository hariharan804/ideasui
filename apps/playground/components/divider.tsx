'use client';

import type { JSX } from 'react';

import { Divider } from '@ideasui/react';

export default function DividerPreview(): JSX.Element {
  return (
    <div className="max-w-2xl space-y-10 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Divider Component</h1>
        <p className="text-content-secondary">
          An accessible visual separator supporting horizontal/vertical orientations, line styles,
          semantic colors, and labels.
        </p>
      </div>

      {/* Basic Horizontal */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Basic Horizontal</h2>
        <div className="bg-surface-subtle border-border-default space-y-3 rounded-lg border p-4">
          <p className="text-content-primary text-sm">Top section content</p>
          <Divider />
          <p className="text-content-primary text-sm">Bottom section content</p>
        </div>
      </div>

      {/* With Labels & Placements */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Labels & Placements</h2>
        <div className="bg-surface-subtle border-border-default space-y-6 rounded-lg border p-4">
          <div>
            <p className="text-content-secondary mb-2 text-xs">Center (Default)</p>
            <Divider label="OR" />
          </div>
          <div>
            <p className="text-content-secondary mb-2 text-xs">Start</p>
            <Divider label="Personal Information" labelPlacement="start" />
          </div>
          <div>
            <p className="text-content-secondary mb-2 text-xs">End</p>
            <Divider label="See more" labelPlacement="end" />
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Line Style Variants</h2>
        <div className="bg-surface-subtle border-border-default space-y-6 rounded-lg border p-4">
          <div>
            <p className="text-content-secondary mb-2 text-xs">Solid</p>
            <Divider variant="solid" />
          </div>
          <div>
            <p className="text-content-secondary mb-2 text-xs">Dashed</p>
            <Divider label="Dashed" variant="dashed" />
          </div>
          <div>
            <p className="text-content-secondary mb-2 text-xs">Dotted</p>
            <Divider label="Dotted" variant="dotted" />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Semantic Colors</h2>
        <div className="bg-surface-subtle border-border-default space-y-4 rounded-lg border p-4">
          <Divider color="default" label="default" />
          <Divider color="primary" label="primary" />
          <Divider color="neutral" label="neutral" />
          <Divider color="success" label="success" />
          <Divider color="warning" label="warning" />
          <Divider color="danger" label="danger" />
        </div>
      </div>

      {/* Thickness */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Thickness</h2>
        <div className="bg-surface-subtle border-border-default space-y-6 rounded-lg border p-4">
          <div>
            <p className="text-content-secondary mb-2 text-xs">sm (1px)</p>
            <Divider color="primary" thickness="sm" />
          </div>
          <div>
            <p className="text-content-secondary mb-2 text-xs">md (2px)</p>
            <Divider color="primary" thickness="md" />
          </div>
          <div>
            <p className="text-content-secondary mb-2 text-xs">lg (4px)</p>
            <Divider color="primary" thickness="lg" />
          </div>
        </div>
      </div>

      {/* Vertical Orientation */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Vertical Orientation</h2>
        <div className="bg-surface-subtle border-border-default flex h-10 items-center gap-4 rounded-lg border px-4 text-sm">
          <span>Overview</span>
          <Divider orientation="vertical" />
          <span>Analytics</span>
          <Divider orientation="vertical" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
