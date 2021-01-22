module.exports = {
  roots: ['./src', './test'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(test|src)/.+\\.(test|spec)\\.[tj]s$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageReporters: ['text']
};
