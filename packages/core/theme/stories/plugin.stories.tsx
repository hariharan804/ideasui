import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';

import { useState } from 'react';

const meta: Meta = {
  title: 'Theme/Plugin',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const COPY_FEEDBACK_DELAY = 1500;

const CodeBlock = ({ title, code }: { title: string; code: string }): ReactElement => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_DELAY);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button
          className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-200"
          type="button"
          onClick={handleCopy}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto bg-gray-950 p-5 text-sm leading-relaxed text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}): ReactElement => (
  <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 hover:shadow-lg">
    <div className="mb-4 text-3xl">{icon}</div>
    <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
    <p className="text-sm leading-relaxed text-gray-500">{description}</p>
  </div>
);

export const BasicUsage: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">IdeasUI Theme Plugin</h2>
        <p className="mt-2 text-lg text-gray-600">
          Tailwind CSS plugin for IdeasUI theme system with OKLCH colors and design tokens
        </p>
      </div>

      <div className="grid gap-6">
        <CodeBlock
          code={`// tailwind.config.js
import { ideasUIPlugin } from '@ideasui/theme';

export default {
  plugins: [
    ideasUIPlugin()
  ]
}`}
          title="Basic Installation"
        />

        <CodeBlock
          code={`// tailwind.config.js
import { ideasUIPlugin } from '@ideasui/theme';

export default {
  plugins: [
    ideasUIPlugin({
      themes: {
        custom: {
          colors: {
            primary: {
              500: 'oklch(0.6 0.2 200)'
            }
          }
        }
      },
      defaultTheme: 'light',
      prefix: 'ui',
      disableAnimations: false
    })
  ]
}`}
          title="Custom Configuration"
        />

        <CodeBlock
          code={`<!-- Light theme (default) -->
<div class="bg-primary-500 text-primary-foreground">
  Light theme content
</div>

<!-- Dark theme -->
<div class="dark bg-primary-500 text-primary-foreground">
  Dark theme content
</div>

<!-- Custom theme -->
<div class="custom bg-primary-500 text-primary-foreground">
  Custom theme content
</div>`}
          title="Using Theme Classes"
        />

        <CodeBlock
          code={`/* Generated CSS variables */
:root {
  --ideasui-color-primary-500: oklch(0.543 0.284 295.7);
  --ideasui-color-background: var(--ideasui-color-neutral-50);
  --ideasui-color-foreground: var(--ideasui-color-neutral-900);
}

.dark {
  --ideasui-color-primary-500: oklch(0.693 0.176 304.2);
  --ideasui-color-background: var(--ideasui-color-neutral-950);
  --ideasui-color-foreground: var(--ideasui-color-neutral-50);
}`}
          title="CSS Variables"
        />
      </div>
    </div>
  ),
};

export const ThemeExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Theme Examples</h2>
        <p className="mt-2 text-lg text-gray-600">
          Visual examples of different theme configurations
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Light Theme */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          <div className="border-b border-gray-100 bg-white px-6 py-4">
            <h3 className="text-lg font-bold text-gray-900">Light Theme</h3>
            <p className="mt-1 text-sm text-gray-500">Default color palette</p>
          </div>
          <div className="grid grid-cols-1 gap-3 p-5">
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
              <div className="bg-primary-500 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">Primary</div>
                <div className="mt-0.5 text-xs text-gray-500">bg-primary-500</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
              <div className="bg-secondary-500 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">Secondary</div>
                <div className="mt-0.5 text-xs text-gray-500">bg-secondary-500</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
              <div className="bg-success-500 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">Success</div>
                <div className="mt-0.5 text-xs text-gray-500">bg-success-500</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
              <div className="bg-danger-500 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">Danger</div>
                <div className="mt-0.5 text-xs text-gray-500">bg-danger-500</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
              <div className="bg-warning-500 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">Warning</div>
                <div className="mt-0.5 text-xs text-gray-500">bg-warning-500</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
              <div className="bg-info-500 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">Info</div>
                <div className="mt-0.5 text-xs text-gray-500">bg-info-500</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Theme */}
        <div className="dark overflow-hidden rounded-2xl border border-white/10 bg-gray-950">
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="text-lg font-bold text-white">Dark Theme</h3>
            <p className="mt-1 text-sm text-gray-400">Optimized for dark mode</p>
          </div>
          <div className="grid grid-cols-1 gap-3 p-5">
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
              <div className="bg-primary-400 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Primary</div>
                <div className="mt-0.5 text-xs text-gray-400">bg-primary-400</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
              <div className="bg-secondary-400 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Secondary</div>
                <div className="mt-0.5 text-xs text-gray-400">bg-secondary-400</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
              <div className="bg-success-400 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Success</div>
                <div className="mt-0.5 text-xs text-gray-400">bg-success-400</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
              <div className="bg-danger-400 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Danger</div>
                <div className="mt-0.5 text-xs text-gray-400">bg-danger-400</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
              <div className="bg-warning-400 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Warning</div>
                <div className="mt-0.5 text-xs text-gray-400">bg-warning-400</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
              <div className="bg-info-400 h-12 w-12 shrink-0 rounded-xl shadow-sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Info</div>
                <div className="mt-0.5 text-xs text-gray-400">bg-info-400</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Features: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Plugin Features</h2>
        <p className="mt-2 text-lg text-gray-600">Key features of the IdeasUI theme system</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          description="Advanced color space for better perceptual uniformity and consistent color relationships"
          icon="🎨"
          title="OKLCH Color System"
        />
        <FeatureCard
          description="Built-in light and dark theme support with optimized color palettes"
          icon="🌓"
          title="Light/Dark Themes"
        />
        <FeatureCard
          description="Efficient CSS variable generation with minimal runtime overhead"
          icon="⚡"
          title="Performance Optimized"
        />
        <FeatureCard
          description="Extend with custom themes, colors, and design tokens"
          icon="🔧"
          title="Customizable"
        />
        <FeatureCard
          description="Built-in color contrast checking for accessibility compliance"
          icon="♿"
          title="WCAG Compliant"
        />
        <FeatureCard
          description="Full TypeScript support with comprehensive type definitions"
          icon="🎯"
          title="Type Safe"
        />
      </div>
    </div>
  ),
};
