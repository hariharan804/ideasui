'use client';

import { useState } from 'react';
import { cn } from '@ideasui/utils';
import { Check, Copy, Terminal } from 'lucide-react';
import { usePackageManager, type PackageManager } from '@/hooks/use-package-manager';

interface InstallTabsProperties {
  pkg: string;
  isDev?: boolean;
  /** Default selected mode. Defaults to 'core'. Only applies when the package is an individual component. */
  defaultMode?: 'component' | 'core';
  className?: string;
}

export function InstallTabs({
  pkg,
  isDev: isDevelopment = false,
  defaultMode = 'core',
  className,
}: Readonly<InstallTabsProperties>) {
  const [activeTab, setActiveTab] = usePackageManager();
  const [copied, setCopied] = useState(false);
  const [installMode, setInstallMode] = useState<'component' | 'core'>(defaultMode);

  const isIndividualComponent = pkg.startsWith('@ideasui/') && pkg !== '@ideasui/react';

  const activePackage = installMode === 'component' ? pkg : '@ideasui/react';

  // Command mappings
  const getCommand = (pm: PackageManager) => {
    switch (pm) {
      case 'npm': {
        return `npm i ${isDevelopment ? '-D ' : ''}${activePackage}`;
      }
      case 'yarn': {
        return `yarn add ${isDevelopment ? '-D ' : ''}${activePackage}`;
      }
      case 'bun': {
        return `bun add ${isDevelopment ? '-d ' : ''}${activePackage}`;
      }
      default: {
        return `pnpm add ${isDevelopment ? '-D ' : ''}${activePackage}`;
      }
    }
  };

  const currentCommand = getCommand(activeTab);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const renderCommandText = (pm: PackageManager) => {
    const action = pm === 'npm' ? 'i' : 'add';
    let flag = '';

    if (isDevelopment) {
      flag = pm === 'bun' ? '-d' : '-D';
    }

    return (
      <span className="font-mono text-xs leading-relaxed select-all sm:text-[13px]">
        <span className="text-primary font-semibold">{pm}</span>{' '}
        <span className="text-content-secondary font-medium">{action}</span>{' '}
        {flag && <span className="text-content-tertiary">{flag} </span>}
        <span className="text-content-primary font-medium">{activePackage}</span>
      </span>
    );
  };

  const packageManagers: { id: PackageManager; name: string }[] = [
    { id: 'pnpm', name: 'pnpm' },
    { id: 'npm', name: 'npm' },
    { id: 'yarn', name: 'yarn' },
    { id: 'bun', name: 'bun' },
  ];

  return (
    <div
      className={cn(
        'not-prose bg-surface-subtle border-border-subtle/30 my-5 flex w-full flex-col overflow-hidden rounded-2xl border transition-all duration-200',
        className,
      )}
    >
      {/* Header: Package Manager Selector & Mode Toggle */}
      <div className="border-border-subtle/20 flex flex-wrap items-center justify-between gap-2 border-b px-3.5 py-2.5 select-none">
        {/* Left: Package Managers (Segmented Pill) */}
        <div className="bg-surface-muted/60 flex max-w-full [scrollbar-width:none] items-center gap-0.5 overflow-x-auto rounded-xl p-1 select-none [&::-webkit-scrollbar]:hidden">
          {packageManagers.map((pm) => {
            const isActive = activeTab === pm.id;

            return (
              <button
                key={pm.id}
                className={cn(
                  'relative shrink-0 cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-all duration-200',
                  isActive
                    ? 'bg-surface text-content-primary font-semibold shadow-xs'
                    : 'text-content-tertiary hover:text-content-primary',
                )}
                type="button"
                onClick={() => setActiveTab(pm.id)}
              >
                {pm.name}
              </button>
            );
          })}
        </div>

        {/* Right: Component vs Core Mode Selector */}
        {isIndividualComponent && (
          <div className="bg-surface-muted/60 flex max-w-full [scrollbar-width:none] items-center gap-0.5 overflow-x-auto rounded-xl p-1 select-none [&::-webkit-scrollbar]:hidden">
            <button
              className={cn(
                'shrink-0 cursor-pointer rounded-lg px-2.5 text-[10px] font-medium whitespace-nowrap transition-all duration-200',
                installMode === 'component'
                  ? 'bg-surface text-content-primary font-semibold shadow-xs'
                  : 'text-content-tertiary hover:text-content-primary',
              )}
              type="button"
              onClick={() => setInstallMode('component')}
            >
              Component
            </button>
            <button
              className={cn(
                'shrink-0 cursor-pointer rounded-lg px-2.5 text-[10px] font-medium whitespace-nowrap transition-all duration-200',
                installMode === 'core'
                  ? 'bg-surface text-content-primary font-semibold shadow-xs'
                  : 'text-content-tertiary hover:text-content-primary',
              )}
              type="button"
              onClick={() => setInstallMode('core')}
            >
              Core Library
            </button>
          </div>
        )}
      </div>

      {/* Command Output Row + Copy Action */}
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Terminal className="text-content-tertiary size-4 shrink-0" />
          {renderCommandText(activeTab)}
        </div>

        {/* Copy Button */}
        <button
          aria-label={copied ? 'Copied command' : 'Copy command'}
          className={cn(
            'flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-all duration-200',
            copied
              ? 'bg-success/15 text-success'
              : 'text-content-tertiary hover:bg-surface-muted hover:text-content-primary active:scale-95',
          )}
          type="button"
          onClick={handleCopy}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
    </div>
  );
}
