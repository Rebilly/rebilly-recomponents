module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: [
      'js',
      'jsx',
      'vue',
      'json',
  ],
  setupFiles: ['./src/setup-test.js'],
  transform: {
      '^.+\\.vue$': 'vue-jest',
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
  collectCoverage: false,
  collectCoverageFrom: [
      'src/components/**/r-*.{js,vue}',
      'src/directives/**/r-*.{js,vue}',
      '!src/**/*.story.js',
      '!src/index.js',
  ],
};
