# IdeasUI Development Rules

This directory contains the central guidelines for developing the IdeasUI design system. These rules ensure consistency, accessibility, and high code quality across all packages.

## 📋 Core Rule Files

| File                                                   | Description                                                                            |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [project-structure.md](./project-structure.md)         | **Source of Truth** for monorepo organization, package layout, and naming conventions. |
| [component-development.md](./component-development.md) | Guidelines for building React components, styling with recipes, and testing.           |
| [accessibility.md](./accessibility.md)                 | WCAG 2.1 AA compliance, ARIA patterns, and screen reader support.                      |
| [code-quality.md](./code-quality.md)                   | General code standards, complexity limits, and performance goals.                      |
| [typescript-quality.md](./typescript-quality.md)       | TypeScript configurations, strict mode, and type safety rules.                         |
| [tailwind-theme.md](./tailwind-theme.md)               | Tailwind CSS v4 implementation and the `@ideasui/theme` system.                        |

## 🛠️ Usage

These rules are enforced by automated tooling (e.g., `pnpm check-naming`) and are used by the AI agent to maintain project integrity. Refer to these documents before creating new packages or components.

## 📚 Related Documentation

- [Project README](../README.md) - General overview and setup.
- [Package List](../PACKAGE_LIST.md) - Auto-generated list of all current packages.
- [Storybook](https://ideasui.com/storybook) - Live documentation and component playground.
