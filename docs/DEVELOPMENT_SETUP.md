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
pnpm run typecheck
```

## 📦 Individual Package Commands

Use `--filter` to run commands on specific packages:

```bash
# Run scripts for a specific package
pnpm --filter @ideasui/button build
pnpm --filter @ideasui/theme dev
pnpm --filter @ideasui/icons test

# Run scripts using package folder path
pnpm --filter ./packages/components/button build

# Add a dependency to a specific package
pnpm --filter @ideasui/button add react-aria
pnpm --filter @ideasui/button add -D @types/react  # Dev dependency

# Add a workspace package as dependency
pnpm --filter @ideasui/button add @ideasui/theme@workspace:*

# Remove a dependency from a specific package
pnpm --filter @ideasui/button remove react-aria

# Install dependencies for a specific package only
pnpm --filter @ideasui/button install

# Run multiple packages matching a pattern
pnpm --filter "@ideasui/*" build
pnpm --filter "./packages/components/*" test
```

### Useful Filter Patterns

| Pattern                         | Description                          |
| ------------------------------- | ------------------------------------ |
| `--filter @ideasui/button`      | Exact package name                   |
| `--filter "./packages/theme"`   | By folder path                       |
| `--filter "@ideasui/*"`         | Glob pattern (all @ideasui packages) |
| `--filter "...@ideasui/button"` | Package and its dependencies         |
| `--filter "@ideasui/button..."` | Package and its dependents           |

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
