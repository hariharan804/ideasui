# Component Library with ShadCN/UI

A modern, accessible component library built on top of ShadCN/UI with TypeScript, Tailwind CSS, and comprehensive tooling.

## 🚀 Quick Start

```bash
# Install the library
npm install @mylib/ui

# Install peer dependencies
npm install react react-dom

# Install Tailwind CSS (if not already installed)
npm install -D tailwindcss
```

## 📦 Usage

```tsx
import { Button, Card, Input } from '@mylib/ui'
import '@mylib/ui/styles'

function App() {
  return (
    <Card className="p-6">
      <Input placeholder="Enter your name" />
      <Button className="mt-4">Submit</Button>
    </Card>
  )
}
```

## 📚 Documentation

- [📋 Setup Checklist](./SETUP_CHECKLIST.md) - Complete setup guide
- [📁 Project Structure](./docs/PROJECT_STRUCTURE.md) - Repository organization
- [🛠️ Development Setup](./docs/DEVELOPMENT_SETUP.md) - Local development guide
- [🎮 Playground Setup](./docs/PLAYGROUND_SETUP.md) - Storybook configuration
- [📝 Component Guidelines](./docs/COMPONENT_GUIDELINES.md) - Development standards
- [🏗️ Build & Deployment](./docs/BUILD_DEPLOYMENT.md) - Release process
- [🧪 Testing Strategy](./docs/TESTING_STRATEGY.md) - Quality assurance
- [📖 API Documentation](./docs/API_DOCUMENTATION.md) - Component reference
- [📦 GitHub Packages Publishing](./docs/GITHUB_PACKAGES_PUBLISHING.md) - Publishing guide

## 🎯 Features

- ✅ Built on ShadCN/UI foundation
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
pnpm install

# Start development
pnpm dev

# Run Storybook
pnpm storybook

# Run tests
pnpm test

# Build library
pnpm build
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