const baseConfig = require('./base');
const reactConfig = require('./react');
// const nextConfig = require('./next');
const importPlugin = require('eslint-plugin-import');
// const sonarjsPlugin = require('eslint-plugin-sonarjs');
const unicornPlugin = require('eslint-plugin-unicorn');
const prettierPlugin = require('eslint-plugin-prettier');
// const tailwindPlugin = require('eslint-plugin-tailwindcss');

const config = [
  // Base config
  ...baseConfig,
  // React config
  ...reactConfig,
  // Next.js config
  // ...nextConfig,
  // Main configuration
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      import: importPlugin,
      // sonarjs: sonarjsPlugin,
      unicorn: unicornPlugin,
      prettier: prettierPlugin,
      // tailwindcss: tailwindPlugin,
    },
    settings: {
      // tailwindcss: {
      //   callees: ['cn', 'cva'],
      //   config: 'tailwind.config.js',
      // },
    },
    rules: {
      // Unicorn rules
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/expiring-todo-comments': 'off',

      // Error Handling
      'no-throw-literal': 'error',
      'no-return-await': 'error',
      'require-await': 'warn',

      // Code Organization
      'no-duplicate-imports': 'error',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      ],

      // Naming Conventions
      camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
      '@typescript-eslint/naming-convention': [
        'error',
        // Variables: camelCase
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        // Functions: camelCase
        {
          selector: 'function',
          format: ['camelCase'],
        },
        // React Components: PascalCase
        {
          selector: 'function',
          format: ['PascalCase'],
          filter: {
            regex: '^[A-Z]',
            match: true,
          },
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          filter: {
            // Allow PascalCase for React components (variables starting with capital letter)
            regex: '^[A-Z]',
            match: true,
          },
        },
        // Types/Interfaces: PascalCase
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // Enums: PascalCase
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        // Enum Members: UPPER_CASE
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
        // Class: PascalCase
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        // Parameters: camelCase
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
      ],

      // Best Practices
      'no-param-reassign': ['error', { props: false }],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'default-case': 'error',
      'no-fallthrough': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
      // Prettier
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
    },
    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      // tailwindcss: {
      //   // Using a simpler configuration
      //   callees: ['cn', 'cva'],
      //   config: 'tailwind.config.js',
      // },
    },
  },
  // Test files configuration
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'max-lines-per-function': 'off',
      'sonarjs/no-duplicate-string': 'off',
    },
  },
];

module.exports = config;
