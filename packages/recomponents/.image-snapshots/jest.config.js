process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

const globalJestConfig = require('../jest.config');

const finalJestConfig = {...globalJestConfig};

finalJestConfig.collectCoverage = false;

finalJestConfig.testMatch = [
    '<rootDir>/.storybook/storyshots-image.runner.js',
];

module.exports = finalJestConfig;
