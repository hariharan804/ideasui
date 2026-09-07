'use client';

import type { JSX, FC } from 'react';

import { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, ArrowLeft, Check, Copy } from 'lucide-react';
import { Button } from '@ideasui/button';

const MAX_VISIBLE_KEYWORDS = 3;

interface PackageData {
  [category: string]: Package[];
}

interface Package {
  name: string;
  displayName: string;
  version: string;
  description: string;
  keywords?: string[];
  installCommands: Record<string, string>;
  installNote: string;
  documentation?: Record<string, FileDocumentation>;
}

interface FileDocumentation {
  importInstructions?: ImportInstruction[];
  interfaces?: InterfaceItem[];
  types?: TypeItem[];
  events?: EventItem[];
}

interface ImportInstruction {
  description: string;
  code: string;
}

interface InterfaceItem {
  name: string;
  props?: PropertyItem[];
}

interface PropertyItem {
  name: string;
  type: string;
  description: string;
  optional: boolean;
  isDeprecated?: boolean;
  default?: string;
}

interface TypeItem {
  name: string;
  definition: string;
}

interface EventItem {
  name: string;
  type: string;
  description?: string;
}

interface PackageDocumentationProperties {
  className?: string;
}

const getCategoryIcon = (category: string): string => {
  const icons = {
    components: '🧩',
    core: '⚙️',
    hooks: '🪝',
    utils: '🛠️',
    icons: '🎨',
    cli: '💻',
  };

  return icons[category as keyof typeof icons] || '📦';
};

const getCategoryDescription = (category: string): string => {
  const descriptions = {
    components: 'UI components for building modern React applications',
    core: 'Core theme engine and styling primitives',
    hooks: 'React hooks for accessibility & state management',
    utils: 'Helper functions, DOM & style utilities',
    icons: 'Icon sets and graphic assets',
    cli: 'Command line development tools',
  };

  return descriptions[category as keyof typeof descriptions] || 'Package collection';
};

const getPackageIcon = (packageName: string): string => {
  if (packageName.includes('button')) return '🔘';
  if (packageName.includes('theme')) return '🎨';
  if (packageName.includes('utils')) return '🔧';

  return '📦';
};

const PropCard: FC<{ prop: PropertyItem }> = ({ prop }): JSX.Element => (
  <div className="border-border-subtle bg-surface/70 hover:border-primary/30 rounded-xl border p-4 transition-all hover:shadow-2xs">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <code className="border-primary/20 bg-primary-subtle text-primary rounded-md border px-2 py-0.5 font-mono text-xs font-bold">
        {prop.name}
      </code>
      <div className="flex items-center gap-1.5">
        {!prop.optional && (
          <span className="border-danger/20 bg-danger-subtle text-danger rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase">
            required
          </span>
        )}
        {prop.isDeprecated ? (
          <span className="border-warning/20 bg-warning-subtle text-warning rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase">
            deprecated
          </span>
        ) : null}
      </div>
    </div>

    <div className="mb-2">
      <code className="text-content-secondary font-mono text-xs break-all">{prop.type}</code>
    </div>

    {prop.description ? (
      <p className="text-content-secondary mb-2 text-xs leading-relaxed">{prop.description}</p>
    ) : null}

    {prop.default ? (
      <div className="text-content-muted font-mono text-[11px]">
        Default:{' '}
        <code className="bg-surface-subtle text-content-primary rounded px-1">{prop.default}</code>
      </div>
    ) : null}
  </div>
);

const EventCard: FC<{ event: EventItem }> = ({ event }): JSX.Element => (
  <div className="border-border-subtle bg-surface-subtle/50 rounded-xl border p-4">
    <div className="mb-2 flex items-center gap-2">
      <code className="border-tertiary/20 bg-tertiary-subtle text-tertiary rounded-md border px-2 py-0.5 font-mono text-xs font-bold">
        {event.name}
      </code>
      <span className="border-tertiary/20 bg-tertiary-subtle text-tertiary rounded-full border px-2 py-0.5 text-[10px] font-semibold">
        event
      </span>
    </div>
    <code className="text-content-secondary mb-1 block font-mono text-xs break-all">
      {event.type}
    </code>
    {event.description ? (
      <p className="text-content-secondary text-xs">{event.description}</p>
    ) : null}
  </div>
);

const TypeCard: FC<{ type: TypeItem }> = ({ type }): JSX.Element => (
  <div className="border-border-subtle bg-surface-subtle/50 rounded-xl border p-4">
    <div className="mb-2 flex items-center gap-2">
      <code className="border-success/20 bg-success-subtle text-success rounded-md border px-2 py-0.5 font-mono text-xs font-bold">
        {type.name}
      </code>
      <span className="border-success/20 bg-success-subtle text-success rounded-full border px-2 py-0.5 text-[10px] font-semibold">
        type
      </span>
    </div>
    <code className="text-content-secondary font-mono text-xs break-all">{type.definition}</code>
  </div>
);

const PackageDocumentation: FC<PackageDocumentationProperties> = ({ className }): JSX.Element => {
  const [packageList, setPackageList] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const loadPackages = async (): Promise<void> => {
      try {
        const res = await fetch('/package-list.json');
        const data = await res.json();

        setPackageList(data);
      } catch (error) {
        console.error('Failed to load package list:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadPackages();
  }, []);

  const handleCopyCode = (code: string): void => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="border-primary/20 border-t-primary mx-auto size-8 animate-spin rounded-full border-3" />
          <p className="text-content-secondary text-sm font-medium">
            Loading documentation index...
          </p>
        </div>
      </div>
    );
  }

  if (!packageList) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="border-danger/20 bg-danger-subtle/30 text-content-primary max-w-md rounded-2xl border p-8 text-center">
          <h2 className="text-danger mb-1 text-lg font-bold">Documentation Unavailable</h2>
          <p className="text-content-secondary text-sm">
            Could not load `package-list.json`. Ensure dev server is running.
          </p>
        </div>
      </div>
    );
  }

  if (selectedPackage) {
    return (
      <div className={`bg-background text-content-primary min-h-screen pb-20 ${className || ''}`}>
        {/* Sticky Detail Header */}
        <div className="bg-surface/80 border-border-subtle sticky top-0 z-20 border-b backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex items-center gap-4">
              <Button
                aria-label="Back to Package List"
                color="neutral"
                size="sm"
                variant="ghost"
                onClick={() => setSelectedPackage(null)}
              >
                <ArrowLeft className="size-4" />
                <span>Packages</span>
              </Button>
              <div className="bg-border-subtle h-5 w-px" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-content-primary text-xl font-bold">
                    {selectedPackage.displayName}
                  </h1>
                  <span className="border-primary/20 bg-primary-subtle text-primary rounded-md border px-2 py-0.5 font-mono text-xs font-bold">
                    v{selectedPackage.version}
                  </span>
                </div>
                <p className="text-content-secondary line-clamp-1 text-xs">
                  {selectedPackage.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {selectedPackage.documentation
            ? Object.entries(selectedPackage.documentation).map(([fileName, docs]) => (
                <div key={fileName} className="mb-12">
                  <div className="border-border-subtle bg-surface/80 mb-6 rounded-2xl border p-6 shadow-xs backdrop-blur-xl">
                    <h2 className="text-content-primary mb-4 font-mono text-2xl font-bold">
                      {fileName}
                    </h2>

                    {/* Import Instructions */}
                    {docs.importInstructions && docs.importInstructions.length > 0 ? (
                      <div className="space-y-3">
                        <h3 className="text-content-secondary text-xs font-bold tracking-wider uppercase">
                          Import Syntax
                        </h3>
                        {docs.importInstructions.map((instruction) => (
                          <div
                            key={instruction.code}
                            className="border-border-subtle bg-background/80 flex items-center justify-between rounded-xl border p-3 font-mono text-xs"
                          >
                            <div>
                              <p className="text-content-muted mb-1 text-[11px]">
                                {instruction.description}
                              </p>
                              <code className="text-primary font-bold">{instruction.code}</code>
                            </div>
                            <Button
                              aria-label="Copy Import Code"
                              color="neutral"
                              size="xs"
                              variant="ghost"
                              onClick={() => handleCopyCode(instruction.code)}
                            >
                              {copiedCode === instruction.code ? (
                                <Check className="text-success size-3.5" />
                              ) : (
                                <Copy className="size-3.5" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* Props */}
                  {docs.interfaces?.some((index) => index.props && index.props.length > 0) ? (
                    <div className="mb-8 space-y-4">
                      <h3 className="text-content-primary text-lg font-bold">
                        Properties &amp; Props
                      </h3>
                      {docs.interfaces.map(
                        (interfaceItem) =>
                          interfaceItem.props &&
                          interfaceItem.props.length > 0 && (
                            <div key={interfaceItem.name} className="space-y-3">
                              <h4 className="text-content-secondary font-mono text-xs font-bold tracking-wider uppercase">
                                {interfaceItem.name}
                              </h4>
                              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {interfaceItem.props.map((property) => (
                                  <PropCard key={property.name} prop={property} />
                                ))}
                              </div>
                            </div>
                          ),
                      )}
                    </div>
                  ) : null}

                  {/* Events */}
                  {docs.events && docs.events.length > 0 ? (
                    <div className="mb-8 space-y-4">
                      <h3 className="text-content-primary text-lg font-bold">Event Handlers</h3>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {docs.events.map((event) => (
                          <EventCard key={event.name} event={event} />
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Types */}
                  {docs.types && docs.types.length > 0 ? (
                    <div className="mb-8 space-y-4">
                      <h3 className="text-content-primary text-lg font-bold">Type Definitions</h3>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {docs.types.map((type) => (
                          <TypeCard key={type.name} type={type} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }

  // Package Catalog List
  return (
    <div className={`bg-background text-content-primary min-h-screen pb-20 ${className || ''}`}>
      {/* Header Banner */}
      <div className="border-border-subtle bg-surface-subtle/50 border-b px-6 py-12 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl space-y-3 text-center">
          <div className="border-primary/20 bg-primary-subtle text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
            <BookOpen className="size-3.5" />
            <span>IdeasUI Monorepo Packages</span>
          </div>
          <h1 className="text-content-primary text-4xl font-extrabold tracking-tight sm:text-5xl">
            Package Reference &amp; Docs
          </h1>
          <p className="text-content-secondary mx-auto max-w-2xl text-base">
            Complete API specifications, props interfaces, and event handlers for all packages.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {Object.entries(packageList).map(([category, packages]) => {
          if (!packages || !Array.isArray(packages) || packages.length === 0) return null;

          return (
            <section key={category} className="mb-16">
              {/* Category Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary-subtle border-primary/20 text-primary flex size-10 items-center justify-center rounded-xl border text-lg shadow-2xs">
                  {getCategoryIcon(category)}
                </div>
                <div>
                  <h2 className="text-content-primary text-2xl font-bold capitalize">{category}</h2>
                  <p className="text-content-secondary text-xs">
                    {getCategoryDescription(category)}
                  </p>
                </div>
              </div>

              {/* Package Cards Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((package_) => (
                  <button
                    key={package_.name}
                    className="border-border-subtle bg-surface/70 hover:border-primary/40 hover:shadow-primary/5 group cursor-pointer overflow-hidden rounded-2xl border text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    tabIndex={0}
                    type="button"
                    onClick={() => setSelectedPackage(package_)}
                  >
                    <div className="space-y-4 p-6">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-2xl">{getPackageIcon(package_.name)}</span>
                        <span className="border-primary/20 bg-primary-subtle text-primary rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold">
                          v{package_.version}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-content-primary group-hover:text-primary text-lg font-bold transition-colors">
                          {package_.displayName}
                        </h3>
                        <p className="text-content-secondary mt-1 line-clamp-2 text-xs">
                          {package_.description}
                        </p>
                      </div>

                      {package_.keywords && package_.keywords.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {package_.keywords
                            .slice(0, MAX_VISIBLE_KEYWORDS)
                            .map((keyword: string) => (
                              <span
                                key={keyword}
                                className="border-border-subtle bg-surface-subtle text-content-secondary rounded-md border px-2 py-0.5 text-[10px] font-medium"
                              >
                                {keyword}
                              </span>
                            ))}
                        </div>
                      ) : null}

                      <div className="border-border-subtle text-content-muted flex items-center justify-between border-t pt-3 text-xs">
                        <span>
                          {package_.documentation ? Object.keys(package_.documentation).length : 0}{' '}
                          modules
                        </span>
                        <span className="text-primary flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-1">
                          Explore API
                          <ChevronRight className="size-3.5" />
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PackageDocumentation;
