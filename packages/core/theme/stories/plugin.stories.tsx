import type { Meta, StoryObj } from '@storybook/react-vite';
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
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-5 py-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <button
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900"
          type="button"
          onClick={handleCopy}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto bg-gray-950 p-5 font-mono text-sm leading-relaxed text-gray-100">
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

export const SetupOptions: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Installation Options</h2>
        <p className="mt-2 text-lg text-gray-600">
          Tailwind CSS v4 plugin for IdeasUI theme system with OKLCH colors, fluid typography, and
          design tokens
        </p>
      </div>

      <div className="grid gap-6">
        <CodeBlock
          code={`/* globals.css */
@import 'tailwindcss';
@import '@ideasui/theme/theme.css';`}
          title="Option 1 — CSS Import (Recommended)"
        />

        <CodeBlock
          code={`// tailwind.config.ts
import { ideasUIPlugin } from '@ideasui/theme/plugin';

export default {
  plugins: [ideasUIPlugin()],
};

/* globals.css */
@import 'tailwindcss';
@config '../tailwind.config.ts';
@source '../../../node_modules/@ideasui/*/.{js,ts,jsx,tsx,mdx,css}';`}
          title="Option 2 — Tailwind Config (Classic)"
        />

        <CodeBlock
          code={`/* globals.css */
@import 'tailwindcss';
@config '../plugin.ts';

// plugin.ts
import { ideasUIPlugin } from '@ideasui/theme/plugin';

export default ideasUIPlugin();`}
          title="Option 3 — Inline Plugin (CSS-first)"
        />

        <CodeBlock
          code={`// app/providers.tsx
import { ThemeProvider } from '@ideasui/theme';

export function Providers({ children }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}`}
          title="Add Theme Provider (React / Next.js) - Optional"
        />
      </div>
    </div>
  ),
};

export const CustomizationAndUsage: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Customization & Usage</h2>
        <p className="mt-2 text-lg text-gray-600">
          Customize design tokens, semantic colors, and apply themes in HTML
        </p>
      </div>

      <div className="grid gap-6">
        <CodeBlock
          code={`import { ideasUIPlugin } from '@ideasui/theme/plugin';

export default ideasUIPlugin({
  defaultTheme: 'light',
  themes: {
    light: {
      colors: {
        primary: {
          500: 'oklch(0.65 0.25 145)', // Custom green primary
        }
      },
      semanticTokens: {
        surface: {
          base: 'oklch(1 0 0)', // bg-surface-base
        }
      }
    },
    dark: {
      colors: {
        primary: {
          500: 'oklch(0.70 0.20 145)',
        }
      }
    }
  },
  designTokens: {
    spacing: {
      custom: '3px', // → p-custom, m-custom
    },
    borderRadius: {
      custom: '5px', // → rounded-custom
    }
  }
});`}
          title="Custom Theme Configuration via Plugin"
        />

        <CodeBlock
          code={`/* globals.css (CSS-only Customization) */
:root {
  /* Shades 50–950, stored as "L C H" components */
  --ideasui-color-primary-500: 0.65 0.25 145;
  --ideasui-spacing-custom: 3px;
}

.dark,
[data-ideasui-theme='dark'] {
  --ideasui-color-primary-500: 0.7 0.2 145;
}`}
          title="Custom Theme Configuration via CSS Variables"
        />

        <CodeBlock
          code={`<!-- Light theme (default) -->
<div class="bg-primary-500 text-primary-onBase">
  Light theme content
</div>

<!-- Built-in Dark theme -->
<div class="dark bg-surface-base text-content-primary">
  Dark theme card
</div>

<!-- Custom theme mapped to data-attribute -->
<div data-ideasui-theme="brand-dark" class="bg-surface-elevated text-content-secondary">
  Custom theme content
</div>`}
          title="Applying Themes in HTML"
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
          Visual examples of different theme configurations and semantic utility classes
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Light Theme */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50">
          <div className="border-b border-gray-100 bg-white px-6 py-4">
            <h3 className="text-lg font-bold text-gray-900">Light Theme</h3>
            <p className="mt-1 text-sm text-gray-500">Default semantic color mapping</p>
          </div>
          <div className="grid grid-cols-1 gap-3 p-5">
            {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map((color) => (
              <div
                key={color}
                className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-center font-bold capitalize shadow-sm"
                  style={{
                    backgroundColor: `var(--ideasui-color-${color}-base)`,
                    color: `var(--ideasui-color-${color}-onBase)`,
                  }}
                >
                  Aa
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 capitalize">{color}</div>
                  <div className="mt-0.5 flex gap-2 text-xs text-gray-500">
                    <span className="rounded bg-gray-100 px-1">bg-{color}-base</span>
                    <span className="rounded bg-gray-100 px-1">text-{color}-onBase</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Theme */}
        <div className="dark overflow-hidden rounded-2xl border border-white/10 bg-gray-950">
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="text-lg font-bold text-white">Dark Theme</h3>
            <p className="mt-1 text-sm text-gray-400">Optimized for dark mode</p>
          </div>
          <div className="grid grid-cols-1 gap-3 p-5">
            {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map((color) => (
              <div
                key={color}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-center font-bold capitalize shadow-sm"
                  style={{
                    backgroundColor: `var(--ideasui-color-${color}-base)`,
                    color: `var(--ideasui-color-${color}-onBase)`,
                  }}
                >
                  Aa
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white capitalize">{color}</div>
                  <div className="mt-0.5 flex gap-2 text-xs text-gray-400">
                    <span className="rounded bg-white/10 px-1">bg-{color}-base</span>
                    <span className="rounded bg-white/10 px-1">text-{color}-onBase</span>
                  </div>
                </div>
              </div>
            ))}
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
          description="Advanced color space for better perceptual uniformity and consistent lightness relationships across all hues"
          icon="🎨"
          title="OKLCH Color System"
        />
        <FeatureCard
          description="Semantic tokens (Surface/Content/Base) that automatically adapt properly in Light and Dark themes"
          icon="🌓"
          title="Semantic Theming"
        />
        <FeatureCard
          description="Efficient CSS variable generation using modern Tailwind mechanisms with minimal runtime overhead"
          icon="⚡"
          title="Performance Optimized"
        />
        <FeatureCard
          description="Extend with custom themes by merging your token structures or extending existing themes through config"
          icon="🔧"
          title="Highly Customizable"
        />
        <FeatureCard
          description="Ensures legible text against backgrounds automatically via 'onBase' / 'onSurface' mapped contrast pairs"
          icon="♿"
          title="Accessible Constructs"
        />
        <FeatureCard
          description="Full TypeScript configuration support with comprehensive autocomplete definitions for tailwind classes"
          icon="🎯"
          title="Type Safe Options"
        />
      </div>
    </div>
  ),
};
