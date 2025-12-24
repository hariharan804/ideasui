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
}

interface PackageDocumentationProps {
  className?: string;
}

const PackageDocumentation: React.FC<PackageDocumentationProps> = ({className}) => {
  const [packageList, setPackageList] = React.useState<PackageData | null>(null);
  const [loading, setLoading] = React.useState(true);

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
    return <div className="p-8 text-center">Loading documentation...</div>;
  }

  if (!packageList) {
    return <div className="p-8 text-center text-red-600">Failed to load documentation</div>;
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
        <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {Object.entries(packageList).map(([category, packages]) => {
          if (!packages || !Array.isArray(packages) || packages.length === 0) return null;

          return (
            <section key={category} className="mb-16">
              {/* Category Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                  {getCategoryIcon(category)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold capitalize text-gray-900">{category}</h2>
                  <p className="text-gray-600">{getCategoryDescription(category)}</p>
                </div>
              </div>

              {/* Package Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(packages as Package[]).map((pkg) => (
                  <div key={pkg.name} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                    {/* Package Header */}
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                      <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-600 backdrop-blur-sm">
                        v{pkg.version}
                      </div>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
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

                      {/* Installation */}
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          <span className="h-4 w-4 rounded bg-green-100 flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          </span>
                          Quick Install
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(pkg.installCommands || {}).slice(0, 1).map(([manager, command]) => (
                            <div key={manager} className="group/code relative">
                              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-3 text-sm text-gray-100">
                                <code>{command as string}</code>
                              </pre>
                              <button className="absolute right-2 top-2 rounded bg-gray-800 p-1 text-gray-400 opacity-0 transition-opacity group-hover/code:opacity-100 hover:text-white">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* API Preview */}
                      {pkg.documentation && Object.entries(pkg.documentation).map(([fileName, docs]) => (
                        <div key={fileName} className="space-y-3">
                          {docs.interfaces && docs.interfaces.length > 0 && (
                            <div>
                              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                                <span className="h-4 w-4 rounded bg-purple-100 flex items-center justify-center">
                                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                                </span>
                                API Reference
                              </h4>
                              {docs.interfaces.slice(0, 1).map((interfaceItem) => (
                                <div key={interfaceItem.name} className="rounded-lg border border-gray-200 overflow-hidden">
                                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                                    <h5 className="font-mono text-sm font-semibold text-gray-900">{interfaceItem.name}</h5>
                                  </div>
                                  {interfaceItem.props && interfaceItem.props.length > 0 && (
                                    <div className="max-h-48 overflow-y-auto">
                                      <table className="w-full text-sm">
                                        <thead className="bg-gray-50 sticky top-0">
                                          <tr>
                                            <th className="px-3 py-2 text-left font-medium text-gray-700">Prop</th>
                                            <th className="px-3 py-2 text-left font-medium text-gray-700">Type</th>
                                            <th className="px-3 py-2 text-center font-medium text-gray-700">Required</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                          {interfaceItem.props.slice(0, 5).map((prop) => (
                                            <tr key={prop.name} className="hover:bg-gray-50">
                                              <td className="px-3 py-2">
                                                <div className="flex items-center gap-2">
                                                  <code className="font-mono text-xs font-semibold text-blue-600">{prop.name}</code>
                                                  {prop.isDeprecated && (
                                                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-600">deprecated</span>
                                                  )}
                                                </div>
                                                {prop.default && (
                                                  <div className="text-xs text-gray-500 mt-1">default: {prop.default}</div>
                                                )}
                                              </td>
                                              <td className="px-3 py-2">
                                                <code className="font-mono text-xs text-gray-600">{prop.type}</code>
                                              </td>
                                              <td className="px-3 py-2 text-center">
                                                {prop.optional ? (
                                                  <span className="text-gray-400">✗</span>
                                                ) : (
                                                  <span className="text-green-500">✓</span>
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                      {interfaceItem.props.length > 5 && (
                                        <div className="bg-gray-50 px-3 py-2 text-center text-xs text-gray-500">
                                          +{interfaceItem.props.length - 5} more props
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Events Preview */}
                          {docs.events && docs.events.length > 0 && (
                            <div>
                              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                                <span className="h-4 w-4 rounded bg-orange-100 flex items-center justify-center">
                                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                                </span>
                                Events
                              </h4>
                              <div className="space-y-2">
                                {docs.events.slice(0, 3).map((event) => (
                                  <div key={event.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                                    <code className="font-mono text-xs font-semibold text-purple-600">{event.name}</code>
                                    <code className="font-mono text-xs text-gray-600">{event.type}</code>
                                  </div>
                                ))}
                                {docs.events.length > 3 && (
                                  <div className="text-center text-xs text-gray-500">
                                    +{docs.events.length - 3} more events
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Action Button */}
                      <div className="pt-4 border-t border-gray-100">
                        <button className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          View Full Documentation
                        </button>
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

// Helper functions for icons and descriptions
function getCategoryIcon(category: string) {
  const icons = {
    components: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" /></svg>,
    hooks: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>,
    utils: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>,
    core: <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  };
  return icons[category as keyof typeof icons] || icons.components;
}

function getCategoryDescription(category: string) {
  const descriptions = {
    components: "Ready-to-use React components with TypeScript support",
    hooks: "Custom React hooks for common functionality", 
    utils: "Utility functions and helpers",
    core: "Core system packages and providers"
  };
  return descriptions[category as keyof typeof descriptions] || "Package collection";
}

function getPackageIcon(packageName: string) {
  // Return a simple geometric shape based on package name
  const shapes = ['■', '●', '▲', '◆', '★', '▼', '◀', '▶'];
  const index = packageName.length % shapes.length;
  return <span className="text-lg">{shapes[index]}</span>;
}

export default PackageDocumentation;