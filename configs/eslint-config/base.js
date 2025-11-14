const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.next',
      '.turbo',
      'coverage',
      '**/*.d.ts',
      '**/jest.config.js',
      '**/TEST_PAGE_EXAMPLE.tsx',
      '**/*i18n-examples.ts',
    ],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        // Test globals
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        NodeJS: 'readonly',
        MouseEvent: 'readonly',
        TouchEvent: 'readonly',
        // Fetch API
        fetch: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        Headers: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      // Naming convention rules
      '@typescript-eslint/naming-convention': [
        'error',
        // Variables and functions should be camelCase
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'function',
          format: ['camelCase']
        },
        // React components should be PascalCase
        {
          selector: 'variable',
          filter: {
            regex: '^[A-Z]',
            match: true
          },
          format: ['PascalCase']
        },
        // TypeScript interfaces and types should be PascalCase
        {
          selector: 'interface',
          format: ['PascalCase']
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase']
        },
        {
          selector: 'enum',
          format: ['PascalCase']
        },
        // Class names should be PascalCase
        {
          selector: 'class',
          format: ['PascalCase']
        },
        // Object properties can be camelCase or kebab-case (for CSS)
        {
          selector: 'objectLiteralProperty',
          format: null
        },
        // Constants should be UPPER_CASE
        {
          selector: 'variable',
          modifiers: ['const'],
          filter: {
            regex: '^[A-Z][A-Z0-9_]*$',
            match: true
          },
          format: ['UPPER_CASE']
        }
      ],
    },
  },
  prettier,
];
