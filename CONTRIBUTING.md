# Contributing

## Development Setup

```bash
pnpm install
pnpm dev
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/component-name`
3. Make changes following our guidelines
4. Add tests for new components
5. Run tests: `pnpm test`
6. Commit using conventional commits: `pnpm commit`
7. Push and create a pull request

## Component Guidelines

- Use TypeScript for all components
- Follow existing naming conventions
- Include proper prop types and documentation
- Add Storybook stories for new components
- Ensure accessibility compliance

## Code Style

- ESLint and Prettier are enforced via pre-commit hooks
- Use conventional commit messages
- Keep components focused and reusable
