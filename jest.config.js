// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
require('dotenv').config();

module.exports = {
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}', '!<rootDir>/node_modules/'],
};
