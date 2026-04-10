import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactElement } from 'react';

import {
  spacing,
  borderRadius,
  fontSize,
  fontFamily,
  fontWeight,
  letterSpacing,
  textStyles,
  lightShadow,
  animation,
  duration as transitionDuration,
  easing as transitionTimingFunction,
  keyframes,
  transition,
  blur,
  backdrop,
  border,
  borderColor,
  opacity,
  zIndex,
} from '../src/tokens';

const systemTokens = {
  spacing,
  borderRadius,
  fontSize,
  fontFamily,
  fontWeight,
  letterSpacing,
  textStyles,
  boxShadow: lightShadow,
  animation,
  transitionDuration,
  transitionTimingFunction,
  keyframes,
  transition,
  blur,
  backdrop,
  border,
  opacity,
  zIndex,
};

const meta: Meta = {
  title: 'Theme/Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const TokenCard = ({
  name,
  value,
  preview,
}: {
  name: string;
  value: string;
  preview?: ReactElement;
}): ReactElement => (
  <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-gray-200 hover:shadow-md">
    {preview ? <div className="shrink-0">{preview}</div> : null}
    <div className="min-w-0 flex-1">
      <div className="text-sm font-semibold text-gray-900">{name}</div>
      <div className="mt-0.5 font-mono text-xs break-words text-gray-500">{value}</div>
    </div>
  </div>
);

const TokenGroup = ({
  title,
  tokens,
  renderPreview,
}: {
  title: string;
  tokens: Record<string, unknown>;
  renderPreview?: (value: string, key: string) => ReactElement;
}): ReactElement => (
  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
    <div className="border-b border-gray-100 px-5 py-4">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>
    <div className="grid grid-cols-1 gap-2 p-4">
      {Object.entries(tokens).map(([key, value]) => {
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

        return (
          <TokenCard
            key={key}
            name={key}
            preview={renderPreview ? renderPreview(stringValue, key) : undefined}
            value={stringValue}
          />
        );
      })}
    </div>
  </div>
);

export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Spacing Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Consistent spacing scale for layouts</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Scale</h3>
        </div>
        <div className="space-y-3 p-5">
          {Object.entries(systemTokens.spacing).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
            >
              <div className="w-16 font-mono text-sm font-semibold text-gray-900">{key}</div>
              <div className="w-20 font-mono text-xs text-gray-500">{value}</div>
              <div className="h-4 rounded-full bg-blue-500" style={{ width: value }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Border Radius Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Consistent border radius scale</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Scale</h3>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
          {Object.entries(systemTokens.borderRadius).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="mx-auto mb-3 flex h-20 w-20 items-center justify-center border border-blue-200 bg-blue-50"
                style={{ borderRadius: value }}
              >
                <div className="h-full w-full bg-blue-500" style={{ borderRadius: value }} />
              </div>
              <div className="text-sm font-semibold text-gray-900">{key}</div>
              <div className="mt-0.5 font-mono text-xs text-gray-500">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Borders: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Border Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Border widths and semantic border colors</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          <div className="border-b border-gray-100 px-5 py-4">
            <h3 className="text-lg font-bold text-gray-900">Border Width Scale</h3>
          </div>
          <div className="space-y-4 p-5">
            {Object.entries(systemTokens.border).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white p-5"
              >
                <div className="w-20 font-mono text-sm font-semibold text-gray-900">{key}</div>
                <div className="flex-1">
                  <div
                    className="w-full bg-gray-200"
                    style={{ height: value, backgroundColor: 'var(--ideasui-color-neutral-300)' }}
                  />
                </div>
                <div className="w-16 text-right font-mono text-xs text-gray-500">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <TokenGroup
            renderPreview={(value) => (
              <div
                className="h-8 w-8 rounded bg-white shadow-sm"
                style={{ border: `2px solid ${value}` }}
              />
            )}
            title="Border Colors"
            tokens={borderColor}
          />
        </div>
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Box Shadow Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Elevation and depth system</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Scale</h3>
        </div>
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3">
          {Object.entries(systemTokens.boxShadow).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="mx-auto mb-4 h-24 w-24 rounded-2xl border border-gray-100/50 bg-white"
                style={{ boxShadow: value }}
              />
              <div className="text-sm font-semibold text-gray-900">{key}</div>
              <div className="mt-1 px-4 font-mono text-xs break-words text-gray-500">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Blur: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Blur & Backdrop Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Blur radius and backdrop filter values</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          <div className="border-b border-gray-100 px-5 py-4">
            <h3 className="text-lg font-bold text-gray-900">Filter Blur Scale</h3>
          </div>
          <div className="p-5">
            <div className="grid gap-4">
              {Object.entries(systemTokens.blur).map(([key, value]) => (
                <div
                  key={key}
                  className="relative flex h-24 items-center justify-between overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20" />
                  <div className="z-10 rounded-r-lg border border-gray-100 bg-white/80 px-6 py-2 shadow-sm backdrop-blur-sm">
                    <div className="text-sm font-semibold text-gray-900">{key}</div>
                    <div className="font-mono text-xs text-gray-500">{value}</div>
                  </div>
                  <div
                    className="z-10 mr-6 h-16 w-16 rounded-full bg-blue-600"
                    style={{ filter: `blur(${value})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          <div className="border-b border-gray-100 px-5 py-4">
            <h3 className="text-lg font-bold text-gray-900">Backdrop Filters</h3>
          </div>
          <div className="p-5">
            <div className="grid gap-4">
              {Object.entries(systemTokens.backdrop).map(([key, value]) => (
                <div
                  key={key}
                  className="relative flex h-24 items-center justify-start overflow-hidden rounded-xl border border-gray-200 bg-white"
                >
                  {/* Background pattern */}
                  <div
                    className="absolute inset-0 z-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(var(--ideasui-color-primary-300) 2px, transparent 2px)',
                      backgroundSize: '16px 16px',
                    }}
                  />
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />

                  {/* Backdrop element */}
                  <div
                    className="relative z-10 ml-6 flex h-[70%] w-[60%] flex-col justify-center rounded-lg border border-white/20 bg-white/40 px-4 font-medium text-gray-800 shadow-sm"
                    style={{ backdropFilter: value, WebkitBackdropFilter: value }}
                  >
                    <div className="text-sm font-semibold">{key}</div>
                    <div className="font-mono text-xs break-words opacity-70">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Opacity: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Opacity Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Semantic opacity scale for overlays and states</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Scale</h3>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
          {Object.entries(systemTokens.opacity).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-xl border border-gray-200 bg-[url('https://transparenttextures.com/patterns/cubes.png')]">
                <div className="h-full w-full rounded-xl bg-blue-600" style={{ opacity: value }} />
              </div>
              <div className="text-sm font-semibold text-gray-900">{key}</div>
              <div className="mt-0.5 font-mono text-xs text-gray-500">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const ZIndex: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Z-Index System</h2>
        <p className="mt-2 text-lg text-gray-600">Ordered, predictable layering</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          <div className="border-b border-gray-100 px-5 py-4">
            <h3 className="text-lg font-bold text-gray-900">Visual Stacking</h3>
          </div>
          <div className="relative h-80 p-8">
            {Object.entries(systemTokens.zIndex)
              .filter(([key]) => key !== 'hide')
              .sort((a, b) => (a[1] as number) - (b[1] as number))
              .map(([key, value], index, array) => {
                // Ensure array length > 1 before using it in division, otherwise default to 0
                const leftOffset = array.length > 1 ? (index * 60) / (array.length - 1) : 0;
                const topOffset = array.length > 1 ? (index * 60) / (array.length - 1) : 0;

                return (
                  <div
                    key={key}
                    className="absolute flex h-24 w-40 cursor-pointer flex-col justify-center rounded-xl border border-white/40 p-4 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-2 hover:scale-105"
                    style={{
                      zIndex: value as number,
                      left: `calc(10% + ${leftOffset}%)`,
                      top: `calc(10% + ${topOffset}%)`,
                      backgroundColor: `hsl(${(index * 40) % 360}, 70%, 50%, 0.9)`,
                      color: 'white',
                    }}
                  >
                    <div className="text-sm font-bold capitalize">{key}</div>
                    <div className="font-mono text-xs opacity-80">z-index: {value}</div>
                  </div>
                );
              })}
          </div>
        </div>

        <TokenGroup title="Z-Index Values" tokens={systemTokens.zIndex} />
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Typography System</h2>
        <p className="mt-2 text-lg text-gray-600">Font sizes, weights, spacing, and styles</p>
      </div>

      {/* Font Family */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Font Families</h3>
        </div>
        <div className="space-y-4 p-5">
          {Object.entries(systemTokens.fontFamily).map(([key, value]) => (
            <div key={key} className="rounded-xl border border-gray-100 bg-white p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-gray-900 capitalize">
                  {key}
                </span>
                <span className="w-64 truncate font-mono text-xs text-gray-400">- {value}</span>
              </div>
              <div className="text-2xl text-gray-800" style={{ fontFamily: value }}>
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Font Weights */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          <div className="border-b border-gray-100 px-5 py-4">
            <h3 className="text-lg font-bold text-gray-900">Font Weights</h3>
          </div>
          <div className="space-y-2 p-5">
            {Object.entries(systemTokens.fontWeight).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
              >
                <div className="w-20 font-mono text-sm font-semibold text-gray-900">{key}</div>
                <div className="w-12 text-right font-mono text-xs text-gray-500">{value}</div>
                <div
                  className="flex-1 text-lg text-gray-800"
                  style={{ fontWeight: value as number }}
                >
                  Abc
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Letter Spacing */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          <div className="border-b border-gray-100 px-5 py-4">
            <h3 className="text-lg font-bold text-gray-900">Letter Spacing</h3>
          </div>
          <div className="space-y-2 p-5">
            {Object.entries(systemTokens.letterSpacing).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
              >
                <div className="w-20 font-mono text-sm font-semibold text-gray-900">{key}</div>
                <div className="w-16 text-right font-mono text-xs text-gray-500">{value}</div>
                <div className="flex-1 text-lg text-gray-800" style={{ letterSpacing: value }}>
                  SPACING
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Font Size Scale */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Font Size Scale</h3>
        </div>
        <div className="space-y-3 p-5">
          {Object.entries(systemTokens.fontSize).map(([key, value]) => {
            const [fontSizeValue, config] = Array.isArray(value) ? value : [value, {}];
            const lineHeight =
              typeof config === 'object' && config?.lineHeight ? config.lineHeight : 'normal';

            return (
              <div
                key={key}
                className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white p-5 transition-colors hover:border-blue-200"
              >
                <div className="w-16 font-mono text-sm font-semibold text-gray-900">{key}</div>
                <div className="flex h-24 flex-1 items-center overflow-hidden border-l border-gray-100 pl-6">
                  <div
                    className="truncate text-gray-900"
                    style={{
                      fontSize: String(fontSizeValue),
                      lineHeight: String(lineHeight),
                    }}
                  >
                    The quick brown fox
                  </div>
                </div>
                <div className="min-w-24 text-right text-xs text-gray-500">
                  <div className="font-mono">size: {String(fontSizeValue)}</div>
                  <div className="mt-1 font-mono">line: {String(lineHeight)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role-Based Text Styles */}
      <TokenGroup
        renderPreview={(value, key) => (
          <div className="w-24 font-mono text-sm font-semibold text-gray-900">{key}</div>
        )}
        title="Role-Based Text Styles"
        tokens={systemTokens.textStyles}
      />
    </div>
  ),
};

export const Motion: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Motion System</h2>
        <p className="mt-2 text-lg text-gray-600">Durations, easing, components, and presets</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TokenGroup title="Transition Durations" tokens={systemTokens.transitionDuration} />
        <TokenGroup title="Easing Curves" tokens={systemTokens.transitionTimingFunction} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TokenGroup title="Transition Presets" tokens={systemTokens.transition} />
        <TokenGroup title="Animation Classes" tokens={systemTokens.animation} />
      </div>

      <TokenGroup title="Keyframes" tokens={systemTokens.keyframes} />
    </div>
  ),
};

export const AllTokens: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">All Design Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Complete overview of the design system tokens</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TokenGroup title="Spacing" tokens={systemTokens.spacing} />
        <TokenGroup title="Border Radius" tokens={systemTokens.borderRadius} />
        <TokenGroup title="Border Widths" tokens={systemTokens.border} />
        <TokenGroup title="Opacity Options" tokens={systemTokens.opacity} />
        <TokenGroup title="Z-Index Scale" tokens={systemTokens.zIndex} />
        <TokenGroup title="Blur Definitions" tokens={systemTokens.blur} />
        <TokenGroup title="Backdrop Definitions" tokens={systemTokens.backdrop} />
        <TokenGroup title="Font Size" tokens={systemTokens.fontSize} />
        <TokenGroup title="Font Families" tokens={systemTokens.fontFamily} />
        <TokenGroup title="Font Weights" tokens={systemTokens.fontWeight} />
        <TokenGroup title="Box Shadow" tokens={systemTokens.boxShadow} />
        <TokenGroup title="Animation Types" tokens={systemTokens.animation} />
        <TokenGroup title="Transition Duration" tokens={systemTokens.transitionDuration} />
        <TokenGroup title="Transition Timing" tokens={systemTokens.transitionTimingFunction} />
        <TokenGroup title="Transition Presets" tokens={systemTokens.transition} />
      </div>
    </div>
  ),
};
