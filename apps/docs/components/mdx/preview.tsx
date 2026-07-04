import type { HTMLAttributes } from 'react';

import { cn } from '@ideasui/utils';

import { ComponentPreviewContainer } from './component-preview-container';
import { Source } from './source';

import { getDemo } from '@/showcase';

interface PreviewProperties extends HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: 'center' | 'start' | 'end';
  isBgSolid?: boolean;
  description?: string;
  hideCode?: boolean;
  minHeight?: string;
}

export function Preview({
  align = 'center',
  className,
  description,
  hideCode = false,
  isBgSolid = false,
  minHeight,
  name,
  ...properties
}: PreviewProperties) {
  const demo = getDemo(name);

  if (!demo) {
    return (
      <div
        className={cn(
          'border-error/20 bg-error/5 text-error my-4 rounded-md border p-4',
          className,
        )}
      >
        <p className="text-sm">Component demo &quot;{name}&quot; not found.</p>
      </div>
    );
  }

  const Component = demo.component;

  return (
    <ComponentPreviewContainer
      align={align}
      className={className}
      description={description}
      hideCode={hideCode}
      isBgSolid={isBgSolid}
      minHeight={minHeight}
      name={name}
      {...properties}
    >
      <Component />
      {!hideCode && !!demo.file && <Source language="tsx" name={name} title={name} />}
    </ComponentPreviewContainer>
  );
}

Preview.displayName = 'IdeasUI.Preview';
