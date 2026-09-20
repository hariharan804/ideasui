# IdeasUI - Component Library

A high-performance, accessible component library built with **TypeScript**, **Tailwind CSS v4**, and **React Aria**.

[![NPM Version](https://img.shields.io/npm/v/@ideasui/react.svg)](https://www.npmjs.com/package/@ideasui/react)
[![License](https://img.shields.io/npm/l/@ideasui/react.svg)](https://github.com/ideas2logic-lab/ideasui/blob/master/LICENSE)

📚 **[Official Documentation & Live Demos →](https://ideasui.com)**
🎨 **[Storybook Component Explorer →](https://storybook.ideasui.com)**

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ideas2logic-lab/ideasui.git
cd ideasui

# Install dependencies
pnpm install

# Start Storybook
pnpm run storybook

# Start development
pnpm run dev

# Build all packages
pnpm run build
```

## ⚙️ Requirements

- **Node.js**: >= 18.x (LTS)
- **PNPM**: >= 10.x
- Automatic version checks run on install with helpful error messages.

## 📦 Usage

```tsx
import { Button, ThemeProvider } from '@ideasui/react';

function App() {
  return (
    <ThemeProvider>
      <Button variant="solid" color="primary" size="md">
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

## 📁 Project Structure

```
ideasui/
├── packages/
│   ├── components/          # UI Components
│   │   └── button/         # Interactive button component (@ideasui/button)
│   ├── core/               # Core system packages
│   │   ├── theme/          # Theme system with recipes & tokens (@ideasui/theme)
│   │   └── react/          # Main React entry point (@ideasui/react)
│   └── utils/              # Shared utilities (@ideasui/utils)
├── apps/
│   ├── playground/         # Next.js playground app
│   └── storybook/          # Storybook documentation app
└── scripts/                # Build and utility scripts
```

## 🎨 Theme System

- **OKLCH Color Space**: Perceptually uniform colors for consistent visual weight.
- **Tailwind CSS v4**: Built-in support for the latest styling engine.
- **Semantic Tokens**: Role-based color aliases (`surface`, `content`, `border`).
- **Dark Mode**: Native, flicker-free support with adaptive tokens.

## 🎯 Features

- ✅ **Modern React** — Built with React 19 and TypeScript.
- ✅ **Performance** — Zero-runtime CSS using Tailwind v4.
- ✅ **Accessibility** — Built on React Aria for WCAG 2.1 AA compliance.
- ✅ **Monorepo** — Managed with PNPM Workspaces and Turbo.
- ✅ **Testing** — Comprehensive unit and visual regression testing.
- ✅ **Versioning** — Automated releases with Changesets.

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run Storybook
pnpm run storybook

# Run unit tests
pnpm run test

# Linting and formatting
pnpm run quality

# Build library
pnpm run build
```

## 📚 Documentation

- [🛠️ Development Setup](./docs/DEVELOPMENT_SETUP.md)
- [📝 Component Standards](./docs/COMPONENT_STANDARDS.md)
- [🧪 Testing Guide](./docs/TESTING_GUIDE.md)
- [📏 Development Rules](./rules/README.md)

## License

MIT © [IdeasUI](https://ideasui.com)
