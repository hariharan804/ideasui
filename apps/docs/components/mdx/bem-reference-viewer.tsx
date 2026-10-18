'use client';

import { useState } from 'react';
import { cn } from '@ideasui/utils';
import { bemDocumentation, type BEMClassDefinition } from '@/lib/docs/components-bem';
import { BEMTable } from '@/components/ui/bem-table';

interface BEMReferenceViewerProperties {
  componentName?: keyof typeof bemDocumentation;
  data?: BEMClassDefinition[];
}

export function BEMReferenceViewer({
  componentName,
  data,
}: Readonly<BEMReferenceViewerProperties>) {
  const [activeTab, setActiveTab] = useState(0);

  // If custom data array is passed directly:
  if (data && data.length > 0) {
    return (
      <div className="not-prose my-6 flex w-full flex-col gap-4">
        <BEMTable data={data} />
      </div>
    );
  }

  const componentDocs = componentName ? bemDocumentation[componentName] : undefined;

  if (!componentDocs || componentDocs.length === 0) {
    return (
      <div className="not-prose border-error/20 bg-error/5 text-error my-4 rounded-2xl border p-4 text-sm font-medium">
        <p>BEM CSS classes documentation for component &quot;{componentName}&quot; not found.</p>
      </div>
    );
  }

  const activeDocument = componentDocs[activeTab] ?? componentDocs[0];

  return (
    <div className="not-prose my-6 flex w-full flex-col gap-4">
      {/* Segmented Tab Selectors for multi-part components */}
      {componentDocs.length > 1 && (
        <div className="bg-surface-muted/60 flex max-w-fit min-w-auto [scrollbar-width:none] items-center gap-1 overflow-x-auto rounded-xl p-1 select-none [&::-webkit-scrollbar]:hidden">
          {componentDocs.map((document_, index) => (
            <button
              key={document_.componentName}
              className={cn(
                'shrink-0 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-200',
                index === activeTab
                  ? 'bg-surface text-content-primary font-semibold shadow-xs'
                  : 'text-content-tertiary hover:text-content-primary',
              )}
              type="button"
              onClick={() => setActiveTab(index)}
            >
              {document_.componentName}
            </button>
          ))}
        </div>
      )}

      {/* Component Title and Description Header Card if present */}
      {activeDocument.description && (
        <div className="bg-surface-subtle flex flex-col gap-1.5 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-content-primary text-sm font-bold tracking-tight">
              {activeDocument.title ?? `${activeDocument.componentName} BEM Classes`}
            </h4>
          </div>
          <p className="text-content-secondary text-xs leading-relaxed">
            {activeDocument.description}
          </p>
        </div>
      )}

      {/* Classes Table */}
      <div className="w-full">
        {activeDocument.classes.length > 0 ? (
          <BEMTable data={activeDocument.classes} />
        ) : (
          <div className="border-border-subtle/30 bg-surface-subtle/20 text-content-tertiary rounded-2xl border p-8 text-center text-xs leading-relaxed">
            No BEM class names defined for this component.
          </div>
        )}
      </div>
    </div>
  );
}

BEMReferenceViewer.displayName = 'IdeasUI.BEMReferenceViewer';
