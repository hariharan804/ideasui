# Development Setup

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### Initial Setup

```bash
# 1. Clone and setup
git clone <your-repo>
cd my-component-lib
pnpm install

# 2. Initialize ShadCN/UI
cd packages/ui
npx shadcn-ui@latest init

# 3. Start development
pnpm dev
```

## 📋 Step-by-Step Setup

### 1. Initialize Monorepo

```bash
# Create workspace configuration
echo "packages:\n  - 'packages/*'\n  - 'apps/*'" > pnpm-workspace.yaml

# Install workspace dependencies
pnpm add -D typescript @types/node turbo
```

### 2. Setup Component Library Package

```bash
mkdir -p packages/ui/src/components/ui
cd packages/ui

# Initialize package
npm init -y

# Install dependencies
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom typescript vite

# Initialize ShadCN
npx shadcn-ui@latest init
```

### 3. Setup Playground (Next.js)

```bash
mkdir -p packages/playground
cd packages/playground

# Initialize Next.js app
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false

# Install component library
pnpm add ../ui
```

### 4. Configure Build Tools

```bash
# Install build dependencies
pnpm add -D rollup @rollup/plugin-typescript rollup-plugin-dts
pnpm add -D @next/bundle-analyzer
```

## 🔧 Configuration Files

### Root `package.json`

```json
{
  "name": "my-component-lib",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "playground": "pnpm --filter playground dev"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "typescript": "^5.0.0"
  }
}
```

### `turbo.json`

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

### Component Library `package.json`

```json
{
  "name": "@mylib/ui",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/index.css"
  },
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch"
  }
}
```

## 🛠️ Development Commands

```bash
# Start all development servers
pnpm dev

# Build all packages
pnpm build

# Run playground
pnpm playground

# Add new ShadCN component
cd packages/ui
npx shadcn-ui@latest add button

# Run tests
pnpm test

# Lint code
pnpm lint
```

## 🔍 Troubleshooting

### Common Issues

1. **ShadCN components not found**
   - Ensure `components.json` is in the ui package
   - Check import paths in stories

2. **Tailwind styles not applied**
   - Verify Tailwind config in both ui and playground
   - Check CSS imports in Next.js app

3. **TypeScript errors**
   - Ensure proper tsconfig extends
   - Check package exports configuration
