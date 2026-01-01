import type { Meta, StoryObj } from '@storybook/react';
import { systemTokens } from '../src/tokens/system';
import { defaultLayout } from '../src/tokens/layout';
import { colorTokens, darkColorTokens } from '../src/tokens/colors';

const meta: Meta = {
  title: 'Theme/Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const ColorPalette = ({ title, colors }: { 
  title: string; 
  colors: Record<string, Record<string, string>>;
}) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold">{title}</h3>
    {Object.entries(colors).map(([colorName, shades]) => (
      <div key={colorName} className="space-y-2">
        <h4 className="text-md font-medium capitalize">{colorName}</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(shades).map(([shade, value]) => (
            <div key={shade} className="text-center">
              <div 
                className="w-16 h-16 rounded-lg border border-gray-200 mb-2"
                style={{ backgroundColor: value }}
                title={value}
              />
              <div className="text-xs font-medium">{shade}</div>
              <div className="text-xs text-gray-500 font-mono">{value}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const TokenGroup = ({ title, tokens }: { title: string; tokens: Record<string, any> }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.entries(tokens).map(([key, value]) => (
        <div key={key} className="p-3 border rounded-lg">
          <div className="font-medium text-sm">{key}</div>
          <div className="text-xs text-gray-500 font-mono">{String(value)}</div>
        </div>
      ))}
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">Color Tokens</h2>
        <p className="text-gray-600 mb-8">Semantic color palette with OKLCH values</p>
      </div>
      <ColorPalette title="Light Mode Colors" colors={colorTokens} />
    </div>
  ),
};

export const DarkColors: Story = {
  render: () => (
    <div className="space-y-12 bg-gray-900 text-white p-8 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-4">Dark Mode Colors</h2>
        <p className="text-gray-300 mb-8">Dark theme color palette with OKLCH values</p>
      </div>
      <ColorPalette title="Dark Mode Colors" colors={darkColorTokens} />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Spacing Tokens</h2>
        <p className="text-gray-600 mb-6">Consistent spacing scale for layouts</p>
      </div>
      <div className="space-y-6">
        {Object.entries(systemTokens.spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <div className="w-16 text-sm font-mono">{key}</div>
            <div className="w-20 text-xs text-gray-500">{value}</div>
            <div 
              className="bg-blue-500 h-4"
              style={{ width: value }}
            />
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
        <h2 className="text-2xl font-bold mb-4">Border Radius Tokens</h2>
        <p className="text-gray-600 mb-6">Consistent border radius scale</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(systemTokens.borderRadius).map(([key, value]) => (
          <div key={key} className="text-center">
            <div 
              className="w-16 h-16 bg-blue-500 mx-auto mb-2"
              style={{ borderRadius: value }}
            />
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
        <h2 className="text-2xl font-bold mb-4">Typography Tokens</h2>
        <p className="text-gray-600 mb-6">Font size and line height scale</p>
      </div>
      <div className="space-y-4">
        {Object.entries(systemTokens.fontSize).map(([key, value]) => {
          const [fontSize, config] = Array.isArray(value) ? value : [value, {}];
          const lineHeight = typeof config === 'object' && config?.lineHeight ? config.lineHeight : 'normal';
          
          return (
            <div key={key} className="flex items-center gap-6 p-4 border rounded-lg">
              <div className="w-16 text-sm font-mono">{key}</div>
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
        <h2 className="text-2xl font-bold mb-4">Box Shadow Tokens</h2>
        <p className="text-gray-600 mb-6">Elevation and depth system</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(systemTokens.boxShadow).map(([key, value]) => (
          <div key={key} className="text-center">
            <div 
              className="w-24 h-24 bg-white mx-auto mb-4 rounded-lg"
              style={{ boxShadow: value }}
            />
            <div className="text-sm font-medium">{key}</div>
            <div className="text-xs text-gray-500 font-mono break-all">{value}</div>
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
        <h2 className="text-2xl font-bold mb-4">Layout Tokens</h2>
        <p className="text-gray-600 mb-6">Layout-specific design tokens</p>
      </div>
      <TokenGroup title="Border Radius" tokens={{
        small: defaultLayout.radiusSmall,
        medium: defaultLayout.radiusMedium,
        large: defaultLayout.radiusLarge,
      }} />
      <TokenGroup title="Border Width" tokens={{
        small: defaultLayout.borderWidthSmall,
        medium: defaultLayout.borderWidthMedium,
        large: defaultLayout.borderWidthLarge,
      }} />
      <TokenGroup title="Opacity" tokens={{
        hover: defaultLayout.hoverOpacity,
        disabled: defaultLayout.disabledOpacity,
      }} />
      <TokenGroup title="Focus" tokens={{
        ringWidth: defaultLayout.focusRingWidth,
        ringOffset: defaultLayout.focusRingOffset,
      }} />
    </div>
  ),
};

export const AllTokens: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">All Design Tokens</h2>
        <p className="text-gray-600 mb-8">Complete overview of the design system tokens</p>
      </div>
      
      <ColorPalette title="Colors" colors={colorTokens} />
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