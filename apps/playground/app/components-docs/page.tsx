'use client';

import PackageDocumentation from '../../components/package-documentation';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PackageDocumentation className="max-w-6xl mx-auto" />
      </div>
    </div>
  );
}