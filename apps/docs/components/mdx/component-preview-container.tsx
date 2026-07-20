'use client';

import type { HTMLAttributes, PropsWithChildren, ReactElement } from 'react';

import { Children } from 'react';
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
  const [Component, Code] = Children.toArray(children) as ReactElement[];

  const alignmentClasses = {
    center: 'items-center justify-center',
    end: 'items-end justify-end',
    start: 'items-start justify-start',
  };

  return (
    <div
      className={cn(
        'not-prose group border-subtle/30 bg-surface-subtle/20 relative my-6 w-full overflow-hidden rounded-2xl border transition-all duration-200',
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
          'preview relative flex w-full overflow-hidden p-6 sm:p-10',
          alignmentClasses[align],
          isBgSolid ? 'bg-surface-subtle' : 'bg-surface/50',
        )}
        style={{ minHeight: minHeight ?? '220px' }}
      >
        {/* Subtle dot grid pattern behind component preview */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(oklch(var(--ideasui-color-content-tertiary)/0.15)_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex w-full items-center justify-center">{Component}</div>
      </div>

      {/* Code Section */}
      {!hideCode && !!Code && (
        <div className="code-section border-subtle/20 relative w-full overflow-hidden border-t">
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
