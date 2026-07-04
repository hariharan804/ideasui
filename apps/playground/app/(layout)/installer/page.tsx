'use client';
import type { JSX } from 'react';

import { useState } from 'react';
import { Package, Check, AlertCircle, Copy } from 'lucide-react';

const COPY_TIMEOUT = 2000;

const RELEASE_TAGS = {
  latest: { label: 'Latest', description: 'Stable release', color: 'green' },
  canary: { label: 'Canary', description: 'Latest development build', color: 'yellow' },
  beta: { label: 'Beta', description: 'Beta releases', color: 'blue' },
  alpha: { label: 'Alpha', description: 'Alpha releases', color: 'purple' },
} as const;

const TAG_COLORS: Record<string, string> = {
  green: 'bg-success-500',
  yellow: 'bg-warning-500',
  blue: 'bg-info-500',
  purple: 'bg-secondary-500',
};

const PACKAGES = [
  '@ideasui/button',
  '@ideasui/theme',
  '@ideasui/box',
  '@ideasui/variants',
  '@ideasui/utils',
  '@ideasui/hooks',
] as const;

export default function InstallerPage(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<keyof typeof RELEASE_TAGS>('latest');
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(new Set(PACKAGES));
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const generateInstallCommand = (packageManager: 'npm' | 'pnpm' | 'yarn'): string => {
    const packages = [...selectedPackages];
    const packagesWithTag = packages.map((package_) => `${package_}@${selectedTag}`).join(' ');

    switch (packageManager) {
      case 'npm': {
        return `npm install ${packagesWithTag}`;
      }
      case 'pnpm': {
        return `pnpm add ${packagesWithTag}`;
      }
      case 'yarn': {
        return `yarn add ${packagesWithTag}`;
      }
    }
  };

  const copyCommand = async (command: string): Promise<void> => {
    await navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), COPY_TIMEOUT);
  };

  const togglePackage = (package_: string): void => {
    const newSelected = new Set(selectedPackages);

    if (newSelected.has(package_)) {
      newSelected.delete(package_);
    } else {
      newSelected.add(package_);
    }
    setSelectedPackages(newSelected);
  };

  const selectAll = (): void => setSelectedPackages(new Set(PACKAGES));
  const selectNone = (): void => setSelectedPackages(new Set());

  return (
    <div className="text-content-primary min-h-screen p-6 transition-colors duration-300 ease-in-out">
      <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-4xl duration-700">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="from-primary-500 to-secondary-500 shadow-primary-500/20 relative rounded-2xl bg-gradient-to-tr p-3 shadow-lg">
              <Package className="size-8 text-white" />
            </div>
            <h1 className="from-primary-600 to-secondary-600 bg-gradient-to-r bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
              Package Installer
            </h1>
          </div>
          <p className="text-content-secondary text-lg font-medium">
            Choose your preferred release tag and packages to install
          </p>
        </div>

        <div className="space-y-8">
          {/* Release Tag Selection */}
          <div className="border-default bg-surface-elevated rounded-3xl border p-8 shadow-sm transition-all duration-300 hover:shadow-md">
            <h2 className="text-content-primary mb-6 text-xl font-bold">Release Tag</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Object.entries(RELEASE_TAGS).map(([tag, info]) => (
                <button
                  key={tag}
                  className={`rounded-xl border-2 p-5 text-left transition-all duration-200 hover:-translate-y-1 ${
                    selectedTag === tag
                      ? 'border-primary-500 bg-primary-subtle ring-primary-500 shadow-sm ring-1'
                      : 'border-default bg-surface-base hover:border-strong hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedTag(tag as keyof typeof RELEASE_TAGS)}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className={`size-3 rounded-full shadow-sm ${
                        TAG_COLORS[info.color] || 'bg-secondary-500'
                      }`}
                    />
                    <span className="text-content-primary font-bold">{info.label}</span>
                  </div>
                  <p className="text-content-tertiary text-xs leading-relaxed">
                    {info.description}
                  </p>
                  <code className="bg-surface-sunken border-default text-content-secondary mt-3 block rounded-md border px-2 py-1 font-mono text-xs font-medium">
                    @{tag}
                  </code>
                </button>
              ))}
            </div>
          </div>

          {/* Package Selection */}
          <div className="border-default bg-surface-elevated rounded-3xl border p-8 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-content-primary text-xl font-bold">Packages</h2>
              <div className="flex gap-2">
                <button
                  className="border-default bg-surface-muted text-content-primary hover:bg-surface-strong hover:text-content-inverse rounded-lg border px-4 py-1.5 text-xs font-bold transition-colors"
                  onClick={selectAll}
                >
                  Select All
                </button>
                <button
                  className="bg-surface-base border-default text-content-secondary hover:bg-surface-muted hover:text-content-primary rounded-lg border px-4 py-1.5 text-xs font-bold transition-colors"
                  onClick={selectNone}
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {PACKAGES.map((package_) => (
                <label
                  key={package_}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 ${
                    selectedPackages.has(package_)
                      ? 'border-primary-400 bg-primary-subtle ring-primary-500/50 shadow-sm ring-1'
                      : 'border-default bg-surface-base hover:border-strong hover:shadow-sm'
                  }`}
                >
                  <input
                    checked={selectedPackages.has(package_)}
                    className="border-default focus:ring-offset-surface-base text-primary-600 focus:ring-primary-500 size-5 rounded transition-colors"
                    type="checkbox"
                    onChange={() => togglePackage(package_)}
                  />
                  <code className="text-content-primary font-mono text-sm font-semibold">
                    {package_}
                  </code>
                </label>
              ))}
            </div>
          </div>

          {/* Install Commands */}
          <div className="border-default bg-surface-elevated rounded-3xl border p-8 shadow-sm transition-all duration-300 hover:shadow-md">
            <h2 className="text-content-primary mb-6 text-xl font-bold">Install Commands</h2>

            {selectedPackages.size === 0 ? (
              <div className="border-warning-subtle bg-warning-subtle/30 text-warning-700 flex items-center gap-3 rounded-xl border p-5 shadow-sm">
                <AlertCircle className="size-5" />
                <span className="text-sm font-medium">
                  Please select at least one package to install before proceeding.
                </span>
              </div>
            ) : (
              <div className="space-y-6">
                {(['npm', 'pnpm', 'yarn'] as const).map((pm) => {
                  const command = generateInstallCommand(pm);

                  return (
                    <div key={pm} className="relative">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-content-tertiary text-xs font-bold tracking-widest uppercase">
                          {pm} CLI
                        </span>
                        <button
                          className="text-primary-500 hover:bg-primary-subtle hover:text-primary-600 flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold transition-colors"
                          onClick={() => copyCommand(command)}
                        >
                          {copiedCommand === command ? (
                            <>
                              <Check className="size-3.5" />
                              COPIED
                            </>
                          ) : (
                            <>
                              <Copy className="size-3.5" />
                              COPY
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-surface-inverse text-content-inverse overflow-x-auto rounded-xl p-5 font-mono text-sm antialiased shadow-inner">
                        {command}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Package.json Preview */}
          {selectedPackages.size > 0 && (
            <div className="border-default bg-surface-elevated rounded-3xl border p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-content-primary mb-6 text-xl font-bold">
                Package.json Dependencies
              </h2>
              <div className="bg-surface-inverse overflow-x-auto rounded-xl p-5 font-mono text-sm antialiased shadow-inner">
                <div className="text-info-400">{`{`}</div>
                <div className="text-success-400 ml-4">&quot;dependencies&quot;:</div>
                <div className="text-info-400 ml-4">{`{`}</div>
                {[...selectedPackages].map((package_, index, array) => (
                  <div key={package_} className="ml-8">
                    <span className="text-warning-300">&quot;{package_}&quot;</span>
                    <span className="text-content-inverse">: </span>
                    <span className="text-success-300">&quot;{selectedTag}&quot;</span>
                    {index < array.length - 1 && <span className="text-content-inverse">,</span>}
                  </div>
                ))}
                <div className="text-info-400 ml-4">{`}`}</div>
                <div className="text-info-400">{`}`}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
