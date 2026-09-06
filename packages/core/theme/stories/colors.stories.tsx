import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactElement } from 'react';

import { useState } from 'react';

const colors = {
  light: {
    primary: '0.575 0.214 277.1',
    secondary: '0.535 0.205 292.7',
    success: '0.535 0.165 142.5',
    warning: '0.535 0.165 65.0',
    danger: '0.530 0.185 25.3',
    info: '0.510 0.126 215.2',
  },
  dark: {
    primary: '0.620 0.214 277.1',
    secondary: '0.620 0.205 292.7',
    success: '0.590 0.165 142.5',
    warning: '0.590 0.165 65.0',
    danger: '0.605 0.175 25.3',
    info: '0.590 0.126 215.2',
  },
};

const semantic: Record<string, string> = {
  primary: 'var(--ideasui-color-primary)',
  secondary: 'var(--ideasui-color-secondary)',
  success: 'var(--ideasui-color-success)',
  warning: 'var(--ideasui-color-warning)',
  danger: 'var(--ideasui-color-danger)',
  info: 'var(--ideasui-color-info)',
};

const surface: Record<string, string> = {
  surface: 'var(--ideasui-color-surface)',
  'surface-subtle': 'var(--ideasui-color-surface-subtle)',
  'surface-muted': 'var(--ideasui-color-surface-muted)',
  'surface-strong': 'var(--ideasui-color-surface-strong)',
  'surface-inverse': 'var(--ideasui-color-surface-inverse)',
};

const content: Record<string, string> = {
  primary: 'var(--ideasui-color-content-primary)',
  secondary: 'var(--ideasui-color-content-secondary)',
  tertiary: 'var(--ideasui-color-content-tertiary)',
  muted: 'var(--ideasui-color-content-muted)',
  disabled: 'var(--ideasui-color-content-disabled)',
  inverse: 'var(--ideasui-color-content-inverse)',
};

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
  isDark = false,
}: {
  name: string;
  value: string;
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
          {name}
        </div>
        <div
          className={`mt-0.5 font-mono text-xs ${isDark ? 'text-neutral-200' : 'text-content-secondary'}`}
        >
          {typeof value === 'string' ? value : JSON.stringify(value)}
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
  colorMap,
  isDark = false,
}: {
  colorName: string;
  colorMap: Record<string, string>;
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
      {Object.entries(colorMap).map(([token, val]) => (
        <ColorSwatch
          key={token}
          isDark={isDark}
          name={token}
          value={typeof val === 'string' ? val : JSON.stringify(val)}
        />
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
          Semantic color system defined directly in OKLCH
        </p>
        <p className="text-content-tertiary mt-1 text-sm">
          Click any swatch to copy the color value
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <ColorScale
          colorMap={colors.light as unknown as Record<string, string>}
          colorName="Semantic Light Tokens"
        />
      </div>
    </div>
  ),
};

export const DarkColors: Story = {
  render: () => (
    <div className="bg-surface min-h-screen space-y-8 rounded-2xl p-8">
      <div className="mb-10">
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          Dark Theme Colors
        </h2>
        <p className="text-content-secondary mt-2 text-lg">
          Optimized semantic OKLCH colors for dark mode
        </p>
        <p className="text-content-tertiary mt-1 text-sm">
          Click any swatch to copy the color value
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <ColorScale
          isDark
          colorMap={colors.dark as unknown as Record<string, string>}
          colorName="Semantic Dark Tokens"
        />
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
          Side-by-side semantic color comparison across themes
        </p>
      </div>
      <div className="bg-background overflow-hidden rounded-2xl border border-neutral-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b border-neutral-100 p-6 md:border-r md:border-b-0">
            <h4 className="text-content-tertiary mb-4 text-sm font-semibold tracking-wider uppercase">
              Light Theme
            </h4>
            <div className="space-y-2">
              {Object.entries(colors.light).map(([token, value]) => (
                <div key={token} className="flex items-center gap-3">
                  <div
                    className="size-8 rounded-lg border border-black/10"
                    style={{
                      backgroundColor:
                        typeof value === 'string' && value.startsWith('oklch') ? value : undefined,
                    }}
                  />
                  <div className="text-xs">
                    <span className="text-content-primary font-semibold">{token}: </span>
                    <span className="text-content-secondary font-mono">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-950 p-6">
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-neutral-100 uppercase">
              Dark Theme
            </h4>
            <div className="space-y-2">
              {Object.entries(colors.dark).map(([token, value]) => (
                <div key={token} className="flex items-center gap-3">
                  <div
                    className="size-8 rounded-lg border border-white/10"
                    style={{
                      backgroundColor:
                        typeof value === 'string' && value.startsWith('oklch') ? value : undefined,
                    }}
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-white">{token}: </span>
                    <span className="font-mono text-neutral-300">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </span>
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

export const SemanticColors: Story = {
  render: (): ReactElement => {
    const groups = [
      'primary',
      'secondary',
      'tertiary',
      'success',
      'warning',
      'danger',
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
