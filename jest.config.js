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
  ],
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 25,
      functions: 20,
      lines: 35,
      statements: 35,
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
    '^@ideasui/theme/token$': '<rootDir>/packages/core/theme/src/tokens/index.ts',
    '^@ideasui/theme/system$': '<rootDir>/packages/core/theme/src/system/index.ts',
    '^@ideasui/theme/plugin$': '<rootDir>/packages/core/theme/src/system/plugin.ts',
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
