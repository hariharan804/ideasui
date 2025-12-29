# IdeasUI - Component Library

IdeasUI is a modern, accessible component library built with TypeScript, Tailwind CSS, and comprehensive tooling.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd lib

# Install dependencies
pnpm install

pnpm run storybook

# Install Playwright browsers (for visual testing)
pnpm run playwright:install

# Start development
pnpm run dev

# Build
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
lib/
├── packages/
│   ├── components/          # UI Components
│   │   ├── box/            # Flexible container component (@ideasui/box)
│   │   ├── button/         # Interactive button component (@ideasui/button)
│   │   └── ripple/         # Material Design ripple effect (@ideasui/ripple)
│   ├── core/               # Core system packages
│   │   ├── theme-controller/ # Theme management (@ideasui/theme)
│   │   └── variants/       # Styling variants system (@ideasui/variants)
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
│   └── variant/            # Variant template
├── scripts/                # Build and utility scripts
└── .amazonq/               # Amazon Q development rules
```

## 📚 Documentation

- [📋 Setup Checklist](./SETUP_CHECKLIST.md) - Complete setup guide
- [📁 Project Structure](./docs/PROJECT_STRUCTURE.md) - Repository organization
- [🛠️ Development Setup](./docs/DEVELOPMENT_SETUP.md) - Local development guide
- [🎮 Playground Setup](./docs/PLAYGROUND_SETUP.md) - Storybook configuration
- [📝 Component Guidelines](./docs/COMPONENT_GUIDELINES.md) - Development standards
- [🏷️ Naming Conventions](./docs/NAMING_CONVENTIONS.md) - Naming rules and cases
- [🏗️ Build & Deployment](./docs/BUILD_DEPLOYMENT.md) - Release process
- [🧪 Testing Strategy](./docs/TESTING_STRATEGY.md) - Quality assurance
- [📖 API Documentation](./docs/API_DOCUMENTATION.md) - Component reference
- [📦 GitHub Packages Publishing](./docs/GITHUB_PACKAGES_PUBLISHING.md) - Publishing guide

## 🎯 Features

- ✅ Modern React components with TypeScript
- ✅ TypeScript support with full type safety
- ✅ Tailwind CSS with variants system
- ✅ Storybook playground for development
- ✅ Comprehensive testing (Jest + Playwright)
- ✅ Visual regression testing
- ✅ ESLint + Prettier + Husky git hooks
- ✅ Automated versioning with changesets
- ✅ Component generation templates
- ✅ Accessibility compliant (WCAG 2.1)
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

# Install Playwright browsers
pnpm run playwright:install

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

## 📋 Repository Setup Checklist

Use the [Setup Checklist](./SETUP_CHECKLIST.md) to ensure your component library is properly configured with all necessary tools and processes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the [Component Guidelines](./docs/COMPONENT_GUIDELINES.md)
4. Add tests for new components
5. Update documentation
6. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.
