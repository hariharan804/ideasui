import type { Meta, StoryObj } from '@storybook/react';
import type { ReactElement } from 'react';

const meta: Meta = {
  title: 'Theme/Plugin',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const CodeBlock = ({ title, code }: { title: string; code: string }): ReactElement => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold">{title}</h3>
    <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
      <code>{code}</code>
    </pre>
  </div>
);

export const BasicUsage: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">IdeasUI Theme Plugin</h2>
        <p className="mb-8 text-gray-600">
          Tailwind CSS plugin for IdeasUI theme system with OKLCH colors and design tokens
        </p>
      </div>

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
  ),
};

export const ThemeExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Theme Examples</h2>
        <p className="mb-8 text-gray-600">Visual examples of different theme configurations</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Light Theme</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="bg-primary-500 text-primary-foreground rounded-lg p-4 text-center">
              Primary
            </div>
            <div className="bg-secondary-500 text-secondary-foreground rounded-lg p-4 text-center">
              Secondary
            </div>
            <div className="bg-success-500 text-success-foreground rounded-lg p-4 text-center">
              Success
            </div>
            <div className="bg-danger-500 text-danger-foreground rounded-lg p-4 text-center">
              Danger
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-900 p-6 text-white">
          <h3 className="mb-4 text-lg font-semibold">Dark Theme</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="bg-primary-400 text-primary-950 rounded-lg p-4 text-center">
              Primary
            </div>
            <div className="bg-secondary-400 text-secondary-950 rounded-lg p-4 text-center">
              Secondary
            </div>
            <div className="bg-success-400 text-success-950 rounded-lg p-4 text-center">
              Success
            </div>
            <div className="bg-danger-400 text-danger-950 rounded-lg p-4 text-center">Danger</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Features: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Plugin Features</h2>
        <p className="mb-8 text-gray-600">Key features of the IdeasUI theme system</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="mb-3 text-lg font-semibold">🎨 OKLCH Color System</h3>
          <p className="text-sm text-gray-600">
            Advanced color space for better perceptual uniformity and consistent color relationships
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-3 text-lg font-semibold">🌓 Light/Dark Themes</h3>
          <p className="text-sm text-gray-600">
            Built-in light and dark theme support with optimized color palettes
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-3 text-lg font-semibold">⚡ Performance Optimized</h3>
          <p className="text-sm text-gray-600">
            Efficient CSS variable generation with minimal runtime overhead
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-3 text-lg font-semibold">🔧 Customizable</h3>
          <p className="text-sm text-gray-600">
            Extend with custom themes, colors, and design tokens
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-3 text-lg font-semibold">♿ WCAG Compliant</h3>
          <p className="text-sm text-gray-600">
            Built-in color contrast checking for accessibility compliance
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="font-semibent mb-3 text-lg">🎯 Type Safe</h3>
          <p className="text-sm text-gray-600">
            Full TypeScript support with comprehensive type definitions
          </p>
        </div>
      </div>
    </div>
  ),
};
