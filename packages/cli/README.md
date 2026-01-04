# @ideasui/cli

Official CLI for IdeasUI component library. Easily install, manage, and set up IdeasUI components in your React projects.

## Installation

```bash
# Install globally
npm install -g @ideasui/cli

# Or use with npx
npx @ideasui/cli
```

## Quick Start

```bash
# Interactive setup (recommended)
ideasui setup

# Add specific components
ideasui add button ripple

# List all available packages
ideasui list
```

## Commands

### `setup`

Interactive setup wizard for new projects.

```bash
ideasui setup [options]
```

**Options:**
- `--skip-install` - Skip package installation

**Features:**
- ✅ Dynamic package discovery from npm registry
- ✅ Interactive component selection
- ✅ Automatic Tailwind CSS configuration
- ✅ Example component generation
- ✅ Package manager detection (npm/yarn/pnpm/bun)

### `add`

Add specific IdeasUI components to your project.

```bash
ideasui add [components...] [options]
```

**Examples:**
```bash
# Add single component
ideasui add button

# Add multiple components
ideasui add button ripple touchable

# Add all components
ideasui add --all

# Install as dev dependency
ideasui add button --dev
```

**Options:**
- `-a, --all` - Install all available components
- `--dev` - Install as dev dependency

### `list`

List all available IdeasUI packages.

```bash
ideasui list [options]
```

**Examples:**
```bash
# Basic list
ideasui list

# Detailed information
ideasui list --detailed
```

**Options:**
- `-d, --detailed` - Show detailed package information

### `init`

Initialize IdeasUI in existing projects.

```bash
ideasui init [options]
```

**Options:**
- `-t, --typescript` - Use TypeScript (default: true)
- `-s, --styled` - Include styled components

## Available Components

The CLI dynamically discovers all published `@ideasui/*` packages:

- **@ideasui/utils** - Utility functions and helpers
- **@ideasui/button** - Interactive button component
- **@ideasui/ripple** - Material Design ripple effects
- **@ideasui/touchable** - Touchable wrapper with ripples
- **@ideasui/box** - Flexible container component
- **@ideasui/hooks** - Collection of React hooks
- **@ideasui/icons** - SVG icon library
- **@ideasui/theme** - Theme system and tokens

## Features

### 🚀 Dynamic Package Discovery

The CLI automatically discovers all published IdeasUI packages from the npm registry, ensuring you always have access to the latest components.

### 📦 Smart Package Management

Automatically detects your package manager:
- npm
- yarn
- pnpm
- bun

### 🎨 Tailwind CSS Integration

Automatically sets up Tailwind CSS configuration with proper content paths for IdeasUI components.

### 📝 Example Generation

Generates example components based on your selected packages to help you get started quickly.

### ✨ Interactive Experience

User-friendly prompts and colorful output make setup enjoyable and clear.

## Usage Examples

### Complete Project Setup

```bash
# Start new project setup
ideasui setup

# Follow interactive prompts:
# ✓ Select components to install
# ✓ Setup Tailwind CSS
# ✓ Generate example component
```

### Adding Components Later

```bash
# See what's available
ideasui list

# Add specific components
ideasui add button box hooks

# Add everything
ideasui add --all
```

### Component Usage

After installation, import and use components:

```tsx
import {Button} from "@ideasui/button";
import {Box} from "@ideasui/box";
import {useToggle} from "@ideasui/hooks";

function App() {
  const [isOpen, toggle] = useToggle();
  
  return (
    <Box className="p-6">
      <Button onClick={toggle}>
        {isOpen ? "Close" : "Open"}
      </Button>
    </Box>
  );
}
```

## Requirements

- Node.js 16+
- React 18+
- A package.json file in your project

## Support

- 📖 [Documentation](https://ideasui.dev)
- 🐛 [Issues](https://github.com/ideasui/ideasui/issues)
- 💬 [Discord Community](https://discord.gg/ideasui)

## License

MIT © IdeasUI Team