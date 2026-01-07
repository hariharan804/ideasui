# Development Setup

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- pnpm 10+ (recommended)
- Git

### Initial Setup

```bash
# 1. Clone and setup
git clone <your-repo>
cd ideasui
pnpm install

# 2. Install Playwright browsers
pnpm run playwright:install

# 3. Start development
pnpm run dev

# 4. Run Storybook
pnpm run storybook
```

## 📁 Project Structure

```
ideasui/
├── packages/
│   ├── components/          # UI Components (button, ripple, slot, touchable)
│   ├── core/               # Core packages (theme)
│   ├── hooks/              # React hooks
│   ├── utils/              # Shared utilities
│   ├── icons/              # Icon library
│   └── cli/                # CLI tools
├── apps/
│   ├── playground/         # Next.js playground
│   └── storybook/          # Storybook documentation
├── templates/              # Component generation templates
├── scripts/                # Build and utility scripts
└── docs/                   # Documentation
```

## 🔧 Key Technologies

- **Monorepo**: Turbo + pnpm workspaces
- **Components**: React + TypeScript
- **Styling**: Tailwind CSS + tailwind-variants
- **Testing**: Jest + Playwright
- **Documentation**: Storybook
- **Build**: tsup
- **Linting**: ESLint + Prettier + Husky

## 🛠️ Development Commands

```bash
# Start all development servers
pnpm run dev

# Build all packages
pnpm run build

# Run Storybook
pnpm run storybook

# Run unit tests
pnpm run test
pnpm run test:watch
pnpm run test:coverage

# Run visual tests
pnpm run test:visual
pnpm run test:visual:ui
pnpm run test:cross-browser

# Generate new components
pnpm run create

# Lint and format code
pnpm run lint
pnpm run lint:fix
pnpm run format

# Type checking
pnpm run type-check
```

## 🔍 Troubleshooting

### Common Issues

1. **Playwright browsers not installed**
   - Run `pnpm run playwright:install` to install browsers
   - Required for visual regression tests

2. **Jest tests failing**
   - Ensure `@testing-library/jest-dom` is properly configured
   - Check test setup in `scripts/setup-test.ts`

3. **Component imports not working**
   - Verify package builds with `pnpm run build`
   - Check workspace dependencies in package.json

4. **Storybook not loading components**
   - Ensure components are properly exported from `src/index.ts`
   - Check Storybook configuration in `apps/storybook`

5. **TypeScript errors**
   - Run `pnpm run typecheck` to identify issues
   - Ensure proper tsconfig extends in each package
