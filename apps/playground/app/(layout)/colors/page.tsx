'use client';
import type { JSX } from 'react';

import { useState } from 'react';
import { Check, Copy, Palette } from 'lucide-react';
import Link from 'next/link';
import { primitives } from '@ideasui/theme/tokens';
import { useTheme } from '@ideasui/theme';

const COPY_TIMEOUT = 2000;
const DEFAULT_BUTTON_CLASS =
  'border-default bg-surface-base text-content-secondary hover:bg-surface-container hover:text-content-primary transition-all duration-200';
const COPIED_BUTTON_CLASS =
  'border-success-subtle bg-success-subtle text-success-800 transition-all duration-200 scale-95';

export default function ColorsPage(): JSX.Element {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const selectedTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

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
    <div className="min-h-screen transition-colors duration-500 ease-in-out">
      <div className="bg-surface-sunken text-content-primary min-h-screen p-6 pb-24">
        <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-7xl duration-700">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="from-primary-500 to-secondary-500 shadow-primary-500/20 relative rounded-2xl bg-gradient-to-tr p-3 shadow-lg">
                <Palette className="size-8 text-white" />
              </div>
              <h1 className="from-primary-600 to-secondary-600 bg-gradient-to-r bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
                Design Tokens
              </h1>
            </div>
            <p className="text-content-secondary mx-auto mb-8 max-w-2xl text-lg font-medium">
              Click any functional color block to instantly copy its Tailwind CSS class name to your
              clipboard.
            </p>
          </div>

          {/* Color Grid */}
          <div className="space-y-16">
            {colorCategories.map((category) => (
              <div
                key={category}
                className="group border-default bg-surface-base hover:border-strong rounded-3xl border p-8 shadow-sm transition-all duration-500 hover:shadow-lg"
              >
                <h2 className="text-content-primary mb-8 flex items-center gap-3 text-3xl font-bold tracking-tight capitalize">
                  <div
                    className="ring-surface-sunken size-6 rounded-full shadow-inner ring-4 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: colors[selectedTheme][category]['500'] }}
                  />
                  {category}
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 lg:grid-cols-11">
                  {Object.entries(colors[selectedTheme][category]).map(([shade, color], index) => {
                    const className = `bg-${category}-${shade}`;
                    const textClassName = `text-${category}-${shade}`;
                    const borderClassName = `border-${category}-${shade}`;

                    return (
                      <div
                        key={shade}
                        className="group/swatch animate-in fade-in zoom-in duration-500"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        {/* Color Swatch */}
                        <button
                          className="ring-default focus:bg-surface-sunken hover:ring-primary-500 focus:ring-primary-500 relative aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-sm ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/swatch:bg-black/10 dark:group-hover/swatch:bg-white/10" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/swatch:opacity-100">
                            {copiedClass === className ? (
                              <div className="scale-in bg-success-500 rounded-full p-2 shadow-lg">
                                <Check className="size-5 text-white" />
                              </div>
                            ) : (
                              <div className="bg-surface-base/80 rounded-full p-2 shadow-lg">
                                <Copy className="text-content-primary h-5 w-5" />
                              </div>
                            )}
                          </div>
                        </button>

                        {/* Shade Label */}
                        <div className="mt-3 text-center">
                          <div className="text-content-primary text-sm font-bold">{shade}</div>
                          <div className="text-content-tertiary mt-0.5 font-mono text-[10px] tracking-wider uppercase">
                            {color as string}
                          </div>
                        </div>

                        {/* Class Options */}
                        <div className="mt-3 flex h-0 flex-col justify-end space-y-1.5 overflow-hidden opacity-0 transition-all duration-300 group-hover/swatch:h-24 group-hover/swatch:opacity-100">
                          <button
                            className={`w-full rounded-md border px-2 py-1.5 font-mono text-[10px] ${
                              copiedClass === className ? COPIED_BUTTON_CLASS : DEFAULT_BUTTON_CLASS
                            }`}
                            onClick={() => {
                              void copyToClipboard(className);
                            }}
                          >
                            {copiedClass === className ? 'COPIED!' : className}
                          </button>

                          <button
                            className={`w-full rounded-md border px-2 py-1.5 font-mono text-[10px] ${
                              copiedClass === textClassName
                                ? COPIED_BUTTON_CLASS
                                : DEFAULT_BUTTON_CLASS
                            }`}
                            onClick={() => {
                              void copyToClipboard(textClassName);
                            }}
                          >
                            {copiedClass === textClassName ? 'COPIED!' : textClassName}
                          </button>

                          <button
                            className={`w-full rounded-md border px-2 py-1.5 font-mono text-[10px] ${
                              copiedClass === borderClassName
                                ? COPIED_BUTTON_CLASS
                                : DEFAULT_BUTTON_CLASS
                            }`}
                            onClick={() => {
                              void copyToClipboard(borderClassName);
                            }}
                          >
                            {copiedClass === borderClassName ? 'COPIED!' : borderClassName}
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
          <div className="border-default bg-surface-base mt-16 rounded-3xl border p-10 shadow-sm transition-colors duration-500">
            <div className="border-default mb-10 border-b pb-6">
              <h2 className="text-content-primary text-3xl font-bold tracking-tight">
                Usage Examples
              </h2>
              <p className="text-content-secondary mt-2">
                Practical demonstrations of semantic tokens in UI components.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Buttons */}
              <div className="space-y-6">
                <h3 className="text-content-primary flex items-center gap-2 text-xl font-bold">
                  <div className="bg-primary-500 h-2 w-2 rounded-full" />
                  Interactive Elements
                </h3>
                <div className="border-default bg-surface-elevated rounded-2xl border p-8">
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-primary text-on-primary hover:bg-primary-600 active:bg-primary-700 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                      Primary Action
                    </button>
                    <button className="bg-surface-container active:bg-surface-sunken border-default text-content-primary hover:bg-surface-strong rounded-xl border px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                      Secondary Action
                    </button>
                    <button className="bg-success text-on-success hover:bg-success-600 active:bg-success-700 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                      Completed
                    </button>
                    <button className="border-error-200 bg-error-subtle text-error-700 hover:bg-error-200 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200">
                      Delete Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Chips */}
              <div className="space-y-6">
                <h3 className="text-content-primary flex items-center gap-2 text-xl font-bold">
                  <div className="bg-warning-500 h-2 w-2 rounded-full" />
                  Status Indicators
                </h3>
                <div className="border-default bg-surface-elevated rounded-2xl border p-8">
                  <div className="flex flex-wrap gap-4">
                    <span className="bg-primary-subtle text-primary-700 ring-primary-200 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ring-1">
                      <div className="bg-primary-500 h-1.5 w-1.5 rounded-full" />
                      New Release
                    </span>
                    <span className="bg-success-subtle text-success-700 ring-success-200 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ring-1">
                      <div className="bg-success-500 h-1.5 w-1.5 animate-pulse rounded-full" />
                      Live Data
                    </span>
                    <span className="bg-warning-subtle text-warning-700 ring-warning-200 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ring-1">
                      <div className="bg-warning-500 h-1.5 w-1.5 rounded-full" />
                      Pending Sync
                    </span>
                    <span className="bg-error-subtle text-error-700 ring-error-200 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-sm ring-1">
                      <div className="bg-error-500 h-1.5 w-1.5 rounded-full" />
                      Critical Error
                    </span>
                  </div>
                </div>
              </div>

              {/* Cards & Surfaces */}
              <div className="space-y-6 lg:col-span-2">
                <h3 className="text-content-primary flex items-center gap-2 text-xl font-bold">
                  <div className="bg-info-500 h-2 w-2 rounded-full" />
                  Semantic Surfaces
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="border-default bg-surface-base group rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="bg-primary-subtle mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                      <div className="bg-primary-500 h-4 w-4 rounded-sm" />
                    </div>
                    <h4 className="text-content-primary mb-2 font-bold">Standard Card</h4>
                    <p className="text-content-secondary text-sm leading-relaxed">
                      Utilizes{' '}
                      <code className="bg-surface-sunken text-primary-600 rounded px-1">
                        bg-surface-base
                      </code>{' '}
                      for primary structural boundaries.
                    </p>
                  </div>

                  <div className="border-error-subtle bg-error-subtle/30 rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="bg-error-subtle ring-error-200 mb-4 flex h-10 w-10 items-center justify-center rounded-xl ring-1">
                      <div className="bg-error-500 h-4 w-4 rounded-full" />
                    </div>
                    <h4 className="text-error-700 mb-2 font-bold">Destructive Zone</h4>
                    <p className="text-content-secondary text-sm leading-relaxed">
                      Alert boxes formatted using semantic subtle error token backgrounds.
                    </p>
                  </div>

                  <div className="border-default bg-surface-elevated border-l-info-500 rounded-2xl border border-l-4 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <h4 className="text-content-primary mb-2 font-bold">Information Panel</h4>
                    <p className="text-content-secondary text-sm leading-relaxed">
                      Highlighted with{' '}
                      <code className="bg-surface-sunken text-info-600 rounded px-1">
                        border-l-info-500
                      </code>{' '}
                      accent for quick scanning.
                    </p>
                    <div className="border-default/50 mt-4 border-t pt-4">
                      <Link
                        className="text-info-600 hover:text-info-700 flex items-center gap-1 text-sm font-semibold transition-colors"
                        href="#"
                      >
                        Learn more <span className="text-lg">→</span>
                      </Link>
                    </div>
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
