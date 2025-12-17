# IdeasUI CLI

Command-line interface for creating and managing IdeasUI components.

## Installation

```bash
npm install -g @ideasui/cli
```

## Commands

### `ideasui init`

Initialize IdeasUI in your project:

```bash
ideasui init
```

Options:

- `--typescript` - Use TypeScript (default: true)
- `--styled` - Include styled components

## Examples

### Initialize Project

```bash
# Initialize with defaults
ideasui init

# Custom configuration
ideasui init --typescript --styled
```

## Configuration

The CLI reads configuration from:

- `package.json` - Project settings
- `.ideasuirc.json` - CLI-specific config
- Command-line options

Example `.ideasuirc.json`:

```json
{
  "componentsDir": "./src/components",
  "template": "with-variants",
  "includeStories": true,
  "includeTests": true
}
```
