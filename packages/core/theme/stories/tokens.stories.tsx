import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';

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

const ColorPalette = ({
  title,
  colors,
}: {
  title: string;
  colors: Record<string, Record<string, string>>;
}): ReactElement => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">{title}</h3>
    {Object.entries(colors).map(([colorName, shades]) => (
      <div key={colorName} className="space-y-2">
        <h4 className="text-md font-medium capitalize">{colorName}</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(shades).map(([shade, value]) => (
            <div key={shade} className="text-center">
              <div
                className="mb-2 h-16 w-16 rounded-lg border border-gray-200"
                style={{ backgroundColor: value }}
                title={value}
              />
              <div className="text-xs font-medium">{shade}</div>
              <div className="font-mono text-xs text-gray-500">{value}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const TokenGroup = ({
  title,
  tokens,
}: {
  title: string;
  tokens: Record<string, unknown>;
}): ReactElement => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(tokens).map(([key, value]) => (
        <div key={key} className="rounded-lg border p-3">
          <div className="text-sm font-medium">{key}</div>
          <div className="font-mono text-xs text-gray-500">{String(value)}</div>
        </div>
      ))}
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Color Tokens</h2>
        <p className="mb-8 text-gray-600">Semantic color palette with OKLCH values</p>
      </div>
      <ColorPalette colors={lightColorTokens} title="Light Mode Colors" />
    </div>
  ),
};

export const DarkColors: Story = {
  render: () => (
    <div className="space-y-12 rounded-lg bg-gray-900 p-8 text-white">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Dark Mode Colors</h2>
        <p className="mb-8 text-gray-300">Dark theme color palette with OKLCH values</p>
      </div>
      <ColorPalette colors={darkColorTokens} title="Dark Mode Colors" />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Spacing Tokens</h2>
        <p className="mb-6 text-gray-600">Consistent spacing scale for layouts</p>
      </div>
      <div className="space-y-6">
        {Object.entries(systemTokens.spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <div className="w-16 font-mono text-sm">{key}</div>
            <div className="w-20 text-xs text-gray-500">{value}</div>
            <div className="h-4 bg-blue-500" style={{ width: value }} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Border Radius Tokens</h2>
        <p className="mb-6 text-gray-600">Consistent border radius scale</p>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {Object.entries(systemTokens.borderRadius).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="mx-auto mb-2 h-16 w-16 bg-blue-500" style={{ borderRadius: value }} />
            <div className="text-sm font-medium">{key}</div>
            <div className="text-xs text-gray-500">{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Typography Tokens</h2>
        <p className="mb-6 text-gray-600">Font size and line height scale</p>
      </div>
      <div className="space-y-4">
        {Object.entries(systemTokens.fontSize).map(([key, value]) => {
          const [fontSize, config] = Array.isArray(value) ? value : [value, {}];
          const lineHeight =
            typeof config === 'object' && config?.lineHeight ? config.lineHeight : 'normal';

          return (
            <div key={key} className="flex items-center gap-6 rounded-lg border p-4">
              <div className="w-16 font-mono text-sm">{key}</div>
              <div className="flex-1">
                <div
                  className="text-gray-900"
                  style={{ fontSize: String(fontSize), lineHeight: String(lineHeight) }}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <div>Size: {String(fontSize)}</div>
                <div>Line: {String(lineHeight)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Box Shadow Tokens</h2>
        <p className="mb-6 text-gray-600">Elevation and depth system</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Object.entries(systemTokens.boxShadow).map(([key, value]) => (
          <div key={key} className="text-center">
            <div
              className="mx-auto mb-4 h-24 w-24 rounded-lg bg-white"
              style={{ boxShadow: value }}
            />
            <div className="text-sm font-medium">{key}</div>
            <div className="font-mono text-xs break-all text-gray-500">{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Layout: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Layout Tokens</h2>
        <p className="mb-6 text-gray-600">Layout-specific design tokens</p>
      </div>
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
  ),
};

export const AllTokens: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="mb-4 text-2xl font-bold">All Design Tokens</h2>
        <p className="mb-8 text-gray-600">Complete overview of the design system tokens</p>
      </div>

      <ColorPalette colors={lightColorTokens} title="Colors" />
      <TokenGroup title="Spacing" tokens={systemTokens.spacing} />
      <TokenGroup title="Border Radius" tokens={systemTokens.borderRadius} />
      <TokenGroup title="Font Size" tokens={systemTokens.fontSize} />
      <TokenGroup title="Box Shadow" tokens={systemTokens.boxShadow} />
      <TokenGroup title="Animation" tokens={systemTokens.animation} />
      <TokenGroup title="Transition Duration" tokens={systemTokens.transitionDuration} />
      <TokenGroup title="Transition Timing" tokens={systemTokens.transitionTimingFunction} />
    </div>
  ),
};
