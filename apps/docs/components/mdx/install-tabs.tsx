'use client';

import { useState } from 'react';
import { cn } from '@ideasui/utils';
import { Button } from '@ideasui/react';
import { Check, Copy, Terminal } from 'lucide-react';

interface InstallTabsProps {
  pkg: string;
  isDev?: boolean;
  className?: string;
}

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export function InstallTabs({ pkg, isDev = false, className }: InstallTabsProps) {
  const [activeTab, setActiveTab] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState(false);
  const [installMode, setInstallMode] = useState<'component' | 'core'>('core');

  const isIndividualComponent =
    pkg.startsWith('@ideasui/') && pkg !== '@ideasui/react' && pkg !== '@ideasui/theme';

  const activePkg = installMode === 'component' ? pkg : '@ideasui/react';

  // Command mappings
  const getCommand = (pm: PackageManager) => {
    switch (pm) {
      case 'npm':
        return `npm i ${isDev ? '-D ' : ''}${activePkg}`;
      case 'yarn':
        return `yarn add ${isDev ? '-D ' : ''}${activePkg}`;
      case 'bun':
        return `bun add ${isDev ? '-d ' : ''}${activePkg}`;
      case 'pnpm':
      default:
        return `pnpm add ${isDev ? '-D ' : ''}${activePkg}`;
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

  // Styled rendering of command parts using IdeasUI semantic tokens
  const renderCommandText = (pm: PackageManager) => {
    const action = pm === 'npm' ? 'i' : 'add';
    const flag = isDev ? (pm === 'bun' ? '-d' : '-D') : '';

    return (
      <span className="font-mono text-[13px] leading-relaxed select-all">
        <span className="text-primary font-semibold">{pm}</span>{' '}
        <span className="text-secondary font-semibold">{action}</span>{' '}
        {flag && <span className="text-tertiary">{flag} </span>}
        <span className="text-success font-medium">{activePkg}</span>
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
        'group/install bg-surface-muted/30 relative my-6 flex w-full flex-col overflow-hidden rounded-2xl transition-all duration-300',
        className,
      )}
    >
      {/* Header: Tabs Selectors & Copy Button */}
      <div className="bg-surface-muted/10 flex flex-col gap-3 px-4 py-3 select-none sm:flex-row sm:items-center sm:justify-between">
        {/* Left side: Package Manager Selection */}
        <div className="bg-surface-muted/40 border-subtle/5 flex items-center gap-1 rounded-full border p-0.5">
          {packageManagers.map((pm) => {
            const isActive = activeTab === pm.id;

            return (
              <button
                key={pm.id}
                className={cn(
                  'cursor-pointer rounded-full px-3 text-[10px] font-semibold transition-all duration-300',
                  isActive
                    ? 'text-content-primary bg-surface border-subtle/5 font-semibold shadow-xs'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-muted/80',
                )}
                type="button"
                onClick={() => setActiveTab(pm.id)}
              >
                {pm.name}
              </button>
            );
          })}
        </div>

        {/* Right side: Package Mode Selection & Copy Button */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {isIndividualComponent && (
            <div className="bg-surface-muted/40 border-subtle/5 flex items-center rounded-full border p-0.5 text-[10px]">
              <button
                className={cn(
                  'cursor-pointer rounded-full px-3 text-[9.5px] font-semibold transition-all duration-200',
                  installMode === 'component'
                    ? 'text-content-primary bg-surface border-subtle/5 shadow-xs'
                    : 'text-content-secondary hover:text-content-primary',
                )}
                type="button"
                onClick={() => setInstallMode('component')}
              >
                Component
              </button>
              <button
                className={cn(
                  'cursor-pointer rounded-full px-3 text-[9.5px] font-semibold transition-all duration-200',
                  installMode === 'core'
                    ? 'text-content-primary bg-surface border-subtle/5 shadow-xs'
                    : 'text-content-secondary hover:text-content-primary',
                )}
                type="button"
                onClick={() => setInstallMode('core')}
              >
                Core Library
              </button>
            </div>
          )}

          {/* Copy Button */}
          <div className="relative flex items-center gap-1.5">
            <span
              className={cn(
                'text-success/90 pointer-events-none translate-x-1 transform font-sans text-[10px] font-semibold tracking-wide opacity-0 transition-all duration-300 select-none',
                copied && 'translate-x-0 opacity-100',
              )}
            >
              Copied!
            </span>
            <Button
              isIconOnly
              aria-label={copied ? 'Copied command' : 'Copy command'}
              className={cn(
                'text-content-secondary hover:text-content-primary bg-surface-muted/30 hover:bg-surface-muted border-subtle/5 hover:border-subtle/15 size-7 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95',
                copied && 'bg-success/10! border-success/30! text-success! hover:text-success!',
              )}
              size="sm"
              type="button"
              variant="muted"
              onPress={handleCopy}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Command Text Body */}
      <div className="bg-surface-muted/50 flex min-h-[52px] items-center px-5 py-4">
        <Terminal className="text-content-secondary/40 mr-2.5 size-3.5 select-none" />
        {renderCommandText(activeTab)}
      </div>
    </div>
  );
}
