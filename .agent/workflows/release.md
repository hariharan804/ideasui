---
description: How to release new versions
---

# Release Workflow

## Release Strategy

IdeasUI uses **Changesets** for version management and publishing.

## Creating a Changeset

After making changes, create a changeset to document them:

// turbo

```bash
pnpm changeset
```

Follow the prompts:

1. **Select packages** - Choose which packages changed
2. **Select bump type**:
   - `patch` - Bug fixes, minor changes (0.0.X)
   - `minor` - New features, backward compatible (0.X.0)
   - `major` - Breaking changes (X.0.0)
3. **Write summary** - Describe the changes for the changelog

This creates a file in `.changeset/` directory.

## Release Types

### Regular Release (Stable)

For production-ready releases:

```bash
# 1. Version packages (updates package.json and CHANGELOG.md)
pnpm version

# 2. Build all packages
pnpm build

# 3. Publish to npm
pnpm release
```

### Beta Release (Pre-release)

For testing before stable release:

```bash
# 1. Enter beta mode
pnpm changeset:beta

# 2. Version as beta
pnpm version:beta

# 3. Build packages
pnpm build

# 4. Publish with beta tag
pnpm release:beta

# 5. Exit beta mode when done
pnpm changeset:exit
```

### Canary Release (Snapshot)

For quick testing of unreleased changes:

```bash
# 1. Enter canary mode
pnpm changeset:canary

# 2. Version as snapshot
pnpm version:canary

# 3. Build packages
pnpm build

# 4. Publish with canary tag
pnpm release:canary

# 5. Exit canary mode
pnpm changeset:exit
```

## Automated Release (CI/CD)

Releases are automated via GitHub Actions:

1. **Create changesets** on your feature branch
2. **Merge to main** - Triggers release workflow
3. **Release PR is created** - Reviews version bumps and changelogs
4. **Merge Release PR** - Automatically publishes to npm

See `.github/workflows/release.yml` for details.

## Pre-Release Checklist

Before releasing:

- [ ] All tests pass locally (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Visual tests pass (`pnpm test:visual`)
- [ ] Documentation is updated
- [ ] CHANGELOG entries are accurate
- [ ] Version bumps are correct
- [ ] No uncommitted changes
- [ ] On main branch (for stable releases)

## Versioning Guidelines

Follow [Semantic Versioning](https://semver.org/):

### Patch (0.0.X)

- Bug fixes
- Documentation updates
- Performance improvements
- Refactoring without API changes

### Minor (0.X.0)

- New features
- New components
- New props (backward compatible)
- Deprecations (with warnings)

### Major (X.0.0)

- Breaking changes
- Removed features
- Changed interfaces
- Renamed props/components

## Release Notes

Changesets automatically generate:

- Updated `package.json` versions
- `CHANGELOG.md` entries for each package
- GitHub release notes

Write clear, user-focused changeset messages:

**Good:**

```
Added `radius` prop to Button component for custom border radius
```

**Bad:**

```
Updated button
```

## Publishing Scoped Packages

All packages are published under `@ideasui` scope:

```json
{
  "name": "@ideasui/button",
  "publishConfig": {
    "access": "public"
  }
}
```

## Rollback a Release

If a release has issues:

```bash
# 1. Unpublish the problematic version (within 72 hours)
npm unpublish @ideasui/package-name@version

# 2. Fix the issue
# 3. Create new changeset
pnpm changeset

# 4. Release patch version
pnpm version && pnpm build && pnpm release
```

**After 72 hours:** Can't unpublish, must release a new patch.

## Troubleshooting

### "No changesets found"

Create at least one changeset before versioning:

```bash
pnpm changeset
```

### "Package not published"

Check:

1. Logged in to npm (`npm whoami`)
2. Have publish permissions for `@ideasui` scope
3. Package builds successfully (`pnpm build`)
4. `publishConfig.access` is set to `"public"`

### "Version already published"

Version already exists on npm. Bump version again:

```bash
pnpm changeset
pnpm version
```

## NPM Authentication

For automated publishing:

1. Get npm token: `npm login` then `npm token create`
2. Add to GitHub secrets as `NPM_TOKEN`
3. Used in `.github/workflows/release.yml`

## Monitoring Releases

- **NPM**: https://www.npmjs.com/org/ideasui
- **GitHub Releases**: https://github.com/ideas2logic-lab/ideasui/releases
- **Changeset Bot**: Comments on PRs with changeset status
