# GitHub Packages Publishing Guide

## 📦 Overview

This guide explains how to publish component packages to GitHub Packages Registry instead of NPM.

## 🔧 Configuration

### 1. Package Configuration

Each component package is configured for GitHub Packages:

```json
// packages/button/package.json
{
  "name": "@mylib/button",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 2. Authentication Setup

#### Root `.npmrc`
```
@mylib:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

#### GitHub Token
Create a Personal Access Token with `packages:write` permission:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `write:packages`, `read:packages`
4. Copy the token

## 🚀 Publishing Process

### Manual Publishing

```bash
# 1. Build the package
cd packages/button
pnpm build

# 2. Set authentication token
export NODE_AUTH_TOKEN=your_github_token

# 3. Publish to GitHub Packages
pnpm publish --registry https://npm.pkg.github.com
```

### Automated Publishing (GitHub Actions)

#### Workflow Trigger
Publishing happens automatically when you create a git tag:

```bash
# Create and push a tag
git tag v1.0.0
git push origin v1.0.0
```

#### Workflow File
```yaml
# .github/workflows/publish.yml
name: Publish to GitHub Packages

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
          registry-url: 'https://npm.pkg.github.com'
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Build packages
        run: pnpm build
      - name: Publish to GitHub Packages
        run: pnpm publish --registry https://npm.pkg.github.com
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 📥 Installing Published Packages

### Consumer Setup

Users need to configure their `.npmrc` to install from GitHub Packages:

```bash
# Create .npmrc in consumer project
echo "@mylib:registry=https://npm.pkg.github.com" >> .npmrc
```

### Authentication for Installation

```bash
# Login to GitHub Packages
npm login --scope=@mylib --registry=https://npm.pkg.github.com

# Or set token directly
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> .npmrc
```

### Install Package

```bash
# Install the button component
npm install @mylib/button

# Or with pnpm
pnpm add @mylib/button
```

## 📋 Step-by-Step Publishing Example

### Example: Publishing Button Component v1.0.0

#### Step 1: Prepare Release
```bash
# Update version in package.json
cd packages/button
npm version 1.0.0
```

#### Step 2: Build Package
```bash
pnpm build
```

#### Step 3: Create Git Tag
```bash
git add .
git commit -m "feat: release button component v1.0.0"
git tag v1.0.0
git push origin main
git push origin v1.0.0
```

#### Step 4: Verify Publication
1. Go to your GitHub repository
2. Click "Packages" tab
3. Verify `@mylib/button` package appears

#### Step 5: Test Installation
```bash
# In a test project
echo "@mylib:registry=https://npm.pkg.github.com" > .npmrc
npm install @mylib/button
```

## 🔍 Package Visibility

### Public Packages
```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "public"
  }
}
```

### Private Packages (Default)
```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Authentication Failed
```bash
# Check token permissions
# Ensure token has packages:write scope
```

#### 2. Package Not Found
```bash
# Verify registry configuration
npm config get @mylib:registry
```

#### 3. Permission Denied
```bash
# Check repository permissions
# Ensure you have write access to the repository
```

### Debug Commands

```bash
# Check npm configuration
npm config list

# Test authentication
npm whoami --registry=https://npm.pkg.github.com

# Dry run publish
pnpm publish --dry-run --registry https://npm.pkg.github.com
```

## 📊 Package Management

### View Published Packages
```bash
# List all versions
npm view @mylib/button versions --registry=https://npm.pkg.github.com

# View package info
npm view @mylib/button --registry=https://npm.pkg.github.com
```

### Unpublish Package
```bash
# Unpublish specific version
npm unpublish @mylib/button@1.0.0 --registry=https://npm.pkg.github.com
```

## 🔄 Multi-Package Publishing

### Publish All Packages
```bash
# Build all packages
pnpm build

# Publish all packages with same tag
for package in packages/*; do
  cd $package
  pnpm publish --registry https://npm.pkg.github.com
  cd ../..
done
```

### Workspace Publishing
```bash
# Using pnpm workspaces
pnpm -r publish --registry https://npm.pkg.github.com
```