# Playground Setup

## 🎮 Storybook Configuration

### Initial Setup

```bash
cd packages/playground
npx storybook@latest init
pnpm add ../ui
```

### Storybook Configuration

#### `.storybook/main.ts`

```typescript
import type {StorybookConfig} from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
```

#### `.storybook/preview.ts`

```typescript
import type {Preview} from "@storybook/react";
import "../src/index.css"; // Tailwind styles

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
```

## 📝 Story Examples

### Button Component Story

#### `src/stories/Button.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mylib/ui';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

### Interactive Playground Story

#### `src/stories/Playground.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, Card } from '@mylib/ui';
import { useState } from 'react';

const meta: Meta = {
  title: 'Playground/Interactive',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const FormExample: StoryObj = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Card className="p-6 w-96">
        <div className="space-y-4">
          <Input
            placeholder="Enter text..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={() => alert(`Value: ${value}`)}
            disabled={!value}
          >
            Submit
          </Button>
        </div>
      </Card>
    );
  },
};
```

## 🎨 Styling Configuration

### Tailwind Setup

#### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "../ui/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🧪 Testing Integration

### Visual Testing Setup

```bash
pnpm add -D @storybook/test-runner chromatic
```

#### `package.json` scripts

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook",
    "chromatic": "chromatic --exit-zero-on-changes"
  }
}
```

## 🚀 Deployment

### Build and Deploy Storybook

```bash
# Build static Storybook
pnpm build-storybook

# Deploy to GitHub Pages
pnpm add -D gh-pages
```

#### GitHub Actions for Storybook

```yaml
name: Deploy Storybook
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: pnpm install
      - run: pnpm build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/playground/storybook-static
```
