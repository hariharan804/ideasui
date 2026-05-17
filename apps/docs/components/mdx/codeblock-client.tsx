/* eslint-disable no-restricted-syntax */
'use client';

import type { CodeBlockProps } from 'fumadocs-ui/components/codeblock';

import { Button } from '@ideasui/react';
import * as React from 'react';
import { cn } from '@ideasui/utils';

import { FumadocsCustomCodeblock as BaseCodeBlock } from '@/components/mdx/fumadocs-custom-codeblock';

export function CodeBlock({
  children,
  className,
  code,
  collapsible,
  isIsolated = false,
  preview,
  showLineNumbers,
  title,
  ...props
}: {
  isIsolated?: boolean;
  lang?: string;
  code?: string;
  collapsible?: boolean;
  showLineNumbers?: boolean;
  title: string | undefined;
  children: React.ReactNode | React.ReactElement;
  preview?: React.ReactNode;
} & CodeBlockProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  if (!collapsible) {
    return (
      <BaseCodeBlock
        className={cn(
          'code-block-wrapper docs-code-block',
          isIsolated && 'is-isolated',
          showLineNumbers && 'docs-code-block-line-numbers',
          className,
        )}
        code={code}
        title={title}
        {...props}
      >
        {children}
      </BaseCodeBlock>
    );
  }

  return (
    <div className="relative">
      <div
        className={cn(
          'code-block-wrapper',
          isIsolated && 'is-isolated',
          isCollapsed && 'mask-to-bottom relative max-h-[150px] overflow-hidden',
          !isCollapsed && 'pb-10',
        )}
      >
        <BaseCodeBlock
          className={cn(
            'docs-code-block shadow-none',
            showLineNumbers && 'docs-code-block-line-numbers',
            className,
          )}
          code={code}
          title={title}
          {...props}
        >
          {isCollapsed && preview ? preview : children}
        </BaseCodeBlock>
      </div>
      <Button
        className="bg-surface absolute right-1/2 bottom-2 translate-x-1/2 text-xs shadow-sm shadow-black/5"
        size="sm"
        type="button"
        variant="muted"
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 'Expand code' : 'Collapse code'}
      </Button>
    </div>
  );
}
