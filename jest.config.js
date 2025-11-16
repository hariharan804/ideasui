const path = require('path');

module.exports = {
  ...require('./configs/jest-config/jest.config.js'),
  setupFilesAfterEnv: [path.join(__dirname, 'configs', 'jest-config', 'jest.setup.js')],
};