module.exports = {
  testEnvironment: "jsdom",
  testTimeout: 35000,
  collectCoverageFrom: [
    "packages/components/**/*.{ts,tsx}",
    "packages/hooks/**/*.{ts,tsx}",
    "packages/core/**/*.{ts,tsx}",
    "packages/utils/**/*.{ts,tsx}"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  modulePathIgnorePatterns: ["<rootDir>/examples", "<rootDir>/templates"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  preset: "ts-jest",
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  setupFilesAfterEnv: ["@testing-library/jest-dom", "./scripts/setup-test.ts"],
};
