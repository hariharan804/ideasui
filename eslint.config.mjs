// ESLint configuration for IdeasUI component library
import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Core plugins
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

// React ecosystem
import react from 'eslint-plugin-react';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactRefresh from 'eslint-plugin-react-refresh';

// Code quality
import _import from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';
import security from 'eslint-plugin-security';
import promise from 'eslint-plugin-promise';
import boundaries from 'eslint-plugin-boundaries';

// Styling & formatting
import prettier from 'eslint-plugin-prettier';

// Testing
import testingLibrary from 'eslint-plugin-testing-library';

// Tailwind CSS - Enabled for Tailwind CSS v4
import tailwindcss from 'eslint-plugin-tailwindcss';

// React Compiler
import reactCompiler from 'eslint-plugin-react-compiler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  // Global ignores
  globalIgnores([
    '.next/*',
    '**/dist/**/*.css',
    '**/.next/**/*.css',
    'public/*',
    '**/dist',
    'esm/*',
    'scripts/*',
    '**/*.config.js',
    '**/*.config.mjs',
    '**/*.config.cjs',
    '**/.DS_Store',
    '**/node_modules',
    'templates/**',
    '**/.next',
    '**/build',
    '!**/.storybook',
    '**/.changeset',
    '**/.storybook/**/*',
    'tests/*',
    '**/coverage',
    '!**/tsup.config.ts',
    '**/storybook-static/**',
    'packages/core/styles-experimental/**', // Experimental package
    'apps/docs-rnd/**',
    'apps/docs/.source/**',
    'apps/docs/next-env.d.ts',
    '.chrome-profile/**',
    '.commitlintrc.cjs',
    'plopfile.js',
    'tsup-config.mjs',
  ]),

  // SonarJS Recommended Rules
  sonarjs.configs.recommended,
  unicorn.configs.recommended,

  // Global unicorn overrides — applied to ALL files (including .mjs/.cjs)
  {
    rules: {
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/prefer-number-properties': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/no-array-sort': 'off',
    },
  },

  // Main configuration
  {
    files: ['**/*.{ts,tsx,js,jsx}'],

    extends: fixupConfigRules(
      compat.extends(
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ),
    ),

    plugins: {
      react: fixupPluginRules(react),
      'jsx-a11y': fixupPluginRules(jsxA11Y),
      'react-refresh': fixupPluginRules(reactRefresh),
      import: fixupPluginRules(_import),
      'unused-imports': unusedImports,
      jsdoc: fixupPluginRules(jsdoc),
      security: fixupPluginRules(security),
      promise: fixupPluginRules(promise),
      boundaries: fixupPluginRules(boundaries),
      prettier: fixupPluginRules(prettier),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      // Testing
      'testing-library': fixupPluginRules(testingLibrary),
      // Tailwind CSS
      tailwindcss: fixupPluginRules(tailwindcss),
      // React Compiler
      'react-compiler': fixupPluginRules(reactCompiler),
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        callees: ['tv', 'cn', 'clsx', 'tailwindMerge'],
        cssConfigPath: path.resolve(__dirname, 'packages/core/styles/src/styles.css'),
        config: '',
      },
      'boundaries/elements': [
        {
          type: 'components',
          pattern: 'packages/components/:name/**/*',
          capture: ['name'],
        },
        {
          type: 'utils',
          pattern: 'packages/utils/**/*',
        },
        {
          type: 'theme',
          pattern: 'packages/core/theme/**/*',
        },
        {
          type: 'styles',
          pattern: 'packages/core/styles/**/*',
        },
        {
          type: 'react',
          pattern: 'packages/core/react/**/*',
        },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
    },

    rules: {
      // Core JavaScript/TypeScript
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-magic-numbers': [
        'off',
        {
          ignore: [0, 1, -1, 2, 4, 10, 100, 1000],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
        },
      ],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      complexity: ['error', 25],
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 150, skipBlankLines: true, skipComments: true }],
      'max-params': ['warn', 6],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_.*?$',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'variable', filter: { regex: '^[A-Z]', match: true }, format: ['PascalCase'] },
        { selector: 'interface', format: ['PascalCase'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'enum', format: ['PascalCase'] },
        { selector: 'class', format: ['PascalCase'] },
        { selector: 'objectLiteralProperty', format: null }, // eslint-disable-line unicorn/no-null -- required by @typescript-eslint schema
        {
          selector: 'variable',
          modifiers: ['const'],
          filter: { regex: '^[A-Z][A-Z0-9_]*$', match: true },
          format: ['UPPER_CASE'],
        },
      ],

      // React
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/button-has-type': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      'react/jsx-key': 'error',
      'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],
      'react/jsx-no-leaked-render': 'error',
      'react/no-array-index-key': 'error',
      'react/jsx-pascal-case': 'error',
      'react/self-closing-comp': 'warn',
      'react/jsx-child-element-spacing': 'error',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'react/require-default-props': 'off',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/consistent-type-exports': 'warn',
      'import/no-default-export': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: "ImportDeclaration[source.value='react'] > ImportDefaultSpecifier",
          message: 'Use named React imports only',
        },
        {
          selector: "ImportDeclaration[source.value='react'] > ImportNamespaceSpecifier",
          message: 'Use named React imports only',
        },
      ],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',

      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',

      // React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Boundaries
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'components',
              allow: ['utils', 'theme', 'styles'],
            },
            {
              from: 'utils',
              allow: [],
            },
            {
              from: 'theme',
              allow: ['utils'],
            },
            {
              from: 'styles',
              allow: [],
            },
            {
              from: 'react',
              allow: ['components', 'theme', 'utils', 'styles'],
            },
          ],
        },
      ],

      // Import management
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      'import/no-self-import': 'error',
      'unused-imports/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/order': [
        'warn',
        {
          groups: [
            'type',
            'builtin',
            'object',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [{ pattern: '~/**', group: 'external', position: 'after' }],
          'newlines-between': 'always',
        },
      ],

      // Code formatting
      'prettier/prettier': 'warn',
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      ],

      // Code quality (SonarJS)
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-unused-collection': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',
      'sonarjs/different-types-comparison': 'off',
      'sonarjs/function-return-type': 'off',

      // Modern JavaScript (Unicorn)
      'unicorn/better-regex': 'error',
      'unicorn/catch-error-name': 'error',
      'unicorn/consistent-destructuring': 'error',
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            camelCase: true,
          },
        },
      ],
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/no-new-buffer': 'error',
      // "no-unsafe-regex": "error",
      'unicorn/number-literal-case': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/throw-new-error': 'error',

      // Unicorn rules disabled — incompatible with React component library conventions
      'unicorn/prevent-abbreviations': 'off', // Renames forwardRef, mergeProps, etc.
      'unicorn/no-null': 'off', // React APIs use null extensively (refs, context, returns)
      'unicorn/prefer-module': 'off', // CJS scripts and configs need require()
      'unicorn/prefer-query-selector': 'off', // getElementById is valid and performant
      'unicorn/no-array-callback-reference': 'off', // Conflicts with typed filter predicates
      'unicorn/no-anonymous-default-export': 'off', // Plop and config files use anonymous exports
      'unicorn/prefer-number-properties': 'off', // isNaN/isFinite are valid in utility code
      'unicorn/no-abusive-eslint-disable': 'off', // Legacy scripts use blanket disables
      'unicorn/no-array-sort': 'off', // Array#toSorted() has limited runtime support

      // Documentation (JSDoc) - Optional for flexibility
      'jsdoc/check-alignment': 'off',
      'jsdoc/check-param-names': 'off',
      'jsdoc/check-tag-names': ['warn', { definedTags: ['vitest-environment'] }],
      'jsdoc/check-types': 'off',
      'jsdoc/require-description': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-returns-type': 'off',

      // Security
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-possible-timing-attacks': 'warn',

      // Promise handling
      'promise/always-return': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/avoid-new': 'off',
      'promise/prefer-await-to-then': 'warn',

      // React Compiler (React 19+)
      'react-compiler/react-compiler': 'error',

      // CSS & Tailwind CSS Best Practice Rules
      'tailwindcss/classnames-order': 'off', // Disabled to prevent circular fixes with Prettier & Tailwind v4
      'tailwindcss/enforces-negative-arbitrary-values': 'off', // Disabled for Tailwind CSS v4 syntax
      'tailwindcss/enforces-shorthand': 'off', // Directional property overrides & shorthands (inset: 0) checked via CSS standards
      'tailwindcss/no-custom-classname': 'off', // Allow BEM & custom semantic CSS classes
      'tailwindcss/no-contradicting-classname': 'off', // Disabled for Tailwind v4 @theme semantic color tokens
      'tailwindcss/no-unnecessary-arbitrary-value': 'off', // Allow custom cubic-bezier and OKLCH color values
    },
  },

  // Testing, Stories & Plop configurations
  {
    files: [
      '**/__tests__/**/*',
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      '**/*.stories.{js,jsx,ts,tsx}',
      'plopfile.js',
    ],

    rules: {
      // Testing Library rules
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': ['error', 'react'],
      'testing-library/prefer-screen-queries': 'error',
      'testing-library/prefer-presence-queries': 'warn',
      'testing-library/no-container': 'warn',
      'testing-library/no-node-access': 'warn',
      'testing-library/prefer-find-by': 'warn',
      'testing-library/prefer-user-event': 'warn',

      // Relax some rules for tests and stories
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-params': 'off',
      complexity: 'off',
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/prefer-read-only-props': 'warn',
      'sonarjs/deprecation': 'off',
    },
  },

  // Core Theme overrides
  {
    files: ['packages/core/theme/**/*'],
    rules: {
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-params': 'off',
      complexity: 'off',
      'sonarjs/cognitive-complexity': 'off',
    },
  },

  // Documentation & Playground configuration
  {
    files: ['apps/docs/**/*', 'apps/playground/**/*'],
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off',
      'import/order': 'off',
      'import/consistent-type-specifier-style': 'off',
      'unicorn/filename-case': 'off',
      'promise/prefer-await-to-then': 'off',
      'jsdoc/check-tag-names': 'off',
      'react/jsx-no-leaked-render': 'off',
      curly: 'off',
      'react-refresh/only-export-components': 'off',
      'react/jsx-no-bind': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-params': 'off',
      complexity: 'off',
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/prefer-read-only-props': 'warn',
      'sonarjs/no-nested-conditional': 'warn',
      'unicorn/prefer-number-properties': 'warn',
      'unicorn/prefer-node-protocol': 'warn',
      'unicorn/no-array-callback-reference': 'warn',
      'unicorn/no-console-spaces': 'warn',
      'no-restricted-syntax': [
        'warn',
        {
          selector: String.raw`JSXAttribute[name.name="className"] Literal[value=/(?:^|\s)(?:bg|border|text|ring|shadow|outline|fill|stroke)-(?:black|white)\/\d/]`,
          message:
            'Avoid raw black/* or white/* opacity utilities. Use semantic surface tokens instead: bg-surface, bg-surface-muted, border-surface-muted, bg-background.',
        },
      ],
    },
  },

  // Landing components — stricter: also disallow template literals in className
  {
    files: ['apps/docs/components/landing/**/*'],
    rules: {
      'no-restricted-syntax': [
        'warn',
        {
          selector: String.raw`JSXAttribute[name.name="className"] Literal[value=/(?:^|\s)(?:bg|border|text|ring|shadow|outline|fill|stroke)-(?:black|white)\/\d/]`,
          message:
            'Avoid raw black/* or white/* opacity utilities. Use semantic surface tokens instead: bg-surface, bg-surface-muted, border-surface-muted, bg-background.',
        },
        {
          selector:
            'JSXAttribute[name.name="className"] > JSXExpressionContainer > TemplateLiteral',
          message:
            'Template literals in className hide token violations. Use cn() from @ideasui/utils for conditional classes.',
        },
      ],
    },
  },
]);
