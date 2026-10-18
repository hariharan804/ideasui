'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@ideasui/utils';
import { Check, Copy, ArrowUpRight, FileCode2 } from 'lucide-react';
import { BEMReferenceViewer } from '@/components/mdx/bem-reference-viewer';

interface StandaloneCSSProperties {
  /** Component identifier in kebab-case, e.g. "divider", "button", "avatar". */
  componentName: string;
  /** Component display name. Defaults to capitalized componentName. */
  title?: string;
  /** Custom CSS filename if different from `${componentName}.css`. */
  cssFile?: string;
  /** Whether to show the BEM classes table automatically below. Defaults to false. */
  showBEMTable?: boolean;
}

export function StandaloneCSS({
  componentName,
  title,
  cssFile,
  showBEMTable = false,
}: Readonly<StandaloneCSSProperties>) {
  const [scope, setScope] = useState<'component' | 'global'>('component');
  const [syntax, setSyntax] = useState<'css' | 'tsx'>('css');
  const [copied, setCopied] = useState(false);

  const fileName = cssFile ?? `${componentName}.css`;
  const displayName = title ?? componentName.charAt(0).toUpperCase() + componentName.slice(1);

  // Snippet construction
  const getSnippet = () => {
    if (scope === 'component') {
      if (syntax === 'css') {
        return `@import '@ideasui/styles/base.css';\n@import '@ideasui/styles/components/${fileName}';`;
      }

      return `import '@ideasui/styles/base.css';\nimport '@ideasui/styles/components/${fileName}';`;
    }

    if (syntax === 'css') {
      return `@import '@ideasui/styles/base.css';\n@import '@ideasui/styles/styles.css';`;
    }

    return `import '@ideasui/styles/base.css';\nimport '@ideasui/styles/styles.css';`;
  };

  const snippet = getSnippet();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard write failure
    }
  };

  return (
    <div className="not-prose my-6 flex w-full flex-col gap-4">
      {/* Container Card */}
      <div className="bg-surface-subtle/70 border-border-subtle/40 relative overflow-hidden rounded-2xl border backdrop-blur-sm">
        {/* Header Bar */}
        <div className="border-border-subtle/40 bg-surface-muted/30 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <FileCode2 className="text-primary size-4 shrink-0" />
            <span className="text-content-primary text-xs font-semibold sm:text-sm">
              {displayName} Stylesheet Import
            </span>
          </div>

          <Link
            className="text-primary hover:text-primary-hover inline-flex items-center gap-1 text-xs font-medium transition-colors"
            href="/react/docs/start/standalone-css"
          >
            Standalone CSS Guide
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {/* Controls Bar: Scope & Syntax Selectors */}
        <div className="border-border-subtle/30 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5 sm:px-5">
          {/* Scope: Component vs Global */}
          <div className="bg-surface-muted/70 flex items-center rounded-xl p-1">
            <button
              className={cn(
                'cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150',
                scope === 'component'
                  ? 'bg-surface text-content-primary font-semibold shadow-xs'
                  : 'text-content-tertiary hover:text-content-primary',
              )}
              type="button"
              onClick={() => setScope('component')}
            >
              <span>Component-Level</span>
              <span className="bg-primary/10 text-primary py-0.2 ml-1.5 rounded px-1 text-[9px] font-semibold">
                Modular
              </span>
            </button>
            <button
              className={cn(
                'cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150',
                scope === 'global'
                  ? 'bg-surface text-content-primary font-semibold shadow-xs'
                  : 'text-content-tertiary hover:text-content-primary',
              )}
              type="button"
              onClick={() => setScope('global')}
            >
              Global Bundle
            </button>
          </div>

          {/* Syntax: CSS vs JS/TS */}
          <div className="bg-surface-muted/70 flex items-center rounded-xl p-1">
            <button
              className={cn(
                'cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150',
                syntax === 'css'
                  ? 'bg-surface text-content-primary font-semibold shadow-xs'
                  : 'text-content-tertiary hover:text-content-primary',
              )}
              type="button"
              onClick={() => setSyntax('css')}
            >
              CSS (@import)
            </button>
            <button
              className={cn(
                'cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150',
                syntax === 'tsx'
                  ? 'bg-surface text-content-primary font-semibold shadow-xs'
                  : 'text-content-tertiary hover:text-content-primary',
              )}
              type="button"
              onClick={() => setSyntax('tsx')}
            >
              JS / TS (import)
            </button>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="relative p-4 sm:p-5">
          <button
            aria-label="Copy stylesheet import code"
            className="border-border-subtle/50 bg-surface/80 hover:bg-surface text-content-secondary hover:text-content-primary absolute top-3 right-3 flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition-all active:scale-[0.98]"
            type="button"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="text-success size-3.5" />
                <span className="text-success text-[11px] font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>

          <pre className="text-content-primary font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap select-all sm:text-xs">
            {snippet}
          </pre>
        </div>

        {/* Footer Note */}
        <div className="border-border-subtle/30 bg-surface-muted/20 text-content-secondary border-t px-4 py-2.5 text-xs sm:px-5">
          {scope === 'component' ? (
            <p>
              Imports base theme tokens alongside the scoped{' '}
              <code className="text-primary font-mono">{fileName}</code> styles, keeping your CSS
              bundle minimal.
            </p>
          ) : (
            <p>
              Imports the unified stylesheet containing styles for all IdeasUI components in a
              single bundle.
            </p>
          )}
        </div>
      </div>

      {/* Optional Embedded BEM Table */}
      {showBEMTable && (
        <div className="mt-2 flex flex-col gap-2">
          <h3 className="text-content-primary text-base font-bold tracking-tight">
            BEM CSS Classes
          </h3>
          <BEMReferenceViewer
            componentName={
              componentName as Parameters<typeof BEMReferenceViewer>[0]['componentName']
            }
          />
        </div>
      )}
    </div>
  );
}

StandaloneCSS.displayName = 'IdeasUI.StandaloneCSS';
