# Publishability Report

## 📦 Package Status Summary

| Package | Status | Critical Issues |
|---------|--------|----------------|
| **@ideasui/button** | ⚠️ **Needs Fixes** | Missing exports config, version 0.0.0 |
| **@ideasui/ripple** | ⚠️ **Needs Fixes** | Missing exports config, version 0.0.0, duplicate deps |
| **@ideasui/slot** | ⚠️ **Needs Fixes** | Missing tsconfig.json, wrong repo directory |
| **@ideasui/theme** | ⚠️ **Needs Fixes** | Missing clean-package config, files config issues |

## 🚨 Critical Issues to Fix

### All Packages:
1. **Missing `exports` field** - Required for modern bundlers
2. **Missing `module` and `types` fields** in package.json
3. **Version 0.0.0** - Need proper versioning for button/ripple

### Button Package:
- Missing proper exports configuration
- Need to update version from 0.0.0

### Ripple Package:
- Duplicate `@ideasui/utils` in both deps and devDeps
- Missing proper exports configuration
- Need to update version from 0.0.0

### Slot Package:
- **Missing `tsconfig.json`** file
- Wrong repository directory path (points to button instead of slot)
- Missing `clean-package` configuration

### Theme Package:
- `files` field includes `src` instead of `dist`
- Missing `clean-package` configuration
- Missing proper `module` and `types` fields

## ✅ Required Changes for Publishing

### 1. Fix package.json exports for Button & Ripple:
```json
{
  "main": "dist/index.js",
  "module": "dist/index.mjs", 
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

### 2. Create missing tsconfig.json for Slot package

### 3. Fix Slot package repository directory:
```json
{
  "repository": {
    "directory": "packages/components/slot"
  }
}
```

### 4. Update Theme package files field:
```json
{
  "files": ["dist", "theme.css"]
}
```

### 5. Remove duplicate dependencies in Ripple package

### 6. Update versions from 0.0.0 to proper semver

## 📋 Checklist Before Publishing

- [ ] Fix all package.json exports configurations
- [ ] Create missing tsconfig.json files
- [ ] Remove duplicate dependencies
- [ ] Update package versions
- [ ] Fix repository directory paths
- [ ] Update files field configurations
- [ ] Add missing clean-package configurations
- [ ] Run build tests for all packages
- [ ] Verify TypeScript compilation
- [ ] Test package installations locally

## 🔧 Next Steps

1. Use Code Issues Panel for detailed findings
2. Apply fixes systematically per package
3. Test builds after each fix
4. Verify package installations work
5. Update changelog/version numbers
6. Publish to registry