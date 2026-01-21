import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';

import { useState } from 'react';

import {
  spacing,
  borderRadius,
  fontSize,
  boxShadow,
  animation,
  transitionDuration,
  transitionTimingFunction,
} from '../src/tokens';
import { defaultLayout } from '../src/tokens/layout';
import { lightColorTokens, darkColorTokens } from '../src/tokens/colors';

const systemTokens = {
  spacing,
  borderRadius,
  fontSize,
  boxShadow,
  animation,
  transitionDuration,
  transitionTimingFunction,
};

const meta: Meta = {
  title: 'Theme/Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const COPY_FEEDBACK_DELAY = 1500;

const ColorSwatch = ({
  colorName,
  shade,
  value,
}: {
  colorName: string;
  shade: string;
  value: string;
}): ReactElement => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY);
  };

  return (
    <button
      className="group flex w-full items-center gap-4 rounded-xl border border-gray-100 bg-white p-3 text-left transition-all duration-200 hover:border-gray-200 hover:shadow-md"
      type="button"
      onClick={handleCopy}
    >
      <div
        className="h-14 w-14 shrink-0 rounded-xl shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-gray-900">
          {colorName}-{shade}
        </div>
        <div className="mt-0.5 font-mono text-xs text-gray-500">{value}</div>
      </div>
      <div
        className={`shrink-0 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 transition-opacity ${
          copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </div>
    </button>
  );
};

const ColorPalette = ({
  title,
  colors,
  isDark = false,
}: {
  title: string;
  colors: Record<string, Record<string, string>>;
  isDark?: boolean;
}): ReactElement => (
  <div
    className={`overflow-hidden rounded-2xl ${
      isDark ? 'border border-white/10 bg-white/5' : 'border border-gray-100 bg-gray-50/50'
    }`}
  >
    <div
      className={`px-5 py-4 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-100'}`}
    >
      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
    </div>
    <div className="space-y-6 p-5">
      {Object.entries(colors).map(([colorName, shades]) => (
        <div key={colorName}>
          <h4
            className={`mb-3 text-sm font-semibold tracking-wider uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            {colorName}
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(shades).map(([shade, value]) => (
              <ColorSwatch key={shade} colorName={colorName} shade={shade} value={value} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

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
      <div className="mt-0.5 font-mono text-xs text-gray-500">{value}</div>
    </div>
  </div>
);

const TokenGroup = ({
  title,
  tokens,
}: {
  title: string;
  tokens: Record<string, unknown>;
}): ReactElement => (
  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
    <div className="border-b border-gray-100 px-5 py-4">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>
    <div className="grid grid-cols-1 gap-2 p-4">
      {Object.entries(tokens).map(([key, value]) => (
        <TokenCard key={key} name={key} value={String(value)} />
      ))}
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Color Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Semantic color palette with OKLCH values</p>
        <p className="mt-1 text-sm text-gray-400">Click any swatch to copy the color value</p>
      </div>
      <ColorPalette colors={lightColorTokens} title="Light Mode Colors" />
    </div>
  ),
};

export const DarkColors: Story = {
  render: () => (
    <div className="min-h-screen space-y-8 rounded-2xl bg-gray-950 p-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dark Mode Colors</h2>
        <p className="mt-2 text-lg text-gray-400">Dark theme color palette with OKLCH values</p>
        <p className="mt-1 text-sm text-gray-500">Click any swatch to copy the color value</p>
      </div>
      <ColorPalette isDark colors={darkColorTokens} title="Dark Mode Colors" />
    </div>
  ),
};

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
              <div className="w-20 text-xs text-gray-500">{value}</div>
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
                className="mx-auto mb-3 h-20 w-20 bg-blue-500 shadow-sm"
                style={{ borderRadius: value }}
              />
              <div className="text-sm font-semibold text-gray-900">{key}</div>
              <div className="mt-0.5 text-xs text-gray-500">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Typography Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Font size and line height scale</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-bold text-gray-900">Scale</h3>
        </div>
        <div className="space-y-3 p-5">
          {Object.entries(systemTokens.fontSize).map(([key, value]) => {
            const [fontSizeValue, config] = Array.isArray(value) ? value : [value, {}];
            const lineHeight =
              typeof config === 'object' && config?.lineHeight ? config.lineHeight : 'normal';

            return (
              <div
                key={key}
                className="flex items-center gap-6 rounded-xl border border-gray-100 bg-white p-5"
              >
                <div className="w-16 font-mono text-sm font-semibold text-gray-900">{key}</div>
                <div className="flex-1">
                  <div
                    className="text-gray-900"
                    style={{
                      fontSize: String(fontSizeValue),
                      lineHeight: String(lineHeight),
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <div>Size: {String(fontSizeValue)}</div>
                  <div>Line: {String(lineHeight)}</div>
                </div>
              </div>
            );
          })}
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
                className="mx-auto mb-4 h-24 w-24 rounded-2xl bg-white"
                style={{ boxShadow: value }}
              />
              <div className="text-sm font-semibold text-gray-900">{key}</div>
              <div className="mt-1 font-mono text-xs break-all text-gray-500">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Layout: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Layout Tokens</h2>
        <p className="mt-2 text-lg text-gray-600">Layout-specific design tokens</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TokenGroup
          title="Border Radius"
          tokens={{
            small: defaultLayout.radiusSmall,
            medium: defaultLayout.radiusMedium,
            large: defaultLayout.radiusLarge,
          }}
        />
        <TokenGroup
          title="Border Width"
          tokens={{
            small: defaultLayout.borderWidthSmall,
            medium: defaultLayout.borderWidthMedium,
            large: defaultLayout.borderWidthLarge,
          }}
        />
        <TokenGroup
          title="Opacity"
          tokens={{
            hover: defaultLayout.hoverOpacity,
            disabled: defaultLayout.disabledOpacity,
          }}
        />
        <TokenGroup
          title="Focus"
          tokens={{
            ringWidth: defaultLayout.focusRingWidth,
            ringOffset: defaultLayout.focusRingOffset,
          }}
        />
      </div>
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
        <TokenGroup title="Font Size" tokens={systemTokens.fontSize} />
        <TokenGroup title="Box Shadow" tokens={systemTokens.boxShadow} />
        <TokenGroup title="Animation" tokens={systemTokens.animation} />
        <TokenGroup title="Transition Duration" tokens={systemTokens.transitionDuration} />
        <TokenGroup title="Transition Timing" tokens={systemTokens.transitionTimingFunction} />
      </div>
    </div>
  ),
};
