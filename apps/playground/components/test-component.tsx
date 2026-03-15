'use client';
import type { JSX } from 'react';

import { TestComponent } from '@ideasui/test-component';

const TestComponentPreview = (): JSX.Element => {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="mb-4 text-3xl font-bold">TestComponent Component</h1>
        <p className="mb-8 text-gray-600">
          Interactive examples of the TestComponent component with different variants.
        </p>
      </div>

      {/* Variants */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <TestComponent variant="solid">Solid</TestComponent>
          <TestComponent variant="outline">Outline</TestComponent>
          <TestComponent variant="ghost">Ghost</TestComponent>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Colors</h2>
        <div className="flex flex-wrap gap-4">
          <TestComponent color="default">Default</TestComponent>
          <TestComponent color="primary">Primary</TestComponent>
          <TestComponent color="success">Success</TestComponent>
          <TestComponent color="warning">Warning</TestComponent>
          <TestComponent color="danger">Danger</TestComponent>
          <TestComponent color="info">Info</TestComponent>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <TestComponent size="xs">Extra Small</TestComponent>
          <TestComponent size="sm">Small</TestComponent>
          <TestComponent size="md">Medium</TestComponent>
          <TestComponent size="lg">Large</TestComponent>
          <TestComponent size="xl">Extra Large</TestComponent>
        </div>
      </div>

      {/* Radius */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Border Radius</h2>
        <div className="flex flex-wrap gap-4">
          <TestComponent radius="none">None</TestComponent>
          <TestComponent radius="sm">Small</TestComponent>
          <TestComponent radius="md">Medium</TestComponent>
          <TestComponent radius="lg">Large</TestComponent>
          <TestComponent radius="xl">Extra Large</TestComponent>
          <TestComponent radius="full">Full</TestComponent>
        </div>
      </div>

      {/* Combined Examples */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <TestComponent color="primary" radius="lg" size="lg" variant="solid">
            Primary Large
          </TestComponent>
          <TestComponent color="success" radius="full" size="md" variant="outline">
            Success Outline
          </TestComponent>
          <TestComponent color="danger" radius="none" size="sm" variant="ghost">
            Danger Ghost
          </TestComponent>
        </div>
      </div>
    </div>
  );
};

export default TestComponentPreview;
