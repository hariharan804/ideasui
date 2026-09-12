'use client';

import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@ideasui/utils';

const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const;

type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const INSTALL_COMMANDS: Record<PackageManager, string> = {
  pnpm: 'pnpm add @ideasui/react @ideasui/theme',
  npm: 'npm install @ideasui/react @ideasui/theme',
  yarn: 'yarn add @ideasui/react @ideasui/theme',
  bun: 'bun add @ideasui/react @ideasui/theme',
};

/** Package manager install command pill with copy-to-clipboard. */
export function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const [pkg, setPkg] = useState<PackageManager>('pnpm');

  function copyCommand() {
    navigator.clipboard.writeText(INSTALL_COMMANDS[pkg]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto w-full max-w-[calc(100vw-2rem)] px-2 sm:max-w-[470px] sm:px-0">
      {/* Soft Glass Terminal Card */}
      <div className="bg-surface/70 border-border-base/50 shadow-surface/8 group relative overflow-hidden rounded-xl border shadow-lg backdrop-blur-2xl transition-all duration-300 hover:shadow-xl sm:rounded-2xl">
        {/* Header Bar */}
        <div className="border-border-subtle/30 flex items-center justify-between border-b px-3 py-2 sm:px-4 sm:py-2.5">
          {/* Left: Window Controls (hidden on mobile) + Package Tabs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="bg-danger/50 size-2 rounded-full" />
              <span className="bg-warning/50 size-2 rounded-full" />
              <span className="bg-success/50 size-2 rounded-full" />
            </div>

            {/* Package Tabs */}
            <div className="bg-surface-muted/50 border-border-subtle/30 flex items-center gap-px rounded-full border p-0.5 sm:gap-0.5">
              {PACKAGE_MANAGERS.map((p) => (
                <button
                  key={p}
                  className={cn(
                    'relative rounded-full px-2 py-0.5 font-mono text-[11px] font-medium transition-all duration-200 sm:px-2.5 sm:py-1 sm:text-xs',
                    pkg === p
                      ? 'text-content-primary font-semibold'
                      : 'text-content-tertiary hover:text-content-secondary',
                  )}
                  type="button"
                  onClick={() => setPkg(p)}
                >
                  {pkg === p && (
                    <motion.div
                      className="bg-surface-subtle absolute inset-0 rounded-full shadow-xs"
                      layoutId="pkgTabIndicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{p}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Command Line Content */}
        <div className="flex items-center justify-between gap-2 px-3 py-2.5 font-mono text-[11px] sm:gap-3 sm:px-5 sm:py-3.5 sm:text-sm">
          <div className="flex min-w-0 flex-1 scrollbar-none items-center gap-1.5 overflow-x-auto py-0.5 whitespace-nowrap sm:gap-2">
            <span className="text-primary/70 font-semibold select-none">$</span>
            <code className="text-content-primary">{INSTALL_COMMANDS[pkg]}</code>
          </div>

          {/* Copy Action */}
          <button
            aria-label="Copy installation command"
            className="text-content-tertiary hover:text-content-primary hover:bg-surface-subtle relative flex h-7 shrink-0 items-center justify-center gap-1 rounded-lg px-1.5 text-xs transition-all duration-200 active:scale-95 sm:gap-1.5"
            type="button"
            onClick={copyCommand}
          >
            {copied ? (
              <>
                <Check className="text-success size-3.5" />
                <span className="text-success hidden text-[11px] font-semibold sm:inline">
                  Copied!
                </span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span className="hidden font-sans text-[11px] font-medium sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
