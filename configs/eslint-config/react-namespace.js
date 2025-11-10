const customRules = require('./rules');

module.exports = {
  extends: ['./react.js'],
  plugins: ['@i2l'],
  rules: {
    '@i2l/react-namespace': 'error',
    'react/react-in-jsx-scope': 'error', // Require React import
  },
};

// Register custom rules
module.exports.rules = customRules;
