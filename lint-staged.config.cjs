const {relative} = require("path");
const escape = require("shell-quote").quote;
const isWin = process.platform === "win32";
const {ESLint} = require("eslint");

const removeIgnoredFiles = async (files) => {
  const cwd = process.cwd();
  const eslint = new ESLint();

  const relativePaths = files.map((file) => relative(cwd, file));
  const isIgnored = await Promise.all(relativePaths.map((file) => eslint.isPathIgnored(file)));

  return files.filter((_, i) => !isIgnored[i]);
};

module.exports = {
  "**/*.{js,ts,jsx,tsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    return filesToLint.map((filename) => {
      const file = isWin ? filename : escape([filename]);
      return `eslint --max-warnings=0 --fix "${file}"`;
    });
  },

  "**/*.css": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    return filesToLint.map((filename) => {
      const file = isWin ? filename : escape([filename]);
      return `prettier --write "${file}"`;
    });
  },
};
