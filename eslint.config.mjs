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
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';

// Tailwind CSS - Disabled: Plugin doesn't support Tailwind v4 yet
// import tailwindcss from 'eslint-plugin-tailwindcss';

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
    '**/*.css',
    'public/*',
    '**/dist',
    'esm/*',
    'scripts/*',
    '**/*.config.js',
    '**/.DS_Store',
    '**/node_modules',
    'templates/**',
    '**/.next',
    '**/build',
    '!**/.storybook',
    '**/.changeset',
    '**/.storybook/**/*',
    '!**/.commitlintrc.cjs',
    'tests/*',
    '**/coverage',
    '!**/jest.config.js',
    '!**/plopfile.js',
    '!**/tsup.config.ts',
    '**/storybook-static/**',
    'packages/core/styles-experimental/**', // Experimental package
  ]),

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
      sonarjs: fixupPluginRules(sonarjs),
      unicorn: fixupPluginRules(unicorn),
      jsdoc: fixupPluginRules(jsdoc),
      security: fixupPluginRules(security),
      promise: fixupPluginRules(promise),
      boundaries: fixupPluginRules(boundaries),
      prettier: fixupPluginRules(prettier),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      // Testing
      jest: fixupPluginRules(jest),
      'testing-library': fixupPluginRules(testingLibrary),
      // Tailwind CSS - Disabled: Plugin doesn't support Tailwind v4 yet
      // tailwindcss: fixupPluginRules(tailwindcss),
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
      'boundaries/elements': [
        {
          type: 'components',
          pattern: 'packages/components/**',
        },
        {
          type: 'hooks',
          pattern: 'packages/hooks/**',
        },
        {
          type: 'utils',
          pattern: 'packages/utils/**',
        },
        {
          type: 'theme',
          pattern: 'packages/core/theme/**',
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
      // complexity: ['error', 20],
      // 'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      // 'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      // 'max-params': ['warn', 4],

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
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'variable', filter: { regex: '^[A-Z]', match: true }, format: ['PascalCase'] },
        { selector: 'interface', format: ['PascalCase'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'enum', format: ['PascalCase'] },
        { selector: 'class', format: ['PascalCase'] },
        { selector: 'objectLiteralProperty', format: null },
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
      'react/display-name': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      'react/jsx-key': 'error',
      'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],
      'react/jsx-no-leaked-render': 'error',
      'react/no-array-index-key': 'error',
      'react/jsx-pascal-case': 'error',
      'react/self-closing-comp': 'warn',
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
              allow: ['hooks', 'utils', 'theme'],
            },
            {
              from: 'hooks',
              allow: ['utils'],
            },
            {
              from: 'utils',
              allow: [],
            },
            {
              from: 'theme',
              allow: ['utils'],
            },
          ],
        },
      ],

      // Import management
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
      'sonarjs/no-duplicate-string': [
        'error',
        {
          threshold: 3,
        },
      ],
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-unused-collection': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',

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

      // Documentation (JSDoc) - Optional for flexibility
      'jsdoc/check-alignment': 'off',
      'jsdoc/check-param-names': 'off',
      'jsdoc/check-tag-names': ['warn', { definedTags: ['jest-environment'] }],
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

      // Tailwind CSS - Disabled: Plugin doesn't support Tailwind v4 yet
      // 'tailwindcss/classnames-order': 'warn',
      // 'tailwindcss/enforces-negative-arbitrary-values': 'warn',
      // 'tailwindcss/enforces-shorthand': 'warn',
      // 'tailwindcss/no-custom-classname': 'off', // Allow BEM classes
      // 'tailwindcss/no-contradicting-classname': 'error',
      // 'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
    },
  },

  // Testing configuration
  {
    files: ['**/__tests__/**/*', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],

    rules: {
      // Jest rules
      'jest/expect-expect': 'error',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'jest/no-conditional-expect': 'error',
      'jest/no-deprecated-functions': 'error',
      'jest/prefer-strict-equal': 'warn',
      'jest/prefer-spy-on': 'warn',
      'jest/no-test-prefixes': 'error',

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

      // Relax some rules for tests
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'sonarjs/no-duplicate-string': 'off',
    },
  },
]);
