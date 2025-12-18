"use client";

import { useState } from "react";
import { Package, Download, Check, AlertCircle, Copy } from "lucide-react";

const RELEASE_TAGS = {
  latest: { label: "Latest", description: "Stable release", color: "green" },
  canary: { label: "Canary", description: "Latest development build", color: "yellow" },
  beta: { label: "Beta", description: "Beta releases", color: "blue" },
  alpha: { label: "Alpha", description: "Alpha releases", color: "purple" },
} as const;

const PACKAGES = [
  "@ideasui/button",
  "@ideasui/ripple", 
  "@ideasui/theme-controller",
  "@ideasui/box",
  "@ideasui/variants",
  "@ideasui/utils",
  "@ideasui/hooks",
] as const;

export default function InstallerPage() {
  const [selectedTag, setSelectedTag] = useState<keyof typeof RELEASE_TAGS>("latest");
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(new Set(PACKAGES));
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const generateInstallCommand = (packageManager: "npm" | "pnpm" | "yarn") => {
    const packages = Array.from(selectedPackages);
    const packagesWithTag = packages.map(pkg => `${pkg}@${selectedTag}`).join(" ");
    
    switch (packageManager) {
      case "npm":
        return `npm install ${packagesWithTag}`;
      case "pnpm":
        return `pnpm add ${packagesWithTag}`;
      case "yarn":
        return `yarn add ${packagesWithTag}`;
    }
  };

  const copyCommand = async (command: string) => {
    await navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const togglePackage = (pkg: string) => {
    const newSelected = new Set(selectedPackages);
    if (newSelected.has(pkg)) {
      newSelected.delete(pkg);
    } else {
      newSelected.add(pkg);
    }
    setSelectedPackages(newSelected);
  };

  const selectAll = () => setSelectedPackages(new Set(PACKAGES));
  const selectNone = () => setSelectedPackages(new Set());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Package Installer
            </h1>
          </div>
          <p className="text-lg text-slate-600">
            Choose your preferred release tag and packages to install
          </p>
        </div>

        <div className="space-y-8">
          {/* Release Tag Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">Release Tag</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(RELEASE_TAGS).map(([tag, info]) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag as keyof typeof RELEASE_TAGS)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTag === tag
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        info.color === "green" ? "bg-green-500" :
                        info.color === "yellow" ? "bg-yellow-500" :
                        info.color === "blue" ? "bg-blue-500" :
                        "bg-purple-500"
                      }`}
                    />
                    <span className="font-semibold text-slate-800">{info.label}</span>
                  </div>
                  <p className="text-sm text-slate-600">{info.description}</p>
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded mt-2 block font-mono">
                    @{tag}
                  </code>
                </button>
              ))}
            </div>
          </div>

          {/* Package Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Packages</h2>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={selectNone}
                  className="text-sm px-3 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                >
                  Select None
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PACKAGES.map((pkg) => (
                <label
                  key={pkg}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedPackages.has(pkg)
                      ? "border-blue-300 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPackages.has(pkg)}
                    onChange={() => togglePackage(pkg)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <code className="font-mono text-sm text-slate-700">{pkg}</code>
                </label>
              ))}
            </div>
          </div>

          {/* Install Commands */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">Install Commands</h2>
            
            {selectedPackages.size === 0 ? (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span>Please select at least one package to install</span>
              </div>
            ) : (
              <div className="space-y-4">
                {(["npm", "pnpm", "yarn"] as const).map((pm) => {
                  const command = generateInstallCommand(pm);
                  return (
                    <div key={pm} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 uppercase">{pm}</span>
                        <button
                          onClick={() => copyCommand(command)}
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          {copiedCommand === command ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">Package.json Preview</h2>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-blue-300">{`{`}</div>
                <div className="ml-2 text-green-300">"dependencies":</div>
                <div className="ml-2 text-blue-300">{`{`}</div>
                {Array.from(selectedPackages).map((pkg, index, arr) => (
                  <div key={pkg} className="ml-4">
                    <span className="text-yellow-300">"{pkg}"</span>
                    <span className="text-slate-300">: </span>
                    <span className="text-green-300">"{selectedTag}"</span>
                    {index < arr.length - 1 && <span className="text-slate-300">,</span>}
                  </div>
                ))}
                <div className="ml-2 text-blue-300">{`}`}</div>
                <div className="text-blue-300">{`}`}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}