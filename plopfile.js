module.exports = function plopConfig(plop) {
  const COMPONENT_NAME_MESSAGE = 'Component name (kebab-case):';

  // Full component generator (component package + 3-file theme recipe + playground page)
  plop.setGenerator('component', {
    description: 'Create complete component (component package + theme recipe + playground page)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: COMPONENT_NAME_MESSAGE,
        validate: (input) => /^[a-z-]+$/.test(input) || 'Use kebab-case (e.g., date-picker)',
      },
    ],
    actions: [
      // 1. Create component package (src/[component].tsx, src/[component].types.ts, src/index.ts, __tests__, stories)
      {
        type: 'addMany',
        destination: 'packages/components/{{name}}/',
        base: 'plop-templates/component/',
        templateFiles: 'plop-templates/component/**/*.hbs',
        skipIfExists: true,
        stripExtensions: ['hbs'],
      },
      // 2. Add 3-file recipe to theme package (index.ts, {{name}}.ts, {{name}}.css)
      {
        type: 'addMany',
        destination: 'packages/core/theme/src/recipes/{{name}}/',
        base: 'plop-templates/recipe/',
        templateFiles: 'plop-templates/recipe/**/*.hbs',
        skipIfExists: true,
        stripExtensions: ['hbs'],
      },
      {
        type: 'modify',
        path: 'packages/core/theme/src/recipes/index.ts',
        pattern: /(\/\* ### EXPORT RECIPES HERE ### \*\/)/g,
        template: "$1\nexport * from './{{name}}';",
      },
      {
        type: 'modify',
        path: 'packages/core/theme/src/recipes/index.css',
        pattern: /(\/\* ### IMPORT RECIPES HERE ### \*\/)/g,
        template: "$1\n@import './{{name}}/{{name}}.css';",
      },
      // 3. Create playground page & component wrapper
      {
        type: 'add',
        path: 'apps/playground/app/(layout)/playground/{{name}}/page.tsx',
        templateFile: 'plop-templates/playground/page.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'apps/playground/components/{{name}}.tsx',
        templateFile: 'plop-templates/playground/component.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: 'apps/playground/components/playground.tsx',
        pattern: /(### APPEND COMPONENT HERE ###)/gi,
        template: "$1\n\n  {\n    name: '{{pascalCase name}}',\n    category: 'Core',\n  },",
      },
      // 4. Add dependency & export to @ideasui/react
      {
        type: 'modify',
        path: 'packages/core/react/package.json',
        pattern: /("dependencies":\s*{)/g,
        template: '$1\n    "@ideasui/{{name}}": "workspace:*",',
      },
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
        templateFiles: 'plop-templates/component/**/*.hbs',
        skipIfExists: true,
        stripExtensions: ['hbs'],
      },
    ],
  });

  // Recipe only generator (creates 3-file recipe in @ideasui/theme)
  plop.setGenerator('recipe-only', {
    description: 'Add 3-file component recipe (index.ts, recipe.ts, recipe.css) to @ideasui/theme only',
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
        type: 'addMany',
        destination: 'packages/core/theme/src/recipes/{{name}}/',
        base: 'plop-templates/recipe/',
        templateFiles: 'plop-templates/recipe/**/*.hbs',
        skipIfExists: true,
        stripExtensions: ['hbs'],
      },
      {
        type: 'modify',
        path: 'packages/core/theme/src/recipes/index.ts',
        pattern: /(\/\* ### EXPORT RECIPES HERE ### \*\/)/g,
        template: "$1\nexport * from './{{name}}';",
      },
      {
        type: 'modify',
        path: 'packages/core/theme/src/recipes/index.css',
        pattern: /(\/\* ### IMPORT RECIPES HERE ### \*\/)/g,
        template: "$1\n@import './{{name}}/{{name}}.css';",
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
