module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'vue',
        'json',
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.jsx?$': 'babel-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: [
        '/node_modules/',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    snapshotSerializers: [
        'jest-serializer-vue',
    ],
    testMatch: [
        '**/r-*.spec.(js)|**/__tests__/*.(js|jsx|ts|tsx)',
    ],
    testURL: 'http://localhost/',
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/components/**/r-*.{js,vue}',
        'src/directives/**/r-*.{js,vue}',
        '!src/**/*.story.js',
        '!src/index.js',
    ],
};
