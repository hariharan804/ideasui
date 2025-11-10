module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce React namespace usage instead of named imports',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      useNamespace: 'Use "import React from \'react\'" and access via React.{{name}}',
      noNamedImport: 'Do not use named imports from React. Use React.{{name}} instead',
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== 'react') return;

        const namedSpecifiers = node.specifiers.filter((spec) => spec.type === 'ImportSpecifier');

        if (namedSpecifiers.length > 0) {
          namedSpecifiers.forEach((spec) => {
            context.report({
              node: spec,
              messageId: 'noNamedImport',
              data: { name: spec.imported.name },
            });
          });
        }
      },
    };
  },
};
