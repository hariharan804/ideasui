# Canary Publishing Guide

Guide for publishing and testing canary versions of IdeasUI components before stable release.

## 🧪 What is Canary Publishing?

Canary publishing allows you to:

- Test components in real projects before stable release
- Get feedback from early adopters
- Catch integration issues early
- Safe rollback if problems are found

## 🚀 Publishing Canary Versions

### Method 1: Using Changesets (Recommended)

1. **Create snapshot changeset**:

   ```bash
   npx changeset version --snapshot canary
   ```

2. **Build and publish canary**:

   ```bash
   pnpm run build:publish
   npx changeset publish --tag canary
   ```

3. **Verify canary published**:
   ```bash
   pnpm view @ideasui/button dist-tags
   # Should show: canary: 0.1.0-canary-20231201
   ```

### Method 2: Manual Canary Publish

1. **Build component**:

   ```bash
   pnpm run build:publish -- --filter=@ideasui/button
   ```

2. **Navigate to component**:

   ```bash
   cd packages/components/button
   ```

3. **Publish with canary tag**:
   ```bash
   pnpm publish --tag canary
   ```

### Method 3: Specific Component Canary

1. **Single component canary**:

   ```bash
   # Build specific component
   pnpm run build -- --filter=@ideasui/button

   # Update version manually
   cd packages/components/button
   pnpm version prerelease --preid=canary

   # Publish canary
   pnpm publish --tag canary
   ```

## 🔍 Testing Canary Versions

### 1. Create Test Project

```bash
# Create new test project
npx create-next-app@latest canary-test
cd canary-test

# Install canary version
pnpm install @ideasui/button@canary
```

### 2. Test Component Integration

```tsx
// pages/index.tsx or app/page.tsx
import {Button} from "@ideasui/button";

export default function Home() {
  return (
    <div className="space-y-4 p-8">
      <h1>Canary Testing</h1>

      {/* Test all variants */}
      <div className="space-x-2">
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      {/* Test all colors */}
      <div className="space-x-2">
        <Button color="primary">Primary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>

      {/* Test all sizes */}
      <div className="space-x-2">
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="md">MD</Button>
        <Button size="lg">LG</Button>
        <Button size="xl">XL</Button>
      </div>
    </div>
  );
}
```

### 3. Test Build Process

```bash
# Test development
pnpm run dev

# Test production build
pnpm run build
pnpm run start

# Check for errors
pnpm run lint
```

### 4. Test TypeScript Integration

```tsx
// components/TestComponent.tsx
import {Button} from "@ideasui/button";
import type {ButtonProps} from "@ideasui/button";

interface TestProps {
  buttonProps: ButtonProps;
}

export function TestComponent({buttonProps}: TestProps) {
  return <Button {...buttonProps}>TypeScript Test</Button>;
}
```

## ✅ Canary Testing Checklist

### Installation & Import

- [ ] Canary version installs without errors
- [ ] Component imports correctly
- [ ] TypeScript types work properly
- [ ] No peer dependency conflicts

### Visual Testing

- [ ] All variants render correctly
- [ ] All colors display properly
- [ ] All sizes work as expected
- [ ] Hover states function
- [ ] Focus states visible
- [ ] Disabled states work

### Functionality Testing

- [ ] Click handlers work
- [ ] Keyboard navigation functions
- [ ] Form integration works
- [ ] Custom className merging
- [ ] Ref forwarding works

### Build Testing

- [ ] Development mode works
- [ ] Production build succeeds
- [ ] No console errors/warnings
- [ ] Bundle size acceptable
- [ ] Tree shaking works

### Integration Testing

- [ ] Works with other UI libraries
- [ ] CSS-in-JS compatibility
- [ ] SSR/SSG compatibility
- [ ] Framework integration (Next.js, Vite, etc.)

## 📊 Canary Feedback Collection

### 1. Create Feedback Template

```markdown
## Canary Feedback: @ideasui/button@canary

### Environment

- Framework: Next.js 16
- Node: v20
- Package Manager: pnpm

### Testing Results

- [ ] Installation successful
- [ ] Visual rendering correct
- [ ] Functionality works
- [ ] TypeScript integration
- [ ] Build process

### Issues Found

- Issue 1: Description
- Issue 2: Description

### Suggestions

- Suggestion 1
- Suggestion 2

### Overall Rating

- [ ] Ready for stable release
- [ ] Needs minor fixes
- [ ] Needs major changes
```

### 2. Collect Feedback

```bash
# Share canary version info
echo "Test canary version:"
echo "pnpm install @ideasui/button@canary"
echo "Version: $(pnpm view @ideasui/button@canary version)"
```

## 🔄 Promoting Canary to Stable

### 1. Review Feedback

- Collect all canary feedback
- Address critical issues
- Document breaking changes
- Update component if needed

### 2. Promote to Stable

```bash
# Create stable changeset
npx changeset

# Version packages
npx changeset version

# Build and publish stable
pnpm run build:publish
npx changeset publish
```

### 3. Clean Up Canary

```bash
# Remove canary tag (optional)
pnpm dist-tag rm @ideasui/button canary

# Verify stable version
pnpm view @ideasui/button dist-tags
```

## 🚨 Canary Rollback

### If Issues Found

1. **Stop recommending canary**:

   ```bash
   # Don't promote to stable
   # Fix issues first
   ```

2. **Publish fixed canary**:

   ```bash
   # Fix issues in code
   # Publish new canary version
   pnpm version prerelease --preid=canary
   pnpm publish --tag canary
   ```

3. **Deprecate broken canary**:
   ```bash
   # Deprecate specific version
   pnpm deprecate @ideasui/button@0.1.0-canary-broken "Use newer canary version"
   ```

## 📋 Canary Workflow Summary

1. **Develop** → Component ready for testing
2. **Canary Publish** → `pnpm publish --tag canary`
3. **Test** → Install and test in real projects
4. **Feedback** → Collect user feedback
5. **Fix** → Address issues if found
6. **Promote** → Publish stable version
7. **Cleanup** → Remove canary tags

## 🔧 Automation Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "canary:publish": "pnpm run build:publish && pnpm publish --tag canary",
    "canary:test": "pnpm pack && echo 'Test with: pnpm install ./ideasui-button-*.tgz'",
    "canary:promote": "npx changeset version && npx changeset publish",
    "canary:cleanup": "pnpm dist-tag rm @ideasui/button canary"
  }
}
```

### Canary Test Script

```bash
#!/bin/bash
# canary-test.sh

COMPONENT=$1
VERSION=$(pnpm view @ideasui/$COMPONENT@canary version)

echo "Testing canary: @ideasui/$COMPONENT@$VERSION"

# Create temp test project
mkdir canary-test-$COMPONENT
cd canary-test-$COMPONENT

# Initialize project
pnpm init -y
pnpm install @ideasui/$COMPONENT@canary

# Test import
echo "import { $COMPONENT } from '@ideasui/$COMPONENT'" > test.js
node -c test.js && echo "✅ Import successful" || echo "❌ Import failed"

# Cleanup
cd ..
rm -rf canary-test-$COMPONENT
```

## 📚 Best Practices

### Canary Naming

- Use semantic versioning with prerelease identifier
- Include date/time for uniqueness: `0.1.0-canary-20231201`
- Keep canary versions short-lived

### Testing Strategy

- Test in multiple environments
- Test with different bundlers
- Test with different React versions
- Get feedback from diverse users

### Communication

- Clearly mark as canary/experimental
- Provide feedback channels
- Document known issues
- Set expectations for stability
