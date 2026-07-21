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
      <div className="not-prose border-error/20 bg-error/5 text-error my-4 rounded-2xl border p-4 text-sm font-medium">
        <p>API Reference documentation for component &quot;{componentName}&quot; not found.</p>
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
      {/* Segmented Tab Selectors */}
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

      {/* Component Title and Description Header Card */}
      <div className="bg-surface-subtle flex flex-col gap-1.5 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-content-primary text-sm font-bold tracking-tight sm:text-base">
            {activeDocument.title}
          </h4>
          <span className="bg-primary/10 text-primary shrink-0 rounded-lg px-2.5 py-0.5 font-mono text-[11px] font-semibold select-all">
            {activeDocument.component}
          </span>
        </div>
        {activeDocument.description && (
          <p className="text-content-secondary sm:text-13px text-xs leading-relaxed">
            {activeDocument.description}
          </p>
        )}
      </div>

      {/* Props Table or Empty Fallback */}
      <div className="w-full">
        {mappedProperties.length > 0 ? (
          <PropsTable data={mappedProperties} />
        ) : (
          <div className="border-subtle/30 bg-surface-subtle/20 text-content-tertiary rounded-2xl border p-8 text-center text-xs leading-relaxed">
            This component does not define any custom props. It accepts all standard HTML
            attributes.
          </div>
        )}
      </div>
    </div>
  );
}

APIReferenceViewer.displayName = 'IdeasUI.APIReferenceViewer';
