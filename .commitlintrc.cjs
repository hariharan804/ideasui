module.exports = {
  extends: ['@commitlint/config-conventional'],
  helpUrl:
    'https://github.com/ideas2logic-lab/ideasui/blob/master/CONTRIBUTING.md#commit-convention',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'add',
        'update',
        'remove',
        'config',
      ],
    ],
    'scope-enum': [
      1,
      'always',
      [
        'components',
        'core',
        'utils',
        'hooks',
        'icons',
        'cli',
        'slot',
        'themes',
        'docs',
        'config',
        'deps',
        'release',
        'playground',
        'storybook',
      ],
    ],
    'scope-empty': [0],
    'header-max-length': [2, 'always', 200], // Increased limit
    'body-max-line-length': [0], // Disabled
    'footer-max-line-length': [0], // Disabled
    'subject-case': [0], // Disabled - allow any case
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0], // Disabled - allow full stop
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
  },
};
