'use client';

import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';
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
    <div className="mx-auto mt-10 w-full max-w-md px-2 sm:mt-16 sm:px-0">
      {/* Package Tabs */}
      <div className="bg-surface-muted relative mx-auto mb-2 flex w-fit items-center justify-center gap-0.5 rounded-xl p-1 sm:gap-1">
        {PACKAGE_MANAGERS.map((p) => (
          <button
            key={p}
            className={cn(
              'relative z-10 rounded-lg px-2.5 py-1 font-mono text-xs transition-colors duration-200 sm:px-3',
              pkg === p
                ? 'text-primary-600 dark:text-primary-300 font-semibold'
                : 'text-content-muted hover:text-content-secondary',
            )}
            type="button"
            onClick={() => setPkg(p)}
          >
            {pkg === p && (
              <motion.div
                className="bg-background absolute inset-0 rounded-lg shadow-2xs"
                layoutId="pkgTabIndicator"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">{p}</span>
          </button>
        ))}
      </div>

      {/* Snippet Pill */}
      <div className="group border-surface-muted bg-surface mt-4 flex items-center justify-between gap-2.5 rounded-2xl border px-3.5 py-2.5 backdrop-blur-xl transition-all duration-300 sm:mt-6 sm:gap-3 sm:px-4 sm:py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 overflow-hidden">
          <Terminal className="text-content-tertiary size-4 shrink-0" />
          <div className="min-w-0 flex-1 scrollbar-none overflow-x-auto py-0.5 whitespace-nowrap">
            <code className="text-content-primary font-mono text-xs sm:text-sm">
              {INSTALL_COMMANDS[pkg]}
            </code>
          </div>
        </div>
        <button
          aria-label="Copy installation command"
          className="text-content-muted hover:text-content-primary hover:bg-surface-muted shrink-0 rounded-lg p-1.5 transition-colors active:scale-95"
          type="button"
          onClick={copyCommand}
        >
          {copied ? (
            <span className="text-success-600 flex items-center gap-1 text-[10px] font-semibold">
              <Check className="size-3" /> Copied
            </span>
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
