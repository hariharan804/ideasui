'use client';

import type { JSX } from 'react';

import PackageDocumentation from '../../components/package-documentation';

export default function DocsPage(): JSX.Element {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PackageDocumentation className="mx-auto max-w-6xl" />
      </div>
    </div>
  );
}
