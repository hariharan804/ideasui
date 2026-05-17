/* eslint-disable no-restricted-syntax */
'use client';

import React from 'react';
import { cn } from '@ideasui/utils';

interface ComponentPreviewContainerProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ...props
}: React.PropsWithChildren<ComponentPreviewContainerProps>) {
  const [Component, Code] = React.Children.toArray(children) as React.ReactElement[];

  const alignmentClasses = {
    center: 'items-center justify-center',
    end: 'items-end justify-end',
    start: 'items-start justify-start',
  };

  return (
    <div
      className={cn('component-preview-container group relative my-4 w-full', className)}
      data-name={name}
      style={{ ...style, contain: style?.contain ?? 'content' }}
      {...props}
    >
      {!!description && <p className="text-muted-foreground mb-2 text-sm">{description}</p>}

      {/* Preview Section */}
      <div
        className={cn(
          'preview not-prose border-separator relative min-h-[350px] w-full overflow-hidden rounded-t-xl border-t border-r border-l p-4 sm:p-10',
          isBgSolid && 'bg-background',
          alignmentClasses[align],
          'flex',
        )}
        data-name={name}
      >
        <div className="flex w-full items-center justify-center" style={{ minHeight }}>
          {Component}
        </div>
      </div>

      {/* Code Section */}
      {!hideCode && !!Code && (
        <div className="code-section border-separator relative rounded-b-xl border bg-transparent">
          <div className="code-block-wrapper">{Code}</div>
        </div>
      )}
    </div>
  );
}
