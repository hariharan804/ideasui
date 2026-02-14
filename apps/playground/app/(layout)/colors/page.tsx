'use client';
import type { JSX } from 'react';

import { useState } from 'react';
import { Check, Copy, Palette } from 'lucide-react';
import Link from 'next/link';
import { primitives } from '@ideasui/theme';

const COPY_TIMEOUT = 2000;
const DEFAULT_BUTTON_CLASS =
  'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100';
const COPIED_BUTTON_CLASS = 'border-green-300 bg-green-100 text-green-700';

export default function ColorsPage(): JSX.Element {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');

  const copyToClipboard = async (className: string): Promise<void> => {
    await navigator.clipboard.writeText(className);
    setCopiedClass(className);
    setTimeout(() => setCopiedClass(null), COPY_TIMEOUT);
  };

  const colors = {
    light: primitives.light,
    dark: primitives.dark,
  };

  const colorCategories = Object.keys(primitives.light) as Array<keyof typeof primitives.light>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Palette className="h-8 w-8 text-purple-600" />
            <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
              Color Palette
            </h1>
          </div>
          <p className="mb-6 text-lg text-neutral-600">
            Click any color to copy its Tailwind CSS class name
          </p>

          {/* Theme Toggle */}
          <div className="inline-flex rounded-lg border bg-white p-1 shadow-sm">
            {(['light', 'dark'] as const).map((theme) => (
              <button
                key={theme}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  selectedTheme === theme
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                onClick={() => setSelectedTheme(theme)}
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
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-neutral-800 capitalize">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: colors[selectedTheme][category]['500'] }}
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
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-lg border border-neutral-200 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                        role="button"
                        style={{ backgroundColor: color as string }}
                        tabIndex={0}
                        onClick={() => {
                          void copyToClipboard(className);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            void copyToClipboard(className);
                          }
                        }}
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
                        <div className="text-sm font-medium text-neutral-700">{shade}</div>
                        <div className="font-mono text-xs text-neutral-500">{color as string}</div>
                      </div>

                      {/* Class Options */}
                      <div className="mt-2 space-y-1">
                        <button
                          className={`w-full rounded border px-2 py-1 font-mono text-xs transition-colors ${
                            copiedClass === className ? COPIED_BUTTON_CLASS : DEFAULT_BUTTON_CLASS
                          }`}
                          onClick={() => {
                            void copyToClipboard(className);
                          }}
                        >
                          {copiedClass === className ? 'Copied!' : className}
                        </button>

                        <button
                          className={`w-full rounded border px-2 py-1 font-mono text-xs transition-colors ${
                            copiedClass === textClassName
                              ? COPIED_BUTTON_CLASS
                              : DEFAULT_BUTTON_CLASS
                          }`}
                          onClick={() => {
                            void copyToClipboard(textClassName);
                          }}
                        >
                          {copiedClass === textClassName ? 'Copied!' : textClassName}
                        </button>

                        <button
                          className={`w-full rounded border px-2 py-1 font-mono text-xs transition-colors ${
                            copiedClass === borderClassName
                              ? COPIED_BUTTON_CLASS
                              : DEFAULT_BUTTON_CLASS
                          }`}
                          onClick={() => {
                            void copyToClipboard(borderClassName);
                          }}
                        >
                          {copiedClass === borderClassName ? 'Copied!' : borderClassName}
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
          <h2 className="mb-6 text-2xl font-semibold text-neutral-800">Usage Examples</h2>

          <div className="space-y-12">
            {/* Buttons */}
            <div>
              <h3 className="mb-4 text-lg font-medium text-neutral-700">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 rounded-lg px-4 py-2 text-white">
                  Primary Button
                </button>
                <button className="bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 rounded-lg px-4 py-2 text-white">
                  Secondary Button
                </button>
                <button className="bg-success-500 hover:bg-success-600 active:bg-success-700 rounded-lg px-4 py-2 text-white">
                  Success Action
                </button>
                <button className="bg-danger-500 hover:bg-danger-600 active:bg-danger-700 rounded-lg px-4 py-2 text-white">
                  Delete Item
                </button>
                <button className="border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg border px-4 py-2">
                  Outline Button
                </button>
              </div>
              <div className="mt-2 text-sm text-neutral-500">
                <code className="text-xs">bg-primary-600 hover:bg-primary-700 text-white</code>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="mb-4 text-lg font-medium text-neutral-700">Badges & Chips</h3>
              <div className="flex flex-wrap gap-4">
                <span className="bg-primary-100 text-primary-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  New Feature
                </span>
                <span className="bg-success-100 text-success-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  Completed
                </span>
                <span className="bg-warning-100 text-warning-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  Pending
                </span>
                <span className="bg-danger-100 text-danger-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  Failed
                </span>
                <span className="bg-info-100 text-info-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                  Info
                </span>
              </div>
              <div className="mt-2 text-sm text-neutral-500">
                <code className="text-xs">bg-primary-100 text-primary-800</code>
              </div>
            </div>

            {/* Cards & Borders */}
            <div>
              <h3 className="mb-4 text-lg font-medium text-neutral-700">Cards & Borders</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="border-primary-200 bg-primary-50 rounded-xl border p-6">
                  <h4 className="text-primary-900 mb-2 font-semibold">Primary Card</h4>
                  <p className="text-primary-700 text-sm">
                    A card with primary theme styling, using lighter shades for background.
                  </p>
                </div>
                <div className="border-danger-200 rounded-xl border bg-white p-6 shadow-sm">
                  <h4 className="text-danger-700 mb-2 font-semibold">Error State</h4>
                  <p className="text-sm text-neutral-600">
                    Border colored with <code className="text-danger-600">border-danger-200</code>{' '}
                    to indicate errors.
                  </p>
                </div>
                <div className="border-l-info-500 rounded-xl border border-l-4 bg-white p-6 shadow-sm">
                  <h4 className="mb-2 font-semibold text-neutral-800">Info Panel</h4>
                  <p className="text-sm text-neutral-600">
                    Left border accent using{' '}
                    <code className="text-blue-600">border-l-info-500</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Typography & Links */}
            <div>
              <h3 className="mb-4 text-lg font-medium text-neutral-700">Typography</h3>
              <div className="space-y-4">
                <p className="text-neutral-600">
                  Regular text can involve links that are{' '}
                  <Link
                    className="text-primary-600 hover:text-primary-700 decoration-primary-300 font-medium underline underline-offset-4"
                    href="/"
                  >
                    styled with primary colors
                  </Link>
                  .
                </p>
                <p className="text-sm text-neutral-500">
                  Status text: <span className="text-success-600 font-medium">Order Confirmed</span>{' '}
                  • <span className="text-warning-600 font-medium">Processing</span> •{' '}
                  <span className="font-medium text-neutral-500">Cancelled</span>
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-neutral-700">Background Swatches</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-500 h-8 w-8 rounded" />
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      bg-primary-500
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary-500 h-8 w-8 rounded" />
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      bg-secondary-500
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-success-500 h-8 w-8 rounded" />
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      bg-success-500
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-warning-500 h-8 w-8 rounded" />
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      bg-warning-500
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-danger-500 h-8 w-8 rounded" />
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      bg-danger-500
                    </code>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-neutral-700">Text Swatches</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-primary-500 text-lg font-semibold">Sample Text</span>
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      text-primary-500
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-secondary-500 text-lg font-semibold">Sample Text</span>
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      text-secondary-500
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-success-500 text-lg font-semibold">Sample Text</span>
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      text-success-500
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-warning-500 text-lg font-semibold">Sample Text</span>
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      text-warning-500
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-danger-500 text-lg font-semibold">Sample Text</span>
                    <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm">
                      text-danger-500
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
