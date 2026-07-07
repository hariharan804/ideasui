'use client';

import { useState } from 'react';
import { cn } from '@ideasui/utils';
import { Button } from '@ideasui/react';
import { Check, Copy, Terminal } from 'lucide-react';

interface InstallTabsProperties {
  pkg: string;
  isDev?: boolean;
  className?: string;
}

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

interface TabButtonProperties {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

function TabButton({ isActive, onClick, children, size = 'md' }: Readonly<TabButtonProperties>) {
  return (
    <button
      className={cn(
        'group relative -mb-px flex-shrink-0 border border-transparent font-semibold transition-all duration-300',
        size === 'sm'
          ? 'rounded-t-lg px-3 py-1.5 text-[11px]'
          : 'rounded-t-xl px-3.5 py-2.5 text-xs',
        isActive
          ? 'border-base/20 !bg-surface-container-low !border-b-surface-container-low text-primary'
          : 'hover:bg-surface-container-high text-content-secondary hover:text-content-primary',
        isActive && size === 'md' && 'font-bold',
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function InstallTabs({
  pkg,
  isDev: isDevelopment = false,
  className,
}: Readonly<InstallTabsProperties>) {
  const [activeTab, setActiveTab] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState(false);
  const [installMode, setInstallMode] = useState<'component' | 'core'>('core');

  const isIndividualComponent =
    pkg.startsWith('@ideasui/') && pkg !== '@ideasui/react' && pkg !== '@ideasui/theme';

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

  // Styled rendering of command parts using IdeasUI semantic tokens
  const renderCommandText = (pm: PackageManager) => {
    const action = pm === 'npm' ? 'i' : 'add';
    let flag = '';

    if (isDevelopment) {
      flag = pm === 'bun' ? '-d' : '-D';
    }

    return (
      <span className="font-mono text-[13px] leading-relaxed select-all">
        <span className="text-primary font-semibold">{pm}</span>{' '}
        <span className="text-secondary font-semibold">{action}</span>{' '}
        {flag && <span className="text-tertiary">{flag} </span>}
        <span className="text-success font-medium">{activePackage}</span>
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
        'group/install bg-surface-container border-base relative my-6 flex w-full flex-col overflow-hidden rounded-2xl border transition-all duration-300',
        className,
      )}
    >
      {/* Header: Tabs Selectors & Copy Button */}
      <div className="border-base/10 bg-surface-container flex flex-row items-end justify-between border-b px-4 pt-4 select-none">
        {/* Left side: Package Manager Selection */}
        <div className="flex flex-row items-center gap-1">
          {packageManagers.map((pm) => (
            <TabButton
              key={pm.id}
              isActive={activeTab === pm.id}
              onClick={() => setActiveTab(pm.id)}
            >
              {pm.name}
            </TabButton>
          ))}
        </div>

        {/* Right side: Package Mode Selection & Copy Button */}
        <div className="flex flex-row items-center gap-4">
          {isIndividualComponent && (
            <div className="-mb-px flex flex-row items-center gap-1">
              <TabButton
                isActive={installMode === 'component'}
                size="sm"
                onClick={() => setInstallMode('component')}
              >
                Component
              </TabButton>
              <TabButton
                isActive={installMode === 'core'}
                size="sm"
                onClick={() => setInstallMode('core')}
              >
                Core Library
              </TabButton>
            </div>
          )}

          {/* Copy Button */}
          <div className="relative flex items-center gap-2 pb-2">
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
                'bg-surface-container-high hover:bg-surface-container-low border-subtle/5 hover:border-subtle/15 text-content-secondary hover:text-content-primary size-7 rounded-3xl border transition-all duration-200 hover:scale-105 active:scale-95',
                copied && 'border-success/30! bg-success/10! text-success! hover:text-success!',
              )}
              size="sm"
              type="button"
              variant="soft"
              onPress={handleCopy}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Command Text Body */}
      <div className="bg-surface-container-low flex min-h-[52px] items-center px-5 py-4">
        <Terminal className="text-content-secondary/40 mr-2.5 size-3.5 select-none" />
        {renderCommandText(activeTab)}
      </div>
    </div>
  );
}
