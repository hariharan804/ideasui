# IdeasUI CLI

Command-line interface for creating and managing IdeasUI components.

## Installation

```bash
npm install -g @ideasui/cli
```

## Commands

### `iui init`

Initialize IdeasUI in your project:

```bash
iui init
```

Options:
- `--typescript` - Use TypeScript (default: true)
- `--styled` - Include styled components

### `iui create <type> <name>`

Create a new component:

```bash
iui create component Button
iui create primitive Toggle
iui create hook useLocalStorage
```

Options:
- `-t, --template <template>` - Component template (default: default)
- `-d, --dir <directory>` - Output directory (default: ./src/components)

## Examples

### Initialize Project
```bash
# Initialize with defaults
iui init

# Custom configuration
iui init --typescript --styled
```

### Create Components
```bash
# Basic component
iui create component Button

# Component with custom directory
iui create component Modal -d ./src/ui

# Primitive component
iui create primitive Toggle

# Custom hook
iui create hook useToggle
```

## Generated Structure

### Component
```
src/components/button/
├── button.tsx           # Main component
├── button.test.tsx      # Unit tests
├── button.stories.tsx   # Storybook stories
├── index.ts             # Exports
└── package.json         # Package config
```

### Features

- **Interactive**: Prompts for configuration options
- **TypeScript**: Full TypeScript support
- **Testing**: Generates unit tests with Jest
- **Storybook**: Creates stories for documentation
- **Workspace**: Generates package.json for monorepo
- **Templates**: Multiple component templates
- **Validation**: Validates component names and structure

## Templates

### Basic Component
- Simple component with variants
- TypeScript interfaces
- Basic styling with Tailwind

### With Variants
- Multiple visual variants
- Size options
- Compound variants

### Compound Component
- Multiple sub-components
- Context-based API
- Advanced composition patterns

## Configuration

The CLI reads configuration from:
- `package.json` - Project settings
- `.iuirc.json` - CLI-specific config
- Command-line options

Example `.iuirc.json`:
```json
{
  "componentsDir": "./src/components",
  "template": "with-variants",
  "includeStories": true,
  "includeTests": true
}
```