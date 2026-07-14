'use client';

import type { ComponentProps } from 'react';

import { useContext } from 'react';
import { useSidebar } from 'fumadocs-ui/components/sidebar/base';
import { cn } from '@ideasui/utils';

import { LayoutContext } from './context';

export function LayoutBody({ children, className, style, ...properties }: ComponentProps<'div'>) {
  const context = useContext(LayoutContext);
  const navMode = context?.navMode ?? 'auto';
  const tabMode = context?.tabMode ?? 'sidebar';
  const { collapsed } = useSidebar();

  const isNavbarTab = tabMode === 'navbar';
  const headerHeight = isNavbarTab ? 'calc(var(--header-height) + 38px)' : 'var(--header-height)';
  const pageCol = 'calc(100vw - var(--sidebar-col) - var(--toc-width))';

  return (
    <div
      className={cn(
        'grid min-h-(--docs-height) auto-cols-auto auto-rows-auto transition-[grid-template-columns]',
        'max-md:flex max-md:min-h-0 max-md:flex-col',
        className,
      )}
      id="nd-notebook-layout"
      style={
        {
          '--row-1': 'var(--banner-height, 0px)',
          '--row-2': `calc(var(--row-1) + ${headerHeight})`,
          '--row-3': 'calc(var(--row-2) + var(--toc-popover-height, 0px))',
          '--sidebar-col': collapsed ? '0px' : 'var(--sidebar-width)',
          gridTemplate:
            navMode === 'top'
              ? `"header header header header header"
         "sidebar sidebar toc-popover toc-popover ."
         "sidebar sidebar main toc ." 1fr / minmax(0, 1fr) var(--sidebar-col) minmax(0, min(var(--fd-layout-width), ${pageCol})) var(--toc-width) minmax(0, 1fr)`
              : `"sidebar sidebar header header ."
         "sidebar sidebar toc-popover toc-popover ."
         "sidebar sidebar main toc ." 1fr / minmax(0, 1fr) var(--sidebar-col) minmax(0, min(var(--fd-layout-width), ${pageCol})) var(--toc-width) minmax(0, 1fr)`,
          ...style,
        } as object
      }
      {...properties}
    >
      {children}
    </div>
  );
}
