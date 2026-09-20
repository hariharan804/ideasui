'use client';
import type { CodeBlockProps } from 'fumadocs-ui/components/codeblock';
import type { HTMLAttributes, RefObject } from 'react';

import { Button } from '@ideasui/react';
import { CodeBlock } from 'fumadocs-ui/components/codeblock';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { useCallback, useRef } from 'react';
import { cn } from '@ideasui/utils';

import { Check, Copy } from 'lucide-react';
import { trackEvent } from '@/components/docs-ui/google-analytics';

interface ActionsPanelProperties extends HTMLAttributes<HTMLDivElement> {
  readonly allowCopy: boolean;
  readonly className?: string;
  readonly code?: string;
  readonly containerRef: RefObject<HTMLElement | null>;
}

/** Stable component for the CodeBlock actions slot — defined outside the parent to avoid react/no-unstable-nested-components. */
function ActionsPanel({
  allowCopy,
  className,
  code,
  containerRef,
  ...rest
}: Readonly<ActionsPanelProperties>) {
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
  ...properties
}: { children: React.ReactNode; code?: string } & CodeBlockProps) {
  const areaReference = useRef<HTMLDivElement>(null);

  // Memoized render prop — must be declared outside JSX to satisfy react/no-unstable-nested-components
  const renderActions = useCallback(
    (actionsProperties: HTMLAttributes<HTMLDivElement>) => (
      <ActionsPanel
        {...actionsProperties}
        allowCopy={allowCopy}
        code={code}
        containerRef={areaReference}
      />
    ),
    [allowCopy, code, areaReference],
  );

  return (
    <CodeBlock
      className={cn(
        'text-content-primary border-border/80 rounded-xl border bg-white shadow-xs transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-slate-800/80 dark:bg-[#0d1117] dark:text-[#e6edf3]',
        // Pre: allow Shiki bg through; add inner padding
        '[&_pre]:rounded-xl! [&_pre]:bg-transparent!',
        // Code typography with high-contrast font medium
        '[&_code]:font-mono! [&_code]:text-[0.8125rem]! [&_code]:leading-[1.7]! [&_code]:font-medium!',
        // Selection colors matching IdeasUI primary
        '[&_::selection]:bg-primary/20! [&_::selection]:text-inherit!',
        // Custom scrollbar
        '[&_.fd-scroll-container::-webkit-scrollbar-thumb]:bg-border/40 [&_.fd-scroll-container::-webkit-scrollbar-thumb:hover]:bg-border/60 [&_.fd-scroll-container]:[scrollbar-width:thin] [&_.fd-scroll-container::-webkit-scrollbar]:size-[5px] [&_.fd-scroll-container::-webkit-scrollbar-thumb]:rounded-[10px] [&_.fd-scroll-container::-webkit-scrollbar-track]:bg-transparent',
        // Copy buttons
        'text-content-secondary hover:text-content-primary dark:text-slate-400 dark:hover:text-white [&_button]:transition-all! [&_button]:duration-200! [&_button]:ease-[cubic-bezier(0.4,0,0.2,1)]! [&_button:active]:scale-95! [&_button:hover]:scale-105!',
        className,
      )}
      {...properties}
      Actions={renderActions}
      allowCopy={allowCopy}
      // @ts-expect-error - workaround for fumadocs-ui error
      viewportProps={{ ref: areaReference }}
    >
      {children}
    </CodeBlock>
  );
}

interface CopyButtonProperties {
  readonly className?: string;
  readonly code?: string;
  readonly containerRef: RefObject<HTMLElement | null>;
}

function CopyButton({ className, code, containerRef }: CopyButtonProperties) {
  const [checked, onClick] = useCopyButton(() => {
    trackEvent('copy_code_snippet', {
      page_path: globalThis.window ? globalThis.location.pathname : '',
    });

    if (code) {
      void navigator.clipboard.writeText(code);

      return;
    }

    const pre = containerRef.current?.getElementsByTagName('pre').item(0);

    if (!pre) {
      return;
    }

    const clone = pre.cloneNode(true) as HTMLElement;

    for (const node of clone.querySelectorAll('.nd-copy-ignore')) {
      node.replaceWith('\n');
    }

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
      variant="soft"
      onPress={(e) => onClick(e as unknown as React.MouseEvent)}
    >
      {checked ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  );
}
