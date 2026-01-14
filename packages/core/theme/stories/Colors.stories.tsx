import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';

import { lightColorTokens, darkColorTokens } from '../src/tokens/colors';

const meta: Meta = {
  title: 'Theme/Colors',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({
  name,
  value,
  shade,
}: {
  name: string;
  value: string;
  shade: string;
}): ReactElement => (
  <div className="flex items-center gap-3 rounded-lg border p-2">
    <div className="h-12 w-12 rounded-lg border shadow-sm" style={{ backgroundColor: value }} />
    <div>
      <div className="text-sm font-medium">
        {name}-{shade}
      </div>
      <div className="font-mono text-xs text-gray-500">{value}</div>
    </div>
  </div>
);

const ColorScale = ({
  colorName,
  colors,
}: {
  colorName: string;
  colors: Record<string, string>;
}): ReactElement => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold capitalize">{colorName}</h3>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(colors).map(([shade, value]) => (
        <ColorSwatch key={shade} name={colorName} shade={shade} value={value} />
      ))}
    </div>
  </div>
);

export const LightColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-6 text-2xl font-bold">Light Theme Colors</h2>
        <p className="mb-8 text-gray-600">OKLCH color system for better perceptual uniformity</p>
      </div>
      {Object.entries(lightColorTokens).map(([colorName, shades]) => (
        <ColorScale key={colorName} colorName={colorName} colors={shades} />
      ))}
    </div>
  ),
};

export const DarkColors: Story = {
  render: () => (
    <div className="space-y-8 rounded-lg bg-gray-900 p-6 text-white">
      <div>
        <h2 className="mb-6 text-2xl font-bold">Dark Theme Colors</h2>
        <p className="mb-8 text-gray-300">Optimized OKLCH colors for dark mode</p>
      </div>
      {Object.entries(darkColorTokens).map(([colorName, shades]) => (
        <ColorScale key={colorName} colorName={colorName} colors={shades} />
      ))}
    </div>
  ),
};

export const ColorComparison: Story = {
  render: (): ReactElement => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Light vs Dark Comparison</h2>
      {Object.keys(lightColorTokens).map((colorName) => {
        const lightShades = lightColorTokens[colorName as keyof typeof lightColorTokens];
        const darkShades = darkColorTokens[colorName as keyof typeof darkColorTokens];

        return (
          <div key={colorName} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{colorName}</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3 text-sm font-medium">Light Theme</h4>
                <div className="flex gap-1">
                  {Object.entries(lightShades).map(([shade, value]) => (
                    <div
                      key={shade}
                      className="h-8 w-8 rounded border"
                      style={{ backgroundColor: value }}
                      title={`${colorName}-${shade}: ${value}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium">Dark Theme</h4>
                <div className="flex gap-1">
                  {Object.entries(darkShades).map(([shade, value]) => (
                    <div
                      key={shade}
                      className="h-8 w-8 rounded border"
                      style={{ backgroundColor: value }}
                      title={`${colorName}-${shade}: ${value}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ),
};
