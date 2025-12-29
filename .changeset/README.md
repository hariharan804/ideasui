# Changesets

This directory contains changeset files for managing releases and changelogs in the IdeasUI monorepo.

## What are Changesets?

Changesets are a way to manage versioning and changelogs with a focus on multi-package repositories. They help us:

- Track which packages need to be released
- Generate changelogs automatically
- Follow semantic versioning
- Coordinate releases across multiple packages

## How to Use

### 1. Create a Changeset

When you make changes that should trigger a release:

```bash
pnpm changeset
```

This will:
- Ask which packages were affected
- Ask what type of change (major, minor, patch)
- Create a changeset file with your description

### 2. Version Packages

When ready to release:

```bash
pnpm changeset version
```

This will:
- Update package.json versions
- Generate/update CHANGELOG.md files
- Remove consumed changeset files

### 3. Publish Packages

```bash
pnpm changeset publish
```

This will:
- Build and publish packages to npm
- Create git tags for releases

## Changeset Types

- **Major** (breaking changes): `1.0.0` → `2.0.0`
- **Minor** (new features): `1.0.0` → `1.1.0`
- **Patch** (bug fixes): `1.0.0` → `1.0.1`

## Example Workflow

```bash
# 1. Make your changes
git checkout -b feat/new-component

# 2. Create changeset
pnpm changeset
# Select packages: @ideasui/button
# Select type: minor
# Add description: "Add new ripple effect"

# 3. Commit changeset
git add .changeset/
git commit -m "feat: add ripple effect to button"

# 4. After PR is merged, maintainer runs:
pnpm changeset version
pnpm changeset publish
```

## Configuration

See `config.json` for changeset configuration including:
- GitHub integration for changelog links
- Ignored packages (config packages)
- Access level (public)
- Base branch (master)

## Files in this Directory

- `config.json` - Changeset configuration
- `*.md` - Individual changeset files (auto-generated)
- `README.md` - This documentation

## Tips

- Always create changesets for user-facing changes
- Use descriptive messages in changesets
- Group related changes in a single changeset when possible
- Config-only changes usually don't need changesets