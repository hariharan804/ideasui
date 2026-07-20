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

export function Preview(properties: Readonly<PreviewProperties>) {
  const {
    align = 'center',
    className,
    description,
    hideCode = false,
    isBgSolid = false,
    minHeight,
    name,
    ...restProperties
  } = properties;
  const demo = getDemo(name);

  if (!demo) {
    return (
      <div
        className={cn(
          'border-error/20 bg-error/5 text-error my-4 rounded-2xl border p-4 text-sm font-medium',
          className,
        )}
      >
        <p>Component demo &quot;{name}&quot; not found.</p>
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
      {...restProperties}
    >
      <Component />
      {!hideCode && !!demo.file && <Source language="tsx" name={name} title={name} />}
    </ComponentPreviewContainer>
  );
}

Preview.displayName = 'IdeasUI.Preview';
