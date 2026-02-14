'use client';

import type { JSX } from 'react';

import {
  lightColorTokens,
  spacing,
  borderRadius,
  boxShadow,
  fontSize,
  duration,
  easing,
  font,
  blur,
  opacity,
} from '@ideasui/theme';
import { motion } from 'framer-motion';

// Helper to force Tailwind to detect classes (Safelist hack for playground)
// In a real app, you wouldn't do this dynamic generation without safelisting.
// For the purpose of this showcase, we assume the user understands dynamic class limitations
// or has configured safelisting.

export default function TokensPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-16">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Design Tokens</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Comprehensive guide to the IdeasUI design system tokens.
          </p>
        </div>

        {/* Colors */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Colors</h2>

          <div className="space-y-8">
            {/* Semantic Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Semantic Palette
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {[
                  'primary',
                  'secondary',
                  'tertiary',
                  'success',
                  'warning',
                  'danger',
                  'info',
                  'neutral',
                  'gray',
                ].map((color) => (
                  <div key={color} className="space-y-2">
                    <div
                      className={`h-16 w-full rounded-lg bg-${color} border border-gray-200 shadow-sm dark:border-gray-800`}
                    />
                    <div className="text-xs">
                      <p className="font-medium text-gray-900 capitalize dark:text-gray-100">
                        {color}
                      </p>
                      <p className="font-mono text-[10px] text-gray-500">bg-{color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Base Scales */}
            {Object.entries(lightColorTokens).map(([colorName, shades]) => (
              <div key={colorName} className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900 capitalize dark:text-white">
                  {colorName}
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11">
                  {Object.keys(shades).map((shade) => (
                    <div key={shade} className="space-y-1.5">
                      <div
                        className={`h-12 w-full rounded-md shadow-sm ring-1 ring-black/5 bg-${colorName}-${shade}`}
                      />
                      <div className="text-xs">
                        <span className="block font-medium text-gray-700 dark:text-gray-300">
                          {shade}
                        </span>
                        <span className="block font-mono text-[10px] text-gray-500">
                          {colorName}-{shade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Typography</h2>

          {/* Font Family */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Font Family</h3>
            <div className="grid gap-6">
              {Object.entries(font).map(([name, value]) => (
                <div key={name} className="space-y-2">
                  <div className="text-sm text-gray-500 capitalize">{name}</div>
                  <div className={`truncate text-3xl text-gray-900 dark:text-white font-${name}`}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <div className="truncate font-mono text-xs text-gray-400">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Font Size</h3>
            <div className="space-y-6">
              {Object.entries(fontSize).map(([name, [size]]) => (
                <div
                  key={name}
                  className="flex items-baseline gap-8 border-b border-gray-100 pb-4 last:border-0 dark:border-gray-800"
                >
                  <div className="w-32 flex-shrink-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      text-{name}
                    </p>
                    <p className="text-xs text-gray-500">{size}</p>
                  </div>
                  <div className={`truncate text-gray-900 dark:text-white text-${name}`}>Ag</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Spacing</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(spacing)
              .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
              .map(([name]) => (
                <div key={name} className="flex flex-col items-center gap-1">
                  <div className={`bg-primary-500 h-8 rounded-sm w-${name.replace('.', '\\.')}`} />
                  <div className="w-full text-center font-mono text-[10px] text-gray-500">
                    {name}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Layout & Effects */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Border Radius */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Border Radius</h2>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(borderRadius).map(([name, value]) => (
                <div key={name} className="flex flex-col items-center gap-3">
                  <div
                    className={`bg-primary-100 dark:bg-primary-900 border-primary-500 flex h-24 w-24 items-center justify-center border-2 shadow-sm rounded-${name}`}
                  >
                    <span className="font-mono text-xs">{value}</span>
                  </div>
                  <span className="text-sm font-medium">rounded-{name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Shadows */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Shadows</h2>
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(boxShadow).map(([name]) => (
                <div key={name} className="flex flex-col items-center gap-3">
                  <div
                    className={`flex h-24 w-24 items-center justify-center rounded-lg bg-white p-2 text-center font-mono text-xs dark:bg-gray-800 shadow-${name}`}
                  >
                    shadow-{name}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Opacity & Blur */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Opacity</h2>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(opacity).map(([name]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className={`bg-primary-500 h-16 w-16 rounded-lg opacity-${name}`} />
                  <span className="font-mono text-xs">op-{name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Blur</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(blur).map(([name]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="from-primary-500 to-secondary-500 relative h-16 w-16 overflow-hidden rounded-lg bg-gradient-to-br">
                    <div className={`absolute inset-0 bg-white/20 backdrop-blur-${name}`} />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
                      TXT
                    </div>
                  </div>
                  <span className="font-mono text-xs">blur-{name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Motion */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Motion</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <h3 className="font-medium">Durations</h3>
              <div className="space-y-2">
                {Object.entries(duration)
                  .sort((a, b) => parseInt(a[1]) - parseInt(b[1]))
                  .map(([name, value]) => (
                    <div key={name} className="group cursor-pointer">
                      <div className="mb-1 flex justify-between text-xs">
                        <span>{name}</span>
                        <span className="font-mono">{value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className={`bg-primary-500 h-full w-0 transition-all ease-linear group-hover:w-full duration-${name}`}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Easings</h3>
              <div className="grid gap-4">
                {Object.entries(easing).map(([name]) => (
                  <div key={name} className="group space-y-2">
                    <div className="text-xs">{name}</div>
                    <div className="relative h-12 overflow-hidden rounded-md border bg-gray-50 dark:bg-gray-900">
                      <div
                        className={`bg-secondary-500 absolute top-1 bottom-1 left-1 w-2 rounded-full transition-all duration-1000 group-hover:left-[calc(100%-0.75rem)] ease-${name}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Framer Motion Integration</h3>
              <div className="flex h-48 items-center justify-center rounded-xl border p-6">
                <motion.div
                  className="bg-tertiary-500 h-16 w-16 cursor-pointer rounded-xl shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                />
              </div>
              <p className="text-xs text-gray-500">Hover and tap the box above</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
