'use client';

import type { CodeBlockProps } from 'fumadocs-ui/components/codeblock';

import { Button } from '@ideasui/react';
import { cn } from '@ideasui/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { FumadocsCustomCodeblock as BaseCodeBlock } from '@/components/mdx/fumadocs-custom-codeblock';

export function CodeBlock({
  children,
  className,
  code,
  collapsible,
  showLineNumbers,
  title,
  ...properties
}: {
  lang?: string;
  code?: string;
  collapsible?: boolean;
  showLineNumbers?: boolean;
  title?: string;
  children: React.ReactNode | React.ReactElement;
} & CodeBlockProps) {
  const lines = code ? code.trim().split('\n') : [];
  const isLargeCode = lines.length > 12;
  const isCollapsible = collapsible !== false && isLargeCode;

  const [isCollapsed, setIsCollapsed] = useState(isCollapsible);

  if (!isCollapsible) {
    return (
      <BaseCodeBlock
        className={cn(
          'code-block-wrapper docs-code-block',
          showLineNumbers && 'docs-code-block-line-numbers',
          className,
        )}
        code={code}
        title={title}
        {...properties}
      >
        {children}
      </BaseCodeBlock>
    );
  }

  return (
    <div className="relative">
      <div
        className={cn(
          'code-block-wrapper relative overflow-hidden transition-all duration-300',
          isCollapsed && 'pb-20',
        )}
        style={
          isCollapsed
            ? {
                maxHeight: '180px',
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              }
            : undefined
        }
      >
        <BaseCodeBlock
          className={cn(
            'docs-code-block shadow-none',
            showLineNumbers && 'docs-code-block-line-numbers',
            !isCollapsed && 'pb-10',
            className,
          )}
          code={code}
          title={title}
          {...properties}
        >
          {children}
        </BaseCodeBlock>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-24 items-end justify-center p-4">
        {isCollapsed ? (
          <Button
            className="pointer-events-auto shadow-md"
            radius="full"
            size="sm"
            startIcon={<ChevronDown className="size-4" />}
            variant="elevated"
            onPress={() => setIsCollapsed(false)}
          >
            Show more
          </Button>
        ) : (
          <Button
            className="pointer-events-auto shadow-md"
            radius="full"
            size="sm"
            startIcon={<ChevronUp className="size-4" />}
            variant="ghost"
            onPress={() => setIsCollapsed(true)}
          >
            Show less
          </Button>
        )}
      </div>
    </div>
  );
}
