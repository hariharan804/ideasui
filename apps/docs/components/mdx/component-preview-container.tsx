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
        'group bg-common-pure relative my-4 w-full overflow-hidden rounded-lg transition-all duration-300',
        className,
      )}
      data-name={name}
      style={{ ...style, contain: style?.contain ?? 'content' }}
      {...properties}
    >
      {!!description && <p className="text-muted-foreground mb-2 text-sm">{description}</p>}

      {/* Preview Section (Always Visible) */}
      <div
        className={cn(
          'preview not-prose relative flex w-full overflow-hidden p-6 sm:p-10',
          alignmentClasses[align],
          isBgSolid ? 'bg-surface-subtle' : 'bg-background',
        )}
        style={{ minHeight: minHeight ?? '220px' }}
      >
        <div className="flex w-full items-center justify-center">{Component}</div>
      </div>

      {/* Code Section (Always Visible, SEO Optimized) */}
      {!hideCode && !!Code && (
        <div className="code-section relative w-full overflow-hidden">
          <div
            className={cn(
              'code-block-wrapper bg-surface-subtle [&_pre]:!my-0 [&_pre]:!rounded-none [&_pre]:!border-0',
            )}
          >
            {Code}
          </div>
        </div>
      )}
    </div>
  );
}
