import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactElement } from 'react';

import { useState } from 'react';

import { primitives, semantic, surface, content } from '../src/tokens';

const meta: Meta = {
  title: 'Theme/Colors',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const COPY_FEEDBACK_DELAY = 1500;

const ColorSwatch = ({
  name,
  value,
  shade,
  isDark = false,
}: {
  name: string;
  value: string;
  shade: string;
  isDark?: boolean;
}): ReactElement => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY);
  };

  return (
    <button
      className={`group flex w-full items-center gap-4 rounded-xl p-3 text-left transition-all duration-200 ${
        isDark
          ? 'border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
          : 'border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
      }`}
      type="button"
      onClick={handleCopy}
    >
      <div
        className="size-14 shrink-0 rounded-xl shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: value.includes('var(') ? `oklch(${value})` : value }}
      />
      <div className="min-w-0 flex-1">
        <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-content-primary'}`}>
          {name}-{shade}
        </div>
        <div
          className={`mt-0.5 font-mono text-xs ${isDark ? 'text-neutral-200' : 'text-content-secondary'}`}
        >
          {value}
        </div>
      </div>
      <div
        className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium transition-opacity ${
          copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        } ${isDark ? 'bg-surface/10 text-white' : 'bg-surface-sunken text-content-tertiary'}`}
      >
        {copied ? '✓ Copied' : 'Click to copy'}
      </div>
    </button>
  );
};

const ColorScale = ({
  colorName,
  colors,
  isDark = false,
}: {
  colorName: string;
  colors: Record<string, string>;
  isDark?: boolean;
}): ReactElement => (
  <div
    className={`overflow-hidden rounded-2xl ${
      isDark ? 'border border-white/10 bg-white/5' : 'border border-gray-100 bg-gray-50/50'
    }`}
  >
    <div
      className={`px-5 py-4 ${isDark ? 'border-b border-white/10' : 'border-b border-neutral-100'}`}
    >
      <h3
        className={`text-lg font-bold capitalize ${isDark ? 'text-white' : 'text-content-primary'}`}
      >
        {colorName}
      </h3>
    </div>
    <div className="grid grid-cols-1 gap-2 p-4">
      {Object.entries(colors).map(([shade, value]) => (
        <ColorSwatch key={shade} isDark={isDark} name={colorName} shade={shade} value={value} />
      ))}
    </div>
  </div>
);

const SemanticTokenCard = ({
  name,
  role,
  value,
  isDark = false,
}: {
  name: string;
  role: string;
  value: string;
  isDark?: boolean;
}): ReactElement => (
  <div
    className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
      isDark
        ? 'border-white/10 bg-white/5 hover:border-white/20'
        : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
    }`}
  >
    <div
      className="size-12 shrink-0 rounded-xl shadow-sm ring-1 ring-black/5"
      style={{ backgroundColor: value.includes('var(') ? `oklch(${value})` : value }}
    />
    <div className="min-w-0 flex-1">
      <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-content-primary'}`}>
        {name}.{role}
      </div>
      <div
        className={`mt-0.5 font-mono text-xs ${isDark ? 'text-neutral-400' : 'text-content-secondary'}`}
      >
        {value}
      </div>
    </div>
  </div>
);

const SurfaceCard = ({
  name,
  value,
  description,
  isDark = false,
}: {
  name: string;
  value: string;
  description?: string;
  isDark?: boolean;
}): ReactElement => (
  <div
    className={`flex items-center gap-4 rounded-xl border p-4 ${
      isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white'
    }`}
  >
    <div
      className="size-12 shrink-0 rounded-xl ring-1 ring-black/10"
      style={{ backgroundColor: value.includes('var(') ? `oklch(${value})` : value }}
    />
    <div className="min-w-0 flex-1">
      <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-content-primary'}`}>
        {name}
      </div>
      <div
        className={`font-mono text-xs ${isDark ? 'text-neutral-400' : 'text-content-secondary'}`}
      >
        {value}
      </div>
      {description ? (
        <div className={`mt-0.5 text-xs ${isDark ? 'text-neutral-500' : 'text-content-tertiary'}`}>
          {description}
        </div>
      ) : null}
    </div>
  </div>
);

export const LightColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          Light Theme Colors
        </h2>
        <p className="text-content-secondary mt-2 text-lg">
          OKLCH color system for better perceptual uniformity
        </p>
        <p className="text-content-tertiary mt-1 text-sm">
          Click any swatch to copy the color value
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {Object.entries(primitives.light).map(([colorName, shades]) => (
          <ColorScale key={colorName} colorName={colorName} colors={shades} />
        ))}
      </div>
    </div>
  ),
};

export const DarkColors: Story = {
  render: () => (
    <div className="min-h-screen space-y-8 rounded-2xl bg-neutral-950 p-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dark Theme Colors</h2>
        <p className="mt-2 text-lg text-neutral-100">Optimized OKLCH colors for dark mode</p>
        <p className="mt-1 text-sm text-neutral-200">Click any swatch to copy the color value</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {Object.entries(primitives.dark).map(([colorName, shades]) => (
          <ColorScale key={colorName} isDark colorName={colorName} colors={shades} />
        ))}
      </div>
    </div>
  ),
};

export const ColorComparison: Story = {
  render: (): ReactElement => (
    <div className="space-y-10">
      <div className="mb-10">
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          Light vs Dark Comparison
        </h2>
        <p className="text-content-secondary mt-2 text-lg">
          Side-by-side color palette comparison across themes
        </p>
      </div>
      {Object.keys(primitives.light).map((colorName) => {
        const lightShades = primitives.light[colorName as keyof typeof primitives.light];
        const darkShades = primitives.dark[colorName as keyof typeof primitives.dark];

        return (
          <div
            key={colorName}
            className="bg-background overflow-hidden rounded-2xl border border-neutral-100"
          >
            <div className="border-b border-neutral-100 px-6 py-4">
              <h3 className="text-content-primary text-xl font-bold capitalize">{colorName}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-b border-neutral-100 p-6 md:border-r md:border-b-0">
                <h4 className="text-content-tertiary mb-4 text-sm font-semibold tracking-wider uppercase">
                  Light Theme
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(lightShades).map(([shade, value]) => (
                    <div
                      key={shade}
                      className="group relative size-12 cursor-pointer rounded-xl shadow-sm ring-1 ring-black/5 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: value.includes('var(') ? `oklch(${value})` : value,
                      }}
                      title={`${colorName}-${shade}: ${value}`}
                    >
                      <span className="text-content-tertiary absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                        {shade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-neutral-950 p-6">
                <h4 className="mb-4 text-sm font-semibold tracking-wider text-neutral-100 uppercase">
                  Dark Theme
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(darkShades).map(([shade, value]) => (
                    <div
                      key={shade}
                      className="group relative size-12 cursor-pointer rounded-xl shadow-sm ring-1 ring-white/10 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: value.includes('var(') ? `oklch(${value})` : value,
                      }}
                      title={`${colorName}-${shade}: ${value}`}
                    >
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100">
                        {shade}
                      </span>
                    </div>
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

export const SemanticColors: Story = {
  render: (): ReactElement => {
    const groups = [
      'primary',
      'secondary',
      'tertiary',
      'success',
      'warning',
      'error',
      'info',
      'neutral',
    ];

    const groupedSemantic: Record<string, Record<string, string>> = {};

    for (const group of groups) {
      groupedSemantic[group] = {};
    }

    for (const [key, value] of Object.entries(semantic)) {
      const group = groups.find((g) => key.includes(g));

      if (group) {
        let role: string;

        if (key === group) {
          role = 'solid';
        } else if (key === `on-${group}`) {
          role = 'on-solid';
        } else {
          role = key.replace(`${group}-`, '').replace(`on-${group}-`, 'on-');
        }

        groupedSemantic[group][role] = value;
      }
    }

    return (
      <div className="space-y-8">
        <div className="mb-10">
          <h2 className="text-content-primary text-3xl font-bold tracking-tight">
            Semantic Color Tokens
          </h2>
          <p className="text-content-secondary mt-2 text-lg">
            Role-based color mappings: solid, on-solid, soft, on-soft, subtle, on-subtle
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {Object.entries(groupedSemantic).map(([groupName, roles]) => (
            <div
              key={groupName}
              className="bg-surface-muted overflow-hidden rounded-2xl border border-neutral-100"
            >
              <div className="border-b border-neutral-100 px-5 py-4">
                <h3 className="text-content-primary text-lg font-bold capitalize">{groupName}</h3>
              </div>
              <div className="grid grid-cols-1 gap-2 p-4">
                {Object.entries(roles).map(([role, value]) => (
                  <SemanticTokenCard key={role} name={groupName} role={role} value={value} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const SurfaceTokens: Story = {
  render: (): ReactElement => (
    <div className="space-y-10">
      <div className="mb-10">
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">Surface Tokens</h2>
        <p className="text-content-secondary mt-2 text-lg">
          Background surfaces for layouts, containers, and overlays
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-surface-muted overflow-hidden rounded-2xl border border-neutral-100">
          <div className="grid grid-cols-1 gap-2 p-4">
            {Object.entries(surface).map(([key, value]) => (
              <SurfaceCard key={key} name={key} value={value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ContentTokens: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
  render: (): ReactElement => (
    <div className="space-y-10">
      <div className="mb-10">
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">Content Tokens</h2>
        <p className="text-content-secondary mt-2 text-lg">
          Text color hierarchy for primary, secondary, muted, and disabled states
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-surface-muted overflow-hidden rounded-2xl border border-neutral-100">
          <div className="space-y-3 p-5">
            {Object.entries(content).map(([key, value]) => (
              <div
                key={key}
                className="bg-surface flex items-center gap-4 rounded-xl border border-neutral-100 p-4"
              >
                <div className="flex-1">
                  <div
                    className="text-lg font-medium"
                    style={{ color: value.includes('var(') ? `oklch(${value})` : value }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-content-primary text-sm font-semibold">{key}</div>
                  <div className="text-content-secondary mt-0.5 font-mono text-xs">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};
