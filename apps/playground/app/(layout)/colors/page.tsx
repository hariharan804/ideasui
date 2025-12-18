"use client";

import { useState } from "react";
import { completeTheme } from "./generated-theme-constants";
import { Check, Copy, Palette } from "lucide-react";

export default function ColorsPage() {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const copyToClipboard = async (className: string) => {
    await navigator.clipboard.writeText(className);
    setCopiedClass(className);
    setTimeout(() => setCopiedClass(null), 2000);
  };

  const colorCategories = Object.keys(completeTheme.light) as Array<keyof typeof completeTheme.light>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Palette className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Color Palette
            </h1>
          </div>
          <p className="text-lg text-slate-600 mb-6">
            Click any color to copy its Tailwind CSS class name
          </p>
          
          {/* Theme Toggle */}
          <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border">
            {(["light", "dark"] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
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
            <div key={category} className="bg-white rounded-2xl p-8 shadow-sm border">
              <h2 className="text-2xl font-semibold mb-6 capitalize text-slate-800 flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: completeTheme[selectedTheme][category]["500"] }}
                />
                {category}
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-11 gap-3">
                {Object.entries(completeTheme[selectedTheme][category]).map(([shade, color]) => {
                  const className = `bg-${category}-${shade}`;
                  const textClassName = `text-${category}-${shade}`;
                  const borderClassName = `border-${category}-${shade}`;
                  
                  return (
                    <div key={shade} className="group">
                      {/* Color Swatch */}
                      <div
                        className="aspect-square rounded-lg shadow-sm border border-slate-200 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md relative overflow-hidden"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(className)}
                      >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                        <div className="text-xs text-slate-500 font-mono">{color.slice(0, 20)}...</div>
                      </div>
                      
                      {/* Class Options */}
                      <div className="mt-2 space-y-1">
                        <button
                          onClick={() => copyToClipboard(className)}
                          className={`w-full text-xs px-2 py-1 rounded border transition-colors font-mono ${
                            copiedClass === className
                              ? "bg-green-100 border-green-300 text-green-700"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {copiedClass === className ? "Copied!" : className}
                        </button>
                        
                        <button
                          onClick={() => copyToClipboard(textClassName)}
                          className={`w-full text-xs px-2 py-1 rounded border transition-colors font-mono ${
                            copiedClass === textClassName
                              ? "bg-green-100 border-green-300 text-green-700"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {copiedClass === textClassName ? "Copied!" : textClassName}
                        </button>
                        
                        <button
                          onClick={() => copyToClipboard(borderClassName)}
                          className={`w-full text-xs px-2 py-1 rounded border transition-colors font-mono ${
                            copiedClass === borderClassName
                              ? "bg-green-100 border-green-300 text-green-700"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
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
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800">Usage Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-700">Background Colors</h3>
              <div className="space-y-2">
                {["primary", "secondary", "success", "warning", "danger"].map((color) => (
                  <div key={color} className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: completeTheme[selectedTheme][color as keyof typeof completeTheme.light]["500"] }}
                    />
                    <code className="text-sm bg-slate-100 px-2 py-1 rounded font-mono">
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
                      style={{ color: completeTheme[selectedTheme][color as keyof typeof completeTheme.light]["600"] }}
                    >
                      Sample Text
                    </span>
                    <code className="text-sm bg-slate-100 px-2 py-1 rounded font-mono">
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