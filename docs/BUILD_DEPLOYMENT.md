# Build & Deployment

## 🏗️ Build Configuration

### Vite Build Setup

#### `packages/ui/vite.config.ts`

```typescript
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {resolve} from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MyComponentLib",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

### Package.json Configuration

```json
{
  "name": "@mylib/ui",
  "version": "0.1.0",
  "description": "Component library built with ShadCN/UI",
  "main": "./dist/index.umd.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "type-check": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

## 🚀 Release Process

### Semantic Versioning

```bash
# Install release tools
pnpm add -D semantic-release @semantic-release/changelog @semantic-release/git

# Conventional commits
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

### Release Configuration

#### `.releaserc.json`

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

### GitHub Actions Workflow

#### `.github/workflows/release.yml`

```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          registry-url: "https://registry.npmjs.org"

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm build

      - name: Run tests
        run: pnpm test

      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: pnpm semantic-release
```

## 📦 NPM Publishing

### Pre-publish Checklist

- [ ] All tests passing
- [ ] Build successful
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Documentation current
- [ ] Examples working

### Publishing Commands

```bash
# Build for production
pnpm build

# Test package locally
npm pack
npm install ./mylib-ui-0.1.0.tgz

# Publish to NPM
npm publish --access public

# Publish beta version
npm publish --tag beta
```

### Registry Configuration

#### `.npmrc`

```
registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

## 🔄 CI/CD Pipeline

### Build Pipeline

#### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm type-check

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build

      - name: Build Storybook
        run: pnpm build-storybook
```

### Visual Testing

#### `.github/workflows/visual-tests.yml`

```yaml
name: Visual Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: build-storybook
```

## 📊 Bundle Analysis

### Bundle Size Monitoring

```bash
# Install bundle analyzer
pnpm add -D @bundle-analyzer/rollup-plugin

# Add to vite config
import { analyzer } from '@bundle-analyzer/rollup-plugin'

export default defineConfig({
  plugins: [
    // ... other plugins
    analyzer({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
})
```

### Performance Monitoring

```json
{
  "scripts": {
    "analyze": "vite build --mode analyze",
    "size-limit": "size-limit",
    "size-limit:why": "size-limit --why"
  }
}
```
