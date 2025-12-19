"use client";

import {useState} from "react";
import {completeTheme} from "@ideasui/theme/theme-constants";
import {Check, Copy, Palette} from "lucide-react";

export default function ColorsPage() {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const copyToClipboard = async (className: string) => {
    await navigator.clipboard.writeText(className);
    setCopiedClass(className);
    setTimeout(() => setCopiedClass(null), 2000);
  };

  const colorCategories = Object.keys(completeTheme.light) as Array<
    keyof typeof completeTheme.light
  >;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Palette className="h-8 w-8 text-purple-600" />
            <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
              Color Palette
            </h1>
          </div>
          <p className="mb-6 text-lg text-slate-600">
            Click any color to copy its Tailwind CSS class name
          </p>

          {/* Theme Toggle */}
          <div className="inline-flex rounded-lg border bg-white p-1 shadow-sm">
            {(["light", "dark"] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  selectedTheme === theme
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Color Grid */}
        <div className="space-y-12">
          {colorCategories.map((category) => (
            <div key={category} className="rounded-2xl border bg-white p-8 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-800 capitalize">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{backgroundColor: completeTheme[selectedTheme][category]["500"]}}
                />
                {category}
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-11">
                {Object.entries(completeTheme[selectedTheme][category]).map(([shade, color]) => {
                  const className = `bg-${category}-${shade}`;
                  const textClassName = `text-${category}-${shade}`;
                  const borderClassName = `border-${category}-${shade}`;

                  return (
                    <div key={shade} className="group">
                      {/* Color Swatch */}
                      <div
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-slate-200 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                        style={{backgroundColor: color}}
                        onClick={() => copyToClipboard(className)}
                      >
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          {copiedClass === className ? (
                            <Check className="h-4 w-4 text-white drop-shadow-lg" />
                          ) : (
                            <Copy className="h-4 w-4 text-white drop-shadow-lg" />
                          )}
                        </div>
                      </div>

                      {/* Shade Label */}
                      <div className="mt-2 text-center">
                        <div className="text-sm font-medium text-slate-700">{shade}</div>
                        <div className="font-mono text-xs text-slate-500">
                          {color.slice(0, 20)}...
                        </div>
                      </div>

                      {/* Class Options */}
                      <div className="mt-2 space-y-1">
                        <button
                          onClick={() => copyToClipboard(className)}
                          className={`w-full rounded border px-2 py-1 font-mono text-xs transition-colors ${
                            copiedClass === className
                              ? "border-green-300 bg-green-100 text-green-700"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {copiedClass === className ? "Copied!" : className}
                        </button>

                        <button
                          onClick={() => copyToClipboard(textClassName)}
                          className={`w-full rounded border px-2 py-1 font-mono text-xs transition-colors ${
                            copiedClass === textClassName
                              ? "border-green-300 bg-green-100 text-green-700"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {copiedClass === textClassName ? "Copied!" : textClassName}
                        </button>

                        <button
                          onClick={() => copyToClipboard(borderClassName)}
                          className={`w-full rounded border px-2 py-1 font-mono text-xs transition-colors ${
                            copiedClass === borderClassName
                              ? "border-green-300 bg-green-100 text-green-700"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {copiedClass === borderClassName ? "Copied!" : borderClassName}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Examples */}
        <div className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-slate-800">Usage Examples</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-700">Background Colors</h3>
              <div className="space-y-2">
                {["primary", "secondary", "success", "warning", "danger"].map((color) => (
                  <div key={color} className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded"
                      style={{
                        backgroundColor:
                          completeTheme[selectedTheme][color as keyof typeof completeTheme.light][
                            "500"
                          ],
                      }}
                    />
                    <code className="rounded bg-slate-100 px-2 py-1 font-mono text-sm">
                      bg-{color}-500
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-700">Text Colors</h3>
              <div className="space-y-2">
                {["primary", "secondary", "success", "warning", "danger"].map((color) => (
                  <div key={color} className="flex items-center gap-3">
                    <span
                      className="text-lg font-semibold"
                      style={{
                        color:
                          completeTheme[selectedTheme][color as keyof typeof completeTheme.light][
                            "600"
                          ],
                      }}
                    >
                      Sample Text
                    </span>
                    <code className="rounded bg-slate-100 px-2 py-1 font-mono text-sm">
                      text-{color}-600
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
