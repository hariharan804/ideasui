import type { Meta, StoryObj } from '@storybook/react';
import { ideasUIPlugin } from '../src/index';

const meta: Meta = {
  title: 'Theme/Plugin',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

const CodeBlock = ({ title, code }: { title: string; code: string }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold">{title}</h3>
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{code}</code>
    </pre>
  </div>
);

export const BasicUsage: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">IdeasUI Theme Plugin</h2>
        <p className="text-gray-600 mb-8">
          Tailwind CSS plugin for IdeasUI theme system with OKLCH colors and design tokens
        </p>
      </div>

      <CodeBlock
        title="Basic Installation"
        code={`// tailwind.config.js
import { ideasUIPlugin } from '@ideasui/theme';

export default {
  plugins: [
    ideasUIPlugin()
  ]
}`}
      />

      <CodeBlock
        title="Custom Configuration"
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
      />

      <CodeBlock
        title="Using Theme Classes"
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
      />

      <CodeBlock
        title="CSS Variables"
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
      />
    </div>
  ),
};

export const ThemeExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Theme Examples</h2>
        <p className="text-gray-600 mb-8">Visual examples of different theme configurations</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Light Theme</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary-500 text-primary-foreground rounded-lg text-center">
              Primary
            </div>
            <div className="p-4 bg-secondary-500 text-secondary-foreground rounded-lg text-center">
              Secondary
            </div>
            <div className="p-4 bg-success-500 text-success-foreground rounded-lg text-center">
              Success
            </div>
            <div className="p-4 bg-danger-500 text-danger-foreground rounded-lg text-center">
              Danger
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-900 text-white rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Dark Theme</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary-400 text-primary-950 rounded-lg text-center">
              Primary
            </div>
            <div className="p-4 bg-secondary-400 text-secondary-950 rounded-lg text-center">
              Secondary
            </div>
            <div className="p-4 bg-success-400 text-success-950 rounded-lg text-center">
              Success
            </div>
            <div className="p-4 bg-danger-400 text-danger-950 rounded-lg text-center">
              Danger
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
      <div>
        <h2 className="text-2xl font-bold mb-4">Plugin Features</h2>
        <p className="text-gray-600 mb-8">Key features of the IdeasUI theme system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🎨 OKLCH Color System</h3>
          <p className="text-gray-600 text-sm">
            Advanced color space for better perceptual uniformity and consistent color relationships
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🌓 Light/Dark Themes</h3>
          <p className="text-gray-600 text-sm">
            Built-in light and dark theme support with optimized color palettes
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">⚡ Performance Optimized</h3>
          <p className="text-gray-600 text-sm">
            Efficient CSS variable generation with minimal runtime overhead
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🔧 Customizable</h3>
          <p className="text-gray-600 text-sm">
            Extend with custom themes, colors, and design tokens
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">♿ WCAG Compliant</h3>
          <p className="text-gray-600 text-sm">
            Built-in color contrast checking for accessibility compliance
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibent mb-3">🎯 Type Safe</h3>
          <p className="text-gray-600 text-sm">
            Full TypeScript support with comprehensive type definitions
          </p>
        </div>
      </div>
    </div>
  ),
};