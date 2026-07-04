const { ESLint } = require('eslint');

/**
 * Filter out ESLint-ignored files
 */
const filterIgnored = async (files) => {
  const eslint = new ESLint();
  const results = await Promise.all(
    files.map(async (file) => ({
      file,
      ignored: await eslint.isPathIgnored(file),
    })),
  );
  return results.filter((r) => !r.ignored).map((r) => r.file);
};

module.exports = {
  // JavaScript/TypeScript - ESLint + Prettier
  '*.{js,cjs,mjs,ts,tsx,jsx}': async (files) => {
    const filtered = await filterIgnored(files);
    if (filtered.length === 0) return [];
    const fileList = filtered.join(' ');
    return [`eslint --max-warnings=0 --fix ${fileList}`, `prettier --write ${fileList}`];
  },

  // CSS/SCSS - Prettier
  '*.{css,scss}': 'prettier --write',

  // JSON/YAML/Markdown - Prettier
  '*.{json,yml,yaml,md}': 'prettier --write',
};
