"use client";

import React from "react";

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
  props?: PropItem[];
}

interface PropItem {
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

interface PackageDocumentationProps {
  className?: string;
}

const getCategoryIcon = (category: string) => {
  const icons = {
    components: "🧩",
    core: "⚙️",
    hooks: "🪝",
    utils: "🛠️",
    icons: "🎨",
    cli: "💻"
  };
  return icons[category as keyof typeof icons] || "📦";
};

const getCategoryDescription = (category: string) => {
  const descriptions = {
    components: "UI components for building interfaces",
    core: "Core system packages and themes",
    hooks: "React hooks for common functionality",
    utils: "Utility functions and helpers",
    icons: "Icon components and assets",
    cli: "Command line tools"
  };
  return descriptions[category as keyof typeof descriptions] || "Package collection";
};

const getPackageIcon = (packageName: string) => {
  if (packageName.includes("button")) return "🔘";
  if (packageName.includes("ripple")) return "〰️";
  if (packageName.includes("theme")) return "🎨";
  if (packageName.includes("slot")) return "📦";
  if (packageName.includes("variants")) return "🎭";
  if (packageName.includes("utils")) return "🔧";
  if (packageName.includes("icons")) return "✨";
  if (packageName.includes("cli")) return "⌨️";
  return "📋";
};

const PropCard: React.FC<{prop: PropItem}> = ({prop}) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md">
    <div className="mb-2 flex items-start justify-between gap-2">
      <div className="flex items-center gap-2">
        <code className="rounded bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-700">
          {prop.name}
        </code>
        {!prop.optional && (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
            required
          </span>
        )}
        {prop.isDeprecated && (
          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            deprecated
          </span>
        )}
      </div>
    </div>
    <div className="mb-2">
      <code className="text-sm text-gray-600 break-all">{prop.type}</code>
    </div>
    {prop.description && (
      <p className="mb-2 text-sm text-gray-700">{prop.description}</p>
    )}
    {prop.default && (
      <div className="text-xs text-gray-500">
        Default: <code className="rounded bg-gray-100 px-1">{prop.default}</code>
      </div>
    )}
  </div>
);

const EventCard: React.FC<{event: EventItem}> = ({event}) => (
  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
    <div className="mb-2 flex items-center gap-2">
      <code className="rounded bg-purple-100 px-2 py-1 text-sm font-semibold text-purple-700">
        {event.name}
      </code>
      <span className="rounded-full bg-purple-200 px-2 py-0.5 text-xs font-medium text-purple-800">
        event
      </span>
    </div>
    <code className="mb-2 block text-sm text-purple-600 break-all">{event.type}</code>
    {event.description && (
      <p className="text-sm text-purple-700">{event.description}</p>
    )}
  </div>
);

const TypeCard: React.FC<{type: TypeItem}> = ({type}) => (
  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
    <div className="mb-2 flex items-center gap-2">
      <code className="rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-700">
        {type.name}
      </code>
      <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-800">
        type
      </span>
    </div>
    <code className="text-sm text-green-600 break-all">{type.definition}</code>
  </div>
);

const PackageDocumentation: React.FC<PackageDocumentationProps> = ({className}) => {
  const [packageList, setPackageList] = React.useState<PackageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedPackage, setSelectedPackage] = React.useState<Package | null>(null);

  React.useEffect(() => {
    fetch("/package-list.json")
      .then((res) => res.json())
      .then((data) => {
        setPackageList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load package list:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (!packageList) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Failed to load documentation</p>
          <p className="text-sm">Please check your connection and try again</p>
        </div>
      </div>
    );
  }

  if (selectedPackage) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className || ""}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedPackage(null)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{selectedPackage.displayName}</h1>
                <p className="text-sm text-gray-600">{selectedPackage.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {selectedPackage.documentation && Object.entries(selectedPackage.documentation).map(([fileName, docs]) => (
            <div key={fileName} className="mb-12">
              <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">{fileName}</h2>
                
                {/* Import Instructions */}
                {docs.importInstructions && docs.importInstructions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Import</h3>
                    <div className="space-y-3">
                      {docs.importInstructions.map((instruction, idx) => (
                        <div key={idx} className="rounded-lg bg-gray-900 p-4">
                          <p className="mb-2 text-sm text-gray-300">{instruction.description}</p>
                          <code className="text-green-400">{instruction.code}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Props */}
              {docs.interfaces && docs.interfaces.some(i => i.props && i.props.length > 0) && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Props</h3>
                  {docs.interfaces.map((interfaceItem) => 
                    interfaceItem.props && interfaceItem.props.length > 0 && (
                      <div key={interfaceItem.name} className="mb-6">
                        <h4 className="mb-3 text-lg font-semibold text-gray-800">{interfaceItem.name}</h4>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {interfaceItem.props.map((prop) => (
                            <PropCard key={prop.name} prop={prop} />
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Events */}
              {docs.events && docs.events.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Events</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {docs.events.map((event) => (
                      <EventCard key={event.name} event={event} />
                    ))}
                  </div>
                </div>
              )}

              {/* Types */}
              {docs.types && docs.types.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Types</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {docs.types.map((type) => (
                      <TypeCard key={type.name} type={type} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${className || ""}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
            Latest Documentation
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-5xl font-bold text-transparent">
            IdeasUI Documentation
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-blue-100">
            Complete reference for modern React components with TypeScript support
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {Object.entries(packageList).map(([category, packages]) => {
          if (!packages || !Array.isArray(packages) || packages.length === 0) return null;

          return (
            <section key={category} className="mb-16">
              {/* Category Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg text-xl">
                  {getCategoryIcon(category)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold capitalize text-gray-900">{category}</h2>
                  <p className="text-gray-600">{getCategoryDescription(category)}</p>
                </div>
              </div>

              {/* Package Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(packages as Package[]).map((pkg) => (
                  <div 
                    key={pkg.name} 
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    {/* Package Header */}
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                      <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-600 backdrop-blur-sm">
                        v{pkg.version}
                      </div>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg text-xl">
                        {getPackageIcon(pkg.name)}
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900">{pkg.displayName}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{pkg.description}</p>
                    </div>

                    {/* Package Content */}
                    <div className="p-6 space-y-4">
                      {/* Keywords */}
                      {pkg.keywords && pkg.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {pkg.keywords.slice(0, 3).map((keyword: string) => (
                            <span
                              key={keyword}
                              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                            >
                              {keyword}
                            </span>
                          ))}
                          {pkg.keywords.length > 3 && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                              +{pkg.keywords.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Quick Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {pkg.documentation ? Object.keys(pkg.documentation).length : 0} files
                        </span>
                        <span className="flex items-center gap-1">
                          Click to explore
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
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