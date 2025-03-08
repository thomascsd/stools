module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    '/node_modules/(?!(got|p-cancelable|@szmarczak|lowercase-keys|@sindresorhus/is|form-data-encoder)/)',
  ],
};
