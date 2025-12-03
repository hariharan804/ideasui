# IdeasUI - Component Library

IdeasUI is a modern, accessible component library built with TypeScript, Tailwind CSS, and comprehensive tooling.

## 🚀 Quick Start

```bash
# Install IdeasUI
npm install @ideasui/ui

# Install peer dependencies
npm install react react-dom

# Install Tailwind CSS (if not already installed)
npm install -D tailwindcss
```

## 📦 Usage

```tsx
import { Button } from '@ideasui/ui'

function App() {
  return (
    <Card className="p-6">
      <Input placeholder="Enter your name" />
      <Button className="mt-4">Submit</Button>
    </Card>
  )
}
```

## 📁 Project Structure

```
lib/
├── packages/
│   ├── components/          # UI Components (@ideasui/box, @ideasui/button)
│   │   ├── box/            # Flexible container component
│   │   └── button/         # Interactive button component
│   ├── core/               # Core system packages
│   │   └── provider/       # IdeasUI Provider (@ideasui/provider)
│   ├── primitives/         # Headless components
│   │   └── toggle/         # Toggle primitive (@ideasui/toggle-primitive)
│   ├── hooks/              # React hooks (@ideasui/hooks)
│   ├── utils/              # Shared utilities (@ideasui/utils)
│   │   └── shared/lib/     # Utility functions (cn, clsx)
│   ├── icons/              # Icon library (@ideasui/icons)
│   ├── tokens/             # Design tokens (@ideasui/tokens)
│   ├── themes/             # Theme system
│   │   └── theme-controller/ # Theme management (@ideasui/theme-controller)
│   └── cli/                # CLI tools (@ideasui/cli)
├── apps/
│   ├── playground/         # Next.js playground app
│   └── storybook/          # Storybook documentation app
├── configs/
│   ├── eslint-config/      # Shared ESLint configuration
│   ├── jest-config/        # Shared Jest configuration
│   ├── tailwind-config/    # Tailwind CSS configuration
│   ├── tsconfig/           # TypeScript configurations
│   └── tsup-config/        # Build tool configuration
├── development/            # Development workspace
│   └── components/         # Ready-to-use components
├── docs/                   # Documentation files
├── scripts/                # Build and utility scripts
├── templates/              # Component generation templates
└── tests/                  # End-to-end and visual tests
```

### 🧩 Primitives vs Components

**Primitives** (`/primitives`) - Headless, unstyled components that provide behavior and logic:
- No styling or visual appearance
- Pure logic and state management
- Render props or compound component patterns
- Maximum flexibility for custom styling
- Example: `@ideasui/toggle-primitive` provides toggle state without any UI

**Components** (`/components`) - Complete, styled UI components ready to use:
- Pre-styled with Tailwind CSS
- Built on top of primitives or standalone
- Consistent design system appearance
- Customizable through props and variants
- Example: `@ideasui/button` provides a complete button with styling

```tsx
// Primitive - You provide the UI
<Toggle>
  {({ isOn, toggle }) => (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>

// Component - UI is provided
<Button variant="primary" size="md">
  Click me
</Button>
```

### 📦 Package Overview

| Package | Description | Status |
|---------|-------------|--------|
| `@ideasui/provider` | Core provider for global configuration | ✅ Ready |
| `@ideasui/tokens` | Design system tokens (colors, spacing, typography) | ✅ Ready |
| `@ideasui/utils` | Shared utility functions | ✅ Ready |
| `@ideasui/icons` | SVG icon components | ✅ Ready |
| `@ideasui/box` | Flexible container component | ✅ Ready |
| `@ideasui/button` | Interactive button component | ✅ Ready |
| `@ideasui/toggle-primitive` | Headless toggle component | ✅ Ready |
| `@ideasui/theme-controller` | Theme management system | ✅ Ready |
| `@ideasui/cli` | Component generation CLI | ✅ Ready |

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
- ✅ Tailwind CSS for styling
- ✅ Storybook playground for development
- ✅ Comprehensive testing setup
- ✅ Automated CI/CD pipeline
- ✅ Accessibility compliant
- ✅ Dark mode support
- ✅ Tree-shakeable exports
- ✅ SSR compatible

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm test

# Build library
npm run build
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