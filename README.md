# IdeasUI - Component Library

IdeasUI is a modern, accessible component library built with TypeScript, Tailwind CSS, and comprehensive tooling.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd ideasui

# Install dependencies
pnpm install

# Start Storybook
pnpm run storybook

# Install Playwright browsers (for visual testing)
pnpm run playwright:install

# Start development
pnpm run dev

# Build all packages
pnpm run build
```

## 📦 Usage

```tsx
import {Button} from "@ideasui/button";
import {Box} from "@ideasui/box";
import {Ripple} from "@ideasui/ripple";

function App() {
  return (
    <Box className="p-6">
      <Button variant="solid" color="primary" size="md">
        Click me
      </Button>
      <Ripple />
    </Box>
  );
}
```

## 📁 Project Structure

```
ideasui/
├── packages/
│   ├── components/          # UI Components
│   │   ├── box/            # Flexible container component (@ideasui/box)
│   │   ├── button/         # Interactive button component (@ideasui/button)
│   │   └── ripple/         # Material Design ripple effect (@ideasui/ripple)
│   ├── core/               # Core system packages
│   │   └── theme/          # Theme system with recipes & tokens (@ideasui/theme)
│   ├── hooks/              # React hooks (@ideasui/hooks)
│   ├── utils/              # Shared utilities (@ideasui/utils)
│   ├── icons/              # Icon library (@ideasui/icons)
│   └── cli/                # CLI tools (@ideasui/cli)
├── apps/
│   ├── playground/         # Next.js playground app
│   └── storybook/          # Storybook documentation app
├── templates/              # Component generation templates
│   ├── component/          # Component template
│   ├── hooks/              # Hook template
│   └── recipe/             # Recipe template
└── scripts/                # Build and utility scripts

```

## 🎨 Theme System

### Color Tokens

- **OKLCH Color Space**: Perceptually uniform colors
- **Semantic Colors**: Primary, secondary, success, warning, danger, info, neutral, gray
- **11 Shades**: 50-950 scale for each color
- **Dark Mode**: Optimized dark theme variants

### Recipes (Tailwind Variants)

```tsx
import {button} from "@ideasui/theme/recipes";

const {base, icon, label} = button({variant: "solid", color: "primary"});
```

### Design Tokens

```tsx
import {colorTokens, darkColorTokens} from "@ideasui/theme/tokens";
```

## 🎯 Features

- ✅ Modern React components with TypeScript
- ✅ OKLCH color system for better perceptual uniformity
- ✅ Tailwind Variants (TV) for styling
- ✅ Comprehensive theme system with recipes
- ✅ Storybook playground for development
- ✅ Comprehensive testing (Jest + Playwright)
- ✅ Visual regression testing
- ✅ ESLint + Prettier + Husky git hooks
- ✅ Automated versioning with changesets
- ✅ Component generation templates
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Dark mode support
- ✅ Tree-shakeable exports
- ✅ SSR compatible
- ✅ Monorepo with Turbo
- ✅ Material Design ripple effects

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development (all packages)
pnpm run dev

# Run Storybook
pnpm run storybook

# Run unit tests
pnpm run test
pnpm run test:watch
pnpm run test:coverage

# Run visual regression tests
pnpm run test:visual
pnpm run test:visual:ui

# Linting and formatting
pnpm run lint
pnpm run lint:fix
pnpm run format

# Build library
pnpm run build

# Type checking
pnpm run typecheck

# Generate new components
pnpm run create
```

## 📚 Documentation

- [🛠️ Development Setup](./docs/DEVELOPMENT_SETUP.md) - Local development guide
- [📝 Component Standards](./docs/COMPONENT_STANDARDS.md) - Development standards
- [🧪 Testing Guide](./docs/TESTING_GUIDE.md) - Quality assurance
- [📦 Packages Guide](./packages/README.md) - Package development guide
- [📏 Development Rules](./rules/README.md) - Naming conventions, code quality, accessibility
