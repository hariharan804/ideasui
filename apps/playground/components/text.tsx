'use client';

import type { JSX } from 'react';

import { Text } from '@ideasui/react';

export default function TextPreview(): JSX.Element {
  return (
    <div className="max-w-2xl space-y-8 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Text Component</h1>
        <p className="text-content-secondary mb-8">
          Interactive examples of the Text typography primitive with variants, colors, sizes, and
          line-clamping.
        </p>
      </div>

      {/* Typographic Variants */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Typographic Variants</h2>
        <div className="flex flex-col gap-3">
          <Text variant="lead">Lead — Catchy introductory copy statement.</Text>
          <Text variant="body">Body — Standard paragraph text for general reading.</Text>
          <Text variant="label">Label — Strong label text for form inputs and controls.</Text>
          <Text variant="caption">Caption — Small secondary text for metadata and hints.</Text>
          <Text variant="overline">Overline — Uppercase header accent badge.</Text>
          <Text variant="code">const ideasui = &quot;typography&quot;;</Text>
        </div>
      </div>

      {/* Semantic Content Colors */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Semantic Colors</h2>
        <div className="flex flex-col gap-2">
          <Text color="primary">Primary — Main body text color</Text>
          <Text color="secondary">Secondary — Muted supporting text color</Text>
          <Text color="tertiary">Tertiary — Subtle metadata color</Text>
          <Text color="muted">Muted — Low emphasis text color</Text>
          <Text color="success">Success — Positively confirmed operation</Text>
          <Text color="warning">Warning — Action caution alert</Text>
          <Text color="danger">Danger — Error failure state</Text>
          <Text color="info">Info — Informational banner notice</Text>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Sizes</h2>
        <div className="flex flex-col gap-2">
          <Text size="xs">xs — Extra small text (12px)</Text>
          <Text size="sm">sm — Small text (14px)</Text>
          <Text size="md">md — Medium default text (16px)</Text>
          <Text size="lg">lg — Large text (18px)</Text>
          <Text size="xl">xl — Extra large text (20px)</Text>
          <Text size="2xl">2xl — 2X Large text (24px)</Text>
        </div>
      </div>

      {/* Polymorphic Elements */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">
          Polymorphic Elements (as prop)
        </h2>
        <div className="flex flex-col gap-2">
          <Text as="h2" size="xl" weight="bold">
            h2 element Heading
          </Text>
          <Text as="span" color="secondary">
            span element Inline Text
          </Text>
          <Text as="code" variant="code">
            code element snippet
          </Text>
        </div>
      </div>
    </div>
  );
}
