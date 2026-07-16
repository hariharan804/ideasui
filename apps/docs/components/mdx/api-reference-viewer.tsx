'use client';

import { useState } from 'react';
import { cn } from '@ideasui/utils';
import { propsDocumentation } from '@/lib/docs/components-props';
import { PropsTable } from '@/components/ui/props-table';

interface APIReferenceViewerProperties {
  componentName: keyof typeof propsDocumentation;
}

export function APIReferenceViewer({ componentName }: Readonly<APIReferenceViewerProperties>) {
  const componentDocs = propsDocumentation[componentName];

  const [activeTab, setActiveTab] = useState(0);

  if (!componentDocs || componentDocs.length === 0) {
    return (
      <div className="not-prose border-error/20 bg-error/5 text-error my-4 rounded-md border p-4">
        <p className="text-sm">
          API Reference documentation for component &quot;{componentName}&quot; not found.
        </p>
      </div>
    );
  }

  const activeDocument = componentDocs[activeTab] ?? componentDocs[0];

  const mappedProperties = activeDocument.props.map((p) => ({
    name: p.name,
    type: p.type,
    default: p.defaultValue ?? undefined,
    description: p.description,
    required: p.required,
    deprecated: p.deprecated,
  }));

  return (
    <div className="not-prose my-6 flex w-full flex-col gap-4">
      {/* Tab Selectors */}
      {componentDocs.length > 1 && (
        <div className="border-base/10 bg-surface-container flex flex-wrap items-end gap-1 border-b select-none">
          {componentDocs.map((document_, index) => (
            <button
              key={document_.componentName}
              className={cn(
                'group relative -mb-px flex-shrink-0 cursor-pointer rounded-t-xl border border-transparent px-4 py-2.5 text-xs font-semibold transition-all duration-300',
                index === activeTab
                  ? 'border-base/20 !bg-surface-container-low !border-b-surface-container-low text-primary font-bold shadow-sm'
                  : 'hover:bg-surface-container-high text-content-secondary hover:text-content-primary',
              )}
              type="button"
              onClick={() => setActiveTab(index)}
            >
              {document_.componentName}
            </button>
          ))}
        </div>
      )}

      {/* Component Title and Description */}
      <div className="bg-surface-container-low border-base/10 flex flex-col gap-1.5 rounded-2xl border px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-content-primary text-sm font-bold tracking-tight">
            {activeDocument.title}
          </h4>
          <span className="bg-primary/10 text-primary shrink-0 rounded px-2 py-0.5 font-mono text-[11px] font-semibold select-all">
            {activeDocument.component}
          </span>
        </div>
        {activeDocument.description && (
          <p className="text-content-secondary text-[13px] leading-relaxed">
            {activeDocument.description}
          </p>
        )}
      </div>

      {/* Props Table or Empty Fallback */}
      <div className="w-full">
        {mappedProperties.length > 0 ? (
          <PropsTable data={mappedProperties} />
        ) : (
          <div className="border-base/10 bg-surface-container-low/30 text-content-secondary rounded-2xl border p-8 text-center text-[13px] leading-relaxed">
            This component does not define any custom props. It accepts all standard HTML
            attributes.
          </div>
        )}
      </div>
    </div>
  );
}

APIReferenceViewer.displayName = 'IdeasUI.APIReferenceViewer';
