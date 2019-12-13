process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

const path = require('path');
const globalJestConfig = require('../jest.config');

const finalJestConfig = {...globalJestConfig};

finalJestConfig.rootDir = path.join(__dirname, '../');
finalJestConfig.collectCoverage = false;
finalJestConfig.collectCoverageFrom = [];

finalJestConfig.transform = {
    ...finalJestConfig.transform,
    '^.+\\.md?$': 'markdown-loader-jest',
};

finalJestConfig.setupFiles = ['<rootDir>/.image-snapshots/register-context.js'];

finalJestConfig.testMatch = [
    '<rootDir>/.image-snapshots/storyshots-image.runner.js',
];

module.exports = finalJestConfig;
