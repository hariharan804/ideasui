'use client';

import type { HTMLAttributes, PropsWithChildren, ReactElement } from 'react';

import { Children, useId } from 'react';
import { cn } from '@ideasui/utils';

interface ComponentPreviewContainerProperties extends HTMLAttributes<HTMLDivElement> {
  align?: 'center' | 'start' | 'end';
  minHeight?: string;
  isBgSolid?: boolean;
  description?: string;
  hideCode?: boolean;
  name: string;
}

export function ComponentPreviewContainer({
  align = 'center',
  children,
  className,
  description,
  hideCode = false,
  isBgSolid = false,
  minHeight,
  name,
  style,
  ...properties
}: PropsWithChildren<ComponentPreviewContainerProperties>) {
  const gridId = useId();
  const [Component, Code] = Children.toArray(children) as ReactElement[];

  const alignmentClasses = {
    center: 'items-center justify-center',
    end: 'items-end justify-end',
    start: 'items-start justify-start',
  };

  return (
    <div
      className={cn(
        'not-prose group border-border-subtle/30 bg-background relative my-6 w-full overflow-hidden rounded-2xl border transition-all duration-200',
        className,
      )}
      data-name={name}
      style={{ ...style, contain: style?.contain ?? 'content' }}
      {...properties}
    >
      {!!description && (
        <p className="text-content-secondary mb-3 text-sm font-medium">{description}</p>
      )}

      {/* Preview Canvas Section */}
      <div
        className={cn(
          'preview bg-background border-border-subtle relative flex w-full overflow-hidden border-b p-6 sm:p-10',
          alignmentClasses[align],
          // isBgSolid ? 'bg-surface-subtle' : 'bg-surface/50',
        )}
        style={{ minHeight: minHeight ?? '220px' }}
      >
        {/* Subtle Tech Grid Canvas & Ambient Highlight */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(var(--ideasui-color-primary)/0.02)_0%,transparent_70%)]" />
        <svg
          aria-hidden="true"
          className="stroke-content-tertiary/6 pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"
        >
          <defs>
            <pattern height="24" id={gridId} patternUnits="userSpaceOnUse" width="24">
              <path d="M.5 24V.5H24" fill="none" strokeWidth="1" />
            </pattern>
          </defs>
          <rect fill={`url(#${gridId})`} height="100%" width="100%" />
        </svg>

        <div className="relative z-10 flex w-full items-center justify-center">{Component}</div>
      </div>

      {/* Code Section */}
      {!hideCode && !!Code && (
        <div className="code-section border-border-subtle/20 relative w-full overflow-hidden border-t">
          <div
            className={cn(
              'code-block-wrapper bg-surface-subtle/40 [&_pre]:!my-0 [&_pre]:!rounded-none [&_pre]:!border-0',
            )}
          >
            {Code}
          </div>
        </div>
      )}
    </div>
  );
}
