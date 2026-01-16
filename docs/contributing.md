# Contributing Guide

## How to Commit Changes

We use **Conventional Commits** to ensure our project history is readable and semantic versions can be automatically generated.

### The Problem: Strict Linting

If you run `git commit -m "fix bug"`, it will fail because it doesn't match the required format (e.g., `fix: resolve crash in button`).

### The Solution: Use `pnpm commit`

Use the interactive CLI to guide you through the process:

```bash
pnpm commit
```

**What happens next:**

1.  **Select Type**: Choose from `feat`, `fix`, `docs`, `style`, `refactor`, etc.
2.  **Scope**: (Optional) Which component did you change? (e.g., `button`, `core`).
3.  **Short Description**: Write a brief summary (e.g., `add new variant`).
4.  **Confirm**: The tool generates the message (e.g., `feat(button): add new variant`) and commits for you.

### Manual Commits (Advanced)

If you prefer standard git commands, format your message like this:

```
<type>(<scope>): <subject>
```

**Examples:**

- `feat(button): add ghost variant`
- `fix(utils): resolve duplicate id error`
- `docs: update release guide`
