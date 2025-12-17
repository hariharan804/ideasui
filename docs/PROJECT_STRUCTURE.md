# Project Structure

## 📁 Next.js Component Library Structure

```
my-component-lib/
├── packages/
│   ├── ui/                     # Main component library
│   │   ├── src/
│   │   │   ├── components/     # ShadCN base components
│   │   │   │   ├── ui/         # Core UI components
│   │   │   │   └── index.ts    # Component exports
│   │   │   ├── lib/            # Utilities
│   │   │   ├── hooks/          # Custom hooks
│   │   │   └── index.ts        # Main export
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.js
│   │   └── components.json     # ShadCN config
│   │
│   └── playground/             # Next.js playground app
│       ├── app/                # Next.js 13+ app directory
│       │   ├── components/     # Demo components
│       │   ├── globals.css     # Global styles
│       │   ├── layout.tsx      # Root layout
│       │   └── page.tsx        # Home page
│       ├── components/         # Playground components
│       ├── public/             # Static assets
│       ├── package.json
│       ├── next.config.js
│       ├── tailwind.config.js
│       └── tsconfig.json
│
├── apps/
│   └── docs/                   # Next.js documentation site
│       ├── app/
│       │   ├── docs/           # Documentation pages
│       │   ├── examples/       # Component examples
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/         # Doc components
│       ├── content/            # MDX content
│       ├── package.json
│       ├── next.config.js
│       └── tsconfig.json
│
├── .github/
│   └── workflows/              # CI/CD workflows
│       ├── ci.yml
│       ├── deploy.yml
│       └── release.yml
│
├── docs/                       # Repository documentation
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # Workspace configuration
├── turbo.json                  # Turborepo configuration
├── project-context.json        # Project context
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## 📦 Package Responsibilities

### `packages/ui`

- Core component library
- ShadCN/UI base components
- TypeScript definitions
- Tailwind CSS styles
- Utility functions and hooks

### `packages/playground`

- Next.js playground application
- Interactive component demos
- Live component testing
- Development environment
- Component showcase

### `apps/docs`

- Next.js documentation site
- API reference with MDX
- Usage guides and examples
- Component documentation
- Interactive examples

## 🔧 Configuration Files

### Root Level

- `package.json` - Workspace dependencies and scripts
- `pnpm-workspace.yaml` - Package manager workspace config
- `turbo.json` - Build system configuration
- `.eslintrc.js` - Linting rules
- `.prettierrc` - Code formatting
- `tsconfig.json` - Base TypeScript config

### Package Level

- `package.json` - Package-specific dependencies
- `tsconfig.json` - Package TypeScript config
- `tailwind.config.js` - Tailwind configuration
- `components.json` - ShadCN configuration
- `next.config.js` - Next.js configuration
