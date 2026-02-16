module.exports = {
  testEnvironment: 'jsdom',
  testTimeout: 35000,
  collectCoverageFrom: [
    'packages/components/**/*.{ts,tsx}',
    'packages/hooks/**/*.{ts,tsx}',
    'packages/core/**/*.{ts,tsx}',
    'packages/utils/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/__tests__/**',
    '!**/*.stories.{ts,tsx}',
    '!**/tsup.config.ts',
    '!**/jest.config.js',
    '!**/*.d.ts',
    '!packages/cli/**',
    '!packages/icons/**',
    '!**/index.{ts,tsx}', // Exclude barrel files
    '!packages/utils/src/test/**',
  ],
  coverageReporters: ['text', 'lcov', 'json-summary'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
  coverageThreshold: {
    // Global baseline - achievable and maintainable
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },

    // Components - User-facing, should be well tested
    './packages/components/': {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },

    // Hooks
    './packages/hooks/': {
      branches: 75,
      functions: 85,
      lines: 85,
      statements: 85,
    },

    // Core - Theme system, moderate coverage
    './packages/core/': {
      branches: 65,
      functions: 70,
      lines: 75,
      statements: 75,
    },

    // Utils - Helper functions, solid coverage
    './packages/utils/': {
      branches: 70,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: ['<rootDir>/examples', '<rootDir>/templates', '<rootDir>/.*/dist'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.*/dist',
    '\\.spec\\.(ts|tsx|js|jsx)$',
  ],
  moduleNameMapper: {
    '^@ideasui/theme/recipes$': '<rootDir>/packages/core/theme/src/recipes/index.ts',
    '^@ideasui/theme/tokens$': '<rootDir>/packages/core/theme/src/tokens/index.ts',
    '^@ideasui/theme/system$': '<rootDir>/packages/core/theme/src/system/index.ts',
    '^@ideasui/theme/plugin$': '<rootDir>/packages/core/theme/src/system/plugin/index.ts',
    '^@ideasui/theme$': '<rootDir>/packages/core/theme/src/index.ts',
    '^@ideasui/utils/(.*)$': '<rootDir>/packages/utils/src/$1',
    '^@ideasui/utils$': '<rootDir>/packages/utils/src/index.ts',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: {
          allowJs: true,
          module: 'commonjs',
          moduleResolution: 'node',
        },
      },
    ],
  },
  preset: 'ts-jest',
  transformIgnorePatterns: [],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    './scripts/setup-test.ts',
    '<rootDir>/jest.setup.js',
  ],
};
