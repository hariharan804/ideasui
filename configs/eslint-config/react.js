// packages/config/eslint-config/react-tailwind.cjs
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
// const tailwindPlugin = require('eslint-plugin-tailwindcss');
const baseConfig = require('./base'); // adjust relative path if needed

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{tsx,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      // tailwindcss: tailwindPlugin,
    },

    // languageOptions from base already set; keep only react/tailwind specific settings here
    settings: {
      react: {
        version: 'detect',
      },
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      // tailwindcss: {
      //   // Where your tailwind config lives (relative to where eslint runs — usually repo root)
      //   // config: 'tailwind.config.js',
      //   // functions that accept className strings (classnames, clsx, cn etc)
      //   callees: ['classnames', 'clsx', 'cn', 'ctl'],
      // },
    },

    rules: {
      // React rules (recommended + useful overrides)
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'warn',
        { additionalHooks: '(useMyCustomHook|useAnotherHook)' },
      ],

      // Accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',

      // Tailwind CSS plugin rules (tune to taste)
      // Order classnames, warn when contradictory classes are used, but allow custom classnames
      // 'tailwindcss/classnames-order': 'warn',
      // 'tailwindcss/no-contradicting-classname': 'error',
      // 'tailwindcss/no-custom-classname': 'off',

      // Optionally enforce using Tailwind tokens instead of arbitrary values (example)
      // 'tailwindcss/enforces-shorthand': 'warn' // uncomment if you want shorthand enforcement
    },

    // If you maintain duplicate keys in your base, ensure no duplication happens.
    // This file only targets jsx/tsx and will be applied in addition to base rules.
  },
];
