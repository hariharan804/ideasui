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
    <div className={`space-y-8 ${className || ""}`}>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">IdeasUI Package Documentation</h1>
        <p className="text-gray-600">Complete reference for all IdeasUI components and packages</p>
      </div>

      {Object.entries(packageList).map(([category, packages]) => {
        if (!packages || !Array.isArray(packages) || packages.length === 0) return null;

        return (
          <section key={category} className="space-y-6">
            <h2 className="border-b pb-2 text-2xl font-semibold capitalize">{category}</h2>

            {(packages as Package[]).map((pkg) => (
              <div key={pkg.name} className="space-y-4 rounded-lg border p-6">
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold">{pkg.displayName}</h3>
                  <p className="mt-1 text-gray-600">{pkg.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                      v{pkg.version}
                    </span>
                    {pkg.keywords?.map((keyword: string) => (
                      <span
                        key={keyword}
                        className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Installation</h4>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {Object.entries(pkg.installCommands || {}).map(([manager, command]) => (
                      <div key={manager} className="rounded bg-gray-50 p-2 font-mono text-sm">
                        <span className="text-gray-500"># {manager}</span>
                        <br />
                        {command as string}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 italic">{pkg.installNote}</p>
                </div>

                {pkg.documentation &&
                  Object.entries(pkg.documentation).map(([fileName, docs]) => (
                    <div key={fileName} className="space-y-4 border-t pt-4">
                      <h4 className="text-lg font-medium">{fileName}</h4>

                      {docs.importInstructions && docs.importInstructions.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium">Import</h5>
                          {docs.importInstructions.map((instruction, idx) => (
                            <div key={idx} className="space-y-1">
                              <p className="text-sm text-gray-600">{instruction.description}</p>
                              <pre className="overflow-x-auto rounded bg-gray-50 p-2 text-sm">
                                <code>{instruction.code}</code>
                              </pre>
                            </div>
                          ))}
                        </div>
                      )}

                      {docs.interfaces && docs.interfaces.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="font-medium">API Reference</h5>
                          {docs.interfaces.map((interfaceItem) => (
                            <div key={interfaceItem.name} className="space-y-2">
                              <h6 className="text-base font-medium">{interfaceItem.name}</h6>
                              {interfaceItem.props && interfaceItem.props.length > 0 && (
                                <div className="overflow-x-auto">
                                  <table className="min-w-full border border-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="border border-gray-200 px-3 py-2 text-left">
                                          Prop
                                        </th>
                                        <th className="border border-gray-200 px-3 py-2 text-left">
                                          Type
                                        </th>
                                        <th className="border border-gray-200 px-3 py-2 text-left">
                                          Description
                                        </th>
                                        <th className="border border-gray-200 px-3 py-2 text-left">
                                          Optional
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {interfaceItem.props.map((prop) => (
                                        <tr key={prop.name}>
                                          <td className="border border-gray-200 px-3 py-2 font-mono text-xs">
                                            {prop.name}
                                          </td>
                                          <td className="border border-gray-200 px-3 py-2 font-mono text-xs">
                                            {prop.type}
                                          </td>
                                          <td className="border border-gray-200 px-3 py-2">
                                            {prop.description || "-"}
                                          </td>
                                          <td className="border border-gray-200 px-3 py-2 text-center">
                                            {prop.optional ? "✓" : "✗"}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {docs.types && docs.types.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium">Types</h5>
                          {docs.types.map((type) => (
                            <div key={type.name} className="space-y-1">
                              <h6 className="text-sm font-medium">{type.name}</h6>
                              <pre className="overflow-x-auto rounded bg-gray-50 p-2 text-sm">
                                <code>
                                  type {type.name} = {type.definition}
                                </code>
                              </pre>
                            </div>
                          ))}
                        </div>
                      )}

                      {docs.events && docs.events.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium">Events</h5>
                          <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 text-sm">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="border border-gray-200 px-3 py-2 text-left">
                                    Event
                                  </th>
                                  <th className="border border-gray-200 px-3 py-2 text-left">
                                    Type
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {docs.events.map((event) => (
                                  <tr key={event.name}>
                                    <td className="border border-gray-200 px-3 py-2 font-mono text-xs">
                                      {event.name}
                                    </td>
                                    <td className="border border-gray-200 px-3 py-2 font-mono text-xs">
                                      {event.type}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
};

export default PackageDocumentation;