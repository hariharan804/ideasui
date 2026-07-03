'use client';
import type { CodeBlockProps } from 'fumadocs-ui/components/codeblock';
import type { HTMLAttributes, RefObject } from 'react';

import { Button } from '@ideasui/react';
import { CodeBlock } from 'fumadocs-ui/components/codeblock';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { useCallback, useRef } from 'react';
import { cn } from '@ideasui/utils';

import { Check, Copy } from 'lucide-react';

interface ActionsPanelProps extends HTMLAttributes<HTMLDivElement> {
  allowCopy: boolean;
  code?: string;
  containerRef: RefObject<HTMLElement | null>;
}

/** Stable component for the CodeBlock actions slot — defined outside the parent to avoid react/no-unstable-nested-components. */
function ActionsPanel({ allowCopy, className, code, containerRef, ...rest }: ActionsPanelProps) {
  return (
    <div {...rest} className={cn('z-10 empty:hidden', className)}>
      {!!allowCopy && <CopyButton code={code} containerRef={containerRef} />}
    </div>
  );
}

export function FumadocsCustomCodeblock({
  allowCopy = true,
  children,
  code,
  className,
  ...props
}: { children: React.ReactNode; code?: string } & CodeBlockProps) {
  const areaRef = useRef<HTMLDivElement>(null);

  // Memoized render prop — must be declared outside JSX to satisfy react/no-unstable-nested-components
  const renderActions = useCallback(
    (actionsProps: HTMLAttributes<HTMLDivElement>) => (
      <ActionsPanel {...actionsProps} allowCopy={allowCopy} code={code} containerRef={areaRef} />
    ),
    [allowCopy, code, areaRef],
  );

  return (
    <CodeBlock
      className={cn(
        // Base light/dark styles: no border, no shadow, clean rounded corners using IdeasUI tokens
        'bg-surface-subtle! border-none! shadow-none! transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        // Pre styles
        '[&_pre]:bg-transparent!',
        // Code typography
        '[&_code]:font-mono! [&_code]:text-[0.8125rem]! [&_code]:leading-[1.65]!',
        // Selection colors matching IdeasUI primary
        '[&_::selection]:bg-primary/25! [&_::selection]:text-inherit!',
        // Custom scrollbar
        '[&_.fd-scroll-container::-webkit-scrollbar-thumb]:bg-border/40 [&_.fd-scroll-container::-webkit-scrollbar-thumb:hover]:bg-border/60 [&_.fd-scroll-container]:[scrollbar-width:thin] [&_.fd-scroll-container::-webkit-scrollbar]:size-[5px] [&_.fd-scroll-container::-webkit-scrollbar-thumb]:rounded-[10px] [&_.fd-scroll-container::-webkit-scrollbar-track]:bg-transparent',
        // Copy buttons transition/interaction
        '[&_button]:transition-all! [&_button]:duration-200! [&_button]:ease-[cubic-bezier(0.4,0,0.2,1)]! [&_button:active]:scale-95! [&_button:hover]:scale-105!',
        className,
      )}
      {...props}
      Actions={renderActions}
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
