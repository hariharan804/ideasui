/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-restricted-syntax */
'use client';

import type { CodeBlockProps } from 'fumadocs-ui/components/codeblock';
import type { ComponentProps, RefObject } from 'react';

import { Button } from '@ideasui/react';
import { CodeBlock } from 'fumadocs-ui/components/codeblock';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { useRef } from 'react';
import { cn } from '@ideasui/utils';

import { Iconify } from '@/components/mdx/iconify';

export function FumadocsCustomCodeblock({
  allowCopy = true,
  children,
  code,
  ...props
}: { children: React.ReactNode; code?: string } & CodeBlockProps) {
  const areaRef = useRef<HTMLDivElement>(null);

  return (
    <CodeBlock
      {...props}
      Actions={(actionsProps) => (
        <div {...actionsProps} className={cn('z-10 empty:hidden', actionsProps.className)}>
          {!!allowCopy && <CopyButton code={code} containerRef={areaRef} />}
        </div>
      )}
      allowCopy={allowCopy}
      // @ts-expect-error - TODO: fumadocs-ui error
      viewportProps={{ ref: areaRef }}
    >
      {children}
    </CodeBlock>
  );
}

function CopyButton({
  className,
  code,
  containerRef,
  ...props
}: ComponentProps<'button'> & {
  code?: string;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [checked, onClick] = useCopyButton(() => {
    if (code) {
      void navigator.clipboard.writeText(code);

      return;
    }

    const pre = containerRef.current?.getElementsByTagName('pre').item(0);

    if (!pre) {
      return;
    }

    const clone = pre.cloneNode(true) as HTMLElement;

    clone.querySelectorAll('.nd-copy-ignore').forEach((node) => {
      node.replaceWith('\n');
    });

    void navigator.clipboard.writeText(clone.textContent ?? '');
  });

  return (
    <Button
      isIconOnly
      aria-label={checked ? 'Copied Text' : 'Copy Text'}
      className={cn('text-muted-foreground -mt-0.5 bg-transparent', className)}
      data-checked={checked || undefined}
      size="sm"
      type="button"
      variant="muted"
      onPress={onClick}
      {...props}
    >
      {checked ? (
        <Iconify className="size-4" icon="check" />
      ) : (
        <Iconify className="size-4" icon="copy" />
      )}
    </Button>
  );
}
