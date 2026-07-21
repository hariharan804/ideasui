/* eslint-disable react/no-array-index-key */
'use client';

import type { ComponentProps } from 'react';
import type { BreadcrumbOptions } from 'fumadocs-core/breadcrumb';

import { useMemo, Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import { getBreadcrumbItemsFromPath } from 'fumadocs-core/breadcrumb';
import Link from 'fumadocs-core/link';
import { useTreeContext, useTreePath } from 'fumadocs-ui/contexts/tree';
import { cn } from '@ideasui/utils';

export type BreadcrumbProps = BreadcrumbOptions & ComponentProps<'div'>;

export function PageBreadcrumb({
  includePage,
  includeRoot,
  includeSeparator,
  ...properties
}: BreadcrumbProps) {
  const path = useTreePath();
  const { root } = useTreeContext();
  const items = useMemo(() => {
    return getBreadcrumbItemsFromPath(root, path, {
      includePage,
      includeRoot,
      includeSeparator,
    });
  }, [includePage, includeRoot, includeSeparator, path, root]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      {...properties}
      className={cn(
        'text-content-secondary flex items-center gap-1.5 text-sm',
        properties.className,
      )}
    >
      {items.map((item, index) => {
        const className = cn('truncate', index === items.length - 1 && 'font-medium text-primary');

        return (
          <Fragment key={index}>
            {index !== 0 && <ChevronRight className="size-3.5 shrink-0" />}
            {item.url ? (
              <Link
                className={cn(className, 'transition-opacity hover:opacity-80')}
                href={item.url}
              >
                {item.name}
              </Link>
            ) : (
              <span className={className}>{item.name}</span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
