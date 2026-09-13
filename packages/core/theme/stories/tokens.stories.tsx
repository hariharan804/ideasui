import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactElement } from 'react';

const spacing: Record<string, string> = {
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
};
const borderRadius: Record<string, string> = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
};
const fontSize: Record<string, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
};
const fontFamily: Record<string, string> = {
  sans: 'Inter, sans-serif',
  mono: 'monospace',
  serif: 'serif',
};
const fontWeight: Record<string, string> = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};
const letterSpacing: Record<string, string> = { tight: '-0.025em', normal: '0', wide: '0.025em' };
const textStyles: Record<string, Record<string, string>> = {};
const lightShadow: Record<string, string> = {
  sm: '0 2px 4px rgb(0 0 0 / 0.06)',
  md: '0 4px 8px rgb(0 0 0 / 0.08)',
  lg: '0 8px 16px rgb(0 0 0 / 0.1)',
  xl: '0 16px 24px rgb(0 0 0 / 0.12)',
};
const animation: Record<string, string> = { spin: 'spin 1s linear infinite' };
const transitionDuration: Record<string, string> = {
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
};
const transitionTimingFunction: Record<string, string> = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
};
const keyframes: Record<string, Record<string, Record<string, string>>> = {
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  slideIn: {
    from: { transform: 'translateY(-8px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
};
const transition: Record<string, string> = {
  none: 'none',
  all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors:
    'color 200ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
};
const blur: Record<string, string> = { none: '0', sm: '4px', md: '8px', lg: '12px', xl: '16px' };
const backdrop: Record<string, string> = { blur: 'blur(8px)' };
const border: Record<string, string> = { thin: '1px', medium: '2px', thick: '4px' };
const borderColors: Record<string, string> = {
  base: 'var(--ideasui-color-border-base)',
  subtle: 'var(--ideasui-color-border-subtle)',
  strong: 'var(--ideasui-color-border-strong)',
  focus: 'var(--ideasui-color-border-focus)',
  danger: 'var(--ideasui-color-border-danger)',
};
const opacity: Record<string, string> = {
  none: '0',
  subtle: '0.04',
  light: '0.08',
  medium: '0.16',
  strong: '0.38',
  heavy: '0.6',
  full: '1',
};
const zIndex: Record<string, number | string> = {
  base: 0,
  dropdown: 1000,
  modal: 1200,
  tooltip: 1500,
};

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
  <div className="border-border-subtle bg-surface hover:border-border flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 hover:shadow-md">
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
  <div className="border-border-subtle bg-surface-subtle inline-block h-fit w-full break-inside-avoid overflow-hidden rounded-2xl border">
    <div className="border-border-subtle border-b px-5 py-4">
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
      <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
        <div className="border-border-subtle border-b px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Scale</h3>
        </div>
        <div className="space-y-3 p-5">
          {Object.entries(systemTokens.spacing).map(([key, value]) => (
            <div
              key={key}
              className="border-border-subtle bg-surface flex items-center gap-4 rounded-xl border p-4"
            >
              <div className="text-content-primary w-16 font-mono text-sm font-semibold">{key}</div>
              <div className="text-content-tertiary w-20 font-mono text-xs">{value}</div>
              <div className="min-w-0 flex-1">
                <div className="bg-primary h-4 max-w-full rounded-full" style={{ width: value }} />
              </div>
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
      <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
        <div className="border-border-subtle border-b px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Scale</h3>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
          {Object.entries(systemTokens.borderRadius).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="border-primary/30 bg-primary-subtle mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-xl border"
                style={{ borderRadius: value }}
              >
                <div className="bg-primary h-full w-full" style={{ borderRadius: value }} />
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

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
          <div className="border-border-subtle border-b px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Border Width Scale</h3>
          </div>
          <div className="space-y-4 p-5">
            {Object.entries(systemTokens.border).map(([key, value]) => (
              <div
                key={key}
                className="border-border-subtle bg-surface flex items-center gap-6 rounded-xl border p-5"
              >
                <div className="text-content-primary w-20 font-mono text-sm font-semibold">
                  {key}
                </div>
                <div className="flex-1">
                  <div className="bg-border-strong w-full" style={{ height: value }} />
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
            renderPreview={(value) => {
              const colorValue = value.startsWith('var(') ? `oklch(${value})` : value;

              return (
                <div
                  className="bg-surface size-8 rounded shadow-xs"
                  style={{
                    border: `2px solid ${colorValue}`,
                  }}
                />
              );
            }}
            title="Border Colors"
            tokens={borderColors}
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
      <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
        <div className="border-border-subtle border-b px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Scale</h3>
        </div>
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-3">
          {Object.entries(systemTokens.boxShadow).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="border-border-subtle bg-surface mx-auto mb-4 size-24 rounded-2xl border"
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

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
          <div className="border-border-subtle border-b px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Filter Blur Scale</h3>
          </div>
          <div className="p-5">
            <div className="grid gap-4">
              {Object.entries(systemTokens.blur).map(([key, value]) => (
                <div
                  key={key}
                  className="border-border-subtle bg-surface relative flex h-24 items-center justify-between overflow-hidden rounded-xl border"
                >
                  <div className="from-primary/30 via-secondary/20 to-tertiary/30 absolute inset-0 z-0 bg-gradient-to-r opacity-30" />
                  <div className="border-border-subtle bg-surface/80 z-10 rounded-r-lg border px-6 py-2 shadow-xs backdrop-blur-sm">
                    <div className="text-content-primary text-sm font-semibold">{key}</div>
                    <div className="text-content-tertiary font-mono text-xs">{value}</div>
                  </div>
                  <div
                    className="bg-primary z-10 mr-6 size-16 rounded-full"
                    style={{ filter: `blur(${value})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
          <div className="border-border-subtle border-b px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Backdrop Filters</h3>
          </div>
          <div className="p-5">
            <div className="grid gap-4">
              {Object.entries(systemTokens.backdrop).map(([key, value]) => (
                <div
                  key={key}
                  className="border-border-subtle bg-surface relative flex h-24 items-center justify-start overflow-hidden rounded-xl border"
                >
                  <div
                    className="absolute inset-0 z-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(oklch(var(--ideasui-color-primary) / 0.3) 2px, transparent 2px)',
                      backgroundSize: '16px 16px',
                    }}
                  />
                  <div className="from-primary/20 to-secondary/20 absolute inset-0 z-0 bg-gradient-to-r" />

                  <div
                    className="border-border-subtle bg-surface/60 relative z-10 ml-6 flex h-[70%] w-[60%] flex-col justify-center rounded-lg border px-4 font-medium shadow-xs"
                    style={{ backdropFilter: value, WebkitBackdropFilter: value }}
                  >
                    <div className="text-content-primary text-sm font-semibold">{key}</div>
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
      <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
        <div className="border-border-subtle border-b px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Scale</h3>
        </div>
        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
          {Object.entries(systemTokens.opacity).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="border-border-subtle bg-surface-muted mx-auto mb-3 flex size-20 items-center justify-center rounded-xl border">
                <div className="bg-primary size-full rounded-xl" style={{ opacity: value }} />
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

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
          <div className="border-border-subtle border-b px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Visual Stacking</h3>
          </div>
          <div aria-hidden="true" className="relative h-80 p-8">
            {Object.entries(systemTokens.zIndex)
              .filter(([key]) => key !== 'hide')
              .sort((a, b) => (a[1] as number) - (b[1] as number))
              .map(([key, value], index, array) => {
                const leftOffset = array.length > 1 ? (index * 40) / (array.length - 1) : 0;
                const topOffset = array.length > 1 ? (index * 40) / (array.length - 1) : 0;

                return (
                  <div
                    key={key}
                    aria-hidden="true"
                    className="border-border-subtle bg-surface/90 absolute flex h-20 w-28 cursor-pointer flex-col justify-center rounded-xl border p-2 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-12 hover:scale-105 sm:h-24 sm:w-40 sm:p-4"
                    style={{
                      zIndex: value as number,
                      left: `calc(10% + ${leftOffset}%)`,
                      top: `calc(10% + ${topOffset}%)`,
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="text-content-primary text-sm font-bold capitalize"
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
      <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
        <div className="border-border-subtle border-b px-5 py-4">
          <h3 className="text-content-primary text-lg font-bold">Font Families</h3>
        </div>
        <div className="space-y-4 p-5">
          {Object.entries(systemTokens.fontFamily).map(([key, value]) => (
            <div key={key} className="border-border-subtle bg-surface rounded-xl border p-5">
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

      <div className="grid items-start gap-6 lg:grid-cols-2">
        {/* Font Weights */}
        <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
          <div className="border-border-subtle border-b px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Font Weights</h3>
          </div>
          <div className="space-y-2 p-5">
            {Object.entries(systemTokens.fontWeight).map(([key, value]) => (
              <div
                key={key}
                className="border-border-subtle bg-surface flex items-center gap-4 rounded-xl border p-4"
              >
                <div className="text-content-primary w-20 font-mono text-sm font-semibold">
                  {key}
                </div>
                <div className="text-content-tertiary w-12 text-right font-mono text-xs">
                  {value}
                </div>
                <div
                  className="text-content-secondary flex-1 text-lg"
                  style={{ fontWeight: value as unknown as number }}
                >
                  Abc
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Letter Spacing */}
        <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
          <div className="border-border-subtle border-b px-5 py-4">
            <h3 className="text-content-primary text-lg font-bold">Letter Spacing</h3>
          </div>
          <div className="space-y-2 p-5">
            {Object.entries(systemTokens.letterSpacing).map(([key, value]) => (
              <div
                key={key}
                className="border-border-subtle bg-surface flex items-center gap-4 rounded-xl border p-4"
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
      <div className="border-border-subtle bg-surface-subtle overflow-hidden rounded-2xl border">
        <div className="border-border-subtle border-b px-5 py-4">
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
                className="border-border-subtle bg-surface hover:border-border flex flex-col items-start gap-4 rounded-xl border p-5 transition-colors sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="text-content-primary w-16 font-mono text-sm font-semibold">
                  {key}
                </div>
                <div className="border-border-subtle flex h-20 w-full flex-1 items-center overflow-hidden border-t pt-4 sm:h-24 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
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
                <div className="border-border-subtle text-content-tertiary w-full border-t pt-2 text-left text-xs sm:w-auto sm:min-w-24 sm:border-t-0 sm:pt-0 sm:text-right">
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

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <TokenGroup title="Transition Durations" tokens={systemTokens.transitionDuration} />
        <TokenGroup title="Easing Curves" tokens={systemTokens.transitionTimingFunction} />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-2">
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

      <div className="columns-1 gap-6 lg:columns-2 [&>*]:mb-6">
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
