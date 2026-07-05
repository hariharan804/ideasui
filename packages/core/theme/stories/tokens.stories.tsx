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
  <div className="bg-surface-DEFAULT flex items-center gap-4 rounded-xl border border-neutral-100 p-4 transition-all duration-200 hover:border-neutral-200 hover:shadow-md">
    {preview ? <div className="shrink-0">{preview}</div> : null}
    <div className="min-w-0 flex-1">
      <div className="text-content-primary text-sm font-semibold">{name}</div>
      <div className="text-content-secondary mt-0.5 font-mono text-sm break-words">{value}</div>
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
  <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
    <div className="border-b border-neutral-100 px-5 py-4">
      <h3 className="text-content-primary text-lg font-bold">{title}</h3>
    </div>
    <div className="grid grid-cols-1 gap-2 p-4">
      {Object.entries(tokens).map(([key, value]) => {
        let stringValue = '';

        if (typeof value === 'string') {
          stringValue = value;
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          stringValue = String(value);
        } else if (value && typeof value === 'object') {
          stringValue = JSON.stringify(value);
        }

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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">Spacing Tokens</h2>
        <p className="text-content-secondary mt-2 text-lg">Consistent spacing scale for layouts</p>
      </div>
      <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
        <div className="border-b border-neutral-100 px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Scale</h3>
        </div>
        <div className="space-y-3 p-5">
          {Object.entries(systemTokens.spacing).map(([key, value]) => (
            <div
              key={key}
              className="bg-surface-DEFAULT flex items-center gap-4 rounded-xl border border-neutral-100 p-4"
            >
              <div className="text-content-primary w-16 font-mono text-sm font-semibold">{key}</div>
              <div className="text-content-tertiary w-20 font-mono text-xs">{value}</div>
              <div className="bg-primary-500 h-4 rounded-full" style={{ width: value }} />
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          Border Radius Tokens
        </h2>
        <p className="text-content-secondary mt-2 text-lg">Consistent border radius scale</p>
      </div>
      <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
        <div className="border-b border-neutral-100 px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Scale</h3>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
          {Object.entries(systemTokens.borderRadius).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="border-primary-200 mx-auto mb-3 flex h-20 w-20 items-center justify-center border bg-blue-50"
                style={{ borderRadius: value }}
              >
                <div className="bg-primary-500 h-full w-full" style={{ borderRadius: value }} />
              </div>
              <div className="text-content-primary text-sm font-semibold">{key}</div>
              <div className="text-content-tertiary mt-0.5 font-mono text-xs">{value}</div>
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">Border Tokens</h2>
        <p className="text-content-secondary mt-2 text-lg">
          Border widths and semantic border colors
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
          <div className="border-b border-neutral-100 px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Border Width Scale</h3>
          </div>
          <div className="space-y-4 p-5">
            {Object.entries(systemTokens.border).map(([key, value]) => (
              <div
                key={key}
                className="bg-surface-DEFAULT flex items-center gap-6 rounded-xl border border-neutral-200 p-5"
              >
                <div className="text-content-primary w-20 font-mono text-sm font-semibold">
                  {key}
                </div>
                <div className="flex-1">
                  <div
                    className="w-full bg-neutral-200"
                    style={{ height: value, backgroundColor: 'var(--ideasui-color-neutral-300)' }}
                  />
                </div>
                <div className="text-content-tertiary w-16 text-right font-mono text-xs">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <TokenGroup
            renderPreview={(value) => (
              <div
                className="bg-surface-DEFAULT size-8 rounded shadow-sm"
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          Box Shadow Tokens
        </h2>
        <p className="text-content-secondary mt-2 text-lg">Elevation and depth system</p>
      </div>
      <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
        <div className="border-b border-neutral-100 px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Scale</h3>
        </div>
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3">
          {Object.entries(systemTokens.boxShadow).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="bg-surface-DEFAULT mx-auto mb-4 size-24 rounded-2xl border border-neutral-100/50"
                style={{ boxShadow: value }}
              />
              <div className="text-content-primary text-sm font-semibold">{key}</div>
              <div className="text-content-tertiary mt-1 px-4 font-mono text-xs break-words">
                {value}
              </div>
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          Blur & Backdrop Tokens
        </h2>
        <p className="text-content-secondary mt-2 text-lg">
          Blur radius and backdrop filter values
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
          <div className="border-b border-neutral-100 px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Filter Blur Scale</h3>
          </div>
          <div className="p-5">
            <div className="grid gap-4">
              {Object.entries(systemTokens.blur).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-surface-DEFAULT relative flex h-24 items-center justify-between overflow-hidden rounded-xl border border-neutral-200"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20" />
                  <div className="bg-surface-DEFAULT/80 z-10 rounded-r-lg border border-neutral-100 px-6 py-2 shadow-sm backdrop-blur-sm">
                    <div className="text-content-primary text-sm font-semibold">{key}</div>
                    <div className="text-content-tertiary font-mono text-xs">{value}</div>
                  </div>
                  <div
                    className="z-10 mr-6 size-16 rounded-full bg-blue-600"
                    style={{ filter: `blur(${value})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
          <div className="border-b border-neutral-100 px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Backdrop Filters</h3>
          </div>
          <div className="p-5">
            <div className="grid gap-4">
              {Object.entries(systemTokens.backdrop).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-surface-DEFAULT relative flex h-24 items-center justify-start overflow-hidden rounded-xl border border-neutral-200"
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
                    className="bg-surface-DEFAULT/40 text-content-secondary relative z-10 ml-6 flex h-[70%] w-[60%] flex-col justify-center rounded-lg border border-white/20 px-4 font-medium shadow-sm"
                    style={{ backdropFilter: value, WebkitBackdropFilter: value }}
                  >
                    <div className="text-sm font-semibold">{key}</div>
                    <div className="text-content-secondary font-mono text-xs break-words">
                      {value}
                    </div>
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">Opacity Tokens</h2>
        <p className="text-content-secondary mt-2 text-lg">
          Semantic opacity scale for overlays and states
        </p>
      </div>
      <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
        <div className="border-b border-neutral-100 px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Scale</h3>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
          {Object.entries(systemTokens.opacity).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="mx-auto mb-3 flex size-20 items-center justify-center rounded-xl border border-neutral-200 bg-[url('https://transparenttextures.com/patterns/cubes.png')]">
                <div className="size-full rounded-xl bg-blue-600" style={{ opacity: value }} />
              </div>
              <div className="text-content-primary text-sm font-semibold">{key}</div>
              <div className="text-content-tertiary mt-0.5 font-mono text-xs">{value}</div>
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">Z-Index System</h2>
        <p className="text-content-secondary mt-2 text-lg">Ordered, predictable layering</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
          <div className="border-b border-neutral-100 px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Visual Stacking</h3>
          </div>
          <div aria-hidden="true" className="relative h-80 p-8">
            {Object.entries(systemTokens.zIndex)
              .filter(([key]) => key !== 'hide')
              .sort((a, b) => (a[1] as number) - (b[1] as number))
              .map(([key, value], index, array) => {
                const leftOffset = array.length > 1 ? (index * 60) / (array.length - 1) : 0;
                const topOffset = array.length > 1 ? (index * 60) / (array.length - 1) : 0;

                return (
                  <div
                    key={key}
                    aria-hidden="true"
                    className="absolute flex h-24 w-40 cursor-pointer flex-col justify-center rounded-xl border border-white/40 p-4 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-12 hover:scale-105"
                    style={{
                      zIndex: value as number,
                      left: `calc(10% + ${leftOffset}%)`,
                      top: `calc(10% + ${topOffset}%)`,
                      backgroundColor: `hsl(${(index * 40) % 360}, 90%, 60%, 0.1)`,
                      color: 'white',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="text-content-secondary text-sm font-bold capitalize"
                    >
                      {key}
                    </div>
                    <div aria-hidden="true" className="text-content-secondary font-mono text-sm">
                      z-index: {value}
                    </div>
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          Typography System
        </h2>
        <p className="text-content-secondary mt-2 text-lg">
          Font sizes, weights, spacing, and styles
        </p>
      </div>

      {/* Font Family */}
      <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
        <div className="border-b border-neutral-100 px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Font Families</h3>
        </div>
        <div className="space-y-4 p-5">
          {Object.entries(systemTokens.fontFamily).map(([key, value]) => (
            <div key={key} className="bg-surface-DEFAULT rounded-xl border border-neutral-100 p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-content-primary font-mono text-sm font-semibold capitalize">
                  {key}
                </span>
                <span className="text-content-tertiary w-64 truncate font-mono text-xs">
                  - {value}
                </span>
              </div>
              <div className="text-content-secondary text-2xl" style={{ fontFamily: value }}>
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Font Weights */}
        <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
          <div className="border-b border-neutral-100 px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Font Weights</h3>
          </div>
          <div className="space-y-2 p-5">
            {Object.entries(systemTokens.fontWeight).map(([key, value]) => (
              <div
                key={key}
                className="bg-surface-DEFAULT flex items-center gap-4 rounded-xl border border-neutral-100 p-4"
              >
                <div className="text-content-primary w-20 font-mono text-sm font-semibold">
                  {key}
                </div>
                <div className="text-content-tertiary w-12 text-right font-mono text-xs">
                  {value}
                </div>
                <div
                  className="text-content-secondary flex-1 text-lg"
                  style={{ fontWeight: value as number }}
                >
                  Abc
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Letter Spacing */}
        <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
          <div className="border-b border-neutral-100 px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Letter Spacing</h3>
          </div>
          <div className="space-y-2 p-5">
            {Object.entries(systemTokens.letterSpacing).map(([key, value]) => (
              <div
                key={key}
                className="bg-surface-DEFAULT flex items-center gap-4 rounded-xl border border-neutral-100 p-4"
              >
                <div className="text-content-primary w-20 font-mono text-sm font-semibold">
                  {key}
                </div>
                <div className="text-content-tertiary w-16 text-right font-mono text-xs">
                  {value}
                </div>
                <div
                  className="text-content-secondary flex-1 text-lg"
                  style={{ letterSpacing: value }}
                >
                  SPACING
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Font Size Scale */}
      <div className="bg-surface-base/50 overflow-hidden rounded-2xl border border-neutral-100">
        <div className="border-b border-neutral-100 px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Font Size Scale</h3>
        </div>
        <div className="space-y-3 p-5">
          {Object.entries(systemTokens.fontSize).map(([key, value]) => {
            const [rawFontSizeValue, config] = Array.isArray(value) ? value : [value, {}];
            const fontSizeValue = typeof rawFontSizeValue === 'string' ? rawFontSizeValue : '';
            const lineHeight =
              typeof config === 'object' &&
              config &&
              'lineHeight' in config &&
              typeof config.lineHeight === 'string'
                ? config.lineHeight
                : 'normal';

            return (
              <div
                key={key}
                className="bg-surface-DEFAULT hover:border-primary-200 flex items-center gap-6 rounded-xl border border-neutral-200 p-5 transition-colors"
              >
                <div className="text-content-primary w-16 font-mono text-sm font-semibold">
                  {key}
                </div>
                <div className="flex h-24 flex-1 items-center overflow-hidden border-l border-neutral-100 pl-6">
                  <div
                    className="text-content-primary truncate"
                    style={{
                      fontSize: fontSizeValue,
                      lineHeight: lineHeight,
                    }}
                  >
                    The quick brown fox
                  </div>
                </div>
                <div className="text-content-tertiary min-w-24 text-right text-xs">
                  <div className="font-mono">size: {fontSizeValue}</div>
                  <div className="mt-1 font-mono">line: {lineHeight}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role-Based Text Styles */}
      <TokenGroup
        renderPreview={(value, key) => (
          <div className="text-content-primary w-24 font-mono text-sm font-semibold">{key}</div>
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">Motion System</h2>
        <p className="text-content-secondary mt-2 text-lg">
          Durations, easing, components, and presets
        </p>
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          All Design Tokens
        </h2>
        <p className="text-content-secondary mt-2 text-lg">
          Complete overview of the design system tokens
        </p>
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
