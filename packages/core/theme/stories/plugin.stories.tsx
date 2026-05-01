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
    <div className="border-surface-border bg-surface-surface overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-surface-border bg-surface-sunken/40 flex items-center justify-between border-b px-5 py-3">
        <h3 className="text-content-primary text-sm font-semibold">{title}</h3>
        <button
          className="border-surface-border bg-surface-surface text-content-secondary hover:bg-surface-sunken hover:text-content-primary rounded-lg border px-3 py-1.5 text-xs font-medium transition-all"
          type="button"
          onClick={handleCopy}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto bg-neutral-950 p-5 font-mono text-sm leading-relaxed text-neutral-100">
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
  <div className="group border-surface-border bg-surface-surface hover:border-surface-border-strong overflow-hidden rounded-2xl border p-6 transition-all duration-200 hover:shadow-lg">
    <div className="mb-4 text-3xl">{icon}</div>
    <h3 className="text-content-primary mb-2 text-lg font-bold">{title}</h3>
    <p className="text-content-secondary text-sm leading-relaxed">{description}</p>
  </div>
);

export const SetupOptions: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-10">
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          Installation Options
        </h2>
        <p className="text-content-secondary mt-2 text-lg">
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">
          Customization & Usage
        </h2>
        <p className="text-content-secondary mt-2 text-lg">
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
<div class="bg-primary-500 text-primary-on-base">
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">Theme Examples</h2>
        <p className="text-content-secondary mt-2 text-lg">
          Visual examples of different theme configurations and semantic utility classes
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Light Theme */}
        <div className="bg-surface-base overflow-hidden rounded-2xl border border-neutral-100">
          <div className="bg-surface border-b border-neutral-100 px-6 py-4">
            <h3 className="text-content-primary text-lg font-bold">Light Theme</h3>
            <p className="text-content-tertiary mt-1 text-sm">Default semantic color mapping</p>
          </div>
          <div className="grid grid-cols-1 gap-3 p-5">
            {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map((color) => (
              <div
                key={color}
                className="bg-surface flex items-center gap-4 rounded-xl border border-neutral-100 p-4 transition-all hover:shadow-md"
              >
                <div
                  className={`bg-${color}-subtle text-${color}-on-subtle flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-center font-bold capitalize shadow-sm`}
                >
                  Aa
                </div>
                <div className="flex-1">
                  <div className="text-content-primary text-sm font-semibold capitalize">
                    {color}
                  </div>
                  <div className="text-content-tertiary mt-0.5 flex gap-2 text-xs">
                    <span className="bg-surface-sunken rounded px-1">bg-{color}-base</span>
                    <span className="bg-surface-sunken rounded px-1">text-{color}-on-base</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Theme */}
        <div className="dark border-surface-border bg-surface overflow-hidden rounded-2xl border">
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="text-lg font-bold text-white">Dark Theme</h3>
            <p className="mt-1 text-sm text-neutral-900">Optimized for dark mode</p>
          </div>
          <div className="grid grid-cols-1 gap-3 p-5">
            {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map((color) => (
              <div
                key={color}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10"
              >
                <div
                  className={`bg-${color}-subtle text-${color}-on-subtle flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-center font-bold capitalize shadow-sm`}
                >
                  Aa
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white capitalize">{color}</div>
                  <div className="text-neutral-on-subtle mt-0.5 flex gap-2 text-xs">
                    <span className="rounded px-1">bg-{color}-base</span>
                    <span className="rounded px-1">text-{color}-on-base</span>
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
        <h2 className="text-content-primary text-3xl font-bold tracking-tight">Plugin Features</h2>
        <p className="text-content-secondary mt-2 text-lg">
          Key features of the IdeasUI theme system
        </p>
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
          description="Ensures legible text against backgrounds automatically via 'on-base' / 'onSurface' mapped contrast pairs"
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
