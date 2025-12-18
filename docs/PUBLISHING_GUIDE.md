# Publishing Guide

A comprehensive guide for publishing IdeasUI packages to npm registry.

## 🚀 Quick Start for New Publishers

### Prerequisites

- Node.js 18+
- pnpm package manager
- npm account with 2FA enabled
- Access to @ideasui organization on npm

### First-Time Setup

```bash
# 1. Clone the repository
git clone https://github.com/ideas2logic-lab/ideasui.git
cd lib

# 2. Install dependencies
pnpm install

# 3. Login to npm
npm login

# 4. Verify access to @ideasui organization
npm access list packages @ideasui
```

## 📋 Publishing Process

### Step 1: Prepare Changes

```bash
# 1. Create feature branch
git checkout -b feature/your-changes

# 2. Make your changes
# ... edit components ...

# 3. Test changes
pnpm run test
pnpm run test:visual
pnpm run build

# 4. Commit changes
git add .
pnpm run commit  # Uses conventional commits
```

### Step 2: Create Changeset

```bash
# Create changeset for your changes
npx changeset

# Follow prompts:
# - Select packages that changed
# - Choose version bump (patch/minor/major)
# - Write summary of changes
```

### Step 3: Submit PR

```bash
# Push branch
git push origin feature/your-changes

# Create PR via GitHub UI or CLI
gh pr create --title "feat: add new component" --body "Description"
```

### Step 4: Publishing Options

#### Option A: Stable Release (Recommended)

```bash
# After PR is merged to main
git checkout main
git pull origin main

# Version packages
npx changeset version

# Build and publish
pnpm run build
npx changeset publish
```

#### Option B: Canary Release (Testing)

```bash
# Create PR targeting 'canary' branch
git checkout -b feature/test-component
# ... make changes ...
git push origin feature/test-component

# Create PR to 'canary' branch
# After merge, canary is automatically published
```

## 🔧 Publishing Commands

### Manual Publishing

```bash
# Build all packages
pnpm run build

# Publish specific package
cd packages/components/button
pnpm publish

# Publish all changed packages
npx changeset publish
```

### Canary Publishing

```bash
# Create canary version
npx changeset version --snapshot canary

# Publish canary
npx changeset publish --tag canary

# Install canary version
pnpm install @ideasui/button@canary
```

### Pre-release Publishing

```bash
# Create pre-release version
npx changeset version --snapshot alpha

# Publish pre-release
npx changeset publish --tag alpha
```

## 📦 Package Structure

### Required Files

Each package must have:

```
packages/components/button/
├── src/
│   ├── button.tsx           # Main component
│   ├── button-types.ts      # TypeScript types
│   └── index.ts             # Exports
├── package.json             # Package configuration
├── README.md               # Documentation
├── tsconfig.json           # TypeScript config
└── tsup.config.ts          # Build config
```

### Package.json Requirements

```json
{
  "name": "@ideasui/button",
  "version": "0.1.0",
  "description": "Button component for IdeasUI",
  "author": "IdeasUI<support@ideasui.com>",
  "homepage": "https://ideasui.com",
  "license": "MIT",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ideas2logic-lab/ideasui.git",
    "directory": "packages/components/button"
  }
}
```

## 🔍 Pre-Publishing Checklist

### Before Publishing

- [ ] All tests pass (`pnpm run test`)
- [ ] Visual tests pass (`pnpm run test:visual`)
- [ ] Build succeeds (`pnpm run build`)
- [ ] TypeScript compiles (`pnpm run typecheck`)
- [ ] No linting errors (`pnpm run lint`)
- [ ] Documentation updated
- [ ] Changeset created
- [ ] Version bumped appropriately

### Version Guidelines

- **Patch (0.0.X)**: Bug fixes, small improvements
- **Minor (0.X.0)**: New features, new components
- **Major (X.0.0)**: Breaking changes

### Breaking Changes

For breaking changes:

```bash
# Create major changeset
npx changeset
# Select "major" version bump
# Document breaking changes clearly

# Example commit message
git commit -m "feat(button)!: remove deprecated size prop

BREAKING CHANGE: The size prop has been removed. Use scale prop instead."
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Authentication Errors

```bash
# Re-login to npm
npm logout
npm login

# Verify authentication
npm whoami
```

#### 2. Permission Denied

```bash
# Check organization access
npm access list packages @ideasui

# Request access from maintainers
# Contact: support@ideasui.com
```

#### 3. Version Conflicts

```bash
# Check current version
npm view @ideasui/button version

# Force version update
npx changeset version --ignore-unknown-packages
```

#### 4. Build Failures

```bash
# Clean and rebuild
pnpm run clean
pnpm install
pnpm run build

# Check for TypeScript errors
pnpm run typecheck
```

### Getting Help

- **GitHub Issues**: Report bugs and issues
- **Discussions**: Ask questions and get help
- **Discord**: Join community chat
- **Email**: support@ideasui.com

## 📊 Publishing Workflow

### Automated Publishing (Recommended)

1. **Create PR** → Changes reviewed
2. **Merge to main** → CI runs tests
3. **Changesets action** → Creates release PR
4. **Merge release PR** → Packages published automatically

### Manual Publishing (Advanced)

1. **Local testing** → Verify changes work
2. **Create changeset** → Document changes
3. **Version packages** → Bump versions
4. **Build packages** → Generate dist files
5. **Publish packages** → Upload to npm

## 🎯 Best Practices

### Development

- Always create changesets for user-facing changes
- Test changes locally before publishing
- Use conventional commit messages
- Update documentation with changes

### Publishing

- Publish during business hours for support
- Monitor npm downloads and issues
- Respond to user feedback quickly
- Keep changelogs up to date

### Security

- Enable 2FA on npm account
- Use npm tokens for CI/CD
- Regularly audit dependencies
- Report security issues privately

## 📚 Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://conventionalcommits.org/)

---

**Need help?** Contact the maintainers or create an issue on GitHub.