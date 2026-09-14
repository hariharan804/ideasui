'use client';
import type { JSX } from 'react';

import { useState } from 'react';
import { Package, Check, AlertCircle, Copy, Terminal, CheckCircle2 } from 'lucide-react';
import { Button } from '@ideasui/button';

const COPY_TIMEOUT = 2000;

const RELEASE_TAGS = {
  latest: { label: 'Latest', description: 'Production stable release', color: 'success' },
  canary: { label: 'Canary', description: 'Nightly build from main branch', color: 'warning' },
  beta: { label: 'Beta', description: 'Prerelease validation candidate', color: 'info' },
  alpha: { label: 'Alpha', description: 'Experimental early feature preview', color: 'secondary' },
} as const;

const PACKAGES = ['@ideasui/button', '@ideasui/theme', '@ideasui/react', '@ideasui/utils'] as const;

export default function InstallerPage(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<keyof typeof RELEASE_TAGS>('latest');
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(new Set(PACKAGES));
  const [activePm, setActivePm] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const generateInstallCommand = (pm: 'npm' | 'pnpm' | 'yarn' | 'bun'): string => {
    const packages = [...selectedPackages];
    const packagesWithTag = packages.map((package_) => `${package_}@${selectedTag}`).join(' ');

    switch (pm) {
      case 'npm': {
        return `npm install ${packagesWithTag}`;
      }
      case 'pnpm': {
        return `pnpm add ${packagesWithTag}`;
      }
      case 'yarn': {
        return `yarn add ${packagesWithTag}`;
      }
      case 'bun': {
        return `bun add ${packagesWithTag}`;
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

  const currentCommand = generateInstallCommand(activePm);

  return (
    <div className="bg-background text-content-primary min-h-screen py-10 pb-28 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl space-y-10 px-4 sm:px-6">
        {/* Header */}
        <header className="space-y-3 text-center">
          <div className="bg-primary-subtle text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-2xs">
            <Package className="size-3.5" />
            <span>Package Manager Configuration</span>
          </div>
          <h1 className="text-content-primary text-4xl font-extrabold tracking-tight sm:text-5xl">
            Interactive Package Installer
          </h1>
          <p className="text-content-secondary mx-auto max-w-2xl text-base leading-relaxed">
            Configure release channels and select packages to generate instant installation terminal
            commands.
          </p>
        </header>

        {/* Release Tag Selection (Borderless) */}
        <section className="bg-surface/80 space-y-6 rounded-3xl p-6 shadow-xs backdrop-blur-xl sm:p-8">
          <div>
            <h2 className="text-content-primary text-xl font-bold">1. Select Release Channel</h2>
            <p className="text-content-secondary mt-0.5 text-xs">
              Target tag version for npm registry publishing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(RELEASE_TAGS).map(([tag, info]) => {
              const isSelected = selectedTag === tag;

              return (
                <button
                  key={tag}
                  className={`group cursor-pointer rounded-2xl p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-primary-subtle text-primary ring-primary shadow-xs ring-2'
                      : 'bg-surface-subtle hover:bg-surface-muted'
                  }`}
                  type="button"
                  onClick={() => setSelectedTag(tag as keyof typeof RELEASE_TAGS)}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-content-primary text-base font-bold">{info.label}</span>
                    {isSelected ? <CheckCircle2 className="text-primary size-4" /> : null}
                  </div>
                  <p className="text-content-secondary mb-3 text-xs leading-relaxed">
                    {info.description}
                  </p>
                  <code className="bg-surface text-content-primary block rounded-md px-2 py-1 font-mono text-xs font-bold shadow-2xs">
                    @{tag}
                  </code>
                </button>
              );
            })}
          </div>
        </section>

        {/* Package Selection (Borderless) */}
        <section className="bg-surface/80 space-y-6 rounded-3xl p-6 shadow-xs backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-content-primary text-xl font-bold">2. Choose Packages</h2>
              <p className="text-content-secondary mt-0.5 text-xs">
                Select modules to include in installation manifest.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button color="neutral" size="xs" variant="soft" onClick={selectAll}>
                Select All
              </Button>
              <Button color="neutral" size="xs" variant="ghost" onClick={selectNone}>
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PACKAGES.map((package_) => {
              const isChecked = selectedPackages.has(package_);

              return (
                <label
                  key={package_}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition-all ${
                    isChecked
                      ? 'bg-primary-subtle/50 text-primary shadow-2xs'
                      : 'bg-surface-subtle hover:bg-surface-muted'
                  }`}
                >
                  <input
                    checked={isChecked}
                    className="accent-primary size-4.5 cursor-pointer rounded"
                    type="checkbox"
                    onChange={() => togglePackage(package_)}
                  />
                  <code className="text-content-primary font-mono text-sm font-semibold">
                    {package_}
                  </code>
                </label>
              );
            })}
          </div>
        </section>

        {/* Terminal Command Generator (Borderless) */}
        <section className="bg-surface/80 space-y-6 rounded-3xl p-6 shadow-xs backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="text-primary size-5" />
              <h2 className="text-content-primary text-xl font-bold">3. Installation Command</h2>
            </div>

            {/* PM Tabs */}
            <div className="bg-surface-subtle flex items-center rounded-2xl p-1 shadow-2xs">
              {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((pm) => (
                <button
                  key={pm}
                  className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-bold transition-all ${
                    activePm === pm
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-content-secondary hover:text-content-primary'
                  }`}
                  type="button"
                  onClick={() => setActivePm(pm)}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          {selectedPackages.size === 0 ? (
            <div className="bg-warning-subtle text-content-primary flex items-center gap-3 rounded-2xl p-4 text-sm font-medium">
              <AlertCircle className="text-warning size-5 shrink-0" />
              <span>Please select at least one package to generate terminal install syntax.</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-surface-subtle/80 relative overflow-hidden rounded-2xl shadow-2xs">
                <div className="bg-surface-muted/50 text-content-secondary flex items-center justify-between px-4 py-2.5 text-xs">
                  <span className="font-mono">{activePm} terminal command</span>
                  <Button
                    color="neutral"
                    size="xs"
                    variant="ghost"
                    onClick={() => copyCommand(currentCommand)}
                  >
                    {copiedCommand === currentCommand ? (
                      <Check className="text-success size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    <span>{copiedCommand === currentCommand ? 'Copied!' : 'Copy Command'}</span>
                  </Button>
                </div>

                <pre className="text-primary bg-background/50 overflow-x-auto p-4 font-mono text-sm">
                  <code>{currentCommand}</code>
                </pre>
              </div>
            </div>
          )}
        </section>

        {/* Package.json Manifest Preview */}
        {selectedPackages.size > 0 ? (
          <section className="bg-surface/80 space-y-4 rounded-3xl p-6 shadow-xs backdrop-blur-xl sm:p-8">
            <h2 className="text-content-primary text-lg font-bold">package.json Snippet</h2>
            <pre className="bg-background/50 text-content-primary overflow-x-auto rounded-2xl p-5 font-mono text-xs leading-relaxed shadow-inner">
              <code>{`{\n  "dependencies": {\n${[...selectedPackages]
                .map((pkg) => `    "${pkg}": "^${selectedTag}"`)
                .join(',\n')}\n  }\n}`}</code>
            </pre>
          </section>
        ) : null}
      </div>
    </div>
  );
}
