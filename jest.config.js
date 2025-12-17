const path = require("path");

module.exports = {
  ...require("./configs/jest-config/jest.config.js"),
  setupFilesAfterEnv: [path.join(__dirname, "configs", "jest-config", "jest.setup.js")],
  projects: [
    {
      displayName: "components",
      testMatch: ["<rootDir>/packages/components/**/src/**/*.test.{ts,tsx}"],
    },
    {
      displayName: "utils",
      testMatch: ["<rootDir>/packages/utils/**/src/**/*.test.{ts,tsx}"],
    },
    {
      displayName: "core",
      testMatch: ["<rootDir>/packages/core/**/src/**/*.test.{ts,tsx}"],
    },
  ],
};
