import type { Meta, StoryObj } from '@storybook/react';
import { colorTokens, darkColorTokens } from '../src/tokens/colors';

const meta: Meta = {
  title: 'Theme/Colors',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({ name, value, shade }: { name: string; value: string; shade: string }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg border">
    <div 
      className="w-12 h-12 rounded-lg border shadow-sm"
      style={{ backgroundColor: value }}
    />
    <div>
      <div className="font-medium text-sm">{name}-{shade}</div>
      <div className="text-xs text-gray-500 font-mono">{value}</div>
    </div>
  </div>
);

const ColorScale = ({ colorName, colors }: { colorName: string; colors: Record<string, string> }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold capitalize">{colorName}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.entries(colors).map(([shade, value]) => (
        <ColorSwatch key={shade} name={colorName} value={value} shade={shade} />
      ))}
    </div>
  </div>
);

export const LightColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Light Theme Colors</h2>
        <p className="text-gray-600 mb-8">OKLCH color system for better perceptual uniformity</p>
      </div>
      {Object.entries(colorTokens).map(([colorName, shades]) => (
        <ColorScale key={colorName} colorName={colorName} colors={shades} />
      ))}
    </div>
  ),
};

export const DarkColors: Story = {
  render: () => (
    <div className="space-y-8 bg-gray-900 text-white p-6 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-6">Dark Theme Colors</h2>
        <p className="text-gray-300 mb-8">Optimized OKLCH colors for dark mode</p>
      </div>
      {Object.entries(darkColorTokens).map(([colorName, shades]) => (
        <ColorScale key={colorName} colorName={colorName} colors={shades} />
      ))}
    </div>
  ),
};

export const ColorComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Light vs Dark Comparison</h2>
      {Object.keys(colorTokens).map((colorName) => (
        <div key={colorName} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize">{colorName}</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Light Theme</h4>
              <div className="flex gap-1">
                {Object.entries(colorTokens[colorName as keyof typeof colorTokens]).map(([shade, value]) => (
                  <div
                    key={shade}
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: value }}
                    title={`${colorName}-${shade}: ${value}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Dark Theme</h4>
              <div className="flex gap-1">
                {Object.entries(darkColorTokens[colorName as keyof typeof darkColorTokens]).map(([shade, value]) => (
                  <div
                    key={shade}
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: value }}
                    title={`${colorName}-${shade}: ${value}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};