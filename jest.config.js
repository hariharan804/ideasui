module.exports = {
  testEnvironment: "jsdom",
  testTimeout: 35000,
  collectCoverageFrom: [
    "packages/components/**/*.{ts,tsx}",
    "packages/hooks/**/*.{ts,tsx}",
    "packages/core/**/*.{ts,tsx}",
    "packages/utils/**/*.{ts,tsx}",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  modulePathIgnorePatterns: ["<rootDir>/examples", "<rootDir>/templates"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "ts-jest",
      {
        tsconfig: {
          allowJs: true,
        },
      },
    ],
  },
  preset: "ts-jest",
  transformIgnorePatterns: [],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "./scripts/setup-test.ts",
    "<rootDir>/jest.setup.js",
  ],
};
