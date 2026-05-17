'use client';
import type { CodeBlockProps } from 'fumadocs-ui/components/codeblock';
import type { RefObject } from 'react';

import { Button } from '@ideasui/react';
import { CodeBlock } from 'fumadocs-ui/components/codeblock';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { useRef } from 'react';
import { cn } from '@ideasui/utils';

import { Check, Copy } from 'lucide-react';

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
      // eslint-disable-next-line react/no-unstable-nested-components
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

interface CopyButtonProps {
  className?: string;
  code?: string;
  containerRef: RefObject<HTMLElement | null>;
}

function CopyButton({ className, code, containerRef }: CopyButtonProps) {
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
      onPress={(e) => onClick(e as unknown as React.MouseEvent)}
    >
      {checked ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  );
}
