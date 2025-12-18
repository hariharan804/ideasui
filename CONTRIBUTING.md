# Contributing to IdeasUI

Thank you for your interest in contributing to IdeasUI! This guide will help you get started with contributing to our component library.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended package manager)
- Git

### Development Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/your-username/ideasui.git
cd ideasui

# 2. Install dependencies
pnpm install

# 3. Install Playwright browsers (for visual testing)
pnpm run playwright:install

# 4. Start development
pnpm run dev

# 5. Run Storybook
pnpm run storybook
```

## 📋 Development Workflow

### 1. Create a Branch

```bash
# Create a feature branch
git checkout -b feature/component-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Changes

- Follow our [Component Standards](./docs/COMPONENT_STANDARDS.md)
- Write tests for new functionality
- Update documentation as needed
- Ensure accessibility compliance

### 3. Test Your Changes

```bash
# Run unit tests
pnpm run test

# Run visual regression tests
pnpm run test:visual

# Run linting
pnpm run lint

# Type checking
pnpm run typecheck
```

### 4. Commit Your Changes

We use [Conventional Commits](https://conventionalcommits.org/) for consistent commit messages.

```bash
# Stage your changes
git add .

# Commit using our helper (recommended)
pnpm run commit

# Or commit manually with conventional format
git commit -m "feat(button): add new variant prop"
```

## 📝 Commit Convention

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files

### Scopes

Use the component or package name as the scope:

- `button`, `box`, `ripple` (for components)
- `utils`, `variants`, `icons` (for packages)
- `storybook`, `playground` (for apps)
- `docs`, `ci`, `build` (for infrastructure)

### Examples

```bash
# Adding a new feature
feat(button): add loading state with spinner

# Fixing a bug
fix(ripple): resolve animation timing issue

# Documentation update
docs(contributing): add commit convention guide

# Breaking change
feat(button)!: remove deprecated size prop

BREAKING CHANGE: The `size` prop has been removed in favor of the new `scale` prop.
```

## 🛠️ Tooling

Our development environment includes:

### Code Quality

- **ESLint**: Code linting with custom rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **lint-staged**: Run linters on staged files

### Testing

- **Jest**: Unit testing framework
- **@testing-library/react**: React component testing
- **Playwright**: Visual regression testing
- **Storybook**: Component documentation and testing

### Build & Development

- **Turbo**: Monorepo build system
- **tsup**: TypeScript bundler
- **Tailwind CSS**: Utility-first CSS framework
- **tailwind-variants**: Variant management

### Automation

- **Changesets**: Version management and changelog generation
- **GitHub Actions**: CI/CD pipeline
- **Commitizen**: Interactive commit message helper

## 🔄 Pull Request Guidelines

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] Tests pass locally (`pnpm run test`)
- [ ] Visual tests pass (`pnpm run test:visual`)
- [ ] No linting errors (`pnpm run lint`)
- [ ] TypeScript compiles (`pnpm run typecheck`)
- [ ] Documentation is updated
- [ ] Changeset is created (if needed)

### PR Title Format

Use conventional commit format for PR titles:

```
feat(button): add new loading state
fix(ripple): resolve animation performance issue
docs: update contributing guidelines
```

### PR Description Template

```markdown
## Description

Brief description of the changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing

- [ ] Unit tests added/updated
- [ ] Visual tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility testing completed

## Screenshots (if applicable)

Include screenshots or GIFs for visual changes.

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
```

## 📋 Steps to Submit a PR

### 1. Prepare Your Changes

```bash
# Ensure you're on the latest main
git checkout main
git pull origin main

# Create your feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
# ... make changes ...
pnpm run commit
```

### 2. Create Changeset (if needed)

For changes that affect users (new features, bug fixes, breaking changes):

```bash
# Create a changeset
npx changeset

# Follow the prompts to describe your changes
# This will create a file in .changeset/ directory
```

### 3. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create PR through GitHub UI or CLI
gh pr create --title "feat(button): add loading state" --body "Description of changes"
```

### 4. Address Review Feedback

- Respond to review comments
- Make requested changes
- Push additional commits
- Request re-review when ready

## 🎨 Visual Changes

For PRs that include visual changes:

### Screenshots Required

- Before/after screenshots
- All component variants
- Different screen sizes (if responsive)
- Dark mode (if applicable)

### Visual Testing

```bash
# Run visual regression tests
pnpm run test:visual

# Update snapshots if intentional changes
pnpm run test:visual -- --update-snapshots
```

### Storybook Stories

- Update existing stories
- Add new stories for new variants
- Ensure all props are documented
- Add interactive controls

## 💥 Breaking Changes

Breaking changes require special attention:

### Documentation

- Clearly document what's breaking
- Provide migration guide
- Update CHANGELOG.md
- Add `BREAKING CHANGE:` footer in commit

### Changeset

```bash
# Create major changeset for breaking changes
npx changeset
# Select "major" version bump
# Describe the breaking change clearly
```

### Example Breaking Change Commit

```bash
feat(button)!: remove deprecated size prop

BREAKING CHANGE: The `size` prop has been removed. Use the new `scale` prop instead.

Migration:
- Replace `size="small"` with `scale="sm"`
- Replace `size="large"` with `scale="lg"`
```

## 👥 Becoming a Maintainer

We welcome active contributors to become maintainers!

### Requirements

- Consistent contributions over 3+ months
- Deep understanding of the codebase
- Helpful in discussions and reviews
- Follows project guidelines and best practices
- Demonstrates good judgment in technical decisions

### Responsibilities

- Review and merge pull requests
- Triage and respond to issues
- Maintain code quality standards
- Help with releases and versioning
- Mentor new contributors
- Participate in architectural decisions

### Process

1. **Express Interest**: Comment on the "Maintainer Applications" issue
2. **Nomination**: Current maintainers can nominate active contributors
3. **Review**: Existing maintainers review contributions and involvement
4. **Decision**: Consensus among current maintainers
5. **Onboarding**: Access to repository and introduction to maintainer workflows

### Maintainer Levels

#### **Triager**
- Label and organize issues
- Help with initial PR reviews
- Answer community questions

#### **Reviewer**
- Review and approve PRs
- Merge non-breaking changes
- Help with release notes

#### **Core Maintainer**
- Full repository access
- Make architectural decisions
- Manage releases and versioning
- Mentor other maintainers

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions
- Follow our [Code of Conduct](./CODE_OF_CONDUCT.md)

### Getting Help

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Report bugs and request features
- **Discord**: Join our community chat (link in README)
- **Documentation**: Check our comprehensive docs

### Recognition

We recognize contributors in:

- README.md contributors section
- Release notes and changelogs
- Annual contributor highlights
- Special badges and mentions

## 📚 Resources

- [Component Standards](./docs/COMPONENT_STANDARDS.md)
- [Testing Guide](./docs/TESTING_GUIDE.md)
- [Development Setup](./docs/DEVELOPMENT_SETUP.md)
- [Naming Conventions](./docs/NAMING_CONVENTIONS.md)
- [Storybook Documentation](http://localhost:6006)

## 🎯 What to Contribute

### High Priority

- New components (following our roadmap)
- Bug fixes and performance improvements
- Accessibility enhancements
- Documentation improvements
- Test coverage improvements

### Medium Priority

- Component variants and customization
- Developer experience improvements
- Build and tooling enhancements
- Example applications

### Low Priority

- Code refactoring (without functional changes)
- Minor style adjustments
- Non-critical feature additions

Thank you for contributing to IdeasUI! Your efforts help make this library better for everyone. 🚀