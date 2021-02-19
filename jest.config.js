module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  verbose: true,
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!<rootDir>/dist/**',
    '!<rootDir>/src/plugins/**',
    '!<rootDir>/tests/unit/**',
  ],
  coverageReporters: ['html', 'lcov', 'text-summary'],
};
