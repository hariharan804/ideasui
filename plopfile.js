module.exports = function (plop) {
  // Full component generator (component + variant)
  plop.setGenerator('component', {
    description: 'Create complete component (component + variant)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (kebab-case):',
        validate: (input) =>
          /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., date-picker)',
      },
    ],
    actions: [
      // Create component package
      {
        type: 'addMany',
        destination: 'packages/components/{{name}}/',
        base: 'templates/component/',
        templateFiles: 'templates/component/**/*',
        skipIfExists: true,
      },
      // Add variant to variants package
      {
        type: 'add',
        path: 'packages/core/variants/src/{{name}}.ts',
        templateFile: 'templates/variant/variant.ts',
        skipIfExists: true,
      },
      // Create playground page
      // Add import to playground.tsx
      {
        type: 'add',
        path: 'apps/playground/app/(layout)/playground/{{name}}/page.tsx',
        templateFile: 'templates/playground/page.tsx',
        skipIfExists: true,
      },
      // {
      //   type: 'modify',
      //   path: 'apps/playground/components/playground.tsx',
      //   pattern: /(### IMPORT COMPONENT HERE ###)/gi,
      //   template: "$1\nimport {{pascalCase name}}Preview from './{{name}}'",
      // },
      // Add to component list
      {
        type: 'modify',
        path: 'apps/playground/components/playground.tsx',
        pattern: /(### APPEND COMPONENT HERE ###)/gi,
        template:
          "$1\n\n  {\n    name: '{{pascalCase name}}',\n    category: 'Core',\n  },",
      },
    ],
  })

  // Component only generator
  plop.setGenerator('component-only', {
    description: 'Create UI component package only',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (kebab-case):',
        validate: (input) =>
          /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., date-picker)',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/components/{{name}}/',
        base: 'templates/component/',
        templateFiles: 'templates/component/**/*',
        skipIfExists: true,
      },
    ],
  })

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a new React hook package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (kebab-case):',
        validate: (input) =>
          /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., use-local-storage)',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/hooks/{{name}}/',
        base: 'templates/hook/',
        templateFiles: 'templates/hook/**/*',
        skipIfExists: true,
      },
    ],
  })

  // Variant only generator
  plop.setGenerator('variant-only', {
    description: 'Add component variant to @ideasui/variants only',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (kebab-case):',
        validate: (input) =>
          /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., input-field)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/core/variants/src/{{name}}.ts',
        templateFile: 'templates/variant/variant.ts',
        skipIfExists: true,
      },
    ],
  })

  // Helpers
  plop.setHelper('pascalCase', (text) => {
    return text.replace(/(^\w|-\w)/g, (match) =>
      match.replace('-', '').toUpperCase()
    )
  })

  plop.setHelper('camelCase', (text) => {
    const pascal = text.replace(/(^\w|-\w)/g, (match) =>
      match.replace('-', '').toUpperCase()
    )
    return pascal.charAt(0).toLowerCase() + pascal.slice(1)
  })
}
