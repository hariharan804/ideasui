# IdeasUI Playground

This is a [Next.js](https://nextjs.org) playground app for testing and developing IdeasUI components.

## Getting Started

From the root of the IdeasUI monorepo:

```bash
# Install dependencies
pnpm install

# Start the playground development server
pnpm run dev:playground
```

Or run directly from the playground directory:

```bash
pnpm dev
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Purpose

This playground app serves as:

- **Component Testing**: Test IdeasUI components in a real Next.js environment
- **Development Environment**: Develop and iterate on components
- **Integration Testing**: Ensure components work correctly with Next.js SSR/SSG
- **Package Testing**: Test different package versions (alpha, beta, canary, latest)

## Available Scripts

```bash
# Development
pnpm run dev:playground       # Start development server from root (port 3005)
pnpm run build                # Build playground for production

# Package Testing
pnpm run test:alpha          # Test with alpha packages
pnpm run test:beta           # Test with beta packages
pnpm run test:canary         # Test with canary packages
pnpm run test:latest         # Test with latest packages
pnpm run restore:workspace   # Restore workspace dependencies
```

## IdeasUI Components

The playground includes examples of:

- `@ideasui/button` - Interactive button component
- `@ideasui/ripple` - Material Design ripple effects
- `@ideasui/theme` - Theme system with recipes and tokens
- `@ideasui/utils` - Shared utilities

## Learn More

To learn more about IdeasUI:

- [IdeasUI Documentation](https://ideasui.com) - Component library documentation
- [GitHub Repository](https://github.com/ideas2logic-lab/ideasui) - Source code and issues

To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
