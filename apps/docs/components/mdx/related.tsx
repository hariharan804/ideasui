'use client';

import { cn } from '@ideasui/utils';

import { Item } from './item';

import { getRelatedComponents } from '@/components-registry';

interface RelatedProperties {
  readonly component: string;
  readonly className?: string;
}

export function Related({ className, component }: RelatedProperties) {
  const relatedComponents = getRelatedComponents(component)?.slice(0, 3);

  if (!relatedComponents || relatedComponents.length === 0) {
    return null;
  }

  return (
    <div className={cn('my-8', className)}>
      <h2 className="mb-4 text-xl font-semibold">Related Components</h2>
      <div className="not-prose grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {relatedComponents.map((relatedComponent) => (
          <Item key={relatedComponent.name} component={relatedComponent} />
        ))}
      </div>
    </div>
  );
}

Related.displayName = 'IdeasUI.Related';
