module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: (input) => /^[A-Z][a-zA-Z0-9]*$/.test(input) || 'Must be PascalCase'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}/',
        base: 'templates/component/',
        templateFiles: 'templates/component/**/*'
      }
    ]
  })
}