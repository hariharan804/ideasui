"use client";
import {useState} from "react";
import {Check, Copy, Palette} from "lucide-react";
import {colorTokens, darkColorTokens} from "@ideasui/theme";
// Define color tokens
// const colorTokens = {
//   primary: {
//     "50": "#f0f9ff",
//     "100": "#e0f2fe",
//     "200": "#bae6fd",
//     "300": "#7dd3fc",
//     "400": "#38bdf8",
//     "500": "#0ea5e9",
//     "600": "#0284c7",
//     "700": "#0369a1",
//     "800": "#075985",
//     "900": "#0c4a6e",
//     "950": "#082f49",
//   },
//   secondary: {
//     "50": "#f8fafc",
//     "100": "#f1f5f9",
//     "200": "#e2e8f0",
//     "300": "#cbd5e1",
//     "400": "#94a3b8",
//     "500": "#64748b",
//     "600": "#475569",
//     "700": "#334155",
//     "800": "#1e293b",
//     "900": "#0f172a",
//     "950": "#020617",
//   },
//   success: {
//     "50": "#f0fdf4",
//     "100": "#dcfce7",
//     "200": "#bbf7d0",
//     "300": "#86efac",
//     "400": "#4ade80",
//     "500": "#22c55e",
//     "600": "#16a34a",
//     "700": "#15803d",
//     "800": "#166534",
//     "900": "#14532d",
//     "950": "#052e16",
//   },
//   warning: {
//     "50": "#fffbeb",
//     "100": "#fef3c7",
//     "200": "#fde68a",
//     "300": "#fcd34d",
//     "400": "#fbbf24",
//     "500": "#f59e0b",
//     "600": "#d97706",
//     "700": "#b45309",
//     "800": "#92400e",
//     "900": "#78350f",
//     "950": "#451a03",
//   },
//   danger: {
//     "50": "#fef2f2",
//     "100": "#fee2e2",
//     "200": "#fecaca",
//     "300": "#fca5a5",
//     "400": "#f87171",
//     "500": "#ef4444",
//     "600": "#dc2626",
//     "700": "#b91c1c",
//     "800": "#991b1b",
//     "900": "#7f1d1d",
//     "950": "#450a0a",
//   },
//   neutral: {
//     "50": "#fafafa",
//     "100": "#f5f5f5",
//     "200": "#e5e5e5",
//     "300": "#d4d4d4",
//     "400": "#a3a3a3",
//     "500": "#737373",
//     "600": "#525252",
//     "700": "#404040",
//     "800": "#262626",
//     "900": "#171717",
//     "950": "#0a0a0a",
//   },
// };

// const darkColorTokens = {
//   primary: {
//     "50": "#082f49",
//     "100": "#0c4a6e",
//     "200": "#075985",
//     "300": "#0369a1",
//     "400": "#0284c7",
//     "500": "#0ea5e9",
//     "600": "#38bdf8",
//     "700": "#7dd3fc",
//     "800": "#bae6fd",
//     "900": "#e0f2fe",
//     "950": "#f0f9ff",
//   },
//   secondary: {
//     "50": "#020617",
//     "100": "#0f172a",
//     "200": "#1e293b",
//     "300": "#334155",
//     "400": "#475569",
//     "500": "#64748b",
//     "600": "#94a3b8",
//     "700": "#cbd5e1",
//     "800": "#e2e8f0",
//     "900": "#f1f5f9",
//     "950": "#f8fafc",
//   },
//   success: {
//     "50": "#052e16",
//     "100": "#14532d",
//     "200": "#166534",
//     "300": "#15803d",
//     "400": "#16a34a",
//     "500": "#22c55e",
//     "600": "#4ade80",
//     "700": "#86efac",
//     "800": "#bbf7d0",
//     "900": "#dcfce7",
//     "950": "#f0fdf4",
//   },
//   warning: {
//     "50": "#451a03",
//     "100": "#78350f",
//     "200": "#92400e",
//     "300": "#b45309",
//     "400": "#d97706",
//     "500": "#f59e0b",
//     "600": "#fbbf24",
//     "700": "#fcd34d",
//     "800": "#fde68a",
//     "900": "#fef3c7",
//     "950": "#fffbeb",
//   },
//   danger: {
//     "50": "#450a0a",
//     "100": "#7f1d1d",
//     "200": "#991b1b",
//     "300": "#b91c1c",
//     "400": "#dc2626",
//     "500": "#ef4444",
//     "600": "#f87171",
//     "700": "#fca5a5",
//     "800": "#fecaca",
//     "900": "#fee2e2",
//     "950": "#fef2f2",
//   },
//   neutral: {
//     "50": "#0a0a0a",
//     "100": "#171717",
//     "200": "#262626",
//     "300": "#404040",
//     "400": "#525252",
//     "500": "#737373",
//     "600": "#a3a3a3",
//     "700": "#d4d4d4",
//     "800": "#e5e5e5",
//     "900": "#f5f5f5",
//     "950": "#fafafa",
//   },
// };

export default function ColorsPage() {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const copyToClipboard = async (className: string) => {
    await navigator.clipboard.writeText(className);
    setCopiedClass(className);
    setTimeout(() => setCopiedClass(null), 2000);
  };

  const colors = {
    light: colorTokens,
    dark: darkColorTokens,
  };

  const colorCategories = Object.keys(colorTokens) as Array<keyof typeof colorTokens>;

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
                  style={{backgroundColor: colors[selectedTheme][category]["500"]}}
                />
                {category}
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-11">
                {Object.entries(colors[selectedTheme][category]).map(([shade, color]) => {
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
                        <div className="font-mono text-xs text-slate-500">{color}</div>
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
                          colors[selectedTheme][color as keyof typeof colorTokens]["500"],
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
                        color: colors[selectedTheme][color as keyof typeof colorTokens]["600"],
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
