# Release Guide

This guide explains how to version and publish the IdeasUI library using Changesets.

## Release Hierarchy

Understanding when to use which workflow:

1.  **Snapshot (Canary)**: "I need to test this specific commit."
    - _Usage_: CI/CD, Pull Requests, quick checks.
    - _Effect_: Publishes temporary version, **NO** changelog update.
2.  **Pre-Release (Beta/Alpha)**: "We are preparing for a major release."
    - _Usage_: Long-running development cycles (e.g., v1.0.0-beta.x).
    - _Effect_: Publishes pre-release versions, **UPDATES** changelog.
3.  **Stable (Latest)**: "We are ready for production."
    - _Usage_: Official releases.
    - _Effect_: Publishes official version, **UPDATES** changelog, tags `latest`.

---

## 1. Canary (Snapshot) Release

Use for temporary testing. Does not modify your project history.

**Steps:**

1.  **Create Changeset** (Optional but recommended so you know what's in it):
    ```bash
    pnpm changeset
    ```
2.  **Generate Version**:
    ```bash
    pnpm version:canary
    ```
    _Generates versions like `0.0.0-canary-2024011601`_
3.  **Publish**:
    ```bash
    pnpm release:canary
    ```

**Clean up**: Discard the changes to `package.json` after publishing if you run this locally.

---

## 2. Stable (Latest) Release

The standard workflow for shipping updates.

**Steps:**

1.  **Develop & Document**:
    - Run `pnpm changeset` whenever you make a meaningful change.
2.  **Version**:
    ```bash
    pnpm version
    ```
    _Consumes changesets, updates `package.json` versions, and writes to `CHANGELOG.md`._
3.  **Publish**:
    ```bash
    pnpm release
    ```
4.  **Commit**: Push the changes (changelog and package.json) to Git.
    ```bash
    git push --follow-tags
    ```

---

## 3. Pre-Release (Beta / Alpha)

For keeping the codebase in a "beta" state for an extended period.

**Steps:**

**A. Enter Pre Mode (One time):**

```bash
pnpm changeset:beta
# OR
pnpm changeset:canary
```

**B. Release Loop (Repeat as needed):**

1.  Make changes and run `pnpm changeset`.
2.  Version packages:
    ```bash
    pnpm version
    ```
    _This will now generate versions like `1.0.0-beta.1`, `beta.2`, etc._
3.  Publish:
    ```bash
    pnpm release
    ```

**C. Exit Pre Mode (When ready for Stable):**

```bash
pnpm exec changeset pre exit
```

After exiting, the next `pnpm version` will perform a stable release (e.g., `1.0.0`).

---

## 4. Manual Single Package Release (From Root)

If you need to bypass `changesets` to release only one specific package (without cascading version bumps to dependents), you can run everything directly from the monorepo root using pnpm's `--filter` flag.

**Steps:**

1.  **Manually Bump the Version:**
    Open the targeted `package.json` (e.g., `packages/core/theme/package.json`) and manually update the `"version"` field.
    _(Note: Running `pnpm version patch` directly usually fails due to strict workspace peer-dependency checks, so typing the new version by hand is much safer.)_

2.  **Build the Package:**
    Use the `--filter` flag to build only that specific package from the root:

    ```bash
    pnpm --filter @ideasui/theme build
    ```

3.  **Publish to NPM:**
    Publish using `--filter` to run the command inside the specific package context:

    ```bash
    pnpm --filter @ideasui/theme publish --access public --no-git-checks
    ```

    _(If you encounter a `404 Not Found` error, ensure you are logged into the correct NPM account via `npm login` and have permissions for `@ideasui`. If you hit a `clean-package` module resolution error, verify your root node_modules are intact by running `pnpm install`)._

4.  **Commit the manual bump:**
    ```bash
    git add packages/core/theme/package.json
    git commit -m "chore: bumped @ideasui/theme version manually"
    ```

---

## Command Cheat Sheet

| Task                 | Command                        | Description                                |
| :------------------- | :----------------------------- | :----------------------------------------- |
| **Add Changeset**    | `pnpm changeset`               | Document a change (patch/minor/major).     |
| **Stable Version**   | `pnpm version`                 | Apply changesets to versions & changelog.  |
| **Stable Publish**   | `pnpm release`                 | Publish stable versions to npm.            |
| **Snapshot Version** | `pnpm version:canary`          | Create temp canary version (no changelog). |
| **Snapshot Publish** | `pnpm release:canary`          | Publish temp canary version.               |
| **Enter Gamma**      | `pnpm changeset:beta`          | Enter beta mode.                           |
| **Exit Gamma**       | `pnpm exec changeset pre exit` | Return to stable mode.                     |

---

## Benefits

- **Clean History**: GitHub-styled changelogs are generated automatically.
- **Public Access**: Packages are published to npm.
- **Flexible Versioning**: Support for both stable semantic versioning and temporary snapshot builds (e.g., `1.4.0-canary.20260116T122000`).
- **Standard Branching**: Keep `main` as your reliable release branch.

---

## Example Changesets (Copy-Paste Templates)

### 📌 Patch Update (Bug Fixes)

```markdown
---
'your-package-name': patch
---

Fixes padding alignment in the Button component.
```

### 📌 Minor Update (New Features)

```markdown
---
'your-package-name': minor
---

Added new `Card` component with responsive variants.
```

### 📌 Major Update (Breaking Changes)

```markdown
---
'your-package-name': major
---

BREAKING CHANGE:
Icons are now exported from `/icons` instead of root.
```

---

## 5. Release Workflows (Easy Memory Guide)

### 🔵 Stable

Standard production release.

```bash
pnpm changeset
pnpm version
pnpm release
```

### 🟠 Beta (Pre-Release)

Long-term beta phase.

```bash
# 1. Enter Beta Mode (Do this once)
pnpm changeset:beta

# 2. Release Loop (Repeat)
pnpm changeset
pnpm version:beta
pnpm release:beta

# 3. Exit (When done)
pnpm changeset:exit
```

### 🟣 Canary (Snapshot)

Quick temporary build. **Do NOT enter pre-mode.**

```bash
# 1. Create temporary version
pnpm version:canary

# 2. Publish
pnpm release:canary
```
