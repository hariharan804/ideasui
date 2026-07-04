module.exports = function (plop) {
  const COMPONENT_NAME_MESSAGE = 'Component name (kebab-case):';

  // Full component generator (component + recipe)
  plop.setGenerator('component', {
    description: 'Create complete component (component + recipe)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: COMPONENT_NAME_MESSAGE,
        validate: (input) => /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., date-picker)',
      },
    ],
    actions: [
      // Create component package
      {
        type: 'addMany',
        destination: 'packages/components/{{name}}/',
        base: 'plop-templates/component/',
        templateFiles: 'plop-templates/component/**/*.hbs',
        skipIfExists: true,
        stripExtensions: ['hbs'],
      },
      // Add recipe to theme package
      {
        type: 'add',
        path: 'packages/core/theme/src/recipes/{{name}}.ts',
        templateFile: 'plop-templates/recipe/recipe.ts.hbs',
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
        templateFile: 'plop-templates/playground/page.tsx.hbs',
        skipIfExists: true,
      },
      // Create playground component wrapper
      {
        type: 'add',
        path: 'apps/playground/components/{{name}}.tsx',
        templateFile: 'plop-templates/playground/component.tsx.hbs',
        skipIfExists: true,
      },
      // Add to component list
      {
        type: 'modify',
        path: 'apps/playground/components/playground.tsx',
        pattern: /(### append component here ###)/gi,
        template: "$1\n\n  {\n    name: '{{pascalCase name}}',\n    category: 'Core',\n  },",
      },
      // Add dependency to @ideasui/react package.json
      {
        type: 'modify',
        path: 'packages/core/react/package.json',
        pattern: /("dependencies":\s*{)/g,
        template: '$1\n    "@ideasui/{{name}}": "workspace:*",',
      },
      // Add export to @ideasui/react entrypoint
      {
        type: 'modify',
        path: 'packages/core/react/src/index.ts',
        pattern: /(export \* from '@ideasui\/button';)/g,
        template: "$1\nexport * from '@ideasui/{{name}}';",
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
        message: COMPONENT_NAME_MESSAGE,
        validate: (input) => /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., date-picker)',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/components/{{name}}/',
        base: 'plop-templates/component/',
        templateFiles: 'plop-templates/component/**/*',
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
        message: COMPONENT_NAME_MESSAGE,
        validate: (input) => /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., input-field)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/core/theme/src/recipes/{{name}}.ts',
        templateFile: 'plop-templates/recipe/recipe.ts',
        skipIfExists: true,
      },
    ],
  });

  // Helpers
  plop.setHelper('pascalCase', (text) => {
    return text.replaceAll(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());
  });

  plop.setHelper('camelCase', (text) => {
    const pascal = text.replaceAll(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase());

    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  });
};
