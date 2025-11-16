module.exports = function (plop) {
  // Add custom helpers
  plop.setHelper('kebabCase', (text) => {
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  })

  plop.setGenerator('component', {
    description: 'Create a new component package following naming conventions',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase, e.g., InputField, DatePicker):',
        validate: (input) => {
          if (!input) return 'Component name is required'
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
            return 'Must be PascalCase (e.g., Button, InputField, DatePicker)'
          }
          return true
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{kebabCase name}}/',
        base: 'templates/component/',
        templateFiles: 'templates/component/**/*',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'apps/playground/components/{{kebabCase name}}.tsx',
        templateFile: 'templates/example/compoent.hbs',
        skipIfExists: true,
      },
      // {
      //   type: 'add',
      //   path: 'apps/playground/app/components/{{pascalCase name}}.tsx',
      //   templateFile: 'templates/example/compoent.hbs',
      //   skipIfExists: true,
      // },
      {
        type: 'append',
        path: 'apps/playground/components/example.tsx',
        pattern: /\/\/ ### APPEND COMPONENT HERE ###/,
        templateFile: 'templates/example/example.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'apps/playground/components/example.tsx',
        pattern: /\/\/ ### IMPORT COMPONENT HERE ###/,
        template:
          "import {{pascalCase name}}Preview from './{{kebabCase name}}';",
        skipIfExists: true,
      },
      function (data) {
        return `✅ Component created: packages/${plop.getHelper('kebabCase')(data.name)}/`
      },
      function (data) {
        return `📦 Package name: @your-org/${plop.getHelper('kebabCase')(data.name)}`
      },
      function (data) {
        return `🧩 Component: ${data.name}`
      },
      function () {
        return '\n🚀 Next steps:'
      },
      function (data) {
        return `   npm run dev --workspace=packages/${plop.getHelper('kebabCase')(data.name)}`
      },
      function () {
        return '   npm run check-naming  # Verify naming conventions'
      },
    ],
  })
}
