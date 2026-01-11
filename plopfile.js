module.exports = function (plop) {
  // Full component generator (component + recipe)
  plop.setGenerator('component', {
    description: 'Create complete component (component + recipe)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (kebab-case):',
        validate: (input) => /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., date-picker)',
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
      // Add recipe to theme package
      {
        type: 'add',
        path: 'packages/core/theme/src/recipes/{{name}}.ts',
        templateFile: 'templates/recipe/{{name}}.ts',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: 'packages/core/theme/src/recipes/index.ts',
        pattern: /(### export recipe here ###)/gi,
        template: "$1\nexport * from './{{name}}'",
      },
      // Create playground page
      {
        type: 'add',
        path: 'apps/playground/app/(layout)/playground/{{name}}/page.tsx',
        templateFile: 'templates/playground/page.tsx',
        skipIfExists: true,
      },
      // Add to component list
      {
        type: 'modify',
        path: 'apps/playground/components/playground.tsx',
        pattern: /(### append component here ###)/gi,
        template: "$1\n\n  {\n    name: '{{pascalCase name}}',\n    category: 'Core',\n  },",
      },
    ],
  });

  // Component only generator
  plop.setGenerator('component-only', {
    description: 'Create UI component package only',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (kebab-case):',
        validate: (input) => /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., date-picker)',
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
  });

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a new React hook package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (kebab-case):',
        validate: (input) => /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., use-local-storage)',
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
  });

  // Recipe only generator
  plop.setGenerator('recipe-only', {
    description: 'Add component recipe to @ideasui/theme only',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (kebab-case):',
        validate: (input) => /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., input-field)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/core/theme/src/recipes/{{name}}.ts',
        templateFile: 'templates/recipe/{{name}}.ts',
        skipIfExists: true,
      },
    ],
  });

  // Helpers
  plop.setHelper('pascalCase', (text) => {
    return text.replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());
  });

  plop.setHelper('camelCase', (text) => {
    const pascal = text.replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());

    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  });
};
